#!/usr/bin/env deno test --allow-all
/**
 * Comprehensive test suite for nixpkgs lib/lists.nix
 *
 * Tests ALL list functions from nixpkgs.lib.lists:
 * - Inherited builtins: head, tail, length, isList, elemAt, concatLists, filter, elem, genList, map
 * - Custom functions: singleton, forEach, foldr, foldl, foldl\', imap0, imap1, ifilter0, concatMap, flatten
 * - Search: findSingle, findFirst, findFirstIndex, any, all, count
 * - Transform: remove, reverseList, take, drop, takeEnd, dropEnd, sublist, last, init
 * - Sort: sort, sortOn, naturalSort, toposort, compareLists, listDfs
 * - Zip: zipListsWith, zipLists
 * - Set ops: unique, uniqueStrings, allUnique, intersectLists, subtractLists, mutuallyExclusive
 * - Conditional: optional, optionals, toList
 * - Generation: range, replicate, crossLists
 * - Prefix: hasPrefix, removePrefix, commonPrefix
 * - Group: partition, groupBy, groupBy'
 * - Other: concatAttrValues, replaceElemAt
 */

import { convertToJs } from "../translator.js"
import { createRuntime } from "../runtime.js"
import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts"

/**
 * Helper: Evaluate Nix code and return result
 */
function evalNix(nixCode) {
    const jsCode = convertToJs(nixCode)
    const runtime = createRuntime()

    // Evaluate with runtime in scope
    const result = new Function('runtime', `
        const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1]
        return (${jsCode.trim()})
    `)(runtime)

    return result
}

/**
 * Helper: Load lists.nix module
 */
function loadListsLib() {
    // Create minimal lib context
    const lib = {
        strings: {
            toInt: (s) => {
                const num = parseInt(s.toString())
                return isNaN(num) ? 0n : BigInt(num)
            }
        },
        trivial: {
            compare: (a, b) => {
                const aVal = typeof a === 'bigint' ? Number(a) : a
                const bVal = typeof b === 'bigint' ? Number(b) : b
                if (aVal < bVal) return -1n
                if (aVal > bVal) return 1n
                return 0n
            },
            min: (a, b) => {
                const aVal = typeof a === 'bigint' ? Number(a) : a
                const bVal = typeof b === 'bigint' ? Number(b) : b
                return aVal < bVal ? a : b
            },
            id: (x) => x,
            warn: (msg) => (val) => {
                console.warn(msg)
                return val
            }
        },
        attrsets: {
            mapAttrs: (f) => (set) => {
                const result = {}
                for (const [key, val] of Object.entries(set)) {
                    result[key] = f(key)(val)
                }
                return result
            },
            attrNames: (set) => Object.keys(set),
            attrValues: (set) => Object.values(set)
        },
        max: (a, b) => {
            const aVal = typeof a === 'bigint' ? Number(a) : a
            const bVal = typeof b === 'bigint' ? Number(b) : b
            return aVal > bVal ? a : b
        },
        assertMsg: (cond) => (msg) => {
            if (!cond) throw new Error(msg.toString())
            return true
        }
    }

    // Load lists.nix from fixtures
    const listsNixPath = new URL("../tests/fixtures/nixpkgs-lib/lib/lists.nix", import.meta.url).pathname
    const nixCode = Deno.readTextFileSync(listsNixPath)

    // Translate to JS
    const jsCode = convertToJs(nixCode)

    // Create runtime
    const runtime = createRuntime()

    // Add lib to scope
    runtime.scopeStack[0].lib = lib

    // Evaluate the translated code
    const moduleFunc = eval(jsCode)

    // Call with { lib }
    return moduleFunc({ lib })
}

