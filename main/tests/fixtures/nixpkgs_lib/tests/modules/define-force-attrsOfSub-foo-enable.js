
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                nixScope["lib"]["mkForce"]((function(){
        const obj = {};
        if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
        if (obj["attrsOfSub"]["foo"] === undefined) obj["attrsOfSub"]["foo"] = {};
        obj["attrsOfSub"]["foo"]["enable"] = false;
        return obj;
    })())
            ))