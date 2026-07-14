# Deployment — Netlify + GitHub

This app (مصرف النوران / Al-Nouran Bank customer service platform) is a
TanStack Start application. It ships with a `netlify.toml` that targets
Netlify's Nitro preset, so a GitHub → Netlify connection deploys with
zero manual configuration.

## 1. One-time setup

1. Push this repository to GitHub.
2. In Netlify, **Add new site → Import an existing project** and select
   the GitHub repo.
 3. Netlify will read `netlify.toml` automatically. You should see:
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`
    - **Node version:** `20`
    - **NITRO_PRESET:** `netlify`
4. Click **Deploy**.

## 2. Environment variables

Local:

```bash
cp .env.example .env
# edit .env
```

Netlify: **Site settings → Environment variables → Add a variable**
for every key in `.env.example` you actually use. Variables prefixed
with `VITE_` are exposed to the browser bundle — never put secrets
there. All other variables stay server-side and are readable inside
server functions / SSR handlers via `process.env`.

## 3. Routing

- SSR routes are handled by the Nitro-generated Netlify function.
- The SPA fallback in `netlify.toml` (`/* → /index.html 200`) ensures
  client-side navigation to unknown deep links resolves to the app
  shell instead of a 404.

## 4. Custom domain

**Netlify → Domain management → Add a domain** (e.g. `app.alnouran.ly`),
then update the `VITE_APP_URL` environment variable to match.

## 5. Local production check

```bash
npm install
npm run build
npm run preview
```

If the build succeeds locally it will succeed on Netlify — the
environment (Node 20, Bun, Nitro netlify preset) is identical.

## 5b. Zero-config drag-and-drop deploy (Netlify Drop)

**Netlify Drop is not supported for this project.** This app is a
TanStack Start SSR application: the build emits a server handler
(`dist/server/index.mjs`) that Netlify Drop cannot execute, and there
is no static `index.html` fallback because every route is rendered on
the server. Dragging a zip of `dist/` onto Netlify Drop results in
404s for every route.

Use the Git → Netlify flow in the sections above instead — it is
truly one-click: Netlify reads `netlify.toml`, runs the build with
`NITRO_PRESET=netlify`, and wires the SSR handler up automatically.

## 6. Troubleshooting

| Symptom                                | Fix                                                        |
| -------------------------------------- | ---------------------------------------------------------- |
| Build fails with "cloudflare"          | Confirm `NITRO_PRESET=netlify` is set (in netlify.toml).   |
| Deep link returns 404 on refresh       | Confirm the `/*  → /index.html` redirect is present.       |
| `process.env.X` is undefined at runtime| Read it **inside** the server function handler, not at module scope. |
| Env var missing in browser             | Prefix it with `VITE_` and redeploy.                       |
