
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                (function(){
        const obj = {};
        if (obj["attrsOfSub"] === undefined) obj["attrsOfSub"] = {};
        obj["attrsOfSub"]["foo"] = nixScope["lib"]["mkForce"](({"enable": false}));
        return obj;
    })()
            ))