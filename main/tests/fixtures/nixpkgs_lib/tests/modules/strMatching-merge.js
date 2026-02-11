
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"imports": [(function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["sm"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["strMatching"]("(.*")}));
        return obj;
    })(),(function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["sm"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["strMatching"]("(.*")}));
        return obj;
    })()]})
            ))