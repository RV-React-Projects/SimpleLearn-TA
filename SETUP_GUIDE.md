# Project Setup & Developer Guide 🛠️

This guide covers how to set up, configure, and manage the Simplilearn Landing Page project.

## 1. Prerequisites
- **Node.js**: v18.17.0 or newer (Required)
- **Yarn**: v1.22.0 or newer (Required - npm is NOT supported)
- **Airtable Account**: For RSVP form data storage

## 2. Installation
Clone the repository and install dependencies:
```bash
yarn install
```

## 3. Environment Configuration (Airtable)
This project uses **Airtable** to store RSVP form submissions. You need to configure the API keys.

1.  **Create `.env.local`**:
    Duplicate the example file:
    ```bash
    cp .env.local.example .env.local
    ```

2.  **Get Airtable Credentials**:
    - **API Key (Token)**: Go to [Airtable Developer Hub](https://airtable.com/create/tokens) -> Create new token -> Give scope `data.records:write` -> Add your base.
    - **Base ID**: Open your Airtable Base -> Look at URL: `https://airtable.com/appXXXXXXXX/tbl...` -> The `app...` part is your Base ID.
    - **Table Name**: The name of the table (tab) in your base (e.g., "RSVPS").

3.  **Update `.env.local`**:
    Open `.env.local` and paste your values:
    ```env
    AIRTABLE_API_KEY=patXXXXXXXXXXXXXX...
    AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
    AIRTABLE_TABLE_NAME=RSVPS
    ```

## 4. Development
Start the local development server:
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

## 5. Building for Production
To create an optimized production build:
```bash
yarn build
```
To start the production server:
```bash
yarn start
```

## 6. Project Structure
- `app/`: Next.js App Router pages and layouts.
- `src/components/`: React components (Hero, Speakers, etc.).
- `src/lib/`: Utilities and validation logic.
- `public/`: Static assets (images, fonts).

## 7. Troubleshooting
- **Lint Errors**: Run `yarn lint` to check for syntax issues.
- **Image Issues**: Ensure images are in `public/images/` and referenced as `/images/filename.jpg`.

## 8. Common Errors & Fixes (Airtable)

### ❌ Error: `NOT_AUTHORIZED` (403)
**MEANING**: "Permission Denied". **Your data was NOT saved.** The door is locked.
**Cause**: The API Token does not have the `data.records:write` permission.
**Fix**:
1.  Go to [Airtable Tokens](https://airtable.com/create/tokens).
2.  **Create a NEW Token** (Easiest way to be sure).
3.  **Name**: "RSVP Fix".
4.  **Scopes (CRITICAL)**: You **MUST** check the box for **`data.records:write`**.
    *   *Also check `schema.bases:read` just in case.*
5.  **Access**: Select "All workspaces" to ensure it sees your Base.
6.  **Copy the new `pat...` string** and paste it into `.env.local` as `AIRTABLE_API_KEY`.
7.  **Restart Server**: `yarn dev` (or else it remembers the old key!).

### ❌ Error: `NOT_FOUND` (404)
**Cause**: Base ID or Table Name is wrong.
**Fix**:
1.  Check `AIRTABLE_BASE_ID` in `.env.local` (starts with `app...`).

### ❌ Error: `Failed to find Server Action` (404)
**Cause**: The browser is holding an old version of the page, but the server code has changed (usually after a restart or edit).
**Fix**:
1.  **Refresh the page** (Cmd+R). This syncs the browser with the new server code.
