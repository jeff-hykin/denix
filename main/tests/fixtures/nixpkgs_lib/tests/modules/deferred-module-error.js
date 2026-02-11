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
        nixScope["types"] = nixScope["lib"]["types"];
        nixScope["mkOption"] = nixScope["lib"]["mkOption"];
        nixScope["setDefaultModuleLocation"] = nixScope["lib"]["setDefaultModuleLocation"];
        nixScope["evalModules"] = nixScope["lib"]["evalModules"];
        nixScope["deferredModule"] = nixScope["types"]["deferredModule"];
        nixScope["lazyAttrsOf"] = nixScope["types"]["lazyAttrsOf"];
        nixScope["submodule"] = nixScope["types"]["submodule"];
        nixScope["str"] = nixScope["types"]["str"];
        nixScope["raw"] = nixScope["types"]["raw"];
        nixScope["enum"] = nixScope["types"]["enum"];
        return ({"options": ({"deferred": nixScope["mkOption"](({"type": nixScope["deferredModule"]})), "result": nixScope["mkOption"](({"default": (nixScope["evalModules"](({"modules": [nixScope["config"]["deferred"]]})))["config"]["result"]}))}), "config": ({"deferred": (function(arg){
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
                        return true
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })})});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })