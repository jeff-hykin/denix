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
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["types"] = nixScope["lib"]["types"];
            Object.defineProperty(nixScope, "moduleWithKey", {enumerable: true, get(){return 
    
    // args: {
    //    config,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"config": ({"enable": true})})
                ));}});
            return ({"imports": [(new Path(["./declare-enable.nix"], []))], "disabledModules": [{}]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))