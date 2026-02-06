/**
 * GENERATED JavaScript from string_interpolation.nix (simplified)
 * Shows how string interpolation becomes InterpolatedString class
 */

import { createRuntime } from "./main/runtime.js"
const runtime = createRuntime()

({
    // Simple: "Hello, ${name}!"
    "greeting": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["name"] = "World";
            // InterpolatedString(staticParts, dynamicParts)
            // "Hello, " + name + "!"
            return new InterpolatedString(
                ["Hello, ", "!"],  // Static string parts
                [nixScope["name"]]  // Dynamic interpolated values
            );
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Multiple interpolations: "${first} ${last}"
    "multiple": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["first"] = "John";
            nixScope["last"] = "Doe";
            // "" + first + " " + last + ""
            return new InterpolatedString(
                ["", " ", ""],  // Static parts (including space)
                [nixScope["first"], nixScope["last"]]  // Dynamic parts
            );
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // With expressions: "The answer is ${toString (x * 2)}"
    "withExpr": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["x"] = 21n;
            // Expression in interpolation: toString (x * 2)
            return new InterpolatedString(
                ["The answer is ", ""],
                [
                    // toString function call
                    nixScope["toString"](
                        operators.multiply(nixScope["x"], 2n)
                    )
                ]
            );
        } finally {
            runtime.scopeStack.pop();
        }
    })(),

    // Nested interpolation: "This is ${inner} ${"inter"}polation"
    "nested": (function() {
        const nixScope = {...runtime.scopeStack.slice(-1)[0]};
        runtime.scopeStack.push(nixScope);
        try {
            nixScope["inner"] = "nested";
            // Two separate interpolations
            return new InterpolatedString(
                ["This is ", " ", "polation"],
                [
                    nixScope["inner"],
                    "inter"  // Plain string (not interpolated)
                ]
            );
        } finally {
            runtime.scopeStack.pop();
        }
    })(),
})

/*
 * KEY TAKEAWAYS:
 *
 * 1. String interpolation becomes InterpolatedString class
 * 2. Constructor: new InterpolatedString(staticParts, dynamicParts)
 * 3. Static parts are string literals between ${...}
 * 4. Dynamic parts are expressions inside ${...}
 * 5. InterpolatedString.toString() joins parts lazily when needed
 * 6. Why lazy? Nix doesn't evaluate interpolations until the string is used
 * 7. Example: ["Hello, ", "!"] with [name] → "Hello, " + name + "!"
 */
