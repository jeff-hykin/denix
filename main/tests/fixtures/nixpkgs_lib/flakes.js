import { createRuntime } from "../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

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
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "callLocklessFlake", {enumerable: true, get(){return (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "inputs": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return {}; })(),
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
        Object.defineProperty(nixScope, "self", {enumerable: true, get(){return operators.merge(({"outPath": nixScope["path"]}), ((nixScope["import"]((operators.add(nixScope["path"], "/flake.nix"))))["outputs"]((operators.merge(nixScope["inputs"], ({"self": nixScope["self"]}))))));}});
        return nixScope["self"];
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })