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
                        return ({"options": ({"processedToplevel": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["raw"]})), "unprocessedNesting": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["raw"]})), "multiple": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["raw"]})), "priorities": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["raw"]})), "unprocessedNestingEvaluates": nixScope["lib"]["mkOption"](({"default": nixScope["builtins"]["tryEval"](nixScope["config"]["unprocessedNesting"])}))}), "config": (function(){
    const obj = {};
    obj["processedToplevel"] = nixScope["lib"]["mkIf"](true)(10n);
    obj["multiple"] = nixScope["lib"]["mkMerge"](["foo","foo"]);
    obj["priorities"] = nixScope["lib"]["mkMerge"](["foo",(nixScope["lib"]["mkForce"]("bar"))]);
    if (obj["unprocessedNesting"] === undefined) obj["unprocessedNesting"] = {};
    obj["unprocessedNesting"]["foo"] = nixScope["throw"]("foo");
    return obj;
})()})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })