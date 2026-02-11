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
                        return ({"options": ({"enable": nixScope["lib"]["mkOption"](({"default": false, "example": true, "type": nixScope["lib"]["types"]["bool"], "description": `
        Some descriptive text
      `}))})})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })