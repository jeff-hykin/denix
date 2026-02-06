/**
 * GENERATED JavaScript from functions.nix (simplified for readability)
 * Shows how Nix functions translate to JavaScript closures
 */

// Import runtime for scope management
import { createRuntime } from "./main/runtime.js"
const runtime = createRuntime()

({
    // Simple function: x: x + 1
    // Becomes: (arg) => { nixScope["x"] = arg; return nixScope["x"] + 1n; }
    "increment": (function(__capturedScope) {
        // Immediately-invoked function captures current scope
        return (arg) => {
            // Create new scope inheriting from captured scope
            const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]);
            nixScope["x"] = arg;
            runtime.scopeStack.push(nixScope);
            try {
                return operators.add(nixScope["x"], 1n);
            } finally {
                runtime.scopeStack.pop();
            }
        };
    })(runtime.scopeStack[runtime.scopeStack.length-1]),

    // Immediate function application: (x: x + 1) 5
    // The function is called immediately with 5
    "incrementResult": (/* same function as above */)(5n),

    // Curried functions: x: y: x + y
    // Becomes nested functions, each capturing its scope
    "add": (function(__capturedScope) {
        return (arg) => {  // First argument 'x'
            const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]);
            nixScope["x"] = arg;
            runtime.scopeStack.push(nixScope);
            try {
                // Return another function for second argument 'y'
                return (function(__capturedScope) {
                    return (arg) => {  // Second argument 'y'
                        const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]);
                        nixScope["y"] = arg;
                        runtime.scopeStack.push(nixScope);
                        try {
                            // Now both x and y are in scope via prototype chain
                            return operators.add(nixScope["x"], nixScope["y"]);
                        } finally {
                            runtime.scopeStack.pop();
                        }
                    };
                })(runtime.scopeStack[runtime.scopeStack.length-1]);
            } finally {
                runtime.scopeStack.pop();
            }
        };
    })(runtime.scopeStack[runtime.scopeStack.length-1]),

    // Partial application: add 5
    "add5": nixScope["add"](5n),  // Returns function waiting for second arg

    // Full application: add 5 3
    "add5to3": nixScope["add"](5n)(3n),  // Calls both functions

    // Pattern matching: {a, b}: a + b
    // Becomes: (arg) => { nixScope["a"] = arg.a; nixScope["b"] = arg.b; ... }
    "sumAttrs": (function(arg) {
        const nixScope = {
            // Inherit parent scope
            ...runtime.scopeStack.slice(-1)[0],
            // Destructure arg into a and b
            ...arg,
        };
        // Validate required arguments exist
        if (!("a" in arg)) throw new Error("Function requires argument 'a'");
        if (!("b" in arg)) throw new Error("Function requires argument 'b'");

        runtime.scopeStack.push(nixScope);
        try {
            return operators.add(nixScope["a"], nixScope["b"]);
        } finally {
            runtime.scopeStack.pop();
        }
    }),

    // Application: sumAttrs {a=10; b=20;}
    "sumResult": nixScope["sumAttrs"]({a: 10n, b: 20n}),

    // Default arguments: {a ? 0, b ? 1}: a + b
    "withDefaults": (function(arg) {
        const nixScope = {
            ...runtime.scopeStack.slice(-1)[0],
            // Apply defaults first
            "a": 0n,
            "b": 1n,
            // Then override with provided arguments
            ...arg,
        };
        runtime.scopeStack.push(nixScope);
        try {
            return operators.add(nixScope["a"], nixScope["b"]);
        } finally {
            runtime.scopeStack.pop();
        }
    }),

    // Various applications of withDefaults
    "useDefaults": nixScope["withDefaults"]({}),  // 0 + 1 = 1
    "overrideOne": nixScope["withDefaults"]({a: 5n}),  // 5 + 1 = 6
    "overrideBoth": nixScope["withDefaults"]({a: 3n, b: 4n}),  // 3 + 4 = 7

    // Variadic with ...: {a, ...}: a
    // Ignores extra arguments
    "ignoreExtras": (function(arg) {
        // No validation for extra keys - they're allowed by ...
        if (!("a" in arg)) throw new Error("Function requires argument 'a'");

        const nixScope = {
            ...runtime.scopeStack.slice(-1)[0],
            ...arg,
        };
        runtime.scopeStack.push(nixScope);
        try {
            return nixScope["a"];
        } finally {
            runtime.scopeStack.pop();
        }
    }),

    "ignoreResult": nixScope["ignoreExtras"]({a: 1n, b: 2n, c: 3n}),  // Returns 1n

    // @ syntax: args@{a, b}: args
    // Captures entire argument as 'args'
    "captureAll": (function(arg) {
        const nixScope = {
            ...runtime.scopeStack.slice(-1)[0],
            ...arg,
            "args": arg,  // Entire argument available as 'args'
        };
        if (!("a" in arg)) throw new Error("Function requires argument 'a'");
        if (!("b" in arg)) throw new Error("Function requires argument 'b'");

        runtime.scopeStack.push(nixScope);
        try {
            return nixScope["args"];
        } finally {
            runtime.scopeStack.pop();
        }
    }),

    "captureResult": nixScope["captureAll"]({a: 1n, b: 2n}),

    // Higher-order function: n: (x: x + n)
    // Returns a function that adds n
    "makeAdder": (function(__capturedScope) {
        return (arg) => {
            const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]);
            nixScope["n"] = arg;
            runtime.scopeStack.push(nixScope);
            try {
                // Return inner function that closes over 'n'
                return (function(__capturedScope) {
                    return (arg) => {
                        const nixScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]);
                        nixScope["x"] = arg;
                        runtime.scopeStack.push(nixScope);
                        try {
                            // Both 'n' and 'x' accessible via prototype chain
                            return operators.add(nixScope["x"], nixScope["n"]);
                        } finally {
                            runtime.scopeStack.pop();
                        }
                    };
                })(runtime.scopeStack[runtime.scopeStack.length-1]);
            } finally {
                runtime.scopeStack.pop();
            }
        };
    })(runtime.scopeStack[runtime.scopeStack.length-1]),

    "add10": nixScope["makeAdder"](10n),
    "result": nixScope["add10"](5n),  // 15n
})

/*
 * KEY TAKEAWAYS:
 *
 * 1. Every function becomes an IIFE that captures the current scope
 * 2. Scope inheritance uses Object.create() to preserve getters
 * 3. Curried functions nest: x: y: expr → (x) => (y) => expr
 * 4. Pattern matching destructures the argument object
 * 5. Default arguments are applied before spreading ...arg
 * 6. The @ syntax adds the entire argument as an extra variable
 * 7. runtime.scopeStack tracks nested scopes for proper variable resolution
 */
