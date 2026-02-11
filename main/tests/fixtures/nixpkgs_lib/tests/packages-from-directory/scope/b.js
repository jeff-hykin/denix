
export default // args: {
//    a,
//}
createFunc({}, null, {}, (nixScope)=>(
                ((_cond)=>{
        if (!_cond) {
            throw new Error("assertion failed: " + "a == \"a\"");
        }
        return "b";
    })(operators.equal(nixScope["a"], "a"))
            ))