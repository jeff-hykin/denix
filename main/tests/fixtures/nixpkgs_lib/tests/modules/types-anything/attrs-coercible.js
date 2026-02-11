
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["value"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["anything"]}));
        if (obj["config"] === undefined) obj["config"] = {};
        obj["config"]["value"] = ({"outPath": "foo", "err": nixScope["throw"]("err")});
        return obj;
    })()
            ))