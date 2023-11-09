import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
import { nixFileToXml, parse } from "../tools/parsing.js"

await Promise.all(
    (await FileSystem.listFilePathsIn(FileSystem.thisFolder)).filter(each=>each.endsWith(".nix")).map(
        eachPath=>nixFileToXml(eachPath)
    )
)
await Promise.all(
    (await FileSystem.listFilePathsIn(FileSystem.thisFolder)).filter(each=>each.endsWith(".nix")).map(
        eachPath=>FileSystem.write({
            path: eachPath+".json",
            data: JSON.stringify(parse(FileSystem.sync.read(eachPath)).rootNode,0,2),
        })
    )
)