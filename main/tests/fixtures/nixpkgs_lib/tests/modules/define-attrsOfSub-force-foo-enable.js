
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"attrsOfSub": nixScope["lib"]["mkForce"]((function(){
        const obj = {};
        if (obj["foo"] === undefined) obj["foo"] = {};
        obj["foo"]["enable"] = false;
        return obj;
    })())})
            ))