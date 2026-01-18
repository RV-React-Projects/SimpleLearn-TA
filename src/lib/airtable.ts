import Airtable from 'airtable';

// Configure Airtable with environment variables
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not defined in environment variables');
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not defined in environment variables');
}

if (!process.env.AIRTABLE_TABLE_NAME) {
  throw new Error('AIRTABLE_TABLE_NAME is not defined in environment variables');
}

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

// Get the base and table
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
export const airtableClient = base(process.env.AIRTABLE_TABLE_NAME);
