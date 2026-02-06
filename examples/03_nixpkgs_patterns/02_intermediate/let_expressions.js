/**
 * GENERATED JavaScript from let_expressions.nix (simplified)
 * Shows how let expressions create local scopes
 */

import { createRuntime } from "./main/runtime.js"
const runtime = createRuntime()

({
    // Simple let: let x = 42; in x
    "simple": (function() {
        // Create new scope inheriting from parent
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            // Bind x = 42
            nixScope["x"] = 42n;
            // Evaluate body: x
            return nixScope["x"];
        } finally {
            // Pop scope when done
            runtime.scopeStack.pop();
        }
    })(),

    // Multiple bindings: let x = 10; y = 20; in x + y
    "multiple": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            // All bindings are evaluated in sequence
            nixScope["x"] = 10n;
            nixScope["y"] = 20n;
            // Body can reference both x and y
            return operators.add(nixScope["x"], nixScope["y"]);
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Sequential bindings: y references x, z references y
    "sequential": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["x"] = 5n;
            // y can reference x (already bound)
            nixScope["y"] = operators.add(nixScope["x"], 3n);
            // z can reference y (already bound)
            nixScope["z"] = operators.multiply(nixScope["y"], 2n);
            return nixScope["z"];
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Nested lets: each creates a new scope
    "nested": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["x"] = 1n;
            // Inner let
            return (function() {
                const nixScope = {...runtime.scopeStack.slice(-1)[0]};
                runtime.scopeStack.push(nixScope);
                try {
                    // y can access x from outer scope
                    nixScope["y"] = operators.add(nixScope["x"], 1n);
                    // Innermost let
                    return (function() {
                        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
                        runtime.scopeStack.push(nixScope);
                        try {
                            // z can access y from middle scope
                            nixScope["z"] = operators.add(nixScope["y"], 1n);
                            // Body can access x, y, z via scope chain
                            return operators.add(
                                operators.add(nixScope["x"], nixScope["y"]),
                                nixScope["z"]
                            );
                        } finally {
                            runtime.scopeStack.pop();
                        }
                    })();
                } finally {
                    runtime.scopeStack.pop();
                }
            })();
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Shadowing: inner x hides outer x
    "shadowing": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["x"] = 100n;
            return (function() {
                const nixScope = {...runtime.scopeStack.slice(-1)[0]};
                runtime.scopeStack.push(nixScope);
                try {
                    // This x shadows the outer x
                    nixScope["x"] = 200n;
                    return nixScope["x"];  // Returns 200n, not 100n
                } finally {
                    runtime.scopeStack.pop();
                }
            })();
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Complex example with builtins (simplified - would actually call builtins)
    "complex": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["list"] = [1n, 2n, 3n, 4n, 5n];
            // map would be called here
            nixScope["doubled"] = nixScope["map"](
                (function(__capturedScope){ /* x: x * 2 */ }),
                nixScope["list"]
            );
            // foldl' would be called here
            nixScope["sum"] = nixScope["builtins"]["foldl'"](
                (function(__capturedScope){ /* a: b: a + b */ }),
                0n,
                nixScope["doubled"]
            );
            return nixScope["sum"];
        } finally {
            runtime.scopeStack.pop();
        }
    })(),
})

/*
 * KEY TAKEAWAYS:
 *
 * 1. Each let expression becomes an IIFE (Immediately-Invoked Function Expression)
 * 2. A new nixScope object is created inheriting from parent: {...runtime.scopeStack.slice(-1)[0]}
 * 3. Bindings are evaluated sequentially, allowing later bindings to reference earlier ones
 * 4. Nested lets create nested scopes via scope chain
 * 5. Inner bindings shadow outer bindings with the same name
 * 6. try/finally ensures scope is popped even if body throws error
 */
