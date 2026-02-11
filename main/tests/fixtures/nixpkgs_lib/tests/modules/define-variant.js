import { createRuntime, createFunc } from "../../../../../../../../../../../../../../runtime.js"
const runtime = createRuntime()

export default // args: {
//    config,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["types"] = nixScope["lib"]["types"];
            nixScope["mkOption"] = nixScope["lib"]["mkOption"];
            nixScope["attrNames"] = nixScope["lib"]["attrNames"];
            return ({"options": ({"attrs": nixScope["mkOption"](({"type": nixScope["types"]["attrsOf"](nixScope["lib"]["types"]["int"])})), "result": nixScope["mkOption"]({}), "resultFoo": nixScope["mkOption"]({}), "resultFooBar": nixScope["mkOption"]({}), "resultFooFoo": nixScope["mkOption"]({})}), "config": (function(){
        const obj = {};
        obj["resultFoo"] = nixScope["lib"]["concatMapStringsSep"](" ")(nixScope["toString"])((nixScope["attrNames"](nixScope["config"]["variants"]["foo"]["attrs"])));
        obj["resultFooBar"] = nixScope["lib"]["concatMapStringsSep"](" ")(nixScope["toString"])((nixScope["attrNames"](nixScope["config"]["variants"]["foo"]["variants"]["bar"]["attrs"])));
        obj["resultFooFoo"] = nixScope["lib"]["concatMapStringsSep"](" ")(nixScope["toString"])((nixScope["attrNames"](nixScope["config"]["variants"]["foo"]["variants"]["foo"]["attrs"])));
        if (obj["attrs"] === undefined) obj["attrs"] = {};
        obj["attrs"]["a"] = 1n;
        if (obj["variants"] === undefined) obj["variants"] = {};
        if (obj["variants"]["foo"] === undefined) obj["variants"]["foo"] = {};
        if (obj["variants"]["foo"]["attrs"] === undefined) obj["variants"]["foo"]["attrs"] = {};
        obj["variants"]["foo"]["attrs"]["b"] = 1n;
        if (obj["variants"] === undefined) obj["variants"] = {};
        if (obj["variants"]["bar"] === undefined) obj["variants"]["bar"] = {};
        if (obj["variants"]["bar"]["attrs"] === undefined) obj["variants"]["bar"]["attrs"] = {};
        obj["variants"]["bar"]["attrs"]["y"] = 1n;
        if (obj["variants"] === undefined) obj["variants"] = {};
        if (obj["variants"]["foo"] === undefined) obj["variants"]["foo"] = {};
        if (obj["variants"]["foo"]["variants"] === undefined) obj["variants"]["foo"]["variants"] = {};
        if (obj["variants"]["foo"]["variants"]["bar"] === undefined) obj["variants"]["foo"]["variants"]["bar"] = {};
        if (obj["variants"]["foo"]["variants"]["bar"]["attrs"] === undefined) obj["variants"]["foo"]["variants"]["bar"]["attrs"] = {};
        obj["variants"]["foo"]["variants"]["bar"]["attrs"]["z"] = 1n;
        if (obj["variants"] === undefined) obj["variants"] = {};
        if (obj["variants"]["foo"] === undefined) obj["variants"]["foo"] = {};
        if (obj["variants"]["foo"]["variants"] === undefined) obj["variants"]["foo"]["variants"] = {};
        if (obj["variants"]["foo"]["variants"]["foo"] === undefined) obj["variants"]["foo"]["variants"]["foo"] = {};
        if (obj["variants"]["foo"]["variants"]["foo"]["attrs"] === undefined) obj["variants"]["foo"]["variants"]["foo"]["attrs"] = {};
        obj["variants"]["foo"]["variants"]["foo"]["attrs"]["c"] = 3n;
        return obj;
    })()});
        } finally {
            runtime.scopeStack.pop();
        }
    })()
            ))