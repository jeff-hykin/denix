// Tests for additional Phase 2 implementations

const stringify = (val) => JSON.stringify(val, (key, value) =>
    typeof value === 'bigint' ? value.toString() + 'n' : value
)

const assertEquals = (actual, expected, msg) => {
    const actualStr = stringify(actual)
    const expectedStr = stringify(expected)
    if (actualStr !== expectedStr) {
        console.error(`❌ ${msg}`)
        console.error(`  Expected: ${expectedStr}`)
        console.error(`  Actual: ${actualStr}`)
        throw new Error(msg)
    } else {
        console.log(`✓ ${msg}`)
    }
}

// catAttrs implementation
{
    const catAttrs = (attr) => (list) => {
        const result = []
        for (const each of list) {
            if (each.hasOwnProperty(attr)) {
                result.push(each[attr])
            }
        }
        return result
    }

    const result1 = catAttrs("x")([{x:1, y:2}, {x:3}, {y:4}])
    assertEquals(result1, [1, 3], "catAttrs collects x values")

    const result2 = catAttrs("a")([{a:10, b:20}, {b:30}, {a:40}])
    assertEquals(result2, [10, 40], "catAttrs collects a values")
}

// zipAttrsWith implementation
{
    const zipAttrsWith = (f) => (list) => {
        const collected = {}
        for (const attrset of list) {
            for (const [key, value] of Object.entries(attrset)) {
                if (!collected[key]) {
                    collected[key] = []
                }
                collected[key].push(value)
            }
        }
        const result = {}
        for (const [key, values] of Object.entries(collected)) {
            result[key] = f(key)(values)
        }
        return result
    }

    const result1 = zipAttrsWith((name) => (values) => values)([{a:1}, {a:2, b:3}])
    assertEquals(result1, {a:[1,2], b:[3]}, "zipAttrsWith collects values")

    const result2 = zipAttrsWith((name) => (values) => values.reduce((a,b) => a+b, 0))([{x:1, y:10}, {x:2}, {y:20}])
    assertEquals(result2, {x:3, y:30}, "zipAttrsWith with sum")
}

// attrNames implementation
{
    const attrNames = (value) => Object.getOwnPropertyNames(value).sort()

    const result1 = attrNames({c:1, a:2, b:3})
    assertEquals(result1, ["a", "b", "c"], "attrNames sorts alphabetically")

    const result2 = attrNames({z:1, m:2, a:3, q:4})
    assertEquals(result2, ["a", "m", "q", "z"], "attrNames sorting order")
}

// operators.equal with deep equality
{
    const equal = (value, other) => {
        if (value === other) return true
        if (typeof value !== typeof other) return false
        if (value instanceof Array && other instanceof Array) {
            if (value.length !== other.length) return false
            for (let i = 0; i < value.length; i++) {
                if (!equal(value[i], other[i])) return false
            }
            return true
        }
        if (value && other && typeof value === 'object' && typeof other === 'object') {
            if (Object.getPrototypeOf({}) !== Object.getPrototypeOf(value)) return false
            if (Object.getPrototypeOf({}) !== Object.getPrototypeOf(other)) return false
            const keys1 = Object.keys(value).sort()
            const keys2 = Object.keys(other).sort()
            if (keys1.length !== keys2.length) return false
            for (let i = 0; i < keys1.length; i++) {
                if (keys1[i] !== keys2[i]) return false
                if (!equal(value[keys1[i]], other[keys2[i]])) return false
            }
            return true
        }
        return false
    }

    assertEquals(equal([], []), true, "empty lists are equal")
    assertEquals(equal([1,2,3], [1,2,3]), true, "equal lists")
    assertEquals(equal([1,2], [1,2,3]), false, "different length lists")
    assertEquals(equal({a:1, b:2}, {b:2, a:1}), true, "equal attrsets (different order)")
    assertEquals(equal({a:1}, {a:2}), false, "different attrset values")
    assertEquals(equal({a:[1,2]}, {a:[1,2]}), true, "nested equal structures")
}

console.log("\n✓ All Phase 2b tests passed")
