
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["bad"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["nonEmptyListOf"]((nixScope["lib"]["types"]["submodule"]({}))), "default": []}));
        return obj;
    })()
            ))