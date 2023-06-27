import {unlinkSync} from "node:fs"

// and remove it after packing
unlinkSync("../lib/README.md")
