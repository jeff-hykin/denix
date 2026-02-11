import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
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
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            return ({"imports": [(
    
    // args: {
    //    config,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"options": (function(){
            const obj = {};
            obj["result"] = nixScope["mkOption"](({"default": nixScope["lib"]["concatStringsSep"](" ")(nixScope["config"]["meta"]["foo"])}));
            if (obj["meta"] === undefined) obj["meta"] = {};
            obj["meta"]["foo"] = nixScope["mkOption"](({"type": nixScope["types"]["listOf"](nixScope["types"]["str"])}));
            return obj;
        })()})
                ))),(function(){
        const obj = {};
        if (obj["meta"] === undefined) obj["meta"] = {};
        obj["meta"]["foo"] = ["one","two"];
        return obj;
    })()]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))