import { extractRecentPosition } from "../src/modules/extractRecentPosition"
import { readFileOrThrow } from "../src/modules/readFileOrThrow"

const testGCode = "tests/data/CE3_DEF.gcode"

it("should throw error when submitted layer is not found", async () => {
  const fileContent = await readFileOrThrow(testGCode)
  await expect(extractRecentPosition(fileContent, 999)).rejects.toThrow()
})

test("Return valid object when layer is found", async () => {
  const fileContent = await readFileOrThrow(testGCode)
  const result = await extractRecentPosition(fileContent, 80)

  expect(result.X).toBe(145.595)
  expect(result.Y).toBe(27.89)
  expect(result.Z).toBe(0.36)
  expect(result.E).toBe(287.93521)
  expect(result.hotendTemperature).toBe(220)
  expect(result.bedTemperature).toBe(60)
})
