export { executeUmd } from './execute'
export type { UmdExecuteOptions } from './execute'

// Re-export interpreter runtime (vendored) for advanced usage.
export { Interpreter, vm, evaluate, Function } from './internal/vendor/interpreter'
export { Function as InterpreterFunction } from './internal/vendor/interpreter'