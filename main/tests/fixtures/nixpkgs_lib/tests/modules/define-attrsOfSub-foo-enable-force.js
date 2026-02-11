
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
        if (obj["attrsOfSub"]["foo"] === undefined) obj["attrsOfSub"]["foo"] = {};
        obj["attrsOfSub"]["foo"]["enable"] = nixScope["lib"]["mkForce"](false);
        return obj;
    })()
            ))