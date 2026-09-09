<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Temporary dashboard API

`GET /api/dashboard?role=parent|kid&identifier=...` returns fake parent/child dashboard data for the current frontend demo. The dashboard page loads this endpoint after login. Replace this route with authenticated backend data when parent/child accounts and device-status APIs are implemented.

Temporary parent/child API routes:

- `POST /api/parent/login` — `{ email, password }` → signed token and parent profile.
- `POST /api/child/login` — `{ identifier, password }` where identifier is email or username → signed token and child profile.
- `GET /api/parent/childs?email=...` with `Authorization: Bearer <parent-token>` → owned children, calculated `isPremium`, `total`, and `activeCount`.
- `GET /api/child?identifier=...` with a parent bearer token → a child belonging to that parent, with calculated `isPremium`.

Demo accounts are `parent@safetly.test` / `parent123` for a parent and `ayan-01` / `kid123` for a child. Passwords use scrypt hashes in the demo data. Replace the in-memory records with a database before production use.
