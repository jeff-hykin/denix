import { createRuntime } from "../../../../../../../runtime.js"
const runtime = createRuntime()

export default ({"outputs": (function(arg){
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
                        return ({"subflakeOutput": 1n})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })})