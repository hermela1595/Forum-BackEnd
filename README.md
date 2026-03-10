# Evangadi Forum Backend (Express + MySQL)

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set your values.

3. Start server:

```bash
npm run start
```

For local auto-reload (if you have nodemon installed):

```bash
npm run dev
```

## Required Environment Variables

- `PORT`: Backend server port (example: `4000`)
- `FRONTEND_ORIGINS`: Comma-separated list of allowed frontend domains for CORS
- `DB_HOST`
- `DB_USER`
- `DB_PASS`
- `MYSQL_DB`

## Production CORS Setup

Set `FRONTEND_ORIGINS` to your deployed frontend URL(s), for example:

```env
FRONTEND_ORIGINS=https://your-forum.vercel.app
```

or multiple domains:

```env
FRONTEND_ORIGINS=https://your-forum.vercel.app,https://www.yourdomain.com
```

## Deploy Suggestions

- Deploy frontend (`Forum-FrontEnd`) on Vercel.
- Deploy backend (`Forum-BackEnd`) on Render, Railway, or Fly.io.
- In frontend env (`NEXT_PUBLIC_API_BASE_URL`), set your backend public URL.

## Troubleshooting

### Error: Cannot find module `node:buffer`

Cause: Backend is running on an old Node.js version (commonly Node 10/12).

Fix:

1. Upgrade runtime to Node 18+ (recommended Node 18 or 20).
2. Reinstall dependencies after upgrade:

```bash
rm -rf node_modules package-lock.json
npm install
```

3. Restart server:

```bash
npm start
```

## Fly.io Deployment (Recommended for your choice)

1. Install Fly CLI and authenticate:

```bash
fly auth login
```

2. Update `fly.toml` and change:

`app = "replace-with-unique-evangadi-api"`

to a globally unique name (example: `app = "hermela-evangadi-api"`).

3. Create the app (first time only), from `Forum-BackEnd`:

```bash
fly apps create <your-unique-app-name>
```

4. Set secrets:

```bash
fly secrets set FRONTEND_ORIGINS=https://<your-vercel-domain> DB_HOST=<db-host> DB_USER=<db-user> DB_PASS=<db-password> MYSQL_DB=<db-name>
```

5. Deploy:

```bash
fly deploy
```

6. Verify health endpoint:

```bash
fly status
curl https://<your-unique-app-name>.fly.dev/health
```

7. In Vercel frontend env vars, set:

`NEXT_PUBLIC_API_BASE_URL=https://<your-unique-app-name>.fly.dev`