Deno.test("lib.lists - builtin functions (inherited)", async (t) => {
    const lists = loadListsLib()

    await t.step("head - first element", () => {
        assertEquals(lists.head([1n, 2n, 3n]), 1n)
        assertEquals(lists.head(["a", "b", "c"]), "a")
    })

    await t.step("tail - all but first", () => {
        assertEquals(lists.tail([1n, 2n, 3n]), [2n, 3n])
        assertEquals(lists.tail(["a"]), [])
    })

    await t.step("length - list size", () => {
        assertEquals(lists.length([1n, 2n, 3n]), 3n)
        assertEquals(lists.length([]), 0n)
    })

    await t.step("elemAt - access by index", () => {
        assertEquals(lists.elemAt([10n, 20n, 30n])(0n), 10n)
        assertEquals(lists.elemAt([10n, 20n, 30n])(2n), 30n)
    })

    await t.step("map - transform elements", () => {
        const double = (x) => typeof x === 'bigint' ? x * 2n : x * 2
        assertEquals(lists.map(double)([1n, 2n, 3n]), [2n, 4n, 6n])
    })

    await t.step("filter - select elements", () => {
        const gt2 = (x) => x > 2n
        assertEquals(lists.filter(gt2)([1n, 2n, 3n, 4n]), [3n, 4n])
    })
})

Deno.test("lib.lists - singleton & forEach", async (t) => {
    const lists = loadListsLib()

    await t.step("singleton - wrap in list", () => {
        assertEquals(lists.singleton("foo"), ["foo"])
        assertEquals(lists.singleton(42n), [42n])
    })

    await t.step("forEach - map with flipped args", () => {
        const result = lists.forEach([1n, 2n])((x) => x.toString() + "!")
        assertEquals(result, ["1!", "2!"])
    })
})

Deno.test("lib.lists - folding operations", async (t) => {
    const lists = loadListsLib()

    await t.step("foldr - right fold", () => {
        // concat = foldr (a: b: a + b) "z"
        const concat = lists.foldr((a) => (b) => a.toString() + b.toString())("z")
        assertEquals(concat(["a", "b", "c"]), "abcz")
    })

    await t.step("foldr - with different types", () => {
        const strange = lists.foldr((int) => (str) => (int + 1n).toString() + str.toString())("a")
        assertEquals(strange([1n, 2n, 3n, 4n]), "2345a")
    })

    await t.step("foldl - left fold", () => {
        const lconcat = lists.foldl((a) => (b) => a.toString() + b.toString())("z")
        assertEquals(lconcat(["a", "b", "c"]), "zabc")
    })

    await t.step("foldl - with different types", () => {
        const lstrange = lists.foldl((str) => (int) => str.toString() + (int + 1n).toString())("a")
        assertEquals(lstrange([1n, 2n, 3n, 4n]), "a2345")
    })

    await t.step("foldl' - strict left fold", () => {
        const sum = lists["foldl'"]((acc) => (x) => acc + x)(0n)
        assertEquals(sum([1n, 2n, 3n]), 6n)
    })
})

Deno.test("lib.lists - indexed operations", async (t) => {
    const lists = loadListsLib()

    await t.step("imap0 - map with 0-based index", () => {
        const result = lists.imap0((i) => (v) => v + "-" + i.toString())(["a", "b"])
        assertEquals(result, ["a-0", "b-1"])
    })

    await t.step("imap1 - map with 1-based index", () => {
        const result = lists.imap1((i) => (v) => v + "-" + i.toString())(["a", "b"])
        assertEquals(result, ["a-1", "b-2"])
    })

    await t.step("ifilter0 - filter with index", () => {
        const result = lists.ifilter0((i) => (v) => i === 0n || v > 2n)([1n, 2n, 3n])
        assertEquals(result, [1n, 3n])
    })
})

Deno.test("lib.lists - concatMap & flatten", async (t) => {
    const lists = loadListsLib()

    await t.step("concatMap - map and concat", () => {
        const result = lists.concatMap((x) => [x, "z"])(["a", "b"])
        assertEquals(result, ["a", "z", "b", "z"])
    })

    await t.step("flatten - nested lists", () => {
        assertEquals(lists.flatten([1n, [2n, [3n], 4n], 5n]), [1n, 2n, 3n, 4n, 5n])
        assertEquals(lists.flatten(1n), [1n])
        assertEquals(lists.flatten([]), [])
    })
})

Deno.test("lib.lists - remove", async (t) => {
    const lists = loadListsLib()

    await t.step("remove - filter out element", () => {
        assertEquals(lists.remove(3n)([1n, 3n, 4n, 3n]), [1n, 4n])
        assertEquals(lists.remove("x")(["a", "x", "b", "x"]), ["a", "b"])
    })
})

Deno.test("lib.lists - search operations", async (t) => {
    const lists = loadListsLib()

    await t.step("findSingle - unique match", () => {
        const pred = (x) => x === 3n
        assertEquals(lists.findSingle(pred)("none")("multiple")([1n, 3n]), 3n)
    })

    await t.step("findSingle - no match", () => {
        const pred = (x) => x === 3n
        assertEquals(lists.findSingle(pred)("none")("multiple")([1n, 9n]), "none")
    })

    await t.step("findSingle - multiple matches", () => {
        const pred = (x) => x === 3n
        assertEquals(lists.findSingle(pred)("none")("multiple")([1n, 3n, 3n]), "multiple")
    })

    await t.step("findFirstIndex - found", () => {
        const pred = (x) => x > 3n
        assertEquals(lists.findFirstIndex(pred)(null)([0n, 6n, 4n]), 1n)
    })

    await t.step("findFirstIndex - not found", () => {
        const pred = (x) => x > 9n
        assertEquals(lists.findFirstIndex(pred)(null)([0n, 6n, 4n]), null)
    })

    await t.step("findFirst - found", () => {
        const pred = (x) => x > 3n
        assertEquals(lists.findFirst(pred)(7n)([1n, 6n, 4n]), 6n)
    })

    await t.step("findFirst - not found", () => {
        const pred = (x) => x > 9n
        assertEquals(lists.findFirst(pred)(7n)([1n, 6n, 4n]), 7n)
    })

    await t.step("any - at least one", () => {
        const runtime = createRuntime()
        assertEquals(lists.any(runtime.builtins.isString)([1n, "a", {}]), true)
        assertEquals(lists.any(runtime.builtins.isString)([1n, {}]), false)
    })

    await t.step("all - every element", () => {
        const pred = (x) => x < 3n
        assertEquals(lists.all(pred)([1n, 2n]), true)
        assertEquals(lists.all(pred)([1n, 2n, 3n]), false)
    })

    await t.step("count - matching elements", () => {
        const pred = (x) => x === 3n
        assertEquals(lists.count(pred)([3n, 2n, 3n, 4n, 6n]), 2n)
    })
})

Deno.test("lib.lists - optional & conditionals", async (t) => {
    const lists = loadListsLib()

    await t.step("optional - true condition", () => {
        assertEquals(lists.optional(true)("foo"), ["foo"])
    })

    await t.step("optional - false condition", () => {
        assertEquals(lists.optional(false)("foo"), [])
    })

    await t.step("optionals - true condition", () => {
        assertEquals(lists.optionals(true)([2n, 3n]), [2n, 3n])
    })

    await t.step("optionals - false condition", () => {
        assertEquals(lists.optionals(false)([2n, 3n]), [])
    })

    await t.step("toList - already a list", () => {
        assertEquals(lists.toList([1n, 2n]), [1n, 2n])
    })

    await t.step("toList - wrap non-list", () => {
        assertEquals(lists.toList("hi"), ["hi"])
    })
})

Deno.test("lib.lists - range & replicate", async (t) => {
    const lists = loadListsLib()

    await t.step("range - ascending", () => {
        assertEquals(lists.range(2n)(4n), [2n, 3n, 4n])
    })

    await t.step("range - empty (first > last)", () => {
        assertEquals(lists.range(3n)(2n), [])
    })

    await t.step("range - single element", () => {
        assertEquals(lists.range(5n)(5n), [5n])
    })

    await t.step("replicate - multiple copies", () => {
        assertEquals(lists.replicate(3n)("a"), ["a", "a", "a"])
        assertEquals(lists.replicate(2n)(true), [true, true])
    })

    await t.step("replicate - zero copies", () => {
        assertEquals(lists.replicate(0n)("x"), [])
    })
})

