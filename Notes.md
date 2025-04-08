# Notes

## Routing

- Handled within the app folder.

- Pages must be the default export.
- Components may be named exports.

**Reserved Keywords**
- page.tsx: Used for page requests.
- route.ts: Used for API requests.
- layout.tsx: A layout for pages.

- `_<name_here>` folders are not included in the router system 

- Placing () around a folder name removes it from the path, while still allowing layouts to be used.

## Server V.S. Client Components
- Server: Rendered on server, immediately connects to Database, disallows interactivity, good for SEO, good for initial page load time

- Client: Allows interactivity, just like regular React Component.
- Use `'use client';` to enable

## Auth

- Migrate to NextAuth

## Database

