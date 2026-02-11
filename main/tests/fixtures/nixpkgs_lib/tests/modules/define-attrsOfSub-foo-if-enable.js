
export default // args: {
//    config,
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
        obj["attrsOfSub"]["foo"] = nixScope["lib"]["mkIf"](nixScope["config"]["enable"])(({"enable": true}));
        return obj;
    })()
            ))