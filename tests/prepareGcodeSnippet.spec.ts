import { breakType, prepareGcodeSnippet } from "../src/modules/prepareGcodeSnippet"
import extractRecentPosition from "../src/modules/extractRecentPosition"

let recentSettings
beforeAll(async () => {
  const testGCode = "tests/data/CE3_DEF.gcode"
  recentSettings = await extractRecentPosition(testGCode, 80)
})

it("should throw error if an unknown breakType is used", async () => {
  expect(() => {
    prepareGcodeSnippet(recentSettings, -1)
  }).toThrowError("Unknown breakType")
})

it("should return a string", () => {
  expect(typeof prepareGcodeSnippet(recentSettings, 1)).toBe("string")
})
