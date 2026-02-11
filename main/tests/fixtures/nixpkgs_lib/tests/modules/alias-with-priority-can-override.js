import { createRuntime } from "../../../../../runtime.js"
const runtime = createRuntime()

export default //
//
//
//
//
(function(arg){
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
        nixScope["mkAliasOptionModule"] = nixScope["lib"]["mkAliasOptionModule"];
        nixScope["mkForce"] = nixScope["lib"]["mkForce"];
        nixScope["mkOption"] = nixScope["lib"]["mkOption"];
        nixScope["types"] = nixScope["lib"]["types"];
        return ({"options": ({"enable": nixScope["mkOption"](({"type": nixScope["types"]["nullOr"](nixScope["types"]["bool"]), "default": null, "example": true, "description": `
        Some descriptive text
      `})), "warnings": nixScope["mkOption"](({"internal": true, "default": [], "type": nixScope["types"]["listOf"](nixScope["types"]["str"]), "example": ["The `foo' service is deprecated and will go away soon!"], "description": `
        This option allows modules to show warnings to users during
        the evaluation of the system configuration.
      `}))}), "imports": [(nixScope["mkAliasOptionModule"](["enableAlias"])(["enable"])),((function(arg){
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
                        return ({"enableAlias": nixScope["mkForce"](false)})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })),((function(arg){
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
                        return ({"enable": true})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                }))]});
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })