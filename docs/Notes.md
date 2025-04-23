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

- Placing [] around a folder name sets it as a dynamic parameter for the route.

## Server V.S. Client Components
- Server: Rendered on server, immediately connects to Database, disallows interactivity, good for SEO, good for initial page load time

- Client: Allows interactivity, just like regular React Component.
- Use `'use client';` to enable

## Auth

- Migrate to NextAuth

## Database

## Rendering

### Short Circuit Statement
- Convert arguments to booleans by prefixing `!!` to avoid rendering the falsy value.

## Light/Dark Mode

- Visit https://mui.com/material-ui/react-switch/?srsltid=AfmBOoqu1mqjqUwcy-JebWijIPAR6dh2cvMsBYiqOKbYaVHRcavzaN22#customization

## Testing

- Visit https://playwright.dev/docs/intro
- Visit https://nextjs.org/docs/app/building-your-application/testing/playwright

## Debugging
- Debug with Chrome
    1. Run the script from package.json: "dev": "next dev",
    2. Enter "localhost:3000" in the browser.
    3. Inspect the page (F12)
    4. Navigate to Sources
    5. Then select Workspace
        6. Add a folder (your src/) if not present.
    7. Add breakpoints, and you should be good.

- Debug with VSCODE:
    - Still working on this one...

## Security

- Sensitive information should NOT be passed to client components (those with "use client").

## Future

- [ ] Migrate to NextAuth (or roll own auth)
- [ ] Switch from zustand to Redux