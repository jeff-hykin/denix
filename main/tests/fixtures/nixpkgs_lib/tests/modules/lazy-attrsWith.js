import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default //
(function(arg){
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
        Object.defineProperty(nixScope, "lazyAttrsOf", {enumerable: true, get(){return nixScope["mkOption"](({"type": nixScope["types"]["attrsWith"](({"lazy": true, "elemType": nixScope["types"]["int"]}))}));}});
        Object.defineProperty(nixScope, "attrsOf", {enumerable: true, get(){return nixScope["mkOption"](({"type": nixScope["types"]["attrsWith"](({"elemType": nixScope["types"]["int"]}))}));}});
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
    obj["options"]["mergedLazyLazy"] = nixScope["lazyAttrsOf"];
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["mergedLazyNonLazy"] = nixScope["lazyAttrsOf"];
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["mergedNonLazyNonLazy"] = nixScope["attrsOf"];
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
    obj["options"]["mergedLazyLazy"] = nixScope["lazyAttrsOf"];
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["mergedLazyNonLazy"] = nixScope["attrsOf"];
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["mergedNonLazyNonLazy"] = nixScope["attrsOf"];
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
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["mergedLazyLazy"] === undefined) obj["config"]["mergedLazyLazy"] = {};
    obj["config"]["mergedLazyLazy"]["bar"] = operators.add(nixScope["config"]["mergedLazyLazy"]["baz"], 1n);
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["mergedLazyLazy"] === undefined) obj["config"]["mergedLazyLazy"] = {};
    obj["config"]["mergedLazyLazy"]["baz"] = 10n;
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["lazyResult"] = nixScope["mkOption"](({"default": nixScope["config"]["mergedLazyLazy"]["bar"]}));
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["mergedNonLazyNonLazy"] === undefined) obj["config"]["mergedNonLazyNonLazy"] = {};
    obj["config"]["mergedNonLazyNonLazy"]["bar"] = operators.add(nixScope["config"]["mergedNonLazyNonLazy"]["baz"], 1n);
    if (obj["config"] === undefined) obj["config"] = {};
    if (obj["config"]["mergedNonLazyNonLazy"] === undefined) obj["config"]["mergedNonLazyNonLazy"] = {};
    obj["config"]["mergedNonLazyNonLazy"]["baz"] = 10n;
    if (obj["options"] === undefined) obj["options"] = {};
    obj["options"]["nonLazyResult"] = nixScope["mkOption"](({"default": nixScope["config"]["mergedNonLazyNonLazy"]["bar"]}));
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