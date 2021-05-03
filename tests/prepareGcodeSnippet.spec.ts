import { breakType, prepareGcodeSnippet } from "../src/modules/prepareGcodeSnippet"
import extractRecentPosition from "../src/modules/extractRecentPosition"

let recentSettings
beforeAll(async () => {
  const testGCode = "tests/data/CE3_DEF.gcode"
  recentSettings = await extractRecentPosition(testGCode, 80)
})

it("should return a string", async () => {
  const result = await prepareGcodeSnippet(recentSettings, breakType.filamentChange)
  expect(typeof result).toBe("string")
})
