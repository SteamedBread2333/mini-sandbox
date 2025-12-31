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

## Advanced: Interpreter API

If you need lower-level control (e.g. run non-UMD snippets, reuse a single context, or implement your own bootstrap), you can use the underlying interpreter exports.

### Exports

```ts
import { Interpreter, evaluate, vm, InterpreterFunction } from 'msdbox'
```

- **`Interpreter`**: the interpreter class (runs code against a provided sandbox/context)
- **`evaluate`**: convenience wrapper to run code in a context
- **`vm`**: Node-like helpers (`runInContext`, `compileFunction`, etc.)
- **`InterpreterFunction`**: interpreter-backed `Function` constructor (exported as a safer alias to avoid confusion with the global `Function`)

### Minimal example

```ts
import { Interpreter } from 'msdbox'

const sandbox: Record<string, any> = { console }
const interpreter = new Interpreter(sandbox, { timeout: 1000 })

const result = interpreter.evaluate('var x = 1 + 2; x')
console.log(result) // 3
```

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

