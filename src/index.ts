import { breakType, prepareGcodeSnippet } from "./modules/prepareGcodeSnippet"
import { extractRecentPosition, readFileOrThrow } from "./modules/extractRecentPosition"
import { insertSnippet } from "./modules/insertSnippet"
import * as fs from "fs/promises"

completeProcess(
  "./tests/data/CE3_DEF.gcode",
  "C:/Users/phili/Desktop/CE3_DEF_out.gcode"
).then(() => {
  console.log("Done")
})

async function completeProcess(inputfilePath: string, outputPath: string): Promise<void> {
  const baseContent = await readFileOrThrow(inputfilePath)
  const recentSettings = await extractRecentPosition(baseContent, 80)
  const snippet = await prepareGcodeSnippet(recentSettings, breakType.filamentChange)
  const newContent = insertSnippet(baseContent, snippet, 80)
  await fs.writeFile(outputPath, newContent, "ascii")
}
