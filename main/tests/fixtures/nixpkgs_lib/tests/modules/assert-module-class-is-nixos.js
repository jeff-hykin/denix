
export default // args: {
//    _class,
//}
createFunc({}, null, {}, (nixScope)=>(
                ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "_class == \"nixos\"");
        }
        return {};
    })(operators.equal(nixScope["_class"], "nixos"))
            ))