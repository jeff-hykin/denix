
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"options": ({"result": nixScope["lib"]["evalModules"](({"modules": []}))})})
            ))