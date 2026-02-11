
export default // args: {
//    lib,
//    custom,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"imports": operators.listConcat([], nixScope["lib"]["optional"](nixScope["custom"])((new Path(["./define-enable-force.nix"], []))))})
            ))