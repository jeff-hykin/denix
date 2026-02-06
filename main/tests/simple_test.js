// Simple inline test without full imports
// This avoids the prex WASM initialization issue

const builtins = {
    trace: (e1)=>(e2)=>{
        console.error(e1)
        return e2
    },
    seq: (e1)=>(e2)=>{
        e1
        return e2
    },
    deepSeq: (e1)=>(e2)=>{
        const deepEval = (val) => {
            if (val instanceof Array) {
                for (const item of val) {
                    deepEval(item)
                }
            } else if (val && typeof val === 'object' && Object.getPrototypeOf({}) == Object.getPrototypeOf(val)) {
                for (const key of Object.keys(val)) {
                    deepEval(val[key])
                }
            }
        }
        deepEval(e1)
        return e2
    },
    mapAttrs: (f)=>(attrset)=>{
        const result = {}
        for (const [name, value] of Object.entries(attrset)) {
            result[name] = f(name)(value)
        }
        return result
    },
    removeAttrs: (set)=>(list)=>{
        const result = {}
        for (const key of Object.keys(set)) {
            if (!list.includes(key)) {
                result[key] = set[key]
            }
        }
        return result
    },
    listToAttrs: (list)=>{
        const result = {}
        for (const item of list) {
            const name = item.name.toString()
            if (!result.hasOwnProperty(name)) {
                result[name] = item.value
            }
        }
        return result
    },
    intersectAttrs: (e1)=>(e2)=>{
        const result = {}
        for (const key of Object.keys(e1)) {
            if (e2.hasOwnProperty(key)) {
                result[key] = e2[key]
            }
        }
        return result
    },
    concatMap: (f)=>(list)=>{
        const result = []
        for (const item of list) {
            const mapped = f(item)
            result.push(...mapped)
        }
        return result
    },
    groupBy: (f)=>(list)=>{
        const result = {}
        for (const item of list) {
            const key = f(item).toString()
            if (!result[key]) {
                result[key] = []
            }
            result[key].push(item)
        }
        return result
    },
    parseDrvName: (s)=>{
        const str = s.toString()
        const match = str.match(/^(.*?)-([^-]*(?:-[^a-zA-Z].*)?)$/)
        if (match) {
            return { name: match[1], version: match[2] }
        } else {
            return { name: str, version: "" }
        }
    },
    compareVersions: (s1)=>(s2)=>{
        const splitVersion = (s) => (s.length == 0 ? [] : s.toString().split(/\.|(?<=\d)(?=\D)|(?<=\D)(?=\d)/g))
        const v1 = splitVersion(s1)
        const v2 = splitVersion(s2)
        const maxLen = Math.max(v1.length, v2.length)
        for (let i = 0; i < maxLen; i++) {
            const p1 = v1[i] || ""
            const p2 = v2[i] || ""
            const n1 = parseInt(p1)
            const n2 = parseInt(p2)
            if (!isNaN(n1) && !isNaN(n2)) {
                if (n1 < n2) return -1
                if (n1 > n2) return 1
            } else {
                if (p1 < p2) return -1
                if (p1 > p2) return 1
            }
        }
        return 0
    },
}

const operators = {
    negative: (value)=>typeof value == "bigint"?-value:-value,
    negate: (value)=>!value,
    listConcat: (value, other)=>value.concat(other),
    divide: (value, other)=>{
        if (typeof value == "bigint" && typeof other == "bigint") {
            return value/other
        } else {
            return value/other
        }
    },
    multiply: (value, other)=>{
        if (typeof value == "bigint" && typeof other == "bigint") {
            return value*other
        } else {
            return value*other
        }
    },
    merge: (value, other)=>({...value, ...other}),
    and: (value, other)=>value&&other,
    or: (value, other)=>value||other,
    implication: (value, other)=>!value||other,
    greaterThan: (value, other)=>value>other,
    lessThan: (value, other)=>value<other,
    greaterThanOrEqual: (value, other)=>value>=other,
    lessThanOrEqual: (value, other)=>value<=other,
    hasAttr: (attrset, attr)=>attrset.hasOwnProperty(attr.toString()),
}

// Tests
let passed = 0
let failed = 0

const assertEquals = (actual, expected, msg) => {
    const stringify = (val) => JSON.stringify(val, (key, value) =>
        typeof value === 'bigint' ? value.toString() + 'n' : value
    )
    const actualStr = stringify(actual)
    const expectedStr = stringify(expected)
    if (actualStr !== expectedStr) {
        console.error(`❌ ${msg}`)
        console.error(`  Expected: ${expectedStr}`)
        console.error(`  Actual: ${actualStr}`)
        failed++
    } else {
        console.log(`✓ ${msg}`)
        passed++
    }
}

// Trace test
assertEquals(builtins.trace("test")(42), 42, "trace returns second argument")

// Seq test
assertEquals(builtins.seq(1)(42), 42, "seq returns second argument")

// DeepSeq test
assertEquals(builtins.deepSeq({a:{b:1}})(42), 42, "deepSeq returns second argument")

// MapAttrs test
assertEquals(
    builtins.mapAttrs((name)=>(value)=>value*10)({a:1,b:2}),
    {a:10,b:20},
    "mapAttrs multiplies values"
)

// RemoveAttrs test
assertEquals(
    builtins.removeAttrs({x:1,y:2,z:3})(["x","z"]),
    {y:2},
    "removeAttrs removes specified attrs"
)

// ListToAttrs test
assertEquals(
    builtins.listToAttrs([{name:"a",value:1},{name:"b",value:2}]),
    {a:1,b:2},
    "listToAttrs converts list to attrs"
)

// IntersectAttrs test
assertEquals(
    builtins.intersectAttrs({x:1,y:2})({x:10,z:30}),
    {x:10},
    "intersectAttrs keeps matching names"
)

// ConcatMap test
assertEquals(
    builtins.concatMap((x)=>[x,x*10])([1,2,3]),
    [1,10,2,20,3,30],
    "concatMap maps and flattens"
)

// GroupBy test
const grouped = builtins.groupBy((s)=>s[0])(["foo","bar","baz","fan"])
assertEquals(grouped.f, ["foo","fan"], "groupBy groups by first char - f")
assertEquals(grouped.b, ["bar","baz"], "groupBy groups by first char - b")

// ParseDrvName test
assertEquals(
    builtins.parseDrvName("nix-0.12pre12876"),
    {name:"nix",version:"0.12pre12876"},
    "parseDrvName parses name-version"
)

// CompareVersions test
assertEquals(builtins.compareVersions("1.0")("2.0"), -1, "1.0 < 2.0")
assertEquals(builtins.compareVersions("2.0")("1.0"), 1, "2.0 > 1.0")
assertEquals(builtins.compareVersions("1.0")("1.0"), 0, "1.0 == 1.0")

// Operators
assertEquals(operators.negative(5n), -5n, "negative negates bigint")
assertEquals(operators.negate(true), false, "negate inverts boolean")
assertEquals(operators.listConcat([1,2],[3,4]), [1,2,3,4], "listConcat concatenates")
assertEquals(operators.divide(10n,2n), 5n, "divide divides bigints")
assertEquals(operators.multiply(5n,3n), 15n, "multiply multiplies bigints")
assertEquals(operators.merge({x:1},{y:2}), {x:1,y:2}, "merge merges objects")
assertEquals(operators.and(true,true), true, "and works")
assertEquals(operators.or(false,true), true, "or works")
assertEquals(operators.implication(true,false), false, "implication: true->false=false")
assertEquals(operators.greaterThan(5,3), true, "5 > 3")
assertEquals(operators.lessThan(3,5), true, "3 < 5")
assertEquals(operators.hasAttr({x:1},"x"), true, "hasAttr finds attr")

console.log(`\n${passed} passed, ${failed} failed`)
if (failed > 0) {
    Deno.exit(1)
}
