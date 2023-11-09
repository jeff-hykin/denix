import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
import { nixFileToXml } from "../tools/parsing.js"

await Promise.all(
    (await FileSystem.listFilePathsIn(FileSystem.thisFolder)).filter(each=>each.endsWith(".nix")).map(
        eachPath=>nixFileToXml(eachPath)
    )
)