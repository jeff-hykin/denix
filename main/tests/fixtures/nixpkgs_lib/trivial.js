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
            nixScope["isFunction"] = nixScope["lib"]["trivial"]["isFunction"];
            nixScope["isInt"] = nixScope["lib"]["trivial"]["isInt"];
            nixScope["functionArgs"] = nixScope["lib"]["trivial"]["functionArgs"];
            nixScope["pathExists"] = nixScope["lib"]["trivial"]["pathExists"];
            nixScope["release"] = nixScope["lib"]["trivial"]["release"];
            nixScope["setFunctionArgs"] = nixScope["lib"]["trivial"]["setFunctionArgs"];
            nixScope["toBaseDigits"] = nixScope["lib"]["trivial"]["toBaseDigits"];
            nixScope["version"] = nixScope["lib"]["trivial"]["version"];
            nixScope["versionSuffix"] = nixScope["lib"]["trivial"]["versionSuffix"];
            nixScope["warn"] = nixScope["lib"]["trivial"]["warn"];
            nixScope["isString"] = nixScope["lib"]["isString"];
            return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
        const obj = {};
            obj["id"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["const"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["pipe"] = nixScope["builtins"]["foldl'"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["f"](nixScope["x"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])));
            obj["concat"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return operators.listConcat(nixScope["x"], nixScope["y"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["or"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(nixScope["x"], nixScope["y"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["and"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return operators.and(nixScope["x"], nixScope["y"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["xor"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return operators.notEqual((operators.negate(nixScope["x"])), (operators.negate(nixScope["y"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["bitNot"] = nixScope["builtins"]["sub"]((-1n));
            obj["boolToString"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["b"], ()=>("true"), ()=>("false"))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["mergeAttrs"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["x"], nixScope["y"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["flip"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["f"](nixScope["b"])(nixScope["a"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["defaultTo"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["default"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["maybeValue"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.notEqual(nixScope["maybeValue"], null), ()=>(nixScope["maybeValue"]), ()=>(nixScope["default"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["mapNullable"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["a"], null), ()=>(nixScope["a"]), ()=>(nixScope["f"](nixScope["a"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["pathExists"] = nixScope["builtins"]["pathExists"];
            obj["readFile"] = nixScope["builtins"]["readFile"];
            obj["isBool"] = nixScope["builtins"]["isBool"];
            obj["isInt"] = nixScope["builtins"]["isInt"];
            obj["isFloat"] = nixScope["builtins"]["isFloat"];
            obj["add"] = nixScope["builtins"]["add"];
            obj["sub"] = nixScope["builtins"]["sub"];
            obj["lessThan"] = nixScope["builtins"]["lessThan"];
            obj["seq"] = nixScope["builtins"]["seq"];
            obj["deepSeq"] = nixScope["builtins"]["deepSeq"];
            obj["genericClosure"] = nixScope["builtins"]["genericClosure"];
            obj["bitAnd"] = nixScope["builtins"]["bitAnd"];
            obj["bitOr"] = nixScope["builtins"]["bitOr"];
            obj["bitXor"] = nixScope["builtins"]["bitXor"];
            obj["version"] = operators.add(nixScope["release"], nixScope["versionSuffix"]);
            obj["release"] = nixScope["lib"]["strings"]["fileContents"]((new Path(["./.version"], [])));
            obj["oldestSupportedRelease"] = 2505n;
            obj["isInOldestRelease"] = nixScope["lib"]["warnIf"]((nixScope["lib"]["oldestSupportedReleaseIsAtLeast"](2411n)))("lib.isInOldestRelease is deprecated. Use lib.oldestSupportedReleaseIsAtLeast instead.")(nixScope["lib"]["oldestSupportedReleaseIsAtLeast"]);
            obj["oldestSupportedReleaseIsAtLeast"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["release"] = arg; runtime.scopeStack.push(nixScope); try { return operators.lessThanOrEqual(nixScope["release"], nixScope["lib"]["trivial"]["oldestSupportedRelease"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["codeName"] = "Xantusia";
            obj["versionSuffix"] = (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["suffixFile"] = (new Path(["../.version-suffix"], []));
            return (operators.ifThenElse(nixScope["pathExists"](nixScope["suffixFile"]), ()=>(nixScope["lib"]["strings"]["fileContents"](nixScope["suffixFile"])), ()=>("pre-git")));
        } finally {
            runtime.scopeStack.pop();
        }
    })();
            obj["revisionWithDefault"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["default"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["revisionFile"] = (new InterpolatedString(["", "/.git-revision"], [()=>(nixScope["toString"]((new Path(["./.."], []))))]));
            nixScope["gitRepo"] = (new InterpolatedString(["", "/.git"], [()=>(nixScope["toString"]((new Path(["./.."], []))))]));
            return (operators.ifThenElse(nixScope["lib"]["pathIsGitRepo"](nixScope["gitRepo"]), ()=>(nixScope["lib"]["commitIdFromGitRepo"](nixScope["gitRepo"])), ()=>((operators.ifThenElse(nixScope["lib"]["pathExists"](nixScope["revisionFile"]), ()=>(nixScope["lib"]["fileContents"](nixScope["revisionFile"])), ()=>(nixScope["default"]))))));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["nixpkgsVersion"] = nixScope["warn"]("lib.nixpkgsVersion is a deprecated alias of lib.version.")(nixScope["version"]);
            obj["inNixShell"] = operators.notEqual(nixScope["builtins"]["getEnv"]("IN_NIX_SHELL"), "");
            obj["inPureEvalMode"] = operators.negate(operators.hasAttr(nixScope["builtins"], "currentSystem"));
            obj["min"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.lessThan(nixScope["x"], nixScope["y"]), ()=>(nixScope["x"]), ()=>(nixScope["y"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["max"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.greaterThan(nixScope["x"], nixScope["y"]), ()=>(nixScope["x"]), ()=>(nixScope["y"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["mod"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["base"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["int"] = arg; runtime.scopeStack.push(nixScope); try { return operators.subtract(nixScope["base"], (operators.multiply(nixScope["int"], (nixScope["builtins"]["div"](nixScope["base"])(nixScope["int"]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["compare"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.lessThan(nixScope["a"], nixScope["b"]), ()=>(-1n), ()=>((operators.ifThenElse(operators.greaterThan(nixScope["a"], nixScope["b"]), ()=>(1n), ()=>(0n)))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["splitByAndCompare"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["p"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["yes"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["no"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["a"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["b"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["p"](nixScope["a"]), ()=>((operators.ifThenElse(nixScope["p"](nixScope["b"]), ()=>(nixScope["yes"](nixScope["a"])(nixScope["b"])), ()=>(-1n)))), ()=>((operators.ifThenElse(nixScope["p"](nixScope["b"]), ()=>(1n), ()=>(nixScope["no"](nixScope["a"])(nixScope["b"]))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["importJSON"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["fromJSON"]((nixScope["builtins"]["readFile"](nixScope["path"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["importTOML"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["path"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["fromTOML"]((nixScope["builtins"]["readFile"](nixScope["path"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["warn"] = operators.selectOrDefault(nixScope["builtins"], ["warn"], ((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "mustAbort", {enumerable: true, get(){return nixScope["lib"]["elem"]((nixScope["builtins"]["getEnv"]("NIX_ABORT_ON_WARN")))(["1","true","yes"]);}});
            return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["msg"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "isString msg");
        }
        return (operators.ifThenElse(nixScope["mustAbort"], ()=>(nixScope["builtins"]["trace"]((new InterpolatedString(["\u001b[1;31mevaluation warning:\u001b[0m ", ""], [()=>(nixScope["msg"])])))((nixScope["abort"]("NIX_ABORT_ON_WARN=true; warnings are treated as unrecoverable errors.")))), ()=>(nixScope["builtins"]["trace"]((new InterpolatedString(["\u001b[1;35mevaluation warning:\u001b[0m ", ""], [()=>(nixScope["msg"])])))(nixScope["v"]))));
    })(nixScope["isString"](nixScope["msg"])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        } finally {
            runtime.scopeStack.pop();
        }
    })()));
            obj["warnIf"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cond"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["msg"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["cond"], ()=>(nixScope["warn"](nixScope["msg"])), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["warnIfNot"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cond"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["msg"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["cond"], ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])), ()=>(nixScope["warn"](nixScope["msg"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["throwIfNot"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cond"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["msg"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["cond"], ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])), ()=>(nixScope["throw"](nixScope["msg"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["throwIf"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["cond"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["msg"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["cond"], ()=>(nixScope["throw"](nixScope["msg"])), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["x"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["checkListOfEnum"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["msg"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["valid"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["given"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "unexpected", {enumerable: true, get(){return nixScope["lib"]["subtractLists"](nixScope["valid"])(nixScope["given"]);}});
            return nixScope["lib"]["throwIfNot"]((operators.equal(nixScope["unexpected"], [])))((new InterpolatedString(["", ": ", " unexpected; valid ones: ", ""], [()=>(nixScope["msg"]), ()=>(nixScope["builtins"]["concatStringsSep"](", ")((nixScope["builtins"]["map"](nixScope["builtins"]["toString"])(nixScope["unexpected"])))), ()=>(nixScope["builtins"]["concatStringsSep"](", ")((nixScope["builtins"]["map"](nixScope["builtins"]["toString"])(nixScope["valid"]))))])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["info"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["msg"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["builtins"]["trace"]((new InterpolatedString(["INFO: ", ""], [()=>(nixScope["msg"])]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["showWarnings"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["warnings"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["res"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["foldr"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["w"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["warn"](nixScope["w"])(nixScope["x"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["res"])(nixScope["warnings"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["setFunctionArgs"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return ({"__functor": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["f"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "__functionArgs": nixScope["args"]}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["functionArgs"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.hasAttr(nixScope["f"], "__functor"), ()=>(operators.selectOrDefault(nixScope["f"], ["__functionArgs"], (nixScope["functionArgs"]((nixScope["f"]["__functor"](nixScope["f"])))))), ()=>(nixScope["builtins"]["functionArgs"](nixScope["f"])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["isFunction"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return operators.or(nixScope["builtins"]["isFunction"](nixScope["f"]), (operators.and(operators.hasAttr(nixScope["f"], "__functor"), nixScope["isFunction"]((nixScope["f"]["__functor"](nixScope["f"])))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["mirrorFunctionArgs"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["f"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "fArgs", {enumerable: true, get(){return nixScope["functionArgs"](nixScope["f"]);}});
            return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["g"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["setFunctionArgs"](nixScope["g"])(nixScope["fArgs"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["toFunction"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["isFunction"](nixScope["v"]), ()=>(nixScope["v"]), ()=>((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["k"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["fromHexString"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "noPrefix", {enumerable: true, get(){return nixScope["lib"]["strings"]["removePrefix"]("0x")((nixScope["lib"]["strings"]["toLower"](nixScope["value"])));}});
            return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "parsed", {enumerable: true, get(){return nixScope["builtins"]["fromTOML"]((new InterpolatedString(["v=0x", ""], [()=>(nixScope["noPrefix"])])));}});
            return nixScope["parsed"]["v"];
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
            obj["toHexString"] = (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["hexDigits"] = ({"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"});
            Object.defineProperty(nixScope, "toHexDigit", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["d"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.lessThan(nixScope["d"], 10n), ()=>(nixScope["toString"](nixScope["d"])), ()=>(nixScope["hexDigits"][nixScope["toString"](nixScope["d"])]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["lib"]["concatMapStrings"](nixScope["toHexDigit"])((nixScope["toBaseDigits"](16n)(nixScope["i"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        } finally {
            runtime.scopeStack.pop();
        }
    })();
            obj["toBaseDigits"] = (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["base"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "go", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["i"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.lessThan(nixScope["i"], nixScope["base"]), ()=>([nixScope["i"]]), ()=>((function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            Object.defineProperty(nixScope, "r", {enumerable: true, get(){return operators.subtract(nixScope["i"], (operators.multiply((operators.divide(nixScope["i"], nixScope["base"])), nixScope["base"])));}});
            Object.defineProperty(nixScope, "q", {enumerable: true, get(){return operators.divide((operators.subtract(nixScope["i"], nixScope["r"])), nixScope["base"]);}});
            return operators.listConcat([nixScope["r"]], nixScope["go"](nixScope["q"]));
        } finally {
            runtime.scopeStack.pop();
        }
    })()))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
            return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(isInt base)");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(isInt i)");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(base >= 2)");
        }
        return ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "(i >= 0)");
        }
        return nixScope["lib"]["reverseList"]((nixScope["go"](nixScope["i"])));
    })((operators.greaterThanOrEqual(nixScope["i"], 0n)));
    })((operators.greaterThanOrEqual(nixScope["base"], 2n)));
    })((nixScope["isInt"](nixScope["i"])));
    })((nixScope["isInt"](nixScope["base"])));
        } finally {
            runtime.scopeStack.pop();
        }
    })(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);
        return obj;
        } finally {
            runtime.scopeStack.pop();
        }
    })();
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))