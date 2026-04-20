Upgrade notes for moving this project to Next.js 16

Steps I prepared and recommended next actions (non-destructive edits were made to code):

1) Code changes made here
  - package.json: bumped Next/react/react-dom/@types to latest and set dev/build to use --webpack flags so existing webpack config stays active.
  - Added proxy.ts implementing Next.js 16 "proxy" export and kept a middleware.ts shim that re-exports it for compatibility.
  - Removed an experimental flag from next.config.mjs and left guidance comments.

2) Run codemods (recommended)
  # dry-run to see changes
  npx @next/codemod@latest upgrade --dry
  # apply upgrade codemod
  npx @next/codemod@latest upgrade latest
  # run specific codemods if you see patterns (examples)
  npx @next/codemod@latest next-async-request-api ./app
  npx @next/codemod@latest next-request-geo-ip ./
  npx @next/codemod@latest remove-unstable-prefix ./
  npx @next/codemod@latest middleware-to-proxy ./

3) Install upgraded deps
  npm install

4) If using TypeScript
  npm install --save-dev @types/react@latest @types/react-dom@latest

5) Build & test
  npm run build
  npm run dev

6) Manual checks to perform
  - Search for sync uses of `cookies()`, `headers()`, `draftMode()` and update to async or use React.use/use hooks as appropriate.
  - Verify any `next/image` imports or `@next/font` imports and apply codemods if present.
  - Review next.config.mjs for deprecated options (eslint config, runtime config fields removed in v16)
  - Update Node.js to >=20.9 when deploying (Next.js 16 minimum)

If you want I can run the codemods and update the codebase further, but I avoided running package installs or mutating many files without your confirmation.
