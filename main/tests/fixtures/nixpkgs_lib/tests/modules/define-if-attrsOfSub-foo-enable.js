
export default // args: {
//    config,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                nixScope["lib"]["mkIf"](nixScope["config"]["enable"])((function(){
        const obj = {};
        if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
        if (obj["attrsOfSub"]["foo"] === undefined) obj["attrsOfSub"]["foo"] = {};
        obj["attrsOfSub"]["foo"]["enable"] = true;
        return obj;
    })())
            ))