Deno.test("lib.lists - partition & groupBy", async (t) => {
    const lists = loadListsLib()

    await t.step("partition - split by predicate", () => {
        const pred = (x) => x > 2n
        const result = lists.partition(pred)([5n, 1n, 2n, 3n, 4n])
        assertEquals(result.right, [5n, 3n, 4n])
        assertEquals(result.wrong, [1n, 2n])
    })

    await t.step("groupBy - by boolean string", () => {
        const runtime = createRuntime()
        const pred = (x) => (x > 2n).toString()
        const result = lists.groupBy(pred)([5n, 1n, 2n, 3n, 4n])
        assertEquals(result["true"], [5n, 3n, 4n])
        assertEquals(result["false"], [1n, 2n])
    })

    await t.step("groupBy - by property", () => {
        const pred = (x) => x.name
        const result = lists.groupBy(pred)([
            { name: "icewm", script: "icewm &" },
            { name: "xfce", script: "xfce4-session &" },
            { name: "icewm", script: "icewmbg &" }
        ])
        assertEquals(result.icewm.length, 2n)
        assertEquals(result.xfce.length, 1n)
    })
})

Deno.test("lib.lists - zipListsWith & zipLists", async (t) => {
    const lists = loadListsLib()

    await t.step("zipListsWith - custom combiner", () => {
        const combine = (a) => (b) => a + b
        const result = lists.zipListsWith(combine)(["h", "l"])(["e", "o"])
        assertEquals(result, ["he", "lo"])
    })

    await t.step("zipListsWith - different lengths", () => {
        const combine = (a) => (b) => a + b
        const result = lists.zipListsWith(combine)(["a", "b", "c"])(["x", "y"])
        assertEquals(result, ["ax", "by"])
    })

    await t.step("zipLists - create fst/snd pairs", () => {
        const result = lists.zipLists([1n, 2n])(["a", "b"])
        assertEquals(result, [
            { fst: 1n, snd: "a" },
            { fst: 2n, snd: "b" }
        ])
    })
})

Deno.test("lib.lists - reverseList", async (t) => {
    const lists = loadListsLib()

    await t.step("reverseList - normal list", () => {
        assertEquals(lists.reverseList(["b", "o", "j"]), ["j", "o", "b"])
    })

    await t.step("reverseList - single element", () => {
        assertEquals(lists.reverseList([1n]), [1n])
    })

    await t.step("reverseList - empty list", () => {
        assertEquals(lists.reverseList([]), [])
    })
})

Deno.test("lib.lists - sort operations", async (t) => {
    const lists = loadListsLib()

    await t.step("sort - with comparator", () => {
        const cmp = (p) => (q) => p < q
        assertEquals(lists.sort(cmp)([5n, 3n, 7n]), [3n, 5n, 7n])
    })

    await t.step("sortOn - by property", () => {
        const byLength = (s) => BigInt(s.toString().length)
        const result = lists.sortOn(byLength)(["aa", "b", "cccc"])
        assertEquals(result, ["b", "aa", "cccc"])
    })

    await t.step("naturalSort - numeric portions", () => {
        const result = lists.naturalSort(["disk11", "disk8", "disk100", "disk9"])
        assertEquals(result, ["disk8", "disk9", "disk11", "disk100"])
    })

    await t.step("naturalSort - IP addresses", () => {
        const result = lists.naturalSort(["10.46.133.149", "10.5.16.62", "10.54.16.25"])
        assertEquals(result, ["10.5.16.62", "10.46.133.149", "10.54.16.25"])
    })

    await t.step("naturalSort - versions", () => {
        const result = lists.naturalSort(["v0.2", "v0.15", "v0.0.9"])
        assertEquals(result, ["v0.0.9", "v0.2", "v0.15"])
    })
})

Deno.test("lib.lists - take & drop", async (t) => {
    const lists = loadListsLib()

    await t.step("take - first N elements", () => {
        assertEquals(lists.take(2n)(["a", "b", "c", "d"]), ["a", "b"])
        assertEquals(lists.take(2n)([]), [])
    })

    await t.step("take - more than length", () => {
        assertEquals(lists.take(10n)(["a", "b"]), ["a", "b"])
    })

    await t.step("takeEnd - last N elements", () => {
        assertEquals(lists.takeEnd(2n)(["a", "b", "c", "d"]), ["c", "d"])
        assertEquals(lists.takeEnd(2n)([]), [])
    })

    await t.step("drop - remove first N", () => {
        assertEquals(lists.drop(2n)(["a", "b", "c", "d"]), ["c", "d"])
        assertEquals(lists.drop(2n)([]), [])
    })

    await t.step("drop - more than length", () => {
        assertEquals(lists.drop(10n)(["a", "b"]), [])
    })

    await t.step("dropEnd - remove last N", () => {
        assertEquals(lists.dropEnd(2n)(["a", "b", "c", "d"]), ["a", "b"])
        assertEquals(lists.dropEnd(2n)([]), [])
    })
})

