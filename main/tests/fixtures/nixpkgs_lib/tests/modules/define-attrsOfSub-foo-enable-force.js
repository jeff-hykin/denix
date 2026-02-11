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
    if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
    if (obj["attrsOfSub"]["foo"] === undefined) obj["attrsOfSub"]["foo"] = {};
    obj["attrsOfSub"]["foo"]["enable"] = nixScope["lib"]["mkForce"](false);
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })