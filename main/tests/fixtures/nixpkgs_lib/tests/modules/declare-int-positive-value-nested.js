
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["set"] = ({"value": nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["ints"]["positive"]}))});
        return obj;
    })()
            ))