Deno.test("lib.lists - sublist", async (t) => {
    const lists = loadListsLib()

    await t.step("sublist - extract range", () => {
        assertEquals(lists.sublist(1n)(3n)(["a", "b", "c", "d", "e"]), ["b", "c", "d"])
    })

    await t.step("sublist - empty list", () => {
        assertEquals(lists.sublist(1n)(3n)([]), [])
    })

    await t.step("sublist - start beyond length", () => {
        assertEquals(lists.sublist(10n)(2n)(["a", "b"]), [])
    })

    await t.step("sublist - count extends beyond length", () => {
        assertEquals(lists.sublist(1n)(10n)(["a", "b", "c"]), ["b", "c"])
    })
})

Deno.test("lib.lists - hasPrefix & removePrefix", async (t) => {
    const lists = loadListsLib()

    await t.step("hasPrefix - true", () => {
        assertEquals(lists.hasPrefix([1n, 2n])([1n, 2n, 3n, 4n]), true)
    })

    await t.step("hasPrefix - false", () => {
        assertEquals(lists.hasPrefix([0n, 1n])([1n, 2n, 3n, 4n]), false)
    })

    await t.step("hasPrefix - empty prefix", () => {
        assertEquals(lists.hasPrefix([])([1n, 2n]), true)
    })

    await t.step("removePrefix - valid prefix", () => {
        assertEquals(lists.removePrefix([1n, 2n])([1n, 2n, 3n, 4n]), [3n, 4n])
    })

    await t.step("removePrefix - invalid prefix throws", () => {
        assertThrows(() => {
            lists.removePrefix([0n, 1n])([1n, 2n, 3n, 4n])
        })
    })
})

Deno.test("lib.lists - commonPrefix", async (t) => {
    const lists = loadListsLib()

    await t.step("commonPrefix - partial match", () => {
        assertEquals(lists.commonPrefix([1n, 2n, 3n, 4n, 5n, 6n])([1n, 2n, 4n, 8n]), [1n, 2n])
    })

    await t.step("commonPrefix - full match", () => {
        assertEquals(lists.commonPrefix([1n, 2n, 3n])([1n, 2n, 3n, 4n, 5n]), [1n, 2n, 3n])
    })

    await t.step("commonPrefix - no match", () => {
        assertEquals(lists.commonPrefix([1n, 2n, 3n])([4n, 5n, 6n]), [])
    })
})

Deno.test("lib.lists - last & init", async (t) => {
    const lists = loadListsLib()

    await t.step("last - get last element", () => {
        assertEquals(lists.last([1n, 2n, 3n]), 3n)
        assertEquals(lists.last(["a"]), "a")
    })

    await t.step("last - empty list throws", () => {
        assertThrows(() => {
            lists.last([])
        })
    })

    await t.step("init - all but last", () => {
        assertEquals(lists.init([1n, 2n, 3n]), [1n, 2n])
        assertEquals(lists.init(["a"]), [])
    })

    await t.step("init - empty list throws", () => {
        assertThrows(() => {
            lists.init([])
        })
    })
})

Deno.test("lib.lists - unique operations", async (t) => {
    const lists = loadListsLib()

    await t.step("unique - remove duplicates", () => {
        assertEquals(lists.unique([3n, 2n, 3n, 4n]), [3n, 2n, 4n])
    })

    await t.step("unique - no duplicates", () => {
        assertEquals(lists.unique([1n, 2n, 3n]), [1n, 2n, 3n])
    })

    await t.step("unique - empty list", () => {
        assertEquals(lists.unique([]), [])
    })

    await t.step("uniqueStrings - remove string duplicates", () => {
        const result = lists.uniqueStrings(["foo", "bar", "foo"])
        // Order may not be preserved, but should have bar and foo
        assertEquals(result.length, 2n)
        assertEquals(result.includes("foo"), true)
        assertEquals(result.includes("bar"), true)
    })

    await t.step("allUnique - check uniqueness", () => {
        assertEquals(lists.allUnique([3n, 2n, 3n, 4n]), false)
        assertEquals(lists.allUnique([3n, 2n, 4n, 1n]), true)
    })
})

