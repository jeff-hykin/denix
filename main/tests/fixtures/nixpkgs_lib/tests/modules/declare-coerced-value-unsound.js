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
                        return ({"options": ({"value": nixScope["lib"]["mkOption"](({"default": "12", "type": nixScope["lib"]["types"]["coercedTo"](nixScope["lib"]["types"]["str"])(nixScope["lib"]["toInt"])(nixScope["lib"]["types"]["ints"]["s8"])}))})})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })