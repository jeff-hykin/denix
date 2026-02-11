
export default // args: {
//    config,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"attrsOfSub": nixScope["lib"]["mkIf"](nixScope["config"]["enable"])((function(){
        const obj = {};
        if (obj["foo"] === undefined) obj["foo"] = {};
        obj["foo"]["enable"] = true;
        return obj;
    })())})
            ))