import { Interpreter, Function as InterpreterFunction } from './internal/vendor/interpreter/index'

export type UmdExecuteOptions = {
  /** Execution timeout (ms). Default: 8000 */
  timeoutMs?: number
  /**
   * Some UMD bundles may also attach exports to a global name (e.g. "_").
   * Fallback only: if `module.exports` is empty, we will try this name.
   */
  globalVarName?: string
}

function sanitizeForInterpreter(code: string): string {
  return code.replace(/(^|[\n;])\s*(['"])use strict\2\s*;?/g, '$1')
}

function buildRootContext(): Record<string, any> {
  const g: any = globalThis as any
  return {
    Object: g.Object,
    Array: g.Array,
    Function: InterpreterFunction,
    Number: g.Number,
    String: g.String,
    Boolean: g.Boolean,
    Math: g.Math,
    Date: g.Date,
    RegExp: g.RegExp,
    Error: g.Error,
    TypeError: g.TypeError,
    JSON: g.JSON,
    parseInt: g.parseInt,
    parseFloat: g.parseFloat,
    isNaN: g.isNaN,
    isFinite: g.isFinite,
    encodeURI: g.encodeURI,
    decodeURI: g.decodeURI,
    encodeURIComponent: g.encodeURIComponent,
    decodeURIComponent: g.decodeURIComponent,
  }
}

export function executeUmd<T = unknown>(
  code: string,
  options: UmdExecuteOptions = {},
): { exported: T; costMs: number } {
  const timeoutMs = (options.timeoutMs !== undefined && options.timeoutMs !== null) ? options.timeoutMs : 8000
  const globalVarName = options.globalVarName

  const rootContext = buildRootContext()
  const sandbox: Record<string, any> = Object.assign({}, rootContext, {
    console: (globalThis as any).console,
  })

  const interpreter = new Interpreter(sandbox, {
    timeout: timeoutMs,
    rootContext,
    globalContextInFunction: sandbox,
  })

  const sanitized = sanitizeForInterpreter(code)

  const bootstrap = `
    var globalThis = this;
    var self = this;
    var window = this;
    var global = this;
    var define = undefined;
    var module = { exports: {} };
    var exports = module.exports;
    function require(name) { throw new Error('Remote UMD require(\"' + name + '\") is not supported'); }
    ${sanitized}
    ;(function(){
      var ex = module.exports;
      if (ex && (typeof ex === 'object' || typeof ex === 'function')) return ex;
      ${globalVarName ? `return this[${JSON.stringify(globalVarName)}];` : 'return ex;'}
    }).call(this);
  `

  const exported = interpreter.evaluate(bootstrap) as T
  return { exported, costMs: interpreter.getExecutionTime() }
}
