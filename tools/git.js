import git from "https://esm.sh/isomorphic-git@1.27.1"
import http from 'https://unpkg.com/isomorphic-git@1.0.0-beta.36/http/web/index.js'
import fs from "./fs_shim.js"

export { git, http, fs }

// example:
// import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
// var dir = FileSystem.join(FileSystem.cwd, 'test-clone')
// await git.clone({ fs, http, dir, url: 'https://github.com/isomorphic-git/lightning-fs' })