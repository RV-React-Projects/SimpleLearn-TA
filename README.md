# Landing Page Project

A high-fidelity landing page built with Next.js 16, shadcn/ui, Server Components, Server Actions, and Airtable integration.

## Tech Stack

- **Framework**: Next.js 16.1.3 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui v3.7.0
- **Form Handling**: react-hook-form + Zod validation
- **Backend**: Airtable (for RSVP submissions)
- **Backend**: Airtable (for RSVP submissions)
- **Language**: TypeScript

## Prerequisites

- **Node.js**: v18.17.0 or newer
- **Yarn**: v1.22.0 or newer (npm is NOT supported)

## Project Structure

```
app/
├── actions/           # Server Actions (form submissions)
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── landing/      # Landing page specific components
│   └── shared/       # Reusable components
├── lib/              # Utilities and configs
│   ├── airtable.ts   # Airtable client
│   ├── validations.ts # Zod schemas
│   └── utils.ts      # shadcn utilities
├── layout.tsx
└── page.tsx          # Main landing page
```

## Getting Started

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall, use **Yarn** (npm will not work):

```bash
yarn install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your Airtable credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your Airtable credentials:

```
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=RSVP
```

#### Getting Airtable Credentials:

1. **API Key**: Visit https://airtable.com/create/tokens and create a Personal Access Token
2. **Base ID**: Found in your Airtable base URL: `https://airtable.com/YOUR_BASE_ID/...`
3. **Table Name**: The name of the table where RSVP data will be stored (default: `RSVP`)

### 3. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Available components: button, input, form, card, badge, etc.

### Server Components vs Client Components

- **Server Components** (default): Use for static content, SEO, data fetching
- **Client Components** (`'use client'`): Use for interactivity, forms, event handlers

### Server Actions

Located in `app/actions/`. These run on the server and are used for:
- Form submissions
- Database operations
- API calls with secret keys

## Architecture Highlights

- **Clean Component Structure**: All components are modular and organized by feature
- **Type Safety**: Full TypeScript support with Zod validation
- **Performance**: Server Components for zero-JS initial load
- **Security**: API keys stay on server via Server Actions
- **Responsive**: Mobile-first design with Tailwind CSS

## Building for Production

```bash
yarn build
yarn start
```

## Next Steps

2. Implement landing page sections
3. Build RSVP form with Server Actions
4. Test and optimize performance

## 📚 Setup Guide
For detailed set up instructions, specifically for **Airtable**, please refer to [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## 🐛 Troubleshooting
### Changes not reflecting?
If you don't see changes immediately:
- **Hard Reload**: Press `Cmd+Shift+R` to clear browser cache.
- **Restart Server**: If you edit config files (tailwind, next.config), restart `yarn dev`.
- **Hot Reloading**: Next.js automatically updates on save. If it stops, check terminal for errors.
