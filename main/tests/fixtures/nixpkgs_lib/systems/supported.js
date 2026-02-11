import { createRuntime } from "../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
//
//
(function(arg){
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
    nixScope["tier1"] = ["x86_64-linux"];
    nixScope["tier2"] = ["aarch64-linux","x86_64-darwin"];
    nixScope["tier3"] = ["armv6l-linux","armv7l-linux","i686-linux","mipsel-linux"];
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "hydra", {enumerable: true, get(){return operators.listConcat(nixScope["tier1"], operators.listConcat(nixScope["tier2"], operators.listConcat(nixScope["tier3"], ["aarch64-darwin"])));}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })