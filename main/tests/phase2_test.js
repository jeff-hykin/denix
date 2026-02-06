// Tests for Phase 2 implementations

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

const assertContains = (str, substr, msg) => {
    if (!str.includes(substr)) {
        console.error(`❌ ${msg}`)
        console.error(`  String does not contain: ${substr}`)
        throw new Error(msg)
    } else {
        console.log(`✓ ${msg}`)
    }
}

// Sort implementation
{
    const sort = (comparator) => (list) => {
        return [...list].sort((a, b) => comparator(a)(b) ? -1 : (comparator(b)(a) ? 1 : 0))
    }
    const lessThan = (a) => (b) => a < b

    const result1 = sort(lessThan)([483, 249, 526, 147, 42, 77])
    assertEquals(result1, [42, 77, 147, 249, 483, 526], "sort with lessThan")

    const result2 = sort(lessThan)(["c", "a", "b"])
    assertEquals(result2, ["a", "b", "c"], "sort strings")
}

// Split implementation
{
    const split = (regex) => (str) => {
        const re = new RegExp(regex, 'g')
        const result = []
        let lastIndex = 0
        let match

        while ((match = re.exec(str)) !== null) {
            result.push(str.slice(lastIndex, match.index))
            const groups = []
            for (let i = 1; i < match.length; i++) {
                groups.push(match[i] === undefined ? null : match[i])
            }
            result.push(groups)
            lastIndex = re.lastIndex
        }
        result.push(str.slice(lastIndex))
        return result
    }

    const result1 = split("(a)b")("abc")
    assertEquals(result1, ["", ["a"], "c"], "split with single capture group")

    const result2 = split("([ac])")("abc")
    assertEquals(result2, ["", ["a"], "b", ["c"], ""], "split with multiple matches")

    const result3 = split("(a)|(c)")("abc")
    assertEquals(result3, ["", ["a", null], "b", [null, "c"], ""], "split with alternation")
}

// toXML implementation
{
    const toXML = (e) => {
        const toXml = (value) => {
            switch (typeof value) {
                case "boolean":
                    return `<bool value="${value ? 'true' : 'false'}" />`
                case "string":
                    return `<string value="${value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}" />`
                case "number":
                    return `<float value="${value}" />`
                case "bigint":
                    return `<int value="${value}" />`
                case "object":
                    if (value === null) {
                        return `<null />`
                    } else if (value instanceof Array) {
                        return `<list>${value.map(toXml).join('')}</list>`
                    } else if (Object.getPrototypeOf({}) == Object.getPrototypeOf(value)) {
                        const attrs = Object.keys(value).map(key =>
                            `<attr name="${key.replace(/"/g, '&quot;')}">${toXml(value[key])}</attr>`
                        ).join('')
                        return `<attrs>${attrs}</attrs>`
                    }
            }
            return `<unknown />`
        }
        return `<?xml version='1.0' encoding='utf-8'?>\n${toXml(e)}\n`
    }

    const xml1 = toXML(true)
    assertContains(xml1, '<bool value="true"', "toXML for boolean")

    const xml2 = toXML("test")
    assertContains(xml2, '<string value="test"', "toXML for string")

    const xml3 = toXML([1n, 2n, 3n])
    assertContains(xml3, '<list>', "toXML for list")
    assertContains(xml3, '<int value="1"', "toXML list contains int")

    const xml4 = toXML({ a: 1, b: 2 })
    assertContains(xml4, '<attrs>', "toXML for attrs")
    assertContains(xml4, 'name="a"', "toXML attrs contains a")
}

// baseNameOf implementation
{
    const baseNameOf = (value) => {
        if (typeof value === 'string') {
            const parts = value.split('/')
            return parts[parts.length - 1] || '/'
        }
        return value
    }

    assertEquals(baseNameOf("/foo/bar/baz"), "baz", "baseNameOf gets last component")
    assertEquals(baseNameOf("/foo/bar/"), "/", "baseNameOf handles trailing slash")
}

// dirOf implementation
{
    const dirOf = (value) => {
        if (typeof value === 'string') {
            const parts = value.split('/')
            parts.pop()
            return parts.join('/') || '/'
        }
        return value
    }

    assertEquals(dirOf("/foo/bar/baz"), "/foo/bar", "dirOf gets directory")
    assertEquals(dirOf("/foo"), "/", "dirOf handles root-level")
}

console.log("\n✓ All Phase 2 tests passed")
