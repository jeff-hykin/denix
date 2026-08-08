Readability overhaul:

1. Instead of the current createFunc signaure, overhaul it to be something like:
```
createFunc({ self: nixArg.NoDefault /* no args=no default */, args: nixArg.AllArgs /* equivlent to {self}@args */ }, nixScope, (nixScope) =>
```

2. change how scope is passed around and change how helpers are called 
- nixScope => scope
- createScope => scope.newScope$
- createFunc => scope.func$
- interpolated string => scope.str$(()=>[ "part1", scope.name1, "end" ])

3. In the parsing side, add recursive detection for if eager eval doesn't matter (no throws, no scope usage). For example `"hi"` can be eager evaluated because its a string with no interpolation, same for empty lists, same for lists of literals, etc. This should help us "unwrap" a lot of getters and save on verboseness and runtime cost.

4. Similarly add a basic thing to detect when ()'s are not needed. If there's an operator, then its needed (ex: always wrap (5 + 6)). But if its a single func call or a literal, we don't want the syntax noise

5. Create a `scope.attrSet()` helper so we can avoid verbose `defGetter` stuff like:
```
const obj = {};
defGetter(
    obj,
    "description",
    () => ("A CMake-built C program, realized by denix (impure: uses host cmake + compiler)."),
);
defGetter(obj, "inputs", () => ({}));
defGetter(
```
For example it should look something like this:

```
scope.attrSet({
    description: "A CMake-built C program, realized by denix (impure: uses host cmake + compiler).", // unwrapped value
    inputs: {}, // unwrapped value
    // deepSet expands to something with symbols: { [Symbol()]: DeepSet({key: ["packages", nixScope.system, "default"], value: value }) },
    ...scope.deepSet$(["packages", nixScope.system, "default"], value),
    // getter
    outputs: (scope) => scope.func({ self: NoDefault() }, (scope) => // etc
}) // returns the object
```

6. Create a helper `scope.let$().in$((scope)=>0)` it should re-use a lot of the `scope.attrSet` stuff in the let part

7. Make sure unnecessary scope wrappers like `scope.newScope$(scope => scope.attrSet$({}))` are flattened to just `scope.attrSet$({})` 

8. Create a helper `scope.if$().then$().else$()` and add support for `scope.if$().then$().elseIf$().elseIf$().elseIf$().else$()`

9. if apply always needs the second argument to be mkThunk, then simply have the apply function itself do the mkThunk

10. try to find a way to make function calls (e.g. `apply`) more readable. Ex; nixScope.baseNameOf(()=>)