# joes-kotas

## TODO

- [x] Setup TailwindCSS and color variables
- [x] setup dark mode (manage state w/ pinia)
- [x] Deploy to vercel.
- [x] set up register and login routes and views (w/ vue router)
- [x] basic form validation ~~(or enhance with zod?)~~
- [x] set up user auth state/store w pinia
- [x] setup axios (w/ interceptors) ([docs](https://axios-http.com/docs/interceptors))
- [x] handle errors
- [x] handle network error response on dashboard when token expired
- [x] bonus: fetch current user endpoint
- [ ] bonus: fetch all users
- [x] bonus: update / endpoint on server to redirect to /reference (done in writing)
- [ ] bonus: fetch items only created by current user - create user roles - admin role that fetches all
- [ ] bonus: or add updated by field to inventory item schema
- [x] type schemas for api calls (zod)
- [x] implement register and login with api
- [x] implement inventory fetch and display
- [x] implement inventory add
- [x] implement inventory update
- [x] implement inventory delete
- [x] implement sorting on the table

---

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
