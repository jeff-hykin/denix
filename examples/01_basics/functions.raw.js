import { createRuntime } from "./main/runtime.js"
const runtime = createRuntime()
//
//
({"increment": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["x"], 1n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "incrementResult": ((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["x"], 1n); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]))(5n), "add": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["y"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["x"], nixScope["y"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "add5": nixScope["add"](5n), "add5to3": nixScope["add"](5n)(3n), "sumAttrs": 
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
                        return operators.add(nixScope["a"], nixScope["b"])
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })
            , "sumResult": nixScope["sumAttrs"](({"a": 10n, "b": 20n})), "withDefaults": 
                (function(arg){
                    const nixScope = {
                        // inherit parent scope
                        ...runtime.scopeStack.slice(-1)[0],
                        // inherit default arguments
                        "a": 0n,"b": 1n,
                        // inherit arguments
                        ...arg,
                        // all-args arg (if @ syntax is used)
                        
                    }
                    runtime.scopeStack.push(nixScope)
                    try {
                        return operators.add(nixScope["a"], nixScope["b"])
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })
            , "useDefaults": nixScope["withDefaults"]({}), "overrideOne": nixScope["withDefaults"](({"a": 5n})), "overrideBoth": nixScope["withDefaults"](({"a": 3n, "b": 4n})), "ignoreExtras": 
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
                        return nixScope["a"]
                    } finally {
                        runtime.scopeStack.pop()
                    }
                })
            , "ignoreResult": nixScope["ignoreExtras"](({"a": 1n, "b": 2n, "c": 3n})), "captureAll": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["args"] = arg; runtime.scopeStack.push(nixScope); try { return nixScope["args"]; } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "captureResult": nixScope["captureAll"](({"a": 1n, "b": 2n})), "makeAdder": (function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["n"] = arg; runtime.scopeStack.push(nixScope); try { return ((function(__capturedScope){ return (arg)=>{ const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]); nixScope["x"] = arg; runtime.scopeStack.push(nixScope); try { return operators.add(nixScope["x"], nixScope["n"]); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1])); } finally { runtime.scopeStack.pop(); } }; })(runtime.scopeStack[runtime.scopeStack.length-1]), "add10": nixScope["makeAdder"](10n), "result": nixScope["add10"](5n)})
