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
    obj["imports"] = [(function(){
    const obj = {};
    obj["_file"] = "the-file.nix";
    if (obj["submodule"] === undefined) obj["submodule"] = {};
    obj["submodule"]["value"] = 10n;
    return obj;
})()];
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["submodule"] = nixScope["lib"]["mkOption"](({"default": {}, "type": nixScope["lib"]["types"]["submoduleWith"](({"modules": [((function(arg){
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
    obj["options"]["value"] = nixScope["lib"]["mkOption"]({});
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["internalFiles"] = nixScope["lib"]["mkOption"](({"default": nixScope["options"]["value"]["files"]}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                }))]}))}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })