# msdbox

A lightweight JavaScript interpreter that executes UMD bundles and JavaScript code in secure sandboxed environments, perfect for environments with Content Security Policy (CSP) restrictions that disallow `eval` and `new Function()`.

[![npm version](https://img.shields.io/npm/v/msdbox?style=for-the-badge)](https://www.npmjs.com/package/msdbox)
[![npm downloads](https://img.shields.io/npm/dy/msdbox?style=for-the-badge)](https://www.npmjs.com/package/msdbox)

## Features

- 🚫 **No eval/Function**: Pure JavaScript interpreter implementation
- 🔒 **Safe execution**: Sandboxed environment with timeout support
- 📦 **UMD support**: Execute UMD bundles and retrieve exports
- ⚡ **Lightweight**: Minimal dependencies, tree-shakable exports
- 🔧 **Flexible**: Advanced interpreter API for custom use cases

## Playground

**[Try msdbox online](https://steamedbread2333.github.io/mini-sandbox/playground)**

The playground includes interactive demos for:
- Self-interpreter execution
- Timeout protection
- Sandbox isolation
- Running popular libraries (jQuery, React, Vue, ECharts, Angular.js, Knockout)

## Install

```bash
npm i msdbox
```

## Quick Start

### Basic Usage

```ts
import { executeUmd } from 'msdbox'

const { exported, costMs } = executeUmd<{ hello: string }>(
  'module.exports = { hello: "world" }',
  { timeoutMs: 1000 },
)

console.log(exported.hello, costMs) // "world", <execution-time>
```


## API Reference

### `executeUmd<T>(code, options?)`

Execute UMD script code and return the exported value.

**Parameters:**

- **`code`** (`string`) — UMD script source text
- **`options`** (`object`, optional)
  - **`timeoutMs`** (`number`, default: `8000`) — Execution timeout in milliseconds
  - **`globalVarName`** (`string`, optional) — Fallback global variable name (used only if `module.exports` is empty; reads from `this[globalVarName]`)

**Returns:**

- **`exported`** (`T`) — The exported value from `module.exports` or the fallback global variable
- **`costMs`** (`number`) — Execution time recorded by the interpreter (milliseconds)

**Example:**

```ts
const result = executeUmd(
  `
    var x = 1 + 2;
    module.exports = { sum: x };
  `,
  { timeoutMs: 5000 }
)

console.log(result.exported.sum) // 3
console.log(result.costMs) // <execution-time>
```

## Advanced Usage

### Interpreter API

For lower-level control (e.g., run non-UMD snippets, reuse a single context, or implement custom bootstrap logic), use the underlying interpreter exports.

**Exports:**

```ts
import { Interpreter, evaluate, vm, InterpreterFunction } from 'msdbox'
```

- **`Interpreter`** — The interpreter class (runs code against a provided sandbox/context)
- **`evaluate`** — Convenience wrapper to run code in a context
- **`vm`** — Node-like helpers (`runInContext`, `compileFunction`, etc.)
- **`InterpreterFunction`** — Interpreter-backed `Function` constructor (safer alias to avoid confusion with global `Function`)

### Minimal Example

```ts
import { Interpreter } from 'msdbox'

const sandbox: Record<string, any> = { console }
const interpreter = new Interpreter(sandbox, { timeout: 1000 })

const result = interpreter.evaluate('var x = 1 + 2; x')
console.log(result) // 3
```

### Custom Context Example

```ts
import { Interpreter } from 'msdbox'

const customContext = {
  Math,
  console,
  customVar: 42,
}

const interpreter = new Interpreter(customContext, {
  timeout: 5000,
  ecmaVersion: 5,
})

const result = interpreter.evaluate(`
  var doubled = customVar * 2;
  Math.max(doubled, 10);
`)
console.log(result) // 84
```

## Build

```bash
npm run build
```

Build outputs are written to `dist/` and exposed via `package.json#exports` (both ESM and CJS entrypoints, tree-shakable).

## Development

### Local Testing

```bash
npm pack
npm link
```

### Project Structure

- `src/execute.ts` — UMD execution utilities
- `src/internal/vendor/interpreter/` — Pure JavaScript interpreter implementation
- `dist/` — Compiled output (generated)

## License

MIT
