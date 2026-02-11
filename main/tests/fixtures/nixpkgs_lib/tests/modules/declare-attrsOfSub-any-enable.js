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
                        return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "submod", {enumerable: true, get(){return (function(arg){
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
                });}});
        return ({"options": ({"attrsOfSub": nixScope["lib"]["mkOption"](({"default": {}, "example": {}, "type": nixScope["lib"]["types"]["attrsOf"]((nixScope["lib"]["types"]["submodule"]([nixScope["submod"]]))), "description": `
        Some descriptive text
      `}))})});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })