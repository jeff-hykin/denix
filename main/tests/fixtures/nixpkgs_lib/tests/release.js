import { createRuntime } from "../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "system": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return nixScope["builtins"]["currentSystem"]; })(),"pkgs": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return operators.merge(nixScope["import"]((new Path(["../.."], [])))(({"system": nixScope["system"], "config": ({"permittedInsecurePackages": ["nix-2.3.18"]})})), ({"lib": nixScope["throw"]("pkgs.lib accessed, but the lib tests should use nixpkgs' lib path directly!")})); })(),"pkgsBB": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return nixScope["pkgs"]["pkgsBuildBuild"]; })(),"nix": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return nixScope["pkgs-nixVersions"]["stable"]; })(),"nixVersions": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return [nixScope["pkgs-nixVersions"]["minimum"],nixScope["nix"],nixScope["pkgs-nixVersions"]["latest"]]; })(),"pkgs-nixVersions": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return nixScope["import"]((new Path(["./nix-for-tests.nix"], [])))(({"pkgs": nixScope["pkgsBB"]})); })(),
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
        Object.defineProperty(nixScope, "lib", {enumerable: true, get(){return nixScope["import"]((new Path(["../."], [])));}});
        Object.defineProperty(nixScope, "testWithNix", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["nix"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["import"]((new Path(["./test-with-nix.nix"], [])))(({"lib": nixScope["lib"], "nix": nixScope["nix"], "pkgs": nixScope["pkgsBB"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return nixScope["pkgsBB"]["symlinkJoin"](({"name": "nixpkgs-lib-tests", "paths": operators.listConcat(nixScope["map"](nixScope["testWithNix"])(nixScope["nixVersions"]), [(nixScope["import"]((new Path(["./maintainers.nix"], [])))(({"pkgs": nixScope["pkgs"], "lib": nixScope["import"]((new Path(["../."], [])))}))),(nixScope["import"]((new Path(["./teams.nix"], [])))(({"pkgs": nixScope["pkgs"], "lib": nixScope["import"]((new Path(["../."], [])))})))])}));
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })