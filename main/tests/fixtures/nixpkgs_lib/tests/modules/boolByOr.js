
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["lazyAttrsOf"](nixScope["lib"]["types"]["boolByOr"])}));
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["value"] = ({"falseFalse": nixScope["lib"]["mkMerge"]([false,false]), "trueFalse": nixScope["lib"]["mkMerge"]([true,false]), "falseTrue": nixScope["lib"]["mkMerge"]([false,true]), "trueTrue": nixScope["lib"]["mkMerge"]([true,true])});
        return obj;
    })()
            ))