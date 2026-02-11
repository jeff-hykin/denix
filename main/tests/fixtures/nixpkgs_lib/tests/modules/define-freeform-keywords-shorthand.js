import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    config,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["class"] = ({"just": "data"});
        obj["a"] = "one";
        obj["b"] = "two";
        obj["meta"] = "meta";
        if (obj["_module"] === undefined) obj["_module"] = {};
        if (obj["_module"]["args"] === undefined) obj["_module"]["args"] = {};
        obj["_module"]["args"]["result"] = (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "r", {enumerable: true, get(){return nixScope["builtins"]["removeAttrs"](nixScope["config"])(["_module"]);}});
            return nixScope["builtins"]["trace"]((nixScope["builtins"]["deepSeq"](nixScope["r"])(nixScope["r"])))((operators.equal(nixScope["r"], ({"a": "one", "b": "two", "class": ({"just": "data"}), "meta": "meta"}))));
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        return obj;
    })()
            ))