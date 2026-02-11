
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"options": ({"sub": ({"nixos": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "nixos", "modules": [(new Path(["./expose-module-class.nix"], []))]})), "default": {}})), "conditionalImportAsNixos": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "nixos", "modules": [(new Path(["./polymorphic-module.nix"], []))]})), "default": {}})), "conditionalImportAsDarwin": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "darwin", "modules": [(new Path(["./polymorphic-module.nix"], []))]})), "default": {}}))})}), "config": (function(){
        const obj = {};
        obj["nixos"] = nixScope["lib"]["evalModules"](({"class": "nixos", "modules": [(new Path(["./expose-module-class.nix"], []))]}));
        obj["conditionalImportAsNixos"] = nixScope["lib"]["evalModules"](({"class": "nixos", "modules": [(new Path(["./polymorphic-module.nix"], []))]}));
        obj["conditionalImportAsDarwin"] = nixScope["lib"]["evalModules"](({"class": "darwin", "modules": [(new Path(["./polymorphic-module.nix"], []))]}));
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["freeformType"] = nixScope["lib"]["types"]["anything"];
        return obj;
    })()})
            ))