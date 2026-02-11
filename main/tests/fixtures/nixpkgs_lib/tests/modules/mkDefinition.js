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
        nixScope["mkDefinition"] = nixScope["lib"]["mkDefinition"];
        nixScope["mkOptionDefault"] = nixScope["lib"]["mkOptionDefault"];
        return ({"imports": [(function(){
    const obj = {};
    obj["_file"] = "file";
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["conflict"] = nixScope["mkOption"](({"default": 1n}));
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["conflict"] = nixScope["mkDefinition"](({"file": "other", "value": nixScope["mkOptionDefault"](42n)}));
    return obj;
})(),(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["viaConfig"] = nixScope["mkOption"]({});
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["viaConfig"] = nixScope["mkDefinition"](({"file": "other", "value": true}));
    return obj;
})(),(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["mkMerge"] = nixScope["mkOption"](({"type": nixScope["lib"]["types"]["bool"]}));
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["mkMerge"] = nixScope["lib"]["mkMerge"]([(nixScope["mkDefinition"](({"file": "a.nix", "value": true}))),(nixScope["mkDefinition"](({"file": "b.nix", "value": true})))]);
    return obj;
})(),(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["mkForce"] = nixScope["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": false}));
    if (obj["config"] === undefined) obj["config"] = {};
    obj["config"]["mkForce"] = nixScope["mkDefinition"](({"file": "other", "value": nixScope["lib"]["mkForce"](true)}));
    return obj;
})(),(function(){
    const obj = {};
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["viaOptionDefault"] = nixScope["mkOption"](({"type": nixScope["lib"]["types"]["bool"], "default": nixScope["mkDefinition"](({"file": "other", "value": true}))}));
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