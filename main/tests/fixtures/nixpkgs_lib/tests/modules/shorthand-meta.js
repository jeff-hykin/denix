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
        return ({"imports": [((function(arg){
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
                        return ({"options": (function(){
    const obj = {};
    obj["result"] = nixScope["mkOption"](({"default": nixScope["lib"]["concatStringsSep"](" ")(nixScope["config"]["meta"]["foo"])}));
    if (obj["meta"] === undefined) obj["meta"] = {};
    obj["meta"]["foo"] = nixScope["mkOption"](({"type": nixScope["types"]["listOf"](nixScope["types"]["str"])}));
    return obj;
})()})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })),(function(){
    const obj = {};
    if (obj["meta"] === undefined) obj["meta"] = {};
    obj["meta"]["foo"] = ["one","two"];
    return obj;
})()]});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })