import { createRuntime } from "../../../../../../runtime.js"
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
                        return (function(){
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "x", {enumerable: true, get(){return (nixScope["callLocklessFlake"](({"path": nixScope["subflake"], "inputs": {}})))["subflakeOutput"];}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })})