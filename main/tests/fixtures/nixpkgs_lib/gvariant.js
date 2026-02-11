import { createRuntime } from "../../../runtime.js"
const runtime = createRuntime()
const operators = runtime.operators

export default /**
  A partial and basic implementation of GVariant formatted strings.
  See [GVariant Format Strings](https://docs.gtk.org/glib/gvariant-format-strings.html) for details.

  :::{.warning}
  This API is not considered fully stable and it might therefore
  change in backwards incompatible ways without prior notice.
  :::
*///
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
        nixScope["concatMapStringsSep"] = nixScope["lib"]["concatMapStringsSep"];
        nixScope["concatStrings"] = nixScope["lib"]["concatStrings"];
        nixScope["escape"] = nixScope["lib"]["escape"];
        nixScope["head"] = nixScope["lib"]["head"];
        nixScope["replaceString"] = nixScope["lib"]["replaceString"];
        Object.defineProperty(nixScope, "mkPrimitive", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return ({"_type": "gvariant", "type": nixScope["t"], "value": nixScope["v"], "__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["@", " ", ""], [()=>(nixScope["self"]["type"]), ()=>(nixScope["toString"](nixScope["self"]["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "type", {enumerable: true, get(){return ({"arrayOf": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["a", ""], [()=>(nixScope["t"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "maybeOf": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["m", ""], [()=>(nixScope["t"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "tupleOf": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["ts"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["(", ")"], [()=>(nixScope["concatStrings"](nixScope["ts"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "dictionaryEntryOf": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["nameType"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["valueType"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["{", "", "}"], [()=>(nixScope["nameType"]), ()=>(nixScope["valueType"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "string": "s", "boolean": "b", "uchar": "y", "int16": "n", "uint16": "q", "int32": "i", "uint32": "u", "int64": "x", "uint64": "t", "double": "d", "variant": "v"});}});
        return (function(){
    const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "type", {enumerable: true, get(){return nixScope["type"];}});
        Object.defineProperty(nixScope, "isGVariant", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal(operators.selectOrDefault(nixScope["v"], ["_type"], ""), "gvariant"); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "intConstructors", {enumerable: true, get(){return [({"name": "mkInt32", "type": nixScope["type"]["int32"], "min": -2147483648n, "max": 2147483647n}),({"name": "mkUint32", "type": nixScope["type"]["uint32"], "min": 0n, "max": 4294967295n}),({"name": "mkInt64", "type": nixScope["type"]["int64"], "min": null, "max": null}),({"name": "mkUint64", "type": nixScope["type"]["uint64"], "min": 0n, "max": null}),({"name": "mkInt16", "type": nixScope["type"]["int16"], "min": -32768n, "max": 32767n}),({"name": "mkUint16", "type": nixScope["type"]["uint16"], "min": 0n, "max": 65535n}),({"name": "mkUchar", "type": nixScope["type"]["uchar"], "min": 0n, "max": 255n})];}});
        Object.defineProperty(nixScope, "mkValue", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["builtins"]["isBool"](nixScope["v"]), ()=>(nixScope["mkBoolean"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["builtins"]["isFloat"](nixScope["v"]), ()=>(nixScope["mkDouble"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["builtins"]["isString"](nixScope["v"]), ()=>(nixScope["mkString"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["builtins"]["isList"](nixScope["v"]), ()=>(nixScope["mkArray"](nixScope["v"])), ()=>((operators.ifThenElse(nixScope["isGVariant"](nixScope["v"]), ()=>(nixScope["v"]), ()=>((operators.ifThenElse(nixScope["builtins"]["isInt"](nixScope["v"]), ()=>((function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "validConstructors", {enumerable: true, get(){return nixScope["builtins"]["filter"](((function(arg){
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
                        return operators.and((operators.or(operators.equal(nixScope["min"], null), operators.lessThanOrEqual(nixScope["min"], nixScope["v"]))), (operators.or(operators.equal(nixScope["max"], null), operators.lessThanOrEqual(nixScope["v"], nixScope["max"]))))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })))(nixScope["intConstructors"]);}});
        return nixScope["throw"]((new InterpolatedString(["\n        The GVariant type for number “", "” is unclear.\n        Please wrap the value with one of the following, depending on the value type in GSettings schema:\n\n        ", "\n      "], [()=>(nixScope["builtins"]["toString"](nixScope["v"])), ()=>(nixScope["lib"]["concatMapStringsSep"]("")(((function(arg){
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
                        return (new InterpolatedString(["- `lib.gvariant.", "` for `", "`"], [()=>(nixScope["name"]), ()=>(nixScope["type"])]))
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })))(nixScope["validConstructors"]))])));
    } finally {
        runtime.scopeStack.pop();
    }
})()), ()=>((operators.ifThenElse(nixScope["builtins"]["isAttrs"](nixScope["v"]), ()=>(nixScope["throw"]("Cannot construct GVariant value from an attribute set. If you want to construct a dictionary, you will need to create an array containing items constructed with `lib.gvariant.mkDictionaryEntry`.")), ()=>(nixScope["throw"]((new InterpolatedString(["The GVariant type of “", "” can't be inferred."], [()=>(nixScope["builtins"]["typeOf"](nixScope["v"]))])))))))))))))))))))))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkArray", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elems"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "vs", {enumerable: true, get(){return nixScope["map"](nixScope["mkValue"])((nixScope["lib"]["throwIf"]((operators.equal(nixScope["elems"], [])))("Please create empty array with mkEmptyArray.")(nixScope["elems"])));}});
        Object.defineProperty(nixScope, "elemType", {enumerable: true, get(){return nixScope["lib"]["throwIfNot"]((nixScope["lib"]["all"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["t"] = arg; runtime.scopeStack.push(nixScope); try { return operators.equal((nixScope["head"](nixScope["vs"]))["type"], nixScope["t"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["v"]["type"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["vs"])))))("Elements in a list should have same type.")((nixScope["head"](nixScope["vs"]))["type"]);}});
        return operators.merge(nixScope["mkPrimitive"]((nixScope["type"]["arrayOf"](nixScope["elemType"])))(nixScope["vs"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["@", " [", "]"], [()=>(nixScope["self"]["type"]), ()=>(nixScope["concatMapStringsSep"](",")(nixScope["toString"])(nixScope["self"]["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkEmptyArray", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["mkPrimitive"]((nixScope["type"]["arrayOf"](nixScope["elemType"])))([]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["@", " []"], [()=>(nixScope["self"]["type"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkVariant", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elem"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "gvarElem", {enumerable: true, get(){return nixScope["mkValue"](nixScope["elem"]);}});
        return operators.merge(nixScope["mkPrimitive"](nixScope["type"]["variant"])(nixScope["gvarElem"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["<", ">"], [()=>(nixScope["toString"](nixScope["self"]["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkDictionaryEntry", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["name"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["value"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "name'", {enumerable: true, get(){return nixScope["mkValue"](nixScope["name"]);}});
        Object.defineProperty(nixScope, "value'", {enumerable: true, get(){return nixScope["mkValue"](nixScope["value"]);}});
        Object.defineProperty(nixScope, "dictionaryType", {enumerable: true, get(){return nixScope["type"]["dictionaryEntryOf"](nixScope["name'"]["type"])(nixScope["value'"]["type"]);}});
        return operators.merge(nixScope["mkPrimitive"](nixScope["dictionaryType"])(({"name": nixScope["name"], "value": nixScope["value"]})), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["@", " {", ",", "}"], [()=>(nixScope["self"]["type"]), ()=>(nixScope["name'"]), ()=>(nixScope["value'"])])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkMaybe", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elem"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["mkPrimitive"]((nixScope["type"]["maybeOf"](nixScope["elemType"])))(nixScope["elem"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(operators.equal(nixScope["self"]["value"], null), ()=>((new InterpolatedString(["@", " nothing"], [()=>(nixScope["self"]["type"])]))), ()=>((new InterpolatedString(["just ", ""], [()=>(nixScope["toString"](nixScope["self"]["value"]))]))))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkNothing", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elemType"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["mkMaybe"](nixScope["elemType"])(null); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkJust", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elem"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "gvarElem", {enumerable: true, get(){return nixScope["mkValue"](nixScope["elem"]);}});
        return nixScope["mkMaybe"](nixScope["gvarElem"]["type"])(nixScope["gvarElem"]);
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkTuple", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["elems"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "gvarElems", {enumerable: true, get(){return nixScope["map"](nixScope["mkValue"])(nixScope["elems"]);}});
        Object.defineProperty(nixScope, "tupleType", {enumerable: true, get(){return nixScope["type"]["tupleOf"]((nixScope["map"](((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["e"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["e"]["type"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])))(nixScope["gvarElems"])));}});
        return operators.merge(nixScope["mkPrimitive"](nixScope["tupleType"])(nixScope["gvarElems"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["@", " (", ")"], [()=>(nixScope["self"]["type"]), ()=>(nixScope["concatMapStringsSep"](",")(nixScope["toString"])(nixScope["self"]["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkBoolean", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["mkPrimitive"](nixScope["type"]["boolean"])(nixScope["v"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (operators.ifThenElse(nixScope["self"]["value"], ()=>("true"), ()=>("false"))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkString", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return (function(){
    const nixScope = {...runtime.scopeStack.slice(-1)[0]};
    runtime.scopeStack.push(nixScope);
    try {
        Object.defineProperty(nixScope, "sanitize", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["s"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["replaceString"]("")("n")((nixScope["escape"](["'",""])(nixScope["s"]))); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return operators.merge(nixScope["mkPrimitive"](nixScope["type"]["string"])(nixScope["v"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["'", "'"], [()=>(nixScope["sanitize"](nixScope["self"]["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])}));
    } finally {
        runtime.scopeStack.pop();
    }
})(); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkObjectpath", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["mkPrimitive"](nixScope["type"]["string"])(nixScope["v"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return (new InterpolatedString(["objectpath '", "'"], [()=>(nixScope["escape"](["'"])(nixScope["self"]["value"]))])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkUchar", {enumerable: true, get(){return nixScope["mkPrimitive"](nixScope["type"]["uchar"]);}});
        Object.defineProperty(nixScope, "mkInt16", {enumerable: true, get(){return nixScope["mkPrimitive"](nixScope["type"]["int16"]);}});
        Object.defineProperty(nixScope, "mkUint16", {enumerable: true, get(){return nixScope["mkPrimitive"](nixScope["type"]["uint16"]);}});
        Object.defineProperty(nixScope, "mkInt32", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["mkPrimitive"](nixScope["type"]["int32"])(nixScope["v"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["toString"](nixScope["self"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        Object.defineProperty(nixScope, "mkUint32", {enumerable: true, get(){return nixScope["mkPrimitive"](nixScope["type"]["uint32"]);}});
        Object.defineProperty(nixScope, "mkInt64", {enumerable: true, get(){return nixScope["mkPrimitive"](nixScope["type"]["int64"]);}});
        Object.defineProperty(nixScope, "mkUint64", {enumerable: true, get(){return nixScope["mkPrimitive"](nixScope["type"]["uint64"]);}});
        Object.defineProperty(nixScope, "mkDouble", {enumerable: true, get(){return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["v"] = arg; runtime.scopeStack.push(nixScope); try { return operators.merge(nixScope["mkPrimitive"](nixScope["type"]["double"])(nixScope["v"]), ({"__toString": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["self"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["toString"](nixScope["self"]["value"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])})); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]);}});
        return nixScope;
    } finally {
        runtime.scopeStack.pop();
    }
})();
    } finally {
        runtime.scopeStack.pop();
    }
})()
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })