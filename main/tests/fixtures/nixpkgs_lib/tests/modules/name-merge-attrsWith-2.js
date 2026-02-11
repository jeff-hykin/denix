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
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
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
                ))),(
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["mergedName"] = nixScope["mkOption"](({"type": nixScope["types"]["attrsWith"](({"placeholder": "other", "elemType": nixScope["types"]["submodule"]({})}))}));
            return obj;
        })()
                )))]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))