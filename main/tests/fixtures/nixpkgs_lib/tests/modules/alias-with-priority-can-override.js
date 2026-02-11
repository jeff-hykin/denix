import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default //
//
//
//
//


// args: {
//    config,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["mkAliasOptionModule"] = nixScope["lib"]["mkAliasOptionModule"];
            nixScope["mkForce"] = nixScope["lib"]["mkForce"];
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["types"] = nixScope["lib"]["types"];
            return ({"options": ({"enable": nixScope["mkOption"](({"type": nixScope["types"]["nullOr"](nixScope["types"]["bool"]), "default": null, "example": true, "description": `
            Some descriptive text
          `})), "warnings": nixScope["mkOption"](({"internal": true, "default": [], "type": nixScope["types"]["listOf"](nixScope["types"]["str"]), "example": ["The `foo' service is deprecated and will go away soon!"], "description": `
            This option allows modules to show warnings to users during
            the evaluation of the system configuration.
          `}))}), "imports": [(nixScope["mkAliasOptionModule"](["enableAlias"])(["enable"])),(
    
    // args: {
    //    config,
    //    lib,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"enableAlias": nixScope["mkForce"](false)})
                ))),(
    
    // args: {
    //    config,
    //    lib,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"enable": true})
                )))]});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))