import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    config,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["types"] = nixScope["lib"]["types"];
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["setDefaultModuleLocation"] = nixScope["lib"]["setDefaultModuleLocation"];
            nixScope["evalModules"] = nixScope["lib"]["evalModules"];
            nixScope["deferredModule"] = nixScope["types"]["deferredModule"];
            nixScope["lazyAttrsOf"] = nixScope["types"]["lazyAttrsOf"];
            nixScope["submodule"] = nixScope["types"]["submodule"];
            nixScope["str"] = nixScope["types"]["str"];
            nixScope["raw"] = nixScope["types"]["raw"];
            nixScope["enum"] = nixScope["types"]["enum"];
            return ({"options": ({"deferred": nixScope["mkOption"](({"type": nixScope["deferredModule"]})), "result": nixScope["mkOption"](({"default": (nixScope["evalModules"](({"modules": [nixScope["config"]["deferred"]]})))["config"]["result"]}))}), "config": ({"deferred": 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    true
                ))})});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))