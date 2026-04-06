#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `builtins.toFile "hello.txt" "Hello World"`,
    pattern: /\/nix\/store\/[a-z0-9]{32}-hello\.txt/,
    label: "toFile returns store path",
})
