import { createRuntime } from "../../../runtime.js"
const runtime = createRuntime()

export default ({"description": "Library of low-level helper functions for nix expressions.", "outputs": (function(arg){
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
        Object.defineProperty(nixScope, "lib0", {enumerable: true, get(){return nixScope["import"]((new Path(["./."], [])));}});
        return ({"lib": nixScope["lib0"]["extend"]((nixScope["import"]((new Path(["./flake-version-info.nix"], [])))(nixScope["self"])))});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })})