
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"imports": [(nixScope["lib"]["mkIf"](true)(({"enable": true})))]})
            ))