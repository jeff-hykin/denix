import { createRuntime } from "../../../../runtime.js"
const runtime = createRuntime()

export default //
//
//
//
//
//
(function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return ["x86_64-linux","aarch64-linux","x86_64-darwin","armv6l-linux","armv7l-linux","i686-linux","aarch64-darwin","powerpc64le-linux","riscv64-linux","x86_64-freebsd"]
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })