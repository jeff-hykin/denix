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
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["set"] = nixScope["lib"]["mkOption"](({"default": {}, "example": ({"a": 1n}), "type": nixScope["lib"]["types"]["attrsOf"](nixScope["lib"]["types"]["int"]), "description": `
      Some descriptive text
    `}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })