import { copyFileSync } from "node:fs"

// include root README in distribution
copyFileSync("../README.md", "../lib/README.md")
