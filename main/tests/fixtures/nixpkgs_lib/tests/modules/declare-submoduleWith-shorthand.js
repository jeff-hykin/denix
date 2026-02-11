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
        nixScope["sub"] = {};
        nixScope["sub"]["options"]["config"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
        return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["submodule"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"modules": [nixScope["sub"]], "shorthandOnlyDefinesConfig": true})), "default": {}}));
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