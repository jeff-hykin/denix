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
                        return ({"freeformType": ((_withAttrs)=>{
    const nixScope = {...runtime.scopeStack.slice(-1)[0], ..._withAttrs};
    runtime.scopeStack.push(nixScope);
    try {
        return nixScope["attrsOf"]((nixScope["either"](nixScope["str"])((nixScope["attrsOf"](nixScope["str"])))));
    } finally {
        runtime.scopeStack.pop();
    }
})(nixScope["lib"]["types"])})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })