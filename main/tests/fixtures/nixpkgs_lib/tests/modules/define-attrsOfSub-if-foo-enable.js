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
                        return ({"attrsOfSub": nixScope["lib"]["mkIf"](nixScope["config"]["enable"])((function(){
    const obj = {};
    if (obj["foo"] === undefined) obj["foo"] = {};
    obj["foo"]["enable"] = true;
    return obj;
})())})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })