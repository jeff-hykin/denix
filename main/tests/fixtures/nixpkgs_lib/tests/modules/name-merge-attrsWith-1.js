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
                        return (function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["mergedName"] = nixScope["mkOption"](({"default": {}, "type": nixScope["types"]["attrsWith"](({"placeholder": "id", "elemType": nixScope["types"]["submodule"]((function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["nested"] = nixScope["mkOption"](({"type": nixScope["types"]["int"], "default": 1n}));
    return obj;
})())}))}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })),((function(arg){
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
    obj["options"]["mergedName"] = nixScope["mkOption"](({"type": nixScope["types"]["attrsOf"]((nixScope["types"]["submodule"]({})))}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })),((function(arg){
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
    obj["options"]["result"] = nixScope["mkOption"](({"default": nixScope["lib"]["concatStringsSep"](".")((nixScope["options"]["mergedName"]["type"]["getSubOptions"](nixScope["options"]["mergedName"]["loc"]))["nested"]["loc"])}));
    return obj;
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                }))]});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })