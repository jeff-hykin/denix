
export default // args: {
//    lib,
//}
createFunc({}, null, {}, (nixScope)=>(
                ({"options": ({"enable": nixScope["lib"]["mkOption"](({"default": false, "example": true, "type": nixScope["lib"]["types"]["bool"], "description": `
            Some descriptive text
          `}))})})
            ))