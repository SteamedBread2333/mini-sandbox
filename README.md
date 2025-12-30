# mini-sandbox

在禁用 `eval/new Function` 的环境里执行 **UMD 脚本文本**，并拿到其 `module.exports`（或可选从全局变量名兜底取回导出）。

## 安装

```bash
npm i mini-sandbox
```

## 使用

### 直接导入

```ts
import { executeUmd } from 'mini-sandbox'

const { exported, costMs } = executeUmd<{ hello: string }>(
  'module.exports = { hello: \"world\" }',
  { timeoutMs: 1000 },
)

console.log(exported.hello, costMs)
```

### 按需导入（子路径）

```ts
import { executeUmd } from 'mini-sandbox/umd'
```

## API

### `executeUmd<T>(code, options?)`

- **参数**
  - **`code`**: `string`，UMD 脚本文本
  - **`options.timeoutMs`**: `number`，超时时间（ms），默认 `8000`
  - **`options.globalVarName`**: `string`，兜底用的全局变量名（当 `module.exports` 为空时尝试从 `this[globalVarName]` 获取）
- **返回**
  - **`exported`**: `T`
  - **`costMs`**: `number`（解释器内部统计的执行耗时）

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`，并通过 `package.json#exports` 提供可 tree-shake 的 ESM/CJS 双格式入口。

## 打包与本地链接

```bash
npm pack
npm link
```

