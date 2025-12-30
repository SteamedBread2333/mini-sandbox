export { executeUmd } from './umd'
export type { UmdExecuteOptions } from './umd'

// Re-export interpreter runtime (vendored) for advanced usage.
export { Interpreter, vm, evaluate, Function } from './internal/vendor/interpreter'
export { Function as InterpreterFunction } from './internal/vendor/interpreter'