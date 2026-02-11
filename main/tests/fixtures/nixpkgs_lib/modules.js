import { createRuntime, createFunc } from "../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["addErrorContext"] = nixScope["lib"]["addErrorContext"];
            nixScope["all"] = nixScope["lib"]["all"];
            nixScope["any"] = nixScope["lib"]["any"];
            nixScope["attrByPath"] = nixScope["lib"]["attrByPath"];
            nixScope["attrNames"] = nixScope["lib"]["attrNames"];
            nixScope["catAttrs"] = nixScope["lib"]["catAttrs"];
            nixScope["concatLists"] = nixScope["lib"]["concatLists"];
            nixScope["concatMap"] = nixScope["lib"]["concatMap"];
            nixScope["concatStringsSep"] = nixScope["lib"]["concatStringsSep"];
            nixScope["elem"] = nixScope["lib"]["elem"];
            nixScope["filter"] = nixScope["lib"]["filter"];
            nixScope["foldl'"] = nixScope["lib"]["foldl'"];
            nixScope["functionArgs"] = nixScope["lib"]["functionArgs"];
            nixScope["getAttrFromPath"] = nixScope["lib"]["getAttrFromPath"];
            nixScope["genericClosure"] = nixScope["lib"]["genericClosure"];
            nixScope["head"] = nixScope["lib"]["head"];
            nixScope["id"] = nixScope["lib"]["id"];
            nixScope["imap1"] = nixScope["lib"]["imap1"];
            nixScope["isAttrs"] = nixScope["lib"]["isAttrs"];
            nixScope["isBool"] = nixScope["lib"]["isBool"];
            nixScope["isFunction"] = nixScope["lib"]["isFunction"];
            nixScope["oldestSupportedReleaseIsAtLeast"] = nixScope["lib"]["oldestSupportedReleaseIsAtLeast"];
            nixScope["isList"] = nixScope["lib"]["isList"];
            nixScope["isString"] = nixScope["lib"]["isString"];
            nixScope["length"] = nixScope["lib"]["length"];
            nixScope["mapAttrs"] = nixScope["lib"]["mapAttrs"];
            nixScope["mapAttrsToList"] = nixScope["lib"]["mapAttrsToList"];
            nixScope["mapAttrsRecursiveCond"] = nixScope["lib"]["mapAttrsRecursiveCond"];
            nixScope["min"] = nixScope["lib"]["min"];
            nixScope["optional"] = nixScope["lib"]["optional"];
            nixScope["optionalAttrs"] = nixScope["lib"]["optionalAttrs"];
            nixScope["optionalString"] = nixScope["lib"]["optionalString"];
            nixScope["recursiveUpdate"] = nixScope["lib"]["recursiveUpdate"];
            nixScope["reverseList"] = nixScope["lib"]["reverseList"];
            nixScope["sort"] = nixScope["lib"]["sort"];
            nixScope["seq"] = nixScope["lib"]["seq"];
            nixScope["setAttrByPath"] = nixScope["lib"]["setAttrByPath"];
            nixScope["substring"] = nixScope["lib"]["substring"];
            nixScope["throwIfNot"] = nixScope["lib"]["throwIfNot"];
            nixScope["trace"] = nixScope["lib"]["trace"];
            nixScope["typeOf"] = nixScope["lib"]["typeOf"];
            nixScope["types"] = nixScope["lib"]["types"];
            nixScope["unsafeGetAttrPos"] = nixScope["lib"]["unsafeGetAttrPos"];
            nixScope["warn"] = nixScope["lib"]["warn"];
            nixScope["warnIf"] = nixScope["lib"]["warnIf"];
            nixScope["zipAttrs"] = nixScope["lib"]["zipAttrs"];
            nixScope["zipAttrsWith"] = nixScope["lib"]["zipAttrsWith"];
            nixScope["isOption"] = nixScope["lib"]["options"]["isOption"];
            nixScope["mkOption"] = nixScope["lib"]["options"]["mkOption"];
            nixScope["showDefs"] = nixScope["lib"]["options"]["showDefs"];
            nixScope["showFiles"] = nixScope["lib"]["options"]["showFiles"];
            nixScope["showOption"] = nixScope["lib"]["options"]["showOption"];
            nixScope["unknownModule"] = nixScope["lib"]["options"]["unknownModule"];
            nixScope["isConvertibleWithToString"] = nixScope["lib"]["strings"]["isConvertibleWithToString"];
            nixScope["defaultOverridePriority"] = 100n;
            nixScope["defaultOrderPriority"] = 1000n;
            Object.defineProperty(nixScope, "showDeclPrefix", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["decl"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString([" - option(s) with prefix `", "' in module `", "'"], [()=>(nixScope["showOption"]((operators.listConcat(nixScope["loc"], [nixScope["prefix"]])))), ()=>(nixScope["decl"]["_file"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "showRawDecls", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["decls"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatStringsSep"]("")((nixScope["sort"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return operators.lessThan(nixScope["a"], nixScope["b"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["concatMap"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["decl"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["map"]((nixScope["showDeclPrefix"](nixScope["loc"])(nixScope["decl"])))((nixScope["attrNames"](nixScope["decl"]["options"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["decls"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "evalModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["evalModulesArgs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "withWarnings", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["warnIf"]((operators.hasAttr(nixScope["evalModulesArgs"], "args")))("The args argument to evalModules is deprecated. Please set config._module.args instead.")(nixScope["warnIf"])((operators.hasAttr(nixScope["evalModulesArgs"], "check")))("The check argument to evalModules is deprecated. Please set config._module.check instead.")(nixScope["x"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "legacyModules", {enumerable: true, get(){return operators.listConcat(nixScope["optional"]((operators.hasAttr(nixScope["evalModulesArgs"], "args")))(({"config": (function(){
        const obj = {};
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["args"] = nixScope["args"];
        return obj;
    })()})), nixScope["optional"]((operators.hasAttr(nixScope["evalModulesArgs"], "check")))(({"config": (function(){
        const obj = {};
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["check"] = nixScope["mkDefault"](nixScope["check"]);
        return obj;
    })()})));}});
            Object.defineProperty(nixScope, "regularModules", {enumerable: true, get(){return operators.listConcat(nixScope["modules"], nixScope["legacyModules"]);}});
            Object.defineProperty(nixScope, "internalModule", {enumerable: true, get(){return (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["_file"] = "lib/modules.nix";
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "key", {enumerable: true, get(){return nixScope["_file"];}});
            Object.defineProperty(nixScope, "options", {enumerable: true, get(){return (function(){
        const obj = {};
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["args"] = nixScope["mkOption"]((function(){
        const obj = {};
        obj["type"] = nixScope["types"]["lazyAttrsOf"](nixScope["types"]["raw"]);
        obj["description"] = `
                  Additional arguments passed to each module in addition to ones
                  like \`lib\`, \`config\`,
                  and \`pkgs\`, \`modulesPath\`.
    
                  This option is also available to all submodules. Submodules do not
                  inherit args from their parent module, nor do they provide args to
                  their parent module or sibling submodules. The sole exception to
                  this is the argument \`name\` which is provided by
                  parent modules to a submodule and contains the attribute name
                  the submodule is bound to, or a unique generated name if it is
                  not bound to an attribute.
    
                  Some arguments are already passed by default, of which the
                  following *cannot* be changed with this option:
                  - {var}\`lib\`: The nixpkgs library.
                  - {var}\`config\`: The results of all options after merging the values from all modules together.
                  - {var}\`options\`: The options declared in all modules.
                  - {var}\`specialArgs\`: The \`specialArgs\` argument passed to \`evalModules\`.
                  - All attributes of {var}\`specialArgs\`
    
                    Whereas option values can generally depend on other option values
                    thanks to laziness, this does not apply to \`imports\`, which
                    must be computed statically before anything else.
    
                    For this reason, callers of the module system can provide \`specialArgs\`
                    which are available during import resolution.
    
                    For NixOS, \`specialArgs\` includes
                    {var}\`modulesPath\`, which allows you to import
                    extra modules from the nixpkgs package tree without having to
                    somehow make the module aware of the location of the
                    \`nixpkgs\` or NixOS directories.
                    \`\`\`
                    { modulesPath, ... }: {
                      imports = [
                        (modulesPath + "/profiles/minimal.nix")
                      ];
                    }
                    \`\`\`
    
                  For NixOS, the default value for this option includes at least this argument:
                  - {var}\`pkgs\`: The nixpkgs package set according to
                    the {option}\`nixpkgs.pkgs\` option.
                `;
        obj[(operators.ifThenElse(operators.equal(nixScope["prefix"], []), ()=>(null), ()=>("internal")))] = true;
        return obj;
    })());
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["check"] = nixScope["mkOption"](({"type": nixScope["types"]["bool"], "internal": true, "default": true, "description": "Whether to check whether all option definitions have matching declarations."}));
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["freeformType"] = nixScope["mkOption"](({"type": nixScope["types"]["nullOr"](nixScope["types"]["optionType"]), "internal": true, "default": null, "description": `
                  If set, merge all definitions that don't have an associated option
                  together using this type. The result then gets combined with the
                  values of all declared options to produce the final \`
                  config\` value.
    
                  If this is \`null\`, definitions without an option
                  will throw an error unless {option}\`_module.check\` is
                  turned off.
                `}));
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["specialArgs"] = nixScope["mkOption"](({"readOnly": true, "internal": true, "description": `
                  Externally provided module arguments that can't be modified from
                  within a configuration, but can be used in module imports.
                `}));
        return obj;
    })();}});
            Object.defineProperty(nixScope, "config", {enumerable: true, get(){return (function(){
        const obj = {};
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["args"] = ({"extendModules": nixScope["extendModules"], "moduleType": nixScope["type"]});
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["specialArgs"] = nixScope["specialArgs"];
        return obj;
    })();}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "doCollect", {enumerable: true, get(){return 
    
    // args: {
    
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    nixScope["collectModules"](nixScope["class"])((operators.selectOrDefault(nixScope["specialArgs"], ["modulesPath"], "")))((operators.listConcat(nixScope["regularModules"], [nixScope["internalModule"]])))((operators.merge(({"lib": nixScope["lib"], "options": nixScope["options"], "specialArgs": nixScope["specialArgs"], "_class": nixScope["class"], "_prefix": nixScope["prefix"], "config": nixScope["addErrorContext"]("if you get an infinite recursion here, you probably reference `config` in `imports`. If you are trying to achieve a conditional import behavior dependent on `config`, consider importing unconditionally, and using `mkEnableOption` and `mkIf` to control its effect.")(nixScope["config"])}), nixScope["specialArgs"])))
                ));}});
            Object.defineProperty(nixScope, "merged", {enumerable: true, get(){return nixScope["mergeModules"](nixScope["prefix"])((nixScope["reverseList"]((nixScope["doCollect"]({}))["modules"])));}});
            Object.defineProperty(nixScope, "options", {enumerable: true, get(){return nixScope["merged"]["matchedOptions"];}});
            Object.defineProperty(nixScope, "config", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "declaredConfig", {enumerable: true, get(){return nixScope["mapAttrsRecursiveCond"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["isOption"](nixScope["v"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]["value"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["options"]);}});
            Object.defineProperty(nixScope, "freeformConfig", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "defs", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return ({"file": nixScope["def"]["file"], "value": nixScope["setAttrByPath"](nixScope["def"]["prefix"])(nixScope["def"]["value"])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["merged"]["unmatchedDefns"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["defs"], []), ()=>({}), ()=>(nixScope["declaredConfig"]["_module"]["freeformType"]["merge"](nixScope["prefix"])(nixScope["defs"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            return (operators.ifThenElse(operators.equal(nixScope["declaredConfig"]["_module"]["freeformType"], null), ()=>(nixScope["declaredConfig"]), ()=>(nixScope["recursiveUpdate"](nixScope["freeformConfig"])(nixScope["declaredConfig"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "checkUnmatched", {enumerable: true, get(){return (operators.ifThenElse(operators.and(operators.and(nixScope["config"]["_module"]["check"], operators.equal(nixScope["config"]["_module"]["freeformType"], null)), operators.notEqual(nixScope["merged"]["unmatchedDefns"], [])), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "firstDef", {enumerable: true, get(){return nixScope["head"](nixScope["merged"]["unmatchedDefns"]);}});
            Object.defineProperty(nixScope, "baseMsg", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "optText", {enumerable: true, get(){return nixScope["showOption"]((operators.listConcat(nixScope["prefix"], nixScope["firstDef"]["prefix"])));}});
            Object.defineProperty(nixScope, "defText", {enumerable: true, get(){return nixScope["addErrorContext"]((new InterpolatedString(["while evaluating the error message for definitions for `", "', which is an option that does not exist"], [()=>(nixScope["optText"])])))((nixScope["addErrorContext"]((new InterpolatedString(["while evaluating a definition from `", "'"], [()=>(nixScope["firstDef"]["file"])])))((nixScope["showDefs"]([nixScope["firstDef"]])))));}});
            return (new InterpolatedString(["The option `", "' does not exist. Definition values:", ""], [()=>(nixScope["optText"]), ()=>(nixScope["defText"])]));
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            return (operators.ifThenElse(operators.equal(nixScope["attrNames"](nixScope["options"]), ["_module"]), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "optionName", {enumerable: true, get(){return nixScope["showOption"](nixScope["prefix"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["optionName"], ""), ()=>(nixScope["throw"]((new InterpolatedString(["\n                ", "\n\n                It seems as if you're trying to declare an option by placing it into \\`config' rather than \\`options'!\n              "], [()=>(nixScope["baseMsg"])])))), ()=>(nixScope["throw"]((new InterpolatedString(["\n                ", "\n\n                However there are no options defined in \\`", "'. Are you sure you've\n                declared your options properly? This can happen if you e.g. declared your options in \\`types.submodule'\n                under \\`config' rather than \\`options'.\n              "], [()=>(nixScope["baseMsg"]), ()=>(nixScope["showOption"](nixScope["prefix"]))]))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(nixScope["throw"](nixScope["baseMsg"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(null)));}});
            Object.defineProperty(nixScope, "checked", {enumerable: true, get(){return nixScope["seq"](nixScope["checkUnmatched"]);}});
            Object.defineProperty(nixScope, "extendModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["extendArgs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["evalModules"]((operators.merge(nixScope["evalModulesArgs"], ({"modules": operators.listConcat(nixScope["regularModules"], nixScope["modules"]), "specialArgs": operators.merge(operators.selectOrDefault(nixScope["evalModulesArgs"], ["specialArgs"], {}), nixScope["specialArgs"]), "prefix": operators.selectOrDefault(nixScope["extendArgs"], ["prefix"], operators.selectOrDefault(nixScope["evalModulesArgs"], ["prefix"], []))})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "type", {enumerable: true, get(){return nixScope["types"]["submoduleWith"](({"modules": nixScope["modules"], "specialArgs": nixScope["specialArgs"], "class": nixScope["class"]}));}});
            Object.defineProperty(nixScope, "result", {enumerable: true, get(){return nixScope["withWarnings"]((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["_type"] = "configuration";
            obj["options"] = nixScope["checked"](nixScope["options"]);
            obj["config"] = nixScope["checked"]((nixScope["removeAttrs"](nixScope["config"])(["_module"])));
            obj["_module"] = nixScope["checked"]((nixScope["config"]["_module"]));
            obj["graph"] = nixScope["doCollect"]({})["graph"];
            obj["extendModules"] = nixScope["extendModules"];
            obj["type"] = nixScope["type"];
            obj["class"] = nixScope["class"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })());}});
            return nixScope["result"];
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "collectModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["class"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "loadModule", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fallbackFile"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fallbackKey"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isFunction"](nixScope["m"]), ()=>(nixScope["unifyModuleSyntax"](nixScope["fallbackFile"])(nixScope["fallbackKey"])((nixScope["applyModuleArgs"](nixScope["fallbackKey"])(nixScope["m"])(nixScope["args"])))), ()=>((operators.ifThenElse(nixScope["isAttrs"](nixScope["m"]), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["m"], ["_type"], "module"), "module"), ()=>(nixScope["unifyModuleSyntax"](nixScope["fallbackFile"])(nixScope["fallbackKey"])(nixScope["m"])), ()=>((operators.ifThenElse(operators.or(operators.equal(nixScope["m"]["_type"], "if"), operators.equal(nixScope["m"]["_type"], "override")), ()=>(nixScope["loadModule"](nixScope["args"])(nixScope["fallbackFile"])(nixScope["fallbackKey"])(({"config": nixScope["m"]}))), ()=>(nixScope["throw"]((nixScope["messages"]["not_a_module"](({"fallbackFile": nixScope["fallbackFile"], "value": nixScope["m"], "_type": nixScope["m"]["_type"], "expectedClass": nixScope["class"], "prefix": nixScope["args"]["_prefix"]}))))))))))), ()=>((operators.ifThenElse(nixScope["isList"](nixScope["m"]), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "defs", {enumerable: true, get(){return [({"file": nixScope["fallbackFile"], "value": nixScope["m"]})];}});
            return nixScope["throw"]((new InterpolatedString(["Module imports can't be nested lists. Perhaps you meant to remove one level of lists? Definitions: ", ""], [()=>(nixScope["showDefs"](nixScope["defs"]))])));
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(nixScope["unifyModuleSyntax"]((nixScope["toString"](nixScope["m"])))((nixScope["toString"](nixScope["m"])))((nixScope["applyModuleArgsIfFunction"]((nixScope["toString"](nixScope["m"])))((nixScope["import"](nixScope["m"])))(nixScope["args"])))))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "checkModule", {enumerable: true, get(){return (operators.ifThenElse(operators.notEqual(nixScope["class"], null), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.or(operators.equal(nixScope["m"]["_class"], null), operators.equal(nixScope["m"]["_class"], nixScope["class"])), ()=>(nixScope["m"]), ()=>(nixScope["throw"]((new InterpolatedString(["\n              The module \\`", "\\` (class: ", ") cannot be imported into a module evaluation that expects class ", ".\n\n              Help:\n              - Ensure that you are importing the correct module.\n              - Verify that the module's \\`_class\\`, ", " matches the expected \\`class\\` ", ".\n              - If you are using a custom class, make sure it is correctly defined and used consistently across your modules.\n            "], [()=>(operators.selectOrDefault(nixScope["m"], ["_file"], nixScope["m"]["key"])), ()=>(nixScope["lib"]["strings"]["escapeNixString"](nixScope["m"]["_class"])), ()=>(nixScope["lib"]["strings"]["escapeNixString"](nixScope["class"])), ()=>(nixScope["lib"]["strings"]["escapeNixString"](nixScope["m"]["_class"])), ()=>(nixScope["lib"]["strings"]["escapeNixString"](nixScope["class"]))])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["m"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))));}});
            Object.defineProperty(nixScope, "isDisabled", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modulesPath"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["disabledList"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "moduleKey", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isString"](nixScope["m"]), ()=>((operators.ifThenElse(operators.equal(nixScope["substring"](0n)(1n)(nixScope["m"]), "/"), ()=>(nixScope["m"]), ()=>(operators.add(operators.add(nixScope["toString"](nixScope["modulesPath"]), "/"), nixScope["m"]))))), ()=>((operators.ifThenElse(nixScope["isConvertibleWithToString"](nixScope["m"]), ()=>((operators.ifThenElse(operators.and(operators.hasAttr(nixScope["m"], "key"), operators.notEqual(nixScope["m"]["key"], nixScope["toString"](nixScope["m"]))), ()=>(nixScope["throw"]((new InterpolatedString(["Module `", "` contains a disabledModules item that is an attribute set that can be converted to a string (", ") but also has a `.key` attribute (", ") with a different value. This makes it ambiguous which module should be disabled."], [()=>(nixScope["file"]), ()=>(nixScope["toString"](nixScope["m"])), ()=>(nixScope["m"]["key"])])))), ()=>(nixScope["toString"](nixScope["m"]))))), ()=>((operators.ifThenElse(operators.hasAttr(nixScope["m"], "key"), ()=>(nixScope["m"]["key"]), ()=>((operators.ifThenElse(nixScope["isAttrs"](nixScope["m"]), ()=>(nixScope["throw"]((new InterpolatedString(["Module `", "` contains a disabledModules item that is an attribute set, presumably a module, that does not have a `key` attribute. This means that the module system doesn't have any means to identify the module that should be disabled. Make sure that you've put the correct value in disabledModules: a string path relative to modulesPath, a path value, or an attribute set with a `key` attribute."], [()=>(nixScope["file"])])))), ()=>(nixScope["throw"]((new InterpolatedString(["Each disabledModules item must be a path, string, or a attribute set with a key attribute, or a value supported by toString. However, one of the disabledModules items in `", "` is none of that, but is of type ", "."], [()=>(nixScope["toString"](nixScope["file"])), ()=>(nixScope["typeOf"](nixScope["m"]))]))))))))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "disabledKeys", {enumerable: true, get(){return nixScope["concatMap"]((
    
    // args: {
    //    file,
    //    disabled,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    nixScope["map"]((nixScope["moduleKey"](nixScope["file"])))(nixScope["disabled"])
                ))))(nixScope["disabledList"]);}});
            return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["structuredModule"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["elem"](nixScope["structuredModule"]["key"])(nixScope["disabledKeys"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "collectStructuredModules", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "collectResults", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modules"] = arg; runtime.scopeStack.push(nixScope); try { return ({"disabled": nixScope["concatLists"]((nixScope["catAttrs"]("disabled")(nixScope["modules"]))), "modules": nixScope["modules"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["parentFile"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["parentKey"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["initialModules"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["collectResults"]((nixScope["imap1"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "module", {enumerable: true, get(){return nixScope["checkModule"]((nixScope["loadModule"](nixScope["args"])(nixScope["parentFile"])((new InterpolatedString(["", ":anon-", ""], [()=>(nixScope["parentKey"]), ()=>(nixScope["toString"](nixScope["n"]))])))(nixScope["x"])));}});
            Object.defineProperty(nixScope, "collectedImports", {enumerable: true, get(){return nixScope["collectStructuredModules"](nixScope["module"]["_file"])(nixScope["module"]["key"])(nixScope["module"]["imports"])(nixScope["args"]);}});
            return ({"key": nixScope["module"]["key"], "module": nixScope["module"], "modules": nixScope["collectedImports"]["modules"], "disabled": operators.listConcat(((operators.ifThenElse(operators.notEqual(nixScope["module"]["disabledModules"], []), ()=>([({"file": nixScope["module"]["_file"], "disabled": nixScope["module"]["disabledModules"]})]), ()=>([])))), nixScope["collectedImports"]["disabled"])});
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["initialModules"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "filterModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modulesPath"] = arg; runtime.scopeStack.push(nixScope); try { return 
    
    // args: {
    //    disabled,
    //    modules,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "keyFilter", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["isDisabled"](nixScope["modulesPath"])(nixScope["disabled"])(nixScope["attrs"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
                return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["attrs"]["module"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["genericClosure"](({"startSet": nixScope["keyFilter"](nixScope["modules"]), "operator": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["attrs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["keyFilter"](nixScope["attrs"]["modules"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}))));
            } finally {
                runtime.scopeStack.pop();
            }
        })()
                )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "toGraph", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modulesPath"] = arg; runtime.scopeStack.push(nixScope); try { return 
    
    // args: {
    //    disabled,
    //    modules,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "isDisabledModule", {enumerable: true, get(){return nixScope["isDisabled"](nixScope["modulesPath"])(nixScope["disabled"]);}});
                Object.defineProperty(nixScope, "toModuleGraph", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["structuredModule"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
            const obj = {};
                obj["disabled"] = nixScope["isDisabledModule"](nixScope["structuredModule"]);
                obj["key"] = nixScope["structuredModule"]["key"];
                obj["file"] = nixScope["structuredModule"]["module"]["_file"];
                obj["imports"] = nixScope["map"](nixScope["toModuleGraph"])(nixScope["structuredModule"]["modules"]);
            return obj;
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
                return nixScope["map"](nixScope["toModuleGraph"])((nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["x"]["key"], "lib/modules.nix"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["modules"])));
            } finally {
                runtime.scopeStack.pop();
            }
        })()
                )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modulesPath"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["initialModules"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return ({"modules": nixScope["filterModules"](nixScope["modulesPath"])((nixScope["collectStructuredModules"](nixScope["unknownModule"])("")(nixScope["initialModules"])(nixScope["args"]))), "graph": nixScope["toGraph"](nixScope["modulesPath"])((nixScope["collectStructuredModules"](nixScope["unknownModule"])("")(nixScope["initialModules"])(nixScope["args"])))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "setDefaultModuleLocation", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_file": nixScope["file"], "imports": [nixScope["m"]]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "unifyModuleSyntax", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["key"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "addMeta", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["config"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.hasAttr(nixScope["m"], "meta"), ()=>(nixScope["mkMerge"]([nixScope["config"],({"meta": nixScope["m"]["meta"]})])), ()=>(nixScope["config"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "addFreeformType", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["config"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.hasAttr(nixScope["m"], "freeformType"), ()=>(nixScope["mkMerge"]([nixScope["config"],(function(){
        const obj = {};
        if (obj["_module"] === undefined) obj["_module"] = {};
        obj["_module"]["freeformType"] = nixScope["m"]["freeformType"];
        return obj;
    })()])), ()=>(nixScope["config"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (operators.ifThenElse(operators.or(operators.hasAttr(nixScope["m"], "config"), operators.hasAttr(nixScope["m"], "options")), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "badAttrs", {enumerable: true, get(){return nixScope["removeAttrs"](nixScope["m"])(["_class","_file","key","disabledModules","imports","options","config","meta","freeformType"]);}});
            return (operators.ifThenElse(operators.notEqual(nixScope["badAttrs"], {}), ()=>(nixScope["throw"]((new InterpolatedString(["Module `", "' has an unsupported attribute `", "'. This is caused by introducing a top-level `config' or `options' attribute. Add configuration attributes immediately on the top level instead, or move all of them (namely: ", ") into the explicit `config' attribute."], [()=>(nixScope["key"]), ()=>(nixScope["head"]((nixScope["attrNames"](nixScope["badAttrs"])))), ()=>(nixScope["toString"]((nixScope["attrNames"](nixScope["badAttrs"]))))])))), ()=>(({"_file": nixScope["toString"](operators.selectOrDefault(nixScope["m"], ["_file"], nixScope["file"])), "_class": operators.selectOrDefault(nixScope["m"], ["_class"], null), "key": nixScope["toString"](operators.selectOrDefault(nixScope["m"], ["key"], nixScope["key"])), "disabledModules": operators.selectOrDefault(nixScope["m"], ["disabledModules"], []), "imports": operators.selectOrDefault(nixScope["m"], ["imports"], []), "options": operators.selectOrDefault(nixScope["m"], ["options"], {}), "config": nixScope["addFreeformType"]((nixScope["addMeta"]((operators.selectOrDefault(nixScope["m"], ["config"], {})))))}))));
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(nixScope["throwIfNot"]((nixScope["isAttrs"](nixScope["m"])))((new InterpolatedString(["module ", " (", ") does not look like a module."], [()=>(nixScope["file"]), ()=>(nixScope["key"])])))(({"_file": nixScope["toString"](operators.selectOrDefault(nixScope["m"], ["_file"], nixScope["file"])), "_class": operators.selectOrDefault(nixScope["m"], ["_class"], null), "key": nixScope["toString"](operators.selectOrDefault(nixScope["m"], ["key"], nixScope["key"])), "disabledModules": operators.selectOrDefault(nixScope["m"], ["disabledModules"], []), "imports": operators.listConcat(operators.selectOrDefault(nixScope["m"], ["require"], []), operators.selectOrDefault(nixScope["m"], ["imports"], [])), "options": {}, "config": nixScope["addFreeformType"]((nixScope["removeAttrs"](nixScope["m"])(["_class","_file","key","disabledModules","require","imports","freeformType"])))})))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "applyModuleArgsIfFunction", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["key"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isFunction"](nixScope["f"]), ()=>(nixScope["applyModuleArgs"](nixScope["key"])(nixScope["f"])(nixScope["args"])), ()=>(nixScope["f"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "applyModuleArgs", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["key"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "context", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["while evaluating the module argument \\`", "' in \"", "\":"], [()=>(nixScope["name"]), ()=>(nixScope["key"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "extraArgs", {enumerable: true, get(){return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["addErrorContext"]((nixScope["context"](nixScope["name"])))((operators.selectOrDefault(nixScope["args"], [nixScope["name"]], (nixScope["addErrorContext"]((new InterpolatedString(["noting that argument `", "` is not externally provided, so querying `_module.args` instead, requiring `config`"], [()=>(nixScope["name"])])))(nixScope["config"]["_module"]["args"][nixScope["name"]]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["functionArgs"](nixScope["f"])));}});
            return nixScope["f"]((operators.merge(nixScope["args"], nixScope["extraArgs"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergeModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modules"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mergeModules'"](nixScope["prefix"])(nixScope["modules"])((nixScope["concatMap"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["config"] = arg; runtime.scopeStack.push(nixScope); try { return ({"file": nixScope["m"]["_file"], "config": nixScope["config"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["pushDownProperties"](nixScope["m"]["config"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["modules"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergeModules'", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modules"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["configs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "declsByName", {enumerable: true, get(){return nixScope["zipAttrsWith"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["module"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "subtree", {enumerable: true, get(){return nixScope["module"]["options"];}});
            return (operators.ifThenElse(operators.negate((nixScope["isAttrs"](nixScope["subtree"]))), ()=>(nixScope["throw"]((new InterpolatedString(["\n              An option declaration for \\`", "' has type\n              \\`", "' rather than an attribute set.\n              Did you mean to define this outside of \\`options'?\n            "], [()=>(nixScope["concatStringsSep"](".")(nixScope["prefix"])), ()=>(nixScope["typeOf"](nixScope["subtree"]))])))), ()=>(nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["option"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["_file"] = nixScope["module"]["_file"];
            obj["pos"] = nixScope["unsafeGetAttrPos"](nixScope["n"])(nixScope["subtree"]);
            obj["options"] = nixScope["option"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["subtree"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["modules"])));}});
            Object.defineProperty(nixScope, "checkedConfigs", {enumerable: true, get(){return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "all (\n          c:\n          # TODO: I have my doubts that this error would occur when option definitions are not matched.\n          #       The implementation of this check used to be tied to a superficially similar check for\n          #       options, so maybe that's why this is here.\n          isAttrs c.config\n          || throw ''\n            In module `${c.file}', you're trying to define a value of type `${typeOf c.config}'\n            rather than an attribute set for the option\n            `${concatStringsSep \".\" prefix}'!\n\n            This usually happens if `${concatStringsSep \".\" prefix}' has option\n            definitions inside that are not matched. Please check how to properly define\n            this option by e.g. referring to `man 5 configuration.nix'!\n          ''\n        ) configs");
        }
        return nixScope["configs"];
    })(nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["c"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(nixScope["isAttrs"](nixScope["c"]["config"]), nixScope["throw"]((new InterpolatedString(["\n            In module \\`", "', you're trying to define a value of type \\`", "'\n            rather than an attribute set for the option\n            \\`", "'!\n\n            This usually happens if \\`", "' has option\n            definitions inside that are not matched. Please check how to properly define\n            this option by e.g. referring to \\`man 5 configuration.nix'!\n          "], [()=>(nixScope["c"]["file"]), ()=>(nixScope["typeOf"](nixScope["c"]["config"])), ()=>(nixScope["concatStringsSep"](".")(nixScope["prefix"])), ()=>(nixScope["concatStringsSep"](".")(nixScope["prefix"]))])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["configs"]));}});
            Object.defineProperty(nixScope, "pushedDownDefinitionsByName", {enumerable: true, get(){return nixScope["zipAttrsWith"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["concatLists"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["module"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["config"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["file"] = nixScope["module"]["file"];
            obj["config"] = nixScope["config"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["pushDownProperties"](nixScope["value"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["module"]["config"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["checkedConfigs"])));}});
            Object.defineProperty(nixScope, "rawDefinitionsByName", {enumerable: true, get(){return nixScope["zipAttrsWith"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["module"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["file"] = nixScope["module"]["file"];
            obj["value"] = nixScope["value"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["module"]["config"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["checkedConfigs"])));}});
            Object.defineProperty(nixScope, "optionTreeToOption", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["decl"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isOption"](nixScope["decl"]["options"]), ()=>(nixScope["decl"]), ()=>(operators.merge(nixScope["decl"], ({"options": nixScope["mkOption"](({"type": nixScope["types"]["submoduleWith"](({"modules": [({"options": nixScope["decl"]["options"]})], "shorthandOnlyDefinesConfig": null}))}))}))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "resultsByName", {enumerable: true, get(){return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["decls"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "loc", {enumerable: true, get(){return operators.listConcat(nixScope["prefix"], [nixScope["name"]]);}});
            Object.defineProperty(nixScope, "defns", {enumerable: true, get(){return operators.selectOrDefault(nixScope["pushedDownDefinitionsByName"], [nixScope["name"]], []);}});
            Object.defineProperty(nixScope, "defns'", {enumerable: true, get(){return operators.selectOrDefault(nixScope["rawDefinitionsByName"], [nixScope["name"]], []);}});
            Object.defineProperty(nixScope, "optionDecls", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.hasAttr(nixScope["m"]["options"], "_type"), (operators.or(operators.equal(nixScope["m"]["options"]["_type"], "option"), nixScope["throwDeclarationTypeError"](nixScope["loc"])(nixScope["m"]["options"]["_type"])(nixScope["m"]["_file"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["decls"]);}});
            return (operators.ifThenElse(operators.equal(nixScope["length"](nixScope["optionDecls"]), nixScope["length"](nixScope["decls"])), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "opt", {enumerable: true, get(){return nixScope["fixupOptionType"](nixScope["loc"])((nixScope["mergeOptionDecls"](nixScope["loc"])(nixScope["decls"])));}});
            return ({"matchedOptions": nixScope["evalOptionValue"](nixScope["loc"])(nixScope["opt"])(nixScope["defns'"]), "unmatchedDefns": []});
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>((operators.ifThenElse(operators.notEqual(nixScope["optionDecls"], []), ()=>((operators.ifThenElse(nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(operators.selectOrDefault(nixScope["x"], ["options", "type", "name"], null), "submodule"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["optionDecls"]), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "opt", {enumerable: true, get(){return nixScope["fixupOptionType"](nixScope["loc"])((nixScope["mergeOptionDecls"](nixScope["loc"])((nixScope["map"](nixScope["optionTreeToOption"])(nixScope["decls"])))));}});
            return ({"matchedOptions": nixScope["evalOptionValue"](nixScope["loc"])(nixScope["opt"])(nixScope["defns'"]), "unmatchedDefns": []});
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "nonOptions", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["isOption"](nixScope["m"]["options"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["decls"]);}});
            return nixScope["throw"]((new InterpolatedString(["The option `", "' in module `", "' would be a parent of the following options, but its type `", "' does not support nested options.", ""], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>((nixScope["head"](nixScope["optionDecls"]))["_file"]), ()=>(operators.selectOrDefault((nixScope["head"](nixScope["optionDecls"])), ["options", "type", "description"], "<no description>")), ()=>(nixScope["showRawDecls"](nixScope["loc"])(nixScope["nonOptions"]))])));
        } finally {
            runtime.scopeStack.pop();
        }
    })())))), ()=>(nixScope["mergeModules'"](nixScope["loc"])(nixScope["decls"])(nixScope["defns"])))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["declsByName"]);}});
            Object.defineProperty(nixScope, "matchedOptions", {enumerable: true, get(){return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]["matchedOptions"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["resultsByName"]);}});
            Object.defineProperty(nixScope, "unmatchedDefnsByName", {enumerable: true, get(){return operators.merge(nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]["unmatchedDefns"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["resultsByName"]), nixScope["removeAttrs"](nixScope["rawDefinitionsByName"])((nixScope["attrNames"](nixScope["matchedOptions"]))));}});
            return ({"matchedOptions": nixScope["matchedOptions"], "unmatchedDefns": (operators.ifThenElse(operators.equal(nixScope["configs"], []), ()=>([]), ()=>(nixScope["concatLists"]((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["def"], ({"prefix": operators.listConcat([nixScope["name"]], (operators.selectOrDefault(nixScope["def"], ["prefix"], [])))})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["unmatchedDefnsByName"]))))))});
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "throwDeclarationTypeError", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["actualTag"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "name", {enumerable: true, get(){return nixScope["lib"]["strings"]["escapeNixIdentifier"]((nixScope["lib"]["lists"]["last"](nixScope["loc"])));}});
            Object.defineProperty(nixScope, "path", {enumerable: true, get(){return nixScope["showOption"](nixScope["loc"]);}});
            Object.defineProperty(nixScope, "depth", {enumerable: true, get(){return nixScope["length"](nixScope["loc"]);}});
            Object.defineProperty(nixScope, "paragraphs", {enumerable: true, get(){return operators.listConcat([(new InterpolatedString(["In module ", ": expected an option declaration at option path `", "` but got an attribute set with type ", ""], [()=>(nixScope["file"]), ()=>(nixScope["path"]), ()=>(nixScope["actualTag"])]))], nixScope["optional"]((operators.equal(nixScope["actualTag"], "option-type")))((new InterpolatedString(["\n        When declaring an option, you must wrap the type in a \\`mkOption\\` call. It should look somewhat like:\n            ", "\n            ", " = lib.mkOption {\n              description = ...;\n              type = <the type you wrote for ", ">;\n              ...\n            };\n      "], [()=>(nixScope["comment"]), ()=>(nixScope["name"]), ()=>(nixScope["name"])]))));}});
            Object.defineProperty(nixScope, "comment", {enumerable: true, get(){return nixScope["optionalString"]((operators.greaterThan(nixScope["depth"], 1n)))((new InterpolatedString(["    # ", ""], [()=>(nixScope["showOption"](nixScope["loc"]))])));}});
            return nixScope["throw"]((nixScope["concatStringsSep"]("")(nixScope["paragraphs"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergeOptionDecls", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opts"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["res"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "t", {enumerable: true, get(){return nixScope["res"]["type"];}});
            Object.defineProperty(nixScope, "t'", {enumerable: true, get(){return nixScope["opt"]["options"]["type"];}});
            Object.defineProperty(nixScope, "mergedType", {enumerable: true, get(){return nixScope["t"]["typeMerge"](nixScope["t'"]["functor"]);}});
            Object.defineProperty(nixScope, "typesMergeable", {enumerable: true, get(){return operators.notEqual(nixScope["mergedType"], null);}});
            Object.defineProperty(nixScope, "addDeprecatedWrapped", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["t"], ({"functor": operators.merge(nixScope["t"]["functor"], ({"wrapped": nixScope["t"]["functor"]["wrappedDeprecationMessage"](({"loc": nixScope["loc"]}))}))})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "typeSet", {enumerable: true, get(){return (operators.ifThenElse(operators.hasAttr(nixScope["opt"]["options"], "type"), ()=>((operators.ifThenElse(operators.hasAttr(nixScope["res"], "type"), ()=>((operators.ifThenElse(nixScope["typesMergeable"], ()=>(({"type": (operators.ifThenElse(operators.hasAttrPath(nixScope["mergedType"], "functor", "wrappedDeprecationMessage"), ()=>(nixScope["addDeprecatedWrapped"](nixScope["mergedType"])), ()=>(nixScope["mergedType"])))})), ()=>(nixScope["throw"]((new InterpolatedString(["The option `", "' in `", "' is already declared in ", "."], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["opt"]["_file"]), ()=>(nixScope["showFiles"](nixScope["res"]["declarations"]))]))))))), ()=>((operators.ifThenElse(operators.hasAttrPath(nixScope["opt"]["options"]["type"], "functor", "wrappedDeprecationMessage"), ()=>(({"type": nixScope["addDeprecatedWrapped"](nixScope["opt"]["options"]["type"])})), ()=>({}))))))), ()=>({})));}});
            Object.defineProperty(nixScope, "bothHave", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(operators.hasAttr(nixScope["opt"]["options"], nixScope["k"]), operators.hasAttr(nixScope["res"], nixScope["k"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (operators.ifThenElse(operators.or(operators.or(operators.or(nixScope["bothHave"]("default"), nixScope["bothHave"]("example")), nixScope["bothHave"]("description")), nixScope["bothHave"]("apply")), ()=>(nixScope["throw"]((new InterpolatedString(["The option `", "' in `", "' is already declared in ", "."], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["opt"]["_file"]), ()=>(nixScope["showFiles"](nixScope["res"]["declarations"]))])))), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "getSubModules", {enumerable: true, get(){return operators.selectOrDefault(nixScope["opt"], ["options", "type", "getSubModules"], null);}});
            Object.defineProperty(nixScope, "submodules", {enumerable: true, get(){return (operators.ifThenElse(operators.notEqual(nixScope["getSubModules"], null), ()=>(operators.listConcat(nixScope["map"]((nixScope["setDefaultModuleLocation"](nixScope["opt"]["_file"])))(nixScope["getSubModules"]), nixScope["res"]["options"])), ()=>(nixScope["res"]["options"])));}});
            return operators.merge(nixScope["opt"]["options"], operators.merge(nixScope["res"], operators.merge(({"declarations": operators.listConcat(nixScope["res"]["declarations"], [nixScope["opt"]["_file"]]), "declarationPositions": operators.listConcat(nixScope["res"]["declarationPositions"], ((operators.ifThenElse(operators.notEqual(nixScope["opt"]["pos"], null), ()=>([nixScope["opt"]["pos"]]), ()=>([({"file": nixScope["opt"]["_file"], "line": null, "column": null})]))))), "options": nixScope["submodules"]}), nixScope["typeSet"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })())));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(({"loc": nixScope["loc"], "declarations": [], "declarationPositions": [], "options": []}))(nixScope["opts"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "evalOptionValue", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "defs'", {enumerable: true, get(){return operators.listConcat((nixScope["optional"]((operators.hasAttr(nixScope["opt"], "default")))(({"file": nixScope["head"](nixScope["opt"]["declarations"]), "value": nixScope["mkOptionDefault"](nixScope["opt"]["default"])}))), nixScope["defs"]);}});
            Object.defineProperty(nixScope, "res", {enumerable: true, get(){return (operators.ifThenElse(operators.and(operators.selectOrDefault(nixScope["opt"], ["readOnly"], false), operators.greaterThan(nixScope["length"](nixScope["defs'"]), 1n)), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "separateDefs", {enumerable: true, get(){return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["def"], ({"value": (nixScope["mergeDefinitions"](nixScope["loc"])(nixScope["opt"]["type"])([nixScope["def"]]))["mergedValue"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs'"]);}});
            return nixScope["throw"]((new InterpolatedString(["The option `", "' is read-only, but it's set multiple times. Definition values:", ""], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["showDefs"](nixScope["separateDefs"]))])));
        } finally {
            runtime.scopeStack.pop();
        }
    })()), ()=>(nixScope["mergeDefinitions"](nixScope["loc"])(nixScope["opt"]["type"])(nixScope["defs'"]))));}});
            Object.defineProperty(nixScope, "value", {enumerable: true, get(){return (operators.ifThenElse(operators.hasAttr(nixScope["opt"], "apply"), ()=>(nixScope["opt"]["apply"](nixScope["res"]["mergedValue"])), ()=>(nixScope["res"]["mergedValue"])));}});
            Object.defineProperty(nixScope, "warnDeprecation", {enumerable: true, get(){return nixScope["warnIf"]((operators.notEqual(nixScope["opt"]["type"]["deprecationMessage"], null)))((new InterpolatedString(["The type `types.", "' of option `", "' defined in ", " is deprecated. ", ""], [()=>(nixScope["opt"]["type"]["name"]), ()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["showFiles"](nixScope["opt"]["declarations"])), ()=>(nixScope["opt"]["type"]["deprecationMessage"])])));}});
            return operators.merge(nixScope["warnDeprecation"](nixScope["opt"]), (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["value"] = nixScope["addErrorContext"]((new InterpolatedString(["while evaluating the option `", "':"], [()=>(nixScope["showOption"](nixScope["loc"]))])))(nixScope["value"]);
            obj["highestPrio"] = nixScope["res"]["defsFinal'"]["highestPrio"];
            obj["definitions"] = nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["def"]["value"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["res"]["defsFinal"]);
            obj["files"] = nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["def"]["file"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["res"]["defsFinal"]);
            obj["definitionsWithLocations"] = nixScope["res"]["defsFinal"];
            obj["isDefined"] = nixScope["res"]["isDefined"];
            obj["__toString"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["showOption"](nixScope["loc"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })());
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergeDefinitions", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["type"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "defsFinal'", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "defs'", {enumerable: true, get(){return nixScope["concatMap"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["m"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["value"], ["_type"], null), "definition"), ()=>(nixScope["value"]), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["file"] = nixScope["m"]["file"];
            obj["value"] = nixScope["value"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })()))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["addErrorContext"]((new InterpolatedString(["while evaluating definitions from `", "':"], [()=>(nixScope["m"]["file"])])))((nixScope["dischargeProperties"](nixScope["m"]["value"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]);}});
            Object.defineProperty(nixScope, "defs''", {enumerable: true, get(){return nixScope["filterOverrides'"](nixScope["defs'"]);}});
            Object.defineProperty(nixScope, "defs'''", {enumerable: true, get(){return (operators.ifThenElse(nixScope["any"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(operators.selectOrDefault(nixScope["def"], ["value", "_type"], ""), "order"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs''"]["values"]), ()=>(nixScope["sortProperties"](nixScope["defs''"]["values"])), ()=>(nixScope["defs''"]["values"])));}});
            return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["values"] = nixScope["defs'''"];
            obj["highestPrio"] = nixScope["defs''"]["highestPrio"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            Object.defineProperty(nixScope, "defsFinal", {enumerable: true, get(){return nixScope["defsFinal'"]["values"];}});
            Object.defineProperty(nixScope, "mergedValue", {enumerable: true, get(){return (operators.ifThenElse(nixScope["isDefined"], ()=>((operators.ifThenElse(nixScope["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["type"]["check"](nixScope["def"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defsFinal"]), ()=>(nixScope["type"]["merge"](nixScope["loc"])(nixScope["defsFinal"])), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "allInvalid", {enumerable: true, get(){return nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["type"]["check"](nixScope["def"]["value"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defsFinal"]);}});
            return nixScope["throw"]((new InterpolatedString(["A definition for option `", "' is not of type `", "'. Definition values:", ""], [()=>(nixScope["showOption"](nixScope["loc"])), ()=>(nixScope["type"]["description"]), ()=>(nixScope["showDefs"](nixScope["allInvalid"]))])));
        } finally {
            runtime.scopeStack.pop();
        }
    })())))), ()=>(nixScope["throw"]((new InterpolatedString(["The option `", "' was accessed but has no value defined. Try setting the option."], [()=>(nixScope["showOption"](nixScope["loc"]))]))))));}});
            Object.defineProperty(nixScope, "isDefined", {enumerable: true, get(){return operators.notEqual(nixScope["defsFinal"], []);}});
            Object.defineProperty(nixScope, "optionalValue", {enumerable: true, get(){return (operators.ifThenElse(nixScope["isDefined"], ()=>(({"value": nixScope["mergedValue"]})), ()=>({})));}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "pushDownProperties", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cfg"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["cfg"], ["_type"], ""), "merge"), ()=>(nixScope["concatMap"](nixScope["pushDownProperties"])(nixScope["cfg"]["contents"])), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["cfg"], ["_type"], ""), "if"), ()=>(nixScope["map"]((nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkIf"](nixScope["cfg"]["condition"])(nixScope["v"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))((nixScope["pushDownProperties"](nixScope["cfg"]["content"])))), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["cfg"], ["_type"], ""), "override"), ()=>(nixScope["map"]((nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOverride"](nixScope["cfg"]["priority"])(nixScope["v"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))((nixScope["pushDownProperties"](nixScope["cfg"]["content"])))), ()=>([nixScope["cfg"]]))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "dischargeProperties", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["def"], ["_type"], ""), "merge"), ()=>(nixScope["concatMap"](nixScope["dischargeProperties"])(nixScope["def"]["contents"])), ()=>((operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["def"], ["_type"], ""), "if"), ()=>((operators.ifThenElse(nixScope["isBool"](nixScope["def"]["condition"]), ()=>((operators.ifThenElse(nixScope["def"]["condition"], ()=>(nixScope["dischargeProperties"](nixScope["def"]["content"])), ()=>([])))), ()=>(nixScope["throw"]("‘mkIf’ called with a non-Boolean condition"))))), ()=>([nixScope["def"]])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "filterOverrides", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (nixScope["filterOverrides'"](nixScope["defs"]))["values"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "filterOverrides'", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "getPrio", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["def"], ["value", "_type"], ""), "override"), ()=>(nixScope["def"]["value"]["priority"]), ()=>(nixScope["defaultOverridePriority"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "highestPrio", {enumerable: true, get(){return nixScope["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prio"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["min"]((nixScope["getPrio"](nixScope["def"])))(nixScope["prio"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(9999n)(nixScope["defs"]);}});
            Object.defineProperty(nixScope, "strip", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["def"], ["value", "_type"], ""), "override"), ()=>(operators.merge(nixScope["def"], ({"value": nixScope["def"]["value"]["content"]}))), ()=>(nixScope["def"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return ({"values": nixScope["concatMap"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["getPrio"](nixScope["def"]), nixScope["highestPrio"]), ()=>([(nixScope["strip"](nixScope["def"]))]), ()=>([]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defs"]), "highestPrio": nixScope["highestPrio"]});
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "sortProperties", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["defs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "strip", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["def"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["def"], ["value", "_type"], ""), "order"), ()=>(operators.merge(nixScope["def"], (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["value"] = nixScope["def"]["value"]["content"];
            obj["priority"] = nixScope["def"]["value"]["priority"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })())), ()=>(nixScope["def"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "defs'", {enumerable: true, get(){return nixScope["map"](nixScope["strip"])(nixScope["defs"]);}});
            Object.defineProperty(nixScope, "compare", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return operators.lessThan((operators.selectOrDefault(nixScope["a"], ["priority"], nixScope["defaultOrderPriority"])), (operators.selectOrDefault(nixScope["b"], ["priority"], nixScope["defaultOrderPriority"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return nixScope["sort"](nixScope["compare"])(nixScope["defs'"]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "fixupOptionType", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["loc"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(operators.selectOrDefault(nixScope["opt"], ["type", "getSubModules"], null), null), ()=>(operators.merge(nixScope["opt"], ({"type": operators.selectOrDefault(nixScope["opt"], ["type"], nixScope["types"]["unspecified"])}))), ()=>(operators.merge(nixScope["opt"], ({"type": nixScope["opt"]["type"]["substSubModules"](nixScope["opt"]["options"]), "options": []}))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mergeAttrDefinitionsWithPrio", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "defsByAttr", {enumerable: true, get(){return nixScope["zipAttrs"]((nixScope["concatLists"]((nixScope["concatMap"]((
    
    // args: {
    //    value,
    //}@def
    createFunc({}, "def", {}, (nixScope)=>(
                    nixScope["map"]((nixScope["mapAttrsToList"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const obj = {};
            obj[nixScope["k"]] = operators.merge(nixScope["def"], ({"value": nixScope["value"]}));
            return obj;
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))((nixScope["pushDownProperties"](nixScope["value"])))
                ))))(nixScope["opt"]["definitionsWithLocations"])))));}});
            return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "opt.type.name == \"attrsOf\" || opt.type.name == \"lazyAttrsOf\"");
        }
        return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "merging", {enumerable: true, get(){return nixScope["mergeDefinitions"]((operators.listConcat(nixScope["opt"]["loc"], [nixScope["k"]])))(nixScope["opt"]["type"]["nestedTypes"]["elemType"])(nixScope["v"]);}});
            return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["value"] = nixScope["merging"]["mergedValue"];
            obj["highestPrio"] = nixScope["merging"]["defsFinal'"]["highestPrio"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["defsByAttr"]);
    })(operators.or(operators.equal(nixScope["opt"]["type"]["name"], "attrsOf"), operators.equal(nixScope["opt"]["type"]["name"], "lazyAttrsOf")));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkIf", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["condition"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["content"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_type": "if", "condition": nixScope["condition"], "content": nixScope["content"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkAssert", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["assertion"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["message"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["content"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkIf"](((operators.ifThenElse(nixScope["assertion"], ()=>(true), ()=>(nixScope["throw"]((new InterpolatedString(["Failed assertion: ", ""], [()=>(nixScope["message"])]))))))))(nixScope["content"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkMerge", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["contents"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_type": "merge", "contents": nixScope["contents"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkDefinition", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["args"], ({"_type": "definition"})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkOverride", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["priority"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["content"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_type": "override", "priority": nixScope["priority"], "content": nixScope["content"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkOptionDefault", {enumerable: true, get(){return nixScope["mkOverride"](1500n);}});
            Object.defineProperty(nixScope, "mkDefault", {enumerable: true, get(){return nixScope["mkOverride"](1000n);}});
            Object.defineProperty(nixScope, "mkImageMediaOverride", {enumerable: true, get(){return nixScope["mkOverride"](60n);}});
            Object.defineProperty(nixScope, "mkForce", {enumerable: true, get(){return nixScope["mkOverride"](50n);}});
            Object.defineProperty(nixScope, "mkVMOverride", {enumerable: true, get(){return nixScope["mkOverride"](10n);}});
            Object.defineProperty(nixScope, "defaultPriority", {enumerable: true, get(){return nixScope["warnIf"]((nixScope["oldestSupportedReleaseIsAtLeast"](2305n)))("lib.modules.defaultPriority is deprecated, please use lib.modules.defaultOverridePriority instead.")(nixScope["defaultOverridePriority"]);}});
            Object.defineProperty(nixScope, "mkFixStrictness", {enumerable: true, get(){return nixScope["warn"]("lib.mkFixStrictness has no effect and will be removed. It returns its argument unmodified, so you can just remove any calls.")(nixScope["id"]);}});
            Object.defineProperty(nixScope, "mkOrder", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["priority"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["content"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_type": "order", "priority": nixScope["priority"], "content": nixScope["content"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkBefore", {enumerable: true, get(){return nixScope["mkOrder"](500n);}});
            Object.defineProperty(nixScope, "mkAfter", {enumerable: true, get(){return nixScope["mkOrder"](1500n);}});
            Object.defineProperty(nixScope, "mkAliasDefinitions", {enumerable: true, get(){return nixScope["mkAliasAndWrapDefinitions"](nixScope["id"]);}});
            Object.defineProperty(nixScope, "mkAliasAndWrapDefinitions", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["wrap"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["option"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkAliasIfDef"](nixScope["option"])((nixScope["wrap"]((nixScope["mkMerge"](nixScope["option"]["definitions"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkAliasAndWrapDefsWithPriority", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["wrap"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["option"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "prio", {enumerable: true, get(){return operators.selectOrDefault(nixScope["option"], ["highestPrio"], nixScope["defaultOverridePriority"]);}});
            Object.defineProperty(nixScope, "defsWithPrio", {enumerable: true, get(){return nixScope["map"]((nixScope["mkOverride"](nixScope["prio"])))(nixScope["option"]["definitions"]);}});
            return nixScope["mkAliasIfDef"](nixScope["option"])((nixScope["wrap"]((nixScope["mkMerge"](nixScope["defsWithPrio"])))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkAliasIfDef", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["option"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkIf"]((operators.and(nixScope["isOption"](nixScope["option"]), nixScope["option"]["isDefined"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "fixMergeModules", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modules"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["evalModules"](({"modules": nixScope["modules"], "args": nixScope["args"], "check": false})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkRemovedOptionModule", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["optionName"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["replacementInstructions"] = arg; runtime.scopeStack.push(nixScope); try { return 
    
    // args: {
    //    options,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    (function(){
            const obj = {};
            obj["options"] = nixScope["setAttrByPath"](nixScope["optionName"])((nixScope["mkOption"](({"visible": false, "apply": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["throw"]((new InterpolatedString(["The option `", "' can no longer be used since it's been removed. ", ""], [()=>(nixScope["showOption"](nixScope["optionName"])), ()=>(nixScope["replacementInstructions"])]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}))));
            if (obj["config"] === undefined) obj["config"] = {};
            obj["config"]["assertions"] = (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "opt", {enumerable: true, get(){return nixScope["getAttrFromPath"](nixScope["optionName"])(nixScope["options"]);}});
                return [({"assertion": operators.negate(nixScope["opt"]["isDefined"]), "message": (new InterpolatedString(["\n              The option definition \\`", "' in ", " no longer has any effect; please remove it.\n              ", "\n            "], [()=>(nixScope["showOption"](nixScope["optionName"])), ()=>(nixScope["showFiles"](nixScope["opt"]["files"])), ()=>(nixScope["replacementInstructions"])]))})];
            } finally {
                runtime.scopeStack.pop();
            }
        })();
            return obj;
        })()
                )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkRenamedOptionModule", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["from"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["to"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["doRename"](({"from": nixScope["from"], "to": nixScope["to"], "visible": false, "warn": true, "use": nixScope["trace"]((new InterpolatedString(["Obsolete option `", "' is used. It was renamed to `", "'."], [()=>(nixScope["showOption"](nixScope["from"])), ()=>(nixScope["showOption"](nixScope["to"]))])))})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkRenamedOptionModuleWith", {enumerable: true, get(){return 
    
    // args: {
    //    from,
    //    to,
    //    sinceRelease,
    //    ,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    nixScope["doRename"](({"from": nixScope["from"], "to": nixScope["to"], "visible": false, "warn": nixScope["oldestSupportedReleaseIsAtLeast"](nixScope["sinceRelease"]), "use": nixScope["warnIf"]((nixScope["oldestSupportedReleaseIsAtLeast"](nixScope["sinceRelease"])))((new InterpolatedString(["Obsolete option `", "' is used. It was renamed to `", "'."], [()=>(nixScope["showOption"](nixScope["from"])), ()=>(nixScope["showOption"](nixScope["to"]))])))}))
                ));}});
            Object.defineProperty(nixScope, "mkMergedOptionModule", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["from"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["to"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["mergeFn"] = arg; runtime.scopeStack.push(nixScope); try { return 
    
    // args: {
    //    config,
    //    options,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ({"options": nixScope["foldl'"](nixScope["recursiveUpdate"])({})((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["setAttrByPath"](nixScope["path"])((nixScope["mkOption"](({"visible": false, "default": "_mkMergedOptionModule"})))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["from"]))), "config": operators.merge(({"warnings": nixScope["filter"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual(nixScope["x"], ""); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
            const nixScope = {...runtime.scopeStack.slice(-1)[0]};
            runtime.scopeStack.push(nixScope);
            try {
                Object.defineProperty(nixScope, "val", {enumerable: true, get(){return nixScope["getAttrFromPath"](nixScope["f"])(nixScope["config"]);}});
                Object.defineProperty(nixScope, "opt", {enumerable: true, get(){return nixScope["getAttrFromPath"](nixScope["f"])(nixScope["options"]);}});
                return nixScope["optionalString"]((operators.notEqual(nixScope["val"], "_mkMergedOptionModule")))((new InterpolatedString(["The option `", "' defined in ", " has been changed to `", "' that has a different type. Please read `", "' documentation and update your configuration accordingly."], [()=>(nixScope["showOption"](nixScope["f"])), ()=>(nixScope["showFiles"](nixScope["opt"]["files"])), ()=>(nixScope["showOption"](nixScope["to"])), ()=>(nixScope["showOption"](nixScope["to"]))])));
            } finally {
                runtime.scopeStack.pop();
            }
        })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["from"])))}), nixScope["setAttrByPath"](nixScope["to"])((nixScope["mkMerge"]((nixScope["optional"]((nixScope["any"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual((nixScope["getAttrFromPath"](nixScope["f"])(nixScope["config"])), "_mkMergedOptionModule"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["from"])))((nixScope["mergeFn"](nixScope["config"]))))))))})
                )); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkChangedOptionModule", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["from"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["to"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["changeFn"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkMergedOptionModule"]([nixScope["from"]])(nixScope["to"])(nixScope["changeFn"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkAliasOptionModule", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["from"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["to"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["doRename"](({"from": nixScope["from"], "to": nixScope["to"], "visible": true, "warn": false, "use": nixScope["id"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "mkAliasOptionModuleMD", {enumerable: true, get(){return nixScope["mkAliasOptionModule"];}});
            Object.defineProperty(nixScope, "mkDerivedConfig", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["opt"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkOverride"]((operators.selectOrDefault(nixScope["opt"], ["highestPrio"], nixScope["defaultOverridePriority"])))((nixScope["f"](nixScope["opt"]["value"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "doRename", {enumerable: true, get(){return 
    
    // args: {
    //    from,
    //    to,
    //    visible,
    //    warn,
    //    use,
    //    withPriority,
    //    condition,
    //    ,
    //}
    createFunc({"withPriority": (nixScope)=>(true),"condition": (nixScope)=>(true),}, null, {}, (nixScope)=>(
                    
        
        // args: {
        //    config,
        //    options,
        //}
        createFunc({}, null, {}, (nixScope)=>(
                        (function(){
                const nixScope = {...runtime.scopeStack.slice(-1)[0]};
                runtime.scopeStack.push(nixScope);
                try {
                    Object.defineProperty(nixScope, "fromOpt", {enumerable: true, get(){return nixScope["getAttrFromPath"](nixScope["from"])(nixScope["options"]);}});
                    Object.defineProperty(nixScope, "toOf", {enumerable: true, get(){return nixScope["attrByPath"](nixScope["to"])((nixScope["abort"]((new InterpolatedString(["Renaming error: option `", "' does not exist."], [()=>(nixScope["showOption"](nixScope["to"]))])))));}});
                    Object.defineProperty(nixScope, "toType", {enumerable: true, get(){return (function(){
                const nixScope = {...runtime.scopeStack.slice(-1)[0]};
                runtime.scopeStack.push(nixScope);
                try {
                    Object.defineProperty(nixScope, "opt", {enumerable: true, get(){return nixScope["attrByPath"](nixScope["to"])({})(nixScope["options"]);}});
                    return operators.selectOrDefault(nixScope["opt"], ["type"], (nixScope["types"]["submodule"]({})));
                } finally {
                    runtime.scopeStack.pop();
                }
            })();}});
                    return ({"options": nixScope["setAttrByPath"](nixScope["from"])((operators.merge(nixScope["mkOption"](({"visible": nixScope["visible"], "description": (new InterpolatedString(["Alias of {option}`", "`."], [()=>(nixScope["showOption"](nixScope["to"]))])), "apply": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["use"]((nixScope["toOf"](nixScope["config"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})), nixScope["optionalAttrs"]((operators.notEqual(nixScope["toType"], null)))(({"type": nixScope["toType"]}))))), "config": nixScope["mkIf"](nixScope["condition"])((nixScope["mkMerge"]([(nixScope["optionalAttrs"]((operators.hasAttr(nixScope["options"], "warnings")))(({"warnings": nixScope["optional"]((operators.and(nixScope["warn"], nixScope["fromOpt"]["isDefined"])))((new InterpolatedString(["The option `", "' defined in ", " has been renamed to `", "'."], [()=>(nixScope["showOption"](nixScope["from"])), ()=>(nixScope["showFiles"](nixScope["fromOpt"]["files"])), ()=>(nixScope["showOption"](nixScope["to"]))])))}))),((operators.ifThenElse(nixScope["withPriority"], ()=>(nixScope["mkAliasAndWrapDefsWithPriority"]((nixScope["setAttrByPath"](nixScope["to"])))(nixScope["fromOpt"])), ()=>(nixScope["mkAliasAndWrapDefinitions"]((nixScope["setAttrByPath"](nixScope["to"])))(nixScope["fromOpt"])))))])))});
                } finally {
                    runtime.scopeStack.pop();
                }
            })()
                    ))
                ));}});
            Object.defineProperty(nixScope, "importApply", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["modulePath"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["staticArg"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["setDefaultModuleLocation"](nixScope["modulePath"])((nixScope["import"](nixScope["modulePath"])(nixScope["staticArg"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "importJSON", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_file": nixScope["file"], "config": nixScope["lib"]["importJSON"](nixScope["file"])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "importTOML", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_file": nixScope["file"], "config": nixScope["lib"]["importTOML"](nixScope["file"])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "private", {enumerable: true, get(){return nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["warn"]((new InterpolatedString(["External use of `lib.modules.", "` is deprecated. If your use case isn't covered by non-deprecated functions, we'd like to know more and perhaps support your use case well, instead of providing access to these low level functions. In this case please open an issue in https://github.com/nixos/nixpkgs/issues/."], [()=>(nixScope["k"])]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(({"applyModuleArgsIfFunction": nixScope["applyModuleArgsIfFunction"], "dischargeProperties": nixScope["dischargeProperties"], "mergeModules": nixScope["mergeModules"], "mergeModules'": nixScope["mergeModules'"], "pushDownProperties": nixScope["pushDownProperties"], "unifyModuleSyntax": nixScope["unifyModuleSyntax"], "collectModules": nixScope["collectModules"](null)}));}});
            Object.defineProperty(nixScope, "messages", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["concatMapStringsSep"] = nixScope["lib"]["strings"]["concatMapStringsSep"];
            nixScope["escapeNixString"] = nixScope["lib"]["strings"]["escapeNixString"];
            nixScope["trim"] = nixScope["lib"]["strings"]["trim"];
            Object.defineProperty(nixScope, "into_fallback_file_maybe", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["file"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["optionalString"]((operators.and(operators.notEqual(nixScope["file"], null), operators.notEqual(nixScope["file"], nixScope["unknownModule"]))))((new InterpolatedString([", while trying to load a module into ", ""], [()=>(nixScope["toString"](nixScope["file"]))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "into_prefix_maybe", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["prefix"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["optionalString"]((operators.notEqual(nixScope["prefix"], [])))((new InterpolatedString([", while trying to load a module into ", ""], [()=>(nixScope["code"]((nixScope["showOption"](nixScope["prefix"]))))]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "lines", {enumerable: true, get(){return nixScope["concatMapStringsSep"]("")(nixScope["trim"]);}});
            Object.defineProperty(nixScope, "paragraphs", {enumerable: true, get(){return nixScope["concatMapStringsSep"]("")(nixScope["trim"]);}});
            Object.defineProperty(nixScope, "optionalMatch", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cases"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.and(nixScope["isString"](nixScope["value"]), operators.hasAttr(nixScope["cases"], nixScope["value"])), ()=>([nixScope["cases"][nixScope["value"]]]), ()=>([]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "esc", {enumerable: true, get(){return nixScope["builtins"]["fromJSON"]("u001b");}});
            Object.defineProperty(nixScope, "warn", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["s"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", "[1;35m", "", "[0m"], [()=>(nixScope["esc"]), ()=>(nixScope["s"]), ()=>(nixScope["esc"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "good", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["s"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", "[1;32m", "", "[0m"], [()=>(nixScope["esc"]), ()=>(nixScope["s"]), ()=>(nixScope["esc"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "code", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["s"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["", "[1m", "", "[0m"], [()=>(nixScope["esc"]), ()=>(nixScope["s"]), ()=>(nixScope["esc"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return ({"not_a_module": 
    
    // args: {
    //    fallbackFile,
    //    value,
    //    _type,
    //    expectedClass,
    //    prefix,
    //    ,
    //}
    createFunc({"expectedClass": (nixScope)=>(null),}, null, {}, (nixScope)=>(
                    nixScope["paragraphs"]((operators.listConcat([(new InterpolatedString(["\n              Expected a module, but found a value of type ", "", "", ".\n              A module is typically loaded by adding it to the ", " attribute of an existing module, or in the ", " argument of various functions.\n              Please make sure that each of the list items is a module, and not a different kind of value.\n            "], [()=>(nixScope["warn"]((nixScope["escapeNixString"](nixScope["_type"])))), ()=>(nixScope["into_fallback_file_maybe"](nixScope["fallbackFile"])), ()=>(nixScope["into_prefix_maybe"](nixScope["prefix"])), ()=>(nixScope["code"]("imports = [ ... ];")), ()=>(nixScope["code"]("modules = [ ... ];"))]))], (nixScope["optionalMatch"](({"configuration": nixScope["trim"](`
                      If you really mean to import this configuration, instead please only import the modules that make up the configuration.
                      You may have to create a \`let\` binding, file or attribute to give yourself access to the relevant modules.
                      While loading a configuration into the module system is a very sensible idea, it can not be done cleanly in practice.
                    `), "flake": nixScope["lines"]((operators.listConcat([(nixScope["trim"]((new InterpolatedString(["\n                  Perhaps you forgot to select an attribute name?\n                  Instead of, for example,\n                      ", "\n                  you need to write something like\n                      ", "", "\n                "], [()=>(nixScope["warn"]("inputs.someflake")), ()=>(nixScope["warn"]("inputs.someflake")), ()=>((operators.ifThenElse(operators.equal(nixScope["expectedClass"], null), ()=>(nixScope["good"](".modules.someApp.default")), ()=>(nixScope["good"]((new InterpolatedString([".modules.", ".default"], [()=>(nixScope["expectedClass"])])))))))]))))], nixScope["optionalMatch"](({"nixos": nixScope["trim"]((new InterpolatedString(["\n                  or\n                      ", "", "\n                "], [()=>(nixScope["warn"]("inputs.someflake")), ()=>(nixScope["good"](".nixosModules.default"))]))), "darwin": nixScope["trim"]((new InterpolatedString(["\n                  or\n                      ", "", "\n                "], [()=>(nixScope["warn"]("inputs.someflake")), ()=>(nixScope["good"](".darwinModules.default"))])))}))(nixScope["expectedClass"]))))}))(nixScope["_type"])))))
                ))});
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            return operators.merge(nixScope["private"], ({"defaultOrderPriority": nixScope["defaultOrderPriority"], "defaultOverridePriority": nixScope["defaultOverridePriority"], "defaultPriority": nixScope["defaultPriority"], "doRename": nixScope["doRename"], "evalModules": nixScope["evalModules"], "evalOptionValue": nixScope["evalOptionValue"], "filterOverrides": nixScope["filterOverrides"], "filterOverrides'": nixScope["filterOverrides'"], "fixMergeModules": nixScope["fixMergeModules"], "fixupOptionType": nixScope["fixupOptionType"], "importApply": nixScope["importApply"], "importJSON": nixScope["importJSON"], "importTOML": nixScope["importTOML"], "mergeDefinitions": nixScope["mergeDefinitions"], "mergeAttrDefinitionsWithPrio": nixScope["mergeAttrDefinitionsWithPrio"], "mergeOptionDecls": nixScope["mergeOptionDecls"], "mkAfter": nixScope["mkAfter"], "mkAliasAndWrapDefinitions": nixScope["mkAliasAndWrapDefinitions"], "mkAliasAndWrapDefsWithPriority": nixScope["mkAliasAndWrapDefsWithPriority"], "mkAliasDefinitions": nixScope["mkAliasDefinitions"], "mkAliasIfDef": nixScope["mkAliasIfDef"], "mkAliasOptionModule": nixScope["mkAliasOptionModule"], "mkAliasOptionModuleMD": nixScope["mkAliasOptionModuleMD"], "mkAssert": nixScope["mkAssert"], "mkBefore": nixScope["mkBefore"], "mkChangedOptionModule": nixScope["mkChangedOptionModule"], "mkDefault": nixScope["mkDefault"], "mkDefinition": nixScope["mkDefinition"], "mkDerivedConfig": nixScope["mkDerivedConfig"], "mkFixStrictness": nixScope["mkFixStrictness"], "mkForce": nixScope["mkForce"], "mkIf": nixScope["mkIf"], "mkImageMediaOverride": nixScope["mkImageMediaOverride"], "mkMerge": nixScope["mkMerge"], "mkMergedOptionModule": nixScope["mkMergedOptionModule"], "mkOptionDefault": nixScope["mkOptionDefault"], "mkOrder": nixScope["mkOrder"], "mkOverride": nixScope["mkOverride"], "mkRemovedOptionModule": nixScope["mkRemovedOptionModule"], "mkRenamedOptionModule": nixScope["mkRenamedOptionModule"], "mkRenamedOptionModuleWith": nixScope["mkRenamedOptionModuleWith"], "mkVMOverride": nixScope["mkVMOverride"], "setDefaultModuleLocation": nixScope["setDefaultModuleLocation"], "sortProperties": nixScope["sortProperties"]}));
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))