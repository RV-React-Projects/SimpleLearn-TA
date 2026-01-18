const https = require('https');
const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
let env = {};
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
  });
} catch (e) {
  console.error('❌ Could not read .env.local');
  process.exit(1);
}

const API_KEY = env.AIRTABLE_API_KEY;
const BASE_ID = env.AIRTABLE_BASE_ID;
const TABLE_NAME = env.AIRTABLE_TABLE_NAME;

console.log('🔍 DIAGNOSTIC MODE: Inspecting Airtable Access...');
console.log(`Token: ${API_KEY ? API_KEY.substring(0, 10) + '...' : 'MISSING'}`);
console.log(`Base ID: ${BASE_ID}`);
console.log(`Table: ${TABLE_NAME}`);

if (!API_KEY || !API_KEY.startsWith('pat')) {
  console.error('❌ Error: API Key does not start with "pat". Check .env.local');
  process.exit(1);
}

// Helper for raw HTTPS execution
function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.airtable.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
}

async function runDiagnostics() {
  try {
    // TEST 0: Check "Who Am I" (Scopes)
    console.log('\n--- TEST 0: Token Scopes (WhoAmI) ---');
    try {
      const whoRes = await makeRequest('/v0/meta/whoami');
      console.log('RAW WhoAmI Response:', whoRes.body); // DEBUG RAW BODY
      
      if (whoRes.status === 200) {
        const who = JSON.parse(whoRes.body);
        console.log('✅ TOKEN VALID.');
        
         // Check for required scopes
        const hasWrite = (who.scopes || []).includes('data.records:write');
        if (!hasWrite) {
          console.log('\n❌ MISSING SCOPE: "data.records:write" is NOT in the list.');
        } else {
          console.log('✅ "data.records:write" is present.');
        }
      } else {
        console.log(`⚠️  Could not fetch scopes. Status: ${whoRes.status}`);
      }
    } catch (e) {
      console.log('⚠️  WhoAmI check failed (Network/Other).');
    }

    // TEST 1: Check if "schema.bases:read" allows us to see the base list
    console.log('\n--- TEST 1: Listing Visible Bases (Meta API) ---');
    const metaRes = await makeRequest('/v0/meta/bases');
    
    if (metaRes.status === 200) {
      const data = JSON.parse(metaRes.body);
      console.log(`✅ META SUCCESS: Token works. It can see ${data.bases.length} bases.`);
      
      const found = data.bases.find(b => b.id === BASE_ID);
      if (found) {
        console.log(`✅ MATCH FOUND: Token has access to Base "${found.name}" (${BASE_ID}).`);
        
        // TEST 1.5: Check Tables in this Base (Requires schema.bases:read)
        console.log('\n--- TEST 1.5: Checking Table Names ---');
        try {
          const tablesRes = await makeRequest(`/v0/meta/bases/${BASE_ID}/tables`);
          if (tablesRes.status === 200) {
            const tablesData = JSON.parse(tablesRes.body);
            console.log('✅ TABLE SCHEMA READ SUCCESS.');
            console.log('   Tables found in this Base:');
            tablesData.tables.forEach(t => {
              console.log(`   - "${t.name}" (ID: ${t.id})`);
            });

            const targetTable = tablesData.tables.find(t => t.name === TABLE_NAME);
            if (targetTable) {
              console.log(`✅ TABLE MATCH: Found table "${TABLE_NAME}".`);
            } else {
              console.log(`❌ TABLE MISMATCH: Looked for "${TABLE_NAME}" but it DOES NOT EXIST.`);
              console.log('   👉 Please rename the tab in Airtable to match, or update .env.local');
            }
          } else {
             console.log(`⚠️  Could not list tables. Status: ${tablesRes.status}`);
             console.log('   (Token might be missing "schema.bases:read" scope)');
          }
        } catch (e) {
          console.log('⚠️  Table schema check failed.');
        }

      } else {
        console.log(`❌ MATCH FAILED: Token WORKS, but CANNOT see Base ID ${BASE_ID}.`);
        console.log('   The Token has access to these bases instead:');
        data.bases.forEach(b => console.log(`   - ${b.id} (${b.name})`));
        console.log('\n   👉 FIX: Your Base ID in .env.local does not match any base the token allowed.');
        return;
      }
    } else if (metaRes.status === 403) {
      // 403 on meta/bases means "schema.bases:read" is missing, OR token is totally invalid
      console.log('⚠️  META 403: Cannot list bases.');
      console.log('   (Token likely missing "schema.bases:read" scope, or is invalid for this workspace)');
    } else {
      console.log(`❌ META ERROR: ${metaRes.status} ${metaRes.body}`);
    }

    // TEST 2: Check Table Access directly
    console.log(`\n--- TEST 2: Reading Table "${TABLE_NAME}" ---`);
    const tableEnc = encodeURIComponent(TABLE_NAME);
    const tableRes = await makeRequest(`/v0/${BASE_ID}/${tableEnc}?maxRecords=1`);
    
    if (tableRes.status === 200) {
      console.log('✅ READ SUCCESS: Successfully connected to table!');
      console.log('   (If write still fails, you are only missing "data.records:write")');
    } else if (tableRes.status === 403) {
      console.log('❌ READ FAILED (403): Forbidden.');
      console.log('RAW ERROR BODY:', tableRes.body); // DEBUG RAW ERROR
      console.log('   This confirms the Token does not have permission to access this Base.');
    } else if (tableRes.status === 404) {
      console.log('❌ NOT FOUND (404):');
      console.log(`   Detailed Error: ${tableRes.body}`);
      console.log('   👉 Cause: Either Base ID is wrong, or Table Name is wrong.');
    } else {
      console.log(`❌ ERROR: ${tableRes.status} ${tableRes.body}`);
    }

    // TEST 3: Attempt to Write (The Final Exam)
    console.log(`\n--- TEST 3: Writing Record to "${TABLE_NAME}" ---`);
    
    // Construct a simple record
    const postData = JSON.stringify({
      records: [
        {
          fields: {
            'Email': 'test-final@example.com',
            'First Name': 'Test',
            'Last Name': 'Final',
            'Company': 'Test Corp',
            'Country': 'Testland'
            // 'Consent': true  <-- COMMENTED OUT to test if basic write works first
          }
        }
      ]
    });

    const writeReq = https.request({
      hostname: 'api.airtable.com',
      path: `/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ WRITE SUCCESS! 🎉');
          console.log('   The record was created. Your system is 100% READY.');
          console.log('   (You can safely ignore the "Missing Scope" warning if this worked)');
        } else {
          console.log(`❌ WRITE FAILED: Status ${res.statusCode}`);
          console.log('RAW RESPONSE:', data);
          if (res.statusCode === 403) {
             console.log('\n🛑 CONCLUSION: The token definitely lacks "data.records:write".');
             console.log('   Please generate a NEW token and paste it in.');
          }
        }
      });
    });
    
    writeReq.on('error', (e) => console.error('Write request failed', e));
    writeReq.write(postData);
    writeReq.end();

  } catch (err) {
    console.error('❌ NETWORK ERROR (ETIMEDOUT/Connect Error):');
    console.error(err);
    console.log('\n👉 This suggests a firewall, VPN, or internet issue blocking Airtable API.');
  }
}

runDiagnostics();
