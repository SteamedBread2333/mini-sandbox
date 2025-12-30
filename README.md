# msdbox

Execute **UMD script source text** in environments that disallow `eval/new Function`, and retrieve `module.exports` (optionally falling back to a global variable name).

## Install

```bash
npm i msdbox
```

## Usage

### Direct import

```ts
import { executeUmd } from 'msdbox'

const { exported, costMs } = executeUmd<{ hello: string }>(
  'module.exports = { hello: \"world\" }',
  { timeoutMs: 1000 },
)

console.log(exported.hello, costMs)
```

### Subpath import (on-demand)

```ts
import { executeUmd } from 'msdbox/umd'
```

## API

### `executeUmd<T>(code, options?)`

- **Parameters**
  - **`code`**: `string` — UMD script source text
  - **`options.timeoutMs`**: `number` — timeout (ms), default `8000`
  - **`options.globalVarName`**: `string` — fallback global variable name (used only if `module.exports` is empty; reads from `this[globalVarName]`)
- **Returns**
  - **`exported`**: `T`
  - **`costMs`**: `number` — execution time recorded by the interpreter

## Build

```bash
npm run build
```

Build outputs are written to `dist/` and exposed via `package.json#exports` (both ESM and CJS entrypoints, tree-shakable).

## Pack & local link

```bash
npm pack
npm link
```

