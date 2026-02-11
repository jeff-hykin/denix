
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"options": (function(){
        const obj = {};
        if (obj["result"] === undefined) obj["result"] = {};
        obj["result"]["here"] = nixScope["lib"]["types"]["str"];
        return obj;
    })()})
            ))