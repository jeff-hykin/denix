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
                        return ({"options": ({"sub": ({"nixos": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "nixos", "modules": [(new Path(["./expose-module-class.nix"], []))]})), "default": {}})), "conditionalImportAsNixos": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "nixos", "modules": [(new Path(["./polymorphic-module.nix"], []))]})), "default": {}})), "conditionalImportAsDarwin": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "darwin", "modules": [(new Path(["./polymorphic-module.nix"], []))]})), "default": {}}))})}), "config": (function(){
    const obj = {};
    obj["nixos"] = nixScope["lib"]["evalModules"](({"class": "nixos", "modules": [(new Path(["./expose-module-class.nix"], []))]}));
    obj["conditionalImportAsNixos"] = nixScope["lib"]["evalModules"](({"class": "nixos", "modules": [(new Path(["./polymorphic-module.nix"], []))]}));
    obj["conditionalImportAsDarwin"] = nixScope["lib"]["evalModules"](({"class": "darwin", "modules": [(new Path(["./polymorphic-module.nix"], []))]}));
    if (obj["_module"] === undefined) obj["_module"] = {};
    obj["_module"]["freeformType"] = nixScope["lib"]["types"]["anything"];
    return obj;
})()})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })