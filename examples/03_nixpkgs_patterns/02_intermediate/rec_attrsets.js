/**
 * GENERATED JavaScript from rec_attrsets.nix (simplified)
 * Shows how recursive attribute sets use getters for lazy evaluation
 */

import { createRuntime } from "./main/runtime.js"
const runtime = createRuntime()

({
    // Simple rec: rec { a = 1; b = a + 1; }
    "simple": (function() {
        // Create scope for rec evaluation (uses Object.create, not spread!)
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);

        // FIRST: Evaluate constant values directly
        nixScope["a"] = 1n;

        runtime.scopeStack.push(nixScope);
        try {
            // SECOND: Create getters for values that reference other fields
            // This enables lazy evaluation and breaks circular dependencies
            Object.defineProperty(nixScope, "b", {
                get() {
                    // b references a, which is already defined
                    return operators.add(nixScope["a"], 1n);
                },
                enumerable: true  // Make it show up in Object.keys()
            });

            // Return the nixScope object with getters attached
            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Mutual references: rec { x = y + 1; y = 2; z = x + y; }
    "mutual": (function() {
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);

        // FIRST: Constants
        nixScope["y"] = 2n;

        runtime.scopeStack.push(nixScope);
        try {
            // SECOND: Getters for values referencing other fields
            // x references y (forward reference!)
            Object.defineProperty(nixScope, "x", {
                get() { return operators.add(nixScope["y"], 1n); }
            });

            // z references both x and y
            Object.defineProperty(nixScope, "z", {
                get() { return operators.add(nixScope["x"], nixScope["y"]); }
            });

            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Nested rec: outer rec contains inner rec
    "nested": (function() {
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);
        nixScope["outer"] = 10n;

        runtime.scopeStack.push(nixScope);
        try {
            // Inner rec attrset
            Object.defineProperty(nixScope, "inner", {
                get() {
                    return (function() {
                        // Inner rec creates its own scope
                        const innerScope = Object.create(runtime.scopeStack.slice(-1)[0]);

                        runtime.scopeStack.push(innerScope);
                        try {
                            // a references outer from parent scope
                            Object.defineProperty(innerScope, "a", {
                                get() { return innerScope["outer"]; }
                            });

                            // b references a from same scope
                            Object.defineProperty(innerScope, "b", {
                                get() { return operators.add(innerScope["a"], 1n); }
                            });

                            return innerScope;
                        } finally {
                            runtime.scopeStack.pop();
                        }
                    })();
                }
            });

            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Rec with functions
    "withFunctions": (function() {
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);

        runtime.scopeStack.push(nixScope);
        try {
            // Functions are stored as getters too
            Object.defineProperty(nixScope, "increment", {
                get() {
                    return (function(__capturedScope) {
                        return (arg) => {
                            const fnScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]);
                            fnScope["x"] = arg;
                            runtime.scopeStack.push(fnScope);
                            try {
                                return operators.add(fnScope["x"], 1n);
                            } finally {
                                runtime.scopeStack.pop();
                            }
                        };
                    })(runtime.scopeStack[runtime.scopeStack.length-1]);
                }
            });

            Object.defineProperty(nixScope, "double", {
                get() {
                    return (function(__capturedScope) {
                        return (arg) => {
                            const fnScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]);
                            fnScope["x"] = arg;
                            runtime.scopeStack.push(fnScope);
                            try {
                                return operators.multiply(fnScope["x"], 2n);
                            } finally {
                                runtime.scopeStack.pop();
                            }
                        };
                    })(runtime.scopeStack[runtime.scopeStack.length-1]);
                }
            });

            Object.defineProperty(nixScope, "incrementAndDouble", {
                get() {
                    return (function(__capturedScope) {
                        return (arg) => {
                            const fnScope = Object.create(__capturedScope || runtime.scopeStack[runtime.scopeStack.length-1]);
                            fnScope["x"] = arg;
                            runtime.scopeStack.push(fnScope);
                            try {
                                // Calls double (increment x)
                                return nixScope["double"](nixScope["increment"](fnScope["x"]));
                            } finally {
                                runtime.scopeStack.pop();
                            }
                        };
                    })(runtime.scopeStack[runtime.scopeStack.length-1]);
                }
            });

            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Package pattern with string interpolation
    "package": (function() {
        const nixScope = Object.create(runtime.scopeStack.slice(-1)[0]);

        runtime.scopeStack.push(nixScope);
        try {
            // Constants
            nixScope["version"] = "1.0.0";
            nixScope["name"] = "myapp";

            // fullName uses string interpolation
            Object.defineProperty(nixScope, "fullName", {
                get() {
                    // String interpolation creates InterpolatedString
                    return new InterpolatedString(
                        ["", "-", ""],  // Static parts
                        [nixScope["name"], nixScope["version"]]  // Dynamic parts
                    );
                }
            });

            return nixScope;
        } finally {
            runtime.scopeStack.pop();
        }
    })(),
})

/*
 * KEY TAKEAWAYS:
 *
 * 1. Rec attrsets use Object.defineProperty with getters for lazy evaluation
 * 2. Constant values are set directly, complex expressions become getters
 * 3. Getters allow forward references: x can reference y even if y is defined later
 * 4. Object.create() preserves parent scope via prototype (CRITICAL!)
 * 5. Spread operator {...parent} would lose getters - never use it!
 * 6. Each getter references nixScope, so all fields are accessible
 * 7. Getters are only evaluated when accessed, avoiding infinite loops
 */
