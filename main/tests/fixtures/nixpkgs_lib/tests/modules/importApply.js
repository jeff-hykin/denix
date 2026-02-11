
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        obj["imports"] = [(nixScope["lib"]["modules"]["importApply"]((new Path(["./importApply-function.nix"], [])))(({"foo": "abc"})))];
        if (obj["options"] === undefined) obj["options"] = {};
        obj["options"]["value"] = nixScope["lib"]["mkOption"](({"default": 1n}));
        return obj;
    })()
            ))