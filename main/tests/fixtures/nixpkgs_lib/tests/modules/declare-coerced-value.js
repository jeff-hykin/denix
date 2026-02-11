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
                        return ({"options": ({"value": nixScope["lib"]["mkOption"](({"default": 42n, "type": nixScope["lib"]["types"]["coercedTo"](nixScope["lib"]["types"]["int"])(nixScope["builtins"]["toString"])(nixScope["lib"]["types"]["str"])}))})})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })