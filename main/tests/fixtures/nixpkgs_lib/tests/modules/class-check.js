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
                        return ({"options": ({"sub": ({"nixosOk": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "nixos", "modules": [(new Path(["./assert-module-class-is-nixos.nix"], []))]}))})), "nixosFail": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "nixos", "modules": []}))})), "mergeFail": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "nixos", "modules": []})), "default": {}}))})}), "imports": [({"options": ({"sub": ({"mergeFail": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submoduleWith"](({"class": "darwin", "modules": []}))}))})})})], "config": (function(){
    const obj = {};
    obj["ok"] = nixScope["lib"]["evalModules"](({"class": "nixos", "modules": [(new Path(["./module-class-is-nixos.nix"], [])),(new Path(["./assert-module-class-is-nixos.nix"], []))]}));
    obj["fail"] = nixScope["lib"]["evalModules"](({"class": "nixos", "modules": [(new Path(["./module-class-is-nixos.nix"], [])),(new Path(["./module-class-is-darwin.nix"], []))]}));
    obj["fail-anon"] = nixScope["lib"]["evalModules"](({"class": "nixos", "modules": [(new Path(["./module-class-is-nixos.nix"], [])),({"_file": "foo.nix#darwinModules.default", "_class": "darwin", "config": {}, "imports": []})]}));
    if (obj["_module"] === undefined) obj["_module"] = {};
    obj["_module"]["freeformType"] = nixScope["lib"]["types"]["anything"];
    if (obj["sub"] === undefined) obj["sub"] = {};
    obj["sub"]["nixosOk"] = ({"_class": "nixos"});
    if (obj["sub"] === undefined) obj["sub"] = {};
    obj["sub"]["nixosFail"] = ({"imports": [(new Path(["./module-class-is-darwin.nix"], []))]});
    return obj;
})()})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })