##Routing

- Handled within the app folder.

**Reserved Keywords**
- page.tsx: Used for page requests.
- route.ts: Used for API requests.
- layout.tsx: A layout for pages.

- Placing () around a folder name removes it from the path, while still allowing layouts to be used.

## Server V.S. Client Components
- Server: Rendered on server, immediately connects to Database, disallows interactivity, good for SEO, good for initial page load time

- Client: Allows interactivity, just like regular React Component.
- Use `'use client';` to enable