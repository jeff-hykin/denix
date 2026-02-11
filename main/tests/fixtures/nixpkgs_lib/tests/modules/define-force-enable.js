
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                nixScope["lib"]["mkForce"](({"enable": false}))
            ))