
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["config"] = ({"foo": 
    
    // args: {
    //    _prefix,
    //}
    createFunc({}, null, {}, (nixScope)=>(
                    ((_cond)=>{
            if (!_cond) {
                throw new Error("assertion failed: " + "_prefix == [ \"foo\" ]");
            }
            return (function(){
            const obj = {};
            if (obj["options"] === undefined) obj["options"] = {};
            obj["options"]["ok"] = nixScope["lib"]["mkOption"]({});
            if (obj["config"] === undefined) obj["config"] = {};
            obj["config"]["ok"] = true;
            return obj;
        })();
        })(operators.equal(nixScope["_prefix"], ["foo"]))
                ))});
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["foo"] = nixScope["lib"]["mkOption"](({"type": nixScope["lib"]["types"]["submodule"]({}), "default": {}}));
        return obj;
    })()
            ))