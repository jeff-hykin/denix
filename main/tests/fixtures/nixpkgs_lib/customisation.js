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
            nixScope["intersectAttrs"] = nixScope["builtins"]["intersectAttrs"];
            nixScope["functionArgs"] = nixScope["lib"]["functionArgs"];
            nixScope["isFunction"] = nixScope["lib"]["isFunction"];
            nixScope["mirrorFunctionArgs"] = nixScope["lib"]["mirrorFunctionArgs"];
            nixScope["isAttrs"] = nixScope["lib"]["isAttrs"];
            nixScope["setFunctionArgs"] = nixScope["lib"]["setFunctionArgs"];
            nixScope["optionalAttrs"] = nixScope["lib"]["optionalAttrs"];
            nixScope["attrNames"] = nixScope["lib"]["attrNames"];
            nixScope["filter"] = nixScope["lib"]["filter"];
            nixScope["elemAt"] = nixScope["lib"]["elemAt"];
            nixScope["concatStringsSep"] = nixScope["lib"]["concatStringsSep"];
            nixScope["sortOn"] = nixScope["lib"]["sortOn"];
            nixScope["take"] = nixScope["lib"]["take"];
            nixScope["length"] = nixScope["lib"]["length"];
            nixScope["filterAttrs"] = nixScope["lib"]["filterAttrs"];
            nixScope["optionalString"] = nixScope["lib"]["optionalString"];
            nixScope["flip"] = nixScope["lib"]["flip"];
            nixScope["pathIsDirectory"] = nixScope["lib"]["pathIsDirectory"];
            nixScope["head"] = nixScope["lib"]["head"];
            nixScope["pipe"] = nixScope["lib"]["pipe"];
            nixScope["isDerivation"] = nixScope["lib"]["isDerivation"];
            nixScope["listToAttrs"] = nixScope["lib"]["listToAttrs"];
            nixScope["mapAttrs"] = nixScope["lib"]["mapAttrs"];
            nixScope["seq"] = nixScope["lib"]["seq"];
            nixScope["flatten"] = nixScope["lib"]["flatten"];
            nixScope["deepSeq"] = nixScope["lib"]["deepSeq"];
            nixScope["extends"] = nixScope["lib"]["extends"];
            nixScope["toFunction"] = nixScope["lib"]["toFunction"];
            nixScope["id"] = nixScope["lib"]["id"];
            nixScope["levenshtein"] = nixScope["lib"]["strings"]["levenshtein"];
            nixScope["levenshteinAtMost"] = nixScope["lib"]["strings"]["levenshteinAtMost"];
            return (function(){
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "overrideDerivation", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["drv"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "newDrv", {enumerable: true, get(){return nixScope["derivation"]((operators.merge(nixScope["drv"]["drvAttrs"], (nixScope["f"](nixScope["drv"])))));}});
            return nixScope["flip"]((nixScope["extendDerivation"]((nixScope["seq"](nixScope["drv"]["drvPath"])(true)))))(nixScope["newDrv"])((operators.merge(({"meta": operators.selectOrDefault(nixScope["drv"], ["meta"], {}), "passthru": (operators.ifThenElse(operators.hasAttr(nixScope["drv"], "passthru"), ()=>(nixScope["drv"]["passthru"]), ()=>({})))}), operators.merge((operators.selectOrDefault(nixScope["drv"], ["passthru"], {})), nixScope["optionalAttrs"]((operators.hasAttr(nixScope["drv"], "__spliced")))(({"__spliced": operators.merge({}, (nixScope["mapAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["sDrv"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["overrideDerivation"](nixScope["sDrv"])(nixScope["f"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["drv"]["__spliced"])))}))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "makeOverridable", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "mirrorArgs", {enumerable: true, get(){return nixScope["mirrorFunctionArgs"](nixScope["f"]);}});
            return nixScope["mirrorArgs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["origArgs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "result", {enumerable: true, get(){return nixScope["f"](nixScope["origArgs"]);}});
            Object.defineProperty(nixScope, "overrideWith", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["newArgs"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["origArgs"], ((operators.ifThenElse(nixScope["isFunction"](nixScope["newArgs"]), ()=>(nixScope["newArgs"](nixScope["origArgs"])), ()=>(nixScope["newArgs"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "overrideArgs", {enumerable: true, get(){return nixScope["mirrorArgs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["newArgs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["makeOverridable"](nixScope["f"])((nixScope["overrideWith"](nixScope["newArgs"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));}});
            Object.defineProperty(nixScope, "overrideResult", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["g"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["makeOverridable"]((nixScope["mirrorArgs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["g"]((nixScope["f"](nixScope["args"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))(nixScope["origArgs"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (operators.ifThenElse(nixScope["isAttrs"](nixScope["result"]), ()=>(operators.merge(nixScope["result"], (function(){
        const obj = {};
        obj["override"] = nixScope["overrideArgs"];
        obj["overrideDerivation"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fdrv"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["overrideResult"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["overrideDerivation"](nixScope["x"])(nixScope["fdrv"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        obj[(operators.ifThenElse(operators.hasAttr(nixScope["result"], "overrideAttrs"), ()=>("overrideAttrs"), ()=>(null)))] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fdrv"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["overrideResult"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]["overrideAttrs"](nixScope["fdrv"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        return obj;
    })())), ()=>((operators.ifThenElse(nixScope["isFunction"](nixScope["result"]), ()=>(operators.merge(nixScope["setFunctionArgs"](nixScope["result"])((nixScope["functionArgs"](nixScope["result"]))), ({"override": nixScope["overrideArgs"]}))), ()=>(nixScope["result"]))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "callPackageWith", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["autoArgs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fn"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "f", {enumerable: true, get(){return (operators.ifThenElse(nixScope["isFunction"](nixScope["fn"]), ()=>(nixScope["fn"]), ()=>(nixScope["import"](nixScope["fn"]))));}});
            Object.defineProperty(nixScope, "fargs", {enumerable: true, get(){return nixScope["functionArgs"](nixScope["f"]);}});
            Object.defineProperty(nixScope, "allArgs", {enumerable: true, get(){return operators.merge(nixScope["intersectAttrs"](nixScope["fargs"])(nixScope["autoArgs"]), nixScope["args"]);}});
            Object.defineProperty(nixScope, "missingArgs", {enumerable: true, get(){return (nixScope["filterAttrs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return operators.negate(nixScope["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["removeAttrs"](nixScope["fargs"])((nixScope["attrNames"](nixScope["allArgs"]))))));}});
            Object.defineProperty(nixScope, "getSuggestions", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["arg"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["pipe"]((operators.merge(nixScope["autoArgs"], nixScope["args"])))([nixScope["attrNames"],(nixScope["filter"]((nixScope["levenshteinAtMost"](2n)(nixScope["arg"])))),(nixScope["sortOn"]((nixScope["levenshtein"](nixScope["arg"])))),(nixScope["take"](3n)),(nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(operators.add("", nixScope["x"]), ""); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))))]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "prettySuggestions", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["suggestions"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["suggestions"], []), ()=>(""), ()=>((operators.ifThenElse(operators.equal(nixScope["length"](nixScope["suggestions"]), 1n), ()=>((new InterpolatedString([", did you mean ", "?"], [()=>(nixScope["elemAt"](nixScope["suggestions"])(0n))]))), ()=>((new InterpolatedString([", did you mean ", " or ", "?"], [()=>(nixScope["concatStringsSep"](", ")((nixScope["lib"]["init"](nixScope["suggestions"])))), ()=>(nixScope["lib"]["last"](nixScope["suggestions"]))])))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "errorForArg", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["arg"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "loc", {enumerable: true, get(){return nixScope["builtins"]["unsafeGetAttrPos"](nixScope["arg"])(nixScope["fargs"]);}});
            Object.defineProperty(nixScope, "loc'", {enumerable: true, get(){return (operators.ifThenElse(operators.notEqual(nixScope["loc"], null), ()=>(operators.add(operators.add(nixScope["loc"]["file"], ":"), nixScope["toString"](nixScope["loc"]["line"]))), ()=>((operators.ifThenElse(operators.negate(nixScope["isFunction"](nixScope["fn"])), ()=>(nixScope["toString"]((nixScope["lib"]["filesystem"]["resolveDefaultNix"](nixScope["fn"])))), ()=>("<unknown location>"))))));}});
            return operators.add((new InterpolatedString(["Function called without required argument ", " at "], [()=>(nixScope["arg"])])), (new InterpolatedString(["", "", ""], [()=>(nixScope["loc'"]), ()=>(nixScope["prettySuggestions"]((nixScope["getSuggestions"](nixScope["arg"]))))])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "error", {enumerable: true, get(){return nixScope["errorForArg"]((nixScope["head"]((nixScope["attrNames"](nixScope["missingArgs"])))));}});
            return (operators.ifThenElse(operators.equal(nixScope["missingArgs"], {}), ()=>(nixScope["makeOverridable"](nixScope["f"])(nixScope["allArgs"])), ()=>(nixScope["abort"]((new InterpolatedString(["lib.customisation.callPackageWith: ", ""], [()=>(nixScope["error"])]))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "callPackagesWith", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["autoArgs"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fn"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "f", {enumerable: true, get(){return (operators.ifThenElse(nixScope["isFunction"](nixScope["fn"]), ()=>(nixScope["fn"]), ()=>(nixScope["import"](nixScope["fn"]))));}});
            Object.defineProperty(nixScope, "auto", {enumerable: true, get(){return nixScope["intersectAttrs"]((nixScope["functionArgs"](nixScope["f"])))(nixScope["autoArgs"]);}});
            Object.defineProperty(nixScope, "mirrorArgs", {enumerable: true, get(){return nixScope["mirrorFunctionArgs"](nixScope["f"]);}});
            Object.defineProperty(nixScope, "origArgs", {enumerable: true, get(){return operators.merge(nixScope["auto"], nixScope["args"]);}});
            Object.defineProperty(nixScope, "pkgs", {enumerable: true, get(){return nixScope["f"](nixScope["origArgs"]);}});
            Object.defineProperty(nixScope, "mkAttrOverridable", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["makeOverridable"]((nixScope["mirrorArgs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["newArgs"] = arg; runtime.scopeStack.push(nixScope); try { return (nixScope["f"](nixScope["newArgs"]))[nixScope["name"]]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))))(nixScope["origArgs"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (operators.ifThenElse(nixScope["isDerivation"](nixScope["pkgs"]), ()=>(nixScope["throw"]((operators.add(operators.add("function `callPackages` was called on a *single* derivation ", (new InterpolatedString(["\"", "\";"], [()=>(operators.selectOrDefault(nixScope["pkgs"], ["name"], "<unknown-name>"))]))), " did you mean to use `callPackage` instead?")))), ()=>(nixScope["mapAttrs"](nixScope["mkAttrOverridable"])(nixScope["pkgs"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "extendDerivation", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["condition"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["passthru"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["drv"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "outputs", {enumerable: true, get(){return operators.selectOrDefault(nixScope["drv"], ["outputs"], ["out"]);}});
            Object.defineProperty(nixScope, "commonAttrs", {enumerable: true, get(){return operators.merge(nixScope["drv"], operators.merge((nixScope["listToAttrs"](nixScope["outputsList"])), operators.merge((({"all": nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]["value"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["outputsList"])})), nixScope["passthru"])));}});
            Object.defineProperty(nixScope, "outputToAttrListElement", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["outputName"] = arg; runtime.scopeStack.push(nixScope); try { return ({"name": nixScope["outputName"], "value": operators.merge(nixScope["commonAttrs"], operators.merge((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["type"] = nixScope["drv"][nixScope["outputName"]]["type"];
            obj["outputName"] = nixScope["drv"][nixScope["outputName"]]["outputName"];
            obj["outputSpecified"] = true;
            obj["drvPath"] = ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "condition");
        }
        return nixScope["drv"][nixScope["outputName"]]["drvPath"];
    })(nixScope["condition"]);
            obj["outPath"] = ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "condition");
        }
        return nixScope["drv"][nixScope["outputName"]]["outPath"];
    })(nixScope["condition"]);
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })(), nixScope["optionalAttrs"]((operators.hasAttr(nixScope["passthru"], "overrideAttrs")))(({"overrideAttrs": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (nixScope["passthru"]["overrideAttrs"](nixScope["f"]))[nixScope["outputName"]]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}))))}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "outputsList", {enumerable: true, get(){return nixScope["map"](nixScope["outputToAttrListElement"])(nixScope["outputs"]);}});
            return operators.merge(nixScope["commonAttrs"], ({"drvPath": ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "condition");
        }
        return nixScope["drv"]["drvPath"];
    })(nixScope["condition"]), "outPath": ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "condition");
        }
        return nixScope["drv"]["outPath"];
    })(nixScope["condition"])}));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "hydraJob", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["drv"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "outputs", {enumerable: true, get(){return operators.selectOrDefault(nixScope["drv"], ["outputs"], ["out"]);}});
            Object.defineProperty(nixScope, "commonAttrs", {enumerable: true, get(){return operators.merge((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["name"] = nixScope["drv"]["name"];
            obj["system"] = nixScope["drv"]["system"];
            obj["meta"] = nixScope["drv"]["meta"];
            obj["outputs"] = nixScope["outputs"];
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })(), operators.merge(nixScope["optionalAttrs"]((operators.selectOrDefault(nixScope["drv"], ["_hydraAggregate"], false)))(({"_hydraAggregate": true, "constituents": nixScope["map"](nixScope["hydraJob"])((nixScope["flatten"](nixScope["drv"]["constituents"])))})), (nixScope["listToAttrs"](nixScope["outputsList"]))));}});
            Object.defineProperty(nixScope, "makeOutput", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["outputName"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "output", {enumerable: true, get(){return nixScope["drv"][nixScope["outputName"]];}});
            return ({"name": nixScope["outputName"], "value": operators.merge(nixScope["commonAttrs"], ({"outPath": nixScope["output"]["outPath"], "drvPath": nixScope["output"]["drvPath"], "type": "derivation", "outputName": nixScope["outputName"]}))});
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "outputsList", {enumerable: true, get(){return nixScope["map"](nixScope["makeOutput"])(nixScope["outputs"]);}});
            Object.defineProperty(nixScope, "drv'", {enumerable: true, get(){return (nixScope["head"](nixScope["outputsList"]))["value"];}});
            return (operators.ifThenElse(operators.equal(nixScope["drv"], null), ()=>(null), ()=>(nixScope["deepSeq"](nixScope["drv'"])(nixScope["drv'"]))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "makeScope", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["newScope"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "self", {enumerable: true, get(){return operators.merge(nixScope["f"](nixScope["self"]), ({"newScope": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["scope"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["newScope"]((operators.merge(nixScope["self"], nixScope["scope"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "callPackage": nixScope["self"]["newScope"]({}), "overrideScope": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["g"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["makeScope"](nixScope["newScope"])((nixScope["extends"](nixScope["g"])(nixScope["f"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "packages": nixScope["f"]}));}});
            return nixScope["self"];
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "makeScopeWithSplicing", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["splicePackages"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["newScope"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["otherSplices"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["keep"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["extra"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["makeScopeWithSplicing'"](({"splicePackages": nixScope["splicePackages"], "newScope": nixScope["newScope"]}))(({"otherSplices": nixScope["otherSplices"], "keep": nixScope["keep"], "extra": nixScope["extra"], "f": nixScope["f"]})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            Object.defineProperty(nixScope, "makeScopeWithSplicing'", {enumerable: true, get(){return 
    
    // args: {
    //    splicePackages,
    //    newScope,
    //    ,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    
        
        // args: {
        //    otherSplices,
        //    keep,
        //    extra,
        //    f,
        //    ,
        //}
        createFunc({"keep": (nixScope)=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_self"] = arg; runtime.scopeStack.push(nixScope); try { return {}; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))),"extra": (nixScope)=>(((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["_spliced0"] = arg; runtime.scopeStack.push(nixScope); try { return {}; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))),}, null, {}, (nixScope)=>(
                        (function(){
                const nixScope = {...runtime.scopeStack.slice(-1)[0]};
                runtime.scopeStack.push(nixScope);
                try {
                    Object.defineProperty(nixScope, "spliced0", {enumerable: true, get(){return nixScope["splicePackages"](({"pkgsBuildBuild": nixScope["otherSplices"]["selfBuildBuild"], "pkgsBuildHost": nixScope["otherSplices"]["selfBuildHost"], "pkgsBuildTarget": nixScope["otherSplices"]["selfBuildTarget"], "pkgsHostHost": nixScope["otherSplices"]["selfHostHost"], "pkgsHostTarget": nixScope["self"], "pkgsTargetTarget": nixScope["otherSplices"]["selfTargetTarget"]}));}});
                    Object.defineProperty(nixScope, "spliced", {enumerable: true, get(){return operators.merge(nixScope["extra"](nixScope["spliced0"]), operators.merge(nixScope["spliced0"], nixScope["keep"](nixScope["self"])));}});
                    Object.defineProperty(nixScope, "self", {enumerable: true, get(){return operators.merge(nixScope["f"](nixScope["self"]), ({"newScope": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["scope"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["newScope"]((operators.merge(nixScope["spliced"], nixScope["scope"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "callPackage": nixScope["newScope"](nixScope["spliced"]), "overrideScope": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["g"] = arg; runtime.scopeStack.push(nixScope); try { return (nixScope["makeScopeWithSplicing'"](({"splicePackages": nixScope["splicePackages"], "newScope": nixScope["newScope"]}))(({"otherSplices": nixScope["otherSplices"], "keep": nixScope["keep"], "extra": nixScope["extra"], "f": nixScope["extends"](nixScope["g"])(nixScope["f"])}))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "packages": nixScope["f"]}));}});
                    return nixScope["self"];
                } finally {
                    runtime.scopeStack.pop();
                }
            })()
                    ))
                ));}});
            Object.defineProperty(nixScope, "extendMkDerivation", {enumerable: true, get(){return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "extendsWithExclusion", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["excludedNames"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["g"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["final"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "previous", {enumerable: true, get(){return nixScope["f"](nixScope["final"]);}});
            return operators.merge(nixScope["removeAttrs"](nixScope["previous"])(nixScope["excludedNames"]), nixScope["g"](nixScope["final"])(nixScope["previous"]));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return 
    
    // args: {
    //    constructDrv,
    //    excludeDrvArgNames,
    //    extendDrvArgs,
    //    inheritFunctionArgs,
    //    transformDrv,
    //    ,
    //}
    createFunc({"excludeDrvArgNames": (nixScope)=>([]),"inheritFunctionArgs": (nixScope)=>(true),"transformDrv": (nixScope)=>(nixScope["id"]),}, null, {}, (nixScope)=>(
                    operators.merge(nixScope["setFunctionArgs"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["fpargs"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["transformDrv"]((nixScope["constructDrv"]((nixScope["extendsWithExclusion"](nixScope["excludeDrvArgNames"])(nixScope["extendDrvArgs"])((nixScope["toFunction"](nixScope["fpargs"]))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((operators.merge(nixScope["optionalAttrs"](nixScope["inheritFunctionArgs"])((nixScope["removeAttrs"]((nixScope["functionArgs"](nixScope["constructDrv"])))(nixScope["excludeDrvArgNames"]))), nixScope["functionArgs"]((nixScope["extendDrvArgs"]({})))))), ({"constructDrv": nixScope["constructDrv"], "excludeDrvArgNames": nixScope["excludeDrvArgNames"], "extendDrvArgs": nixScope["extendDrvArgs"], "transformDrv": nixScope["transformDrv"]}))
                ));
        } finally {
            runtime.scopeStack.pop();
        }
    })();}});
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))