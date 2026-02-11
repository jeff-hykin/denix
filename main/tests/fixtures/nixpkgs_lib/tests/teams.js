import { createRuntime } from "../../../../runtime.js"
const runtime = createRuntime()

export default //
//
//
(function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "pkgs": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return nixScope["import"]((new Path(["../.."], [])))({}); })(),"lib": (()=>{ const nixScope = runtime.scopeStack.slice(-1)[0]; return nixScope["pkgs"]["lib"]; })(),
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
        nixScope["types"] = nixScope["lib"]["types"];
        Object.defineProperty(nixScope, "teamModule", {enumerable: true, get(){return (function(arg){
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
                        return ({"options": ({"shortName": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["str"]})), "scope": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["str"]})), "enableFeatureFreezePing": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["bool"], "default": false})), "members": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["listOf"]((nixScope["types"]["submodule"]((nixScope["import"]((new Path(["./maintainer-module.nix"], [])))(({"lib": nixScope["lib"]})))))), "default": []})), "githubTeams": nixScope["lib"]["mkOption"](({"type": nixScope["types"]["listOf"](nixScope["types"]["str"]), "default": []}))})})
                    } finally {
                        runtime.scopeStack.pop()
                    }
                });}});
        Object.defineProperty(nixScope, "checkTeam", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["team"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["uncheckedAttrs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "prefix", {enumerable: true, get(){return ["lib","maintainer-team",nixScope["team"]];}});
        Object.defineProperty(nixScope, "checkedAttrs", {enumerable: true, get(){return (nixScope["lib"]["modules"]["evalModules"](({"prefix": nixScope["prefix"], "modules": [nixScope["teamModule"],({"_file": nixScope["toString"]((new Path(["../../maintainers/team-list.nix"], []))), "config": nixScope["uncheckedAttrs"]})]})))["config"];}});
        return nixScope["checkedAttrs"];
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "checkedTeams", {enumerable: true, get(){return nixScope["lib"]["mapAttrs"](nixScope["checkTeam"])(nixScope["lib"]["teams"]);}});
        return nixScope["pkgs"]["writeTextDir"]("maintainer-teams.json")((nixScope["builtins"]["toJSON"](nixScope["checkedTeams"])));
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })