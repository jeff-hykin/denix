
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"enable": nixScope["lib"]["mkForce"](false)})
            ))