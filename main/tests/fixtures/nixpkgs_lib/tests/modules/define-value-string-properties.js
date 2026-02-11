import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()

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
                        return ({"imports": [({"value": nixScope["lib"]["mkDefault"]("def")})], "value": nixScope["lib"]["mkMerge"]([(nixScope["lib"]["mkIf"](false)("nope")),"yes"])})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })