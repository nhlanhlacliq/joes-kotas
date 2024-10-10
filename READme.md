# joes-kotas

## TODO

- [ ] **Deploy (Vercel)**: Deploy frontend using Vercel.
- [ ] **Scaffold basic UI with mock data**:
  - Use Vue 3 Composition API and TailwindCSS to design a basic interface for managing food items.
  - Set up state management with Pinia.
    -- [ ] **Set up frontend routing**:
  - Use Vue Router to manage different pages (login, register, dashboard).
- [ ] **Attach frontend to backend API**:
  - Connect frontend to backend API (CRUD operations for food items)

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
