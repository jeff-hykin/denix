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
        nixScope["mkOption"] = nixScope["lib"]["mkOption"];
        nixScope["types"] = nixScope["lib"]["types"];
        return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["bare-submodule"] = nixScope["mkOption"](({"type": nixScope["types"]["submoduleWith"](({"shorthandOnlyDefinesConfig": nixScope["config"]["shorthandOnlyDefinesConfig"], "modules": [(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["nested"] = nixScope["mkOption"](({"type": nixScope["types"]["int"], "default": 1n}));
    return obj;
})()]}))}));
    return obj;
})();
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })