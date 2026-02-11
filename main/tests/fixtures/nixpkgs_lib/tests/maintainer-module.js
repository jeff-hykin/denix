import { createRuntime, createFunc } from "../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["types"] = nixScope["lib"]["types"];
            return ({"options": ({"name": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["str"]})), "email": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["nullOr"](nixScope["types"]["str"]), "default": null})), "matrix": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["nullOr"](nixScope["types"]["str"]), "default": null})), "github": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["nullOr"](nixScope["types"]["str"]), "default": null})), "githubId": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["nullOr"](nixScope["types"]["ints"]["unsigned"]), "default": null})), "keys": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["listOf"]((nixScope["types"]["submodule"]((function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["fingerprint"] = nixScope["lib"]["mkOption"](({"type": nixScope["types"]["str"]}));
        return obj;
    })()))), "default": []}))})});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))