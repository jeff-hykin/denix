import { createRuntime } from "../../../../runtime.js"
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
        nixScope["_ipv6"] = nixScope["import"]((new Path(["./internal.nix"], [])))(({"lib": nixScope["lib"]}))["_ipv6"];
        return ({"ipv6": ({"fromString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["addr"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "splittedAddr", {enumerable: true, get(){return nixScope["_ipv6"]["split"](nixScope["addr"]);}});
        Object.defineProperty(nixScope, "addrInternal", {enumerable: true, get(){return nixScope["splittedAddr"]["address"];}});
        Object.defineProperty(nixScope, "prefixLength", {enumerable: true, get(){return nixScope["splittedAddr"]["prefixLength"];}});
        Object.defineProperty(nixScope, "address", {enumerable: true, get(){return nixScope["_ipv6"]["toStringFromExpandedIp"](nixScope["addrInternal"]);}});
        return ({"address": nixScope["address"], "prefixLength": nixScope["prefixLength"]});
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })