import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//    moduleType,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["types"] = nixScope["lib"]["types"];
            return (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["variants"] = nixScope["mkOption"](({"type": nixScope["types"]["lazyAttrsOf"](nixScope["moduleType"]), "default": {}}));
        return obj;
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))