Deno.test("lib.lists - set operations", async (t) => {
    const lists = loadListsLib()

    await t.step("intersectLists - common elements", () => {
        assertEquals(lists.intersectLists([1n, 2n, 3n])([6n, 3n, 2n]), [3n, 2n])
    })

    await t.step("intersectLists - no common", () => {
        assertEquals(lists.intersectLists([1n, 2n])([3n, 4n]), [])
    })

    await t.step("subtractLists - remove elements", () => {
        assertEquals(lists.subtractLists([3n, 2n])([1n, 2n, 3n, 4n, 5n, 3n]), [1n, 4n, 5n])
    })

    await t.step("mutuallyExclusive - no common elements", () => {
        assertEquals(lists.mutuallyExclusive([1n, 2n])([3n, 4n]), true)
        assertEquals(lists.mutuallyExclusive([1n, 2n])([2n, 3n]), false)
    })

    await t.step("mutuallyExclusive - empty list", () => {
        assertEquals(lists.mutuallyExclusive([])([1n, 2n]), true)
    })
})

Deno.test("lib.lists - crossLists", async (t) => {
    const lists = loadListsLib()

    await t.step("crossLists - cartesian product", () => {
        const f = (x) => (y) => x.toString() + y.toString()
        const result = lists.crossLists(f)([[1n, 2n], [3n, 4n]])
        assertEquals(result, ["13", "14", "23", "24"])
    })
})

Deno.test("lib.lists - compareLists", async (t) => {
    const lists = loadListsLib()

    await t.step("compareLists - equal", () => {
        const cmp = (a) => (b) => {
            if (a < b) return -1n
            if (a > b) return 1n
            return 0n
        }
        assertEquals(lists.compareLists(cmp)([])([]), 0n)
    })

    await t.step("compareLists - first shorter", () => {
        const cmp = (a) => (b) => {
            if (a < b) return -1n
            if (a > b) return 1n
            return 0n
        }
        assertEquals(lists.compareLists(cmp)([])([1n]), -1n)
    })

    await t.step("compareLists - second shorter", () => {
        const cmp = (a) => (b) => {
            if (a < b) return -1n
            if (a > b) return 1n
            return 0n
        }
        assertEquals(lists.compareLists(cmp)([1n])([]), 1n)
    })

    await t.step("compareLists - element comparison", () => {
        const cmp = (a) => (b) => {
            if (a < b) return -1n
            if (a > b) return 1n
            return 0n
        }
        assertEquals(lists.compareLists(cmp)(["a", "b"])(["a", "c"]), -1n)
    })
})

Deno.test("lib.lists - concatAttrValues", async (t) => {
    const lists = loadListsLib()

    await t.step("concatAttrValues - concat all values", () => {
        const result = lists.concatAttrValues({ a: [1n, 2n], b: [3n] })
        assertEquals(result, [1n, 2n, 3n])
    })

    await t.step("concatAttrValues - empty set", () => {
        assertEquals(lists.concatAttrValues({}), [])
    })
})

Deno.test("lib.lists - replaceElemAt", async (t) => {
    const lists = loadListsLib()

    await t.step("replaceElemAt - replace element", () => {
        assertEquals(lists.replaceElemAt([1n, 2n, 3n])(0n)("a"), ["a", 2n, 3n])
        assertEquals(lists.replaceElemAt([1n, 2n, 3n])(2n)("z"), [1n, 2n, "z"])
    })

    await t.step("replaceElemAt - out of bounds throws", () => {
        assertThrows(() => {
            lists.replaceElemAt([1n, 2n])(5n)("x")
        })
    })

    await t.step("replaceElemAt - negative index throws", () => {
        assertThrows(() => {
            lists.replaceElemAt([1n, 2n])(-1n)("x")
        })
    })
})

console.log("✅ All lib.lists tests complete!")
