import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return ({"imports": operators.listConcat([], nixScope["lib"]["optional"](nixScope["custom"])((new Path(["./define-enable-force.nix"], []))))})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })