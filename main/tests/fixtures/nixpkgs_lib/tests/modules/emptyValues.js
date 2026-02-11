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
        return ({"options": ({"int": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"](nixScope["types"]["int"])})), "list": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"]((nixScope["types"]["listOf"](nixScope["types"]["int"])))})), "nonEmptyList": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"]((nixScope["types"]["nonEmptyListOf"](nixScope["types"]["int"])))})), "attrs": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"]((nixScope["types"]["attrsOf"](nixScope["types"]["int"])))})), "null": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"]((nixScope["types"]["nullOr"](nixScope["types"]["int"])))})), "submodule": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"]((nixScope["types"]["submodule"]({})))}))}), "config": (function(){
    const obj = {};
    if (obj["int"] === undefined) obj["int"] = {};
    obj["int"]["a"] = nixScope["lib"]["mkIf"](false)(null);
    if (obj["list"] === undefined) obj["list"] = {};
    obj["list"]["a"] = nixScope["lib"]["mkIf"](false)(null);
    if (obj["nonEmptyList"] === undefined) obj["nonEmptyList"] = {};
    obj["nonEmptyList"]["a"] = nixScope["lib"]["mkIf"](false)(null);
    if (obj["attrs"] === undefined) obj["attrs"] = {};
    obj["attrs"]["a"] = nixScope["lib"]["mkIf"](false)(null);
    if (obj["null"] === undefined) obj["null"] = {};
    obj["null"]["a"] = nixScope["lib"]["mkIf"](false)(null);
    if (obj["submodule"] === undefined) obj["submodule"] = {};
    obj["submodule"]["a"] = nixScope["lib"]["mkIf"](false)(null);
    return obj;
})()});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })