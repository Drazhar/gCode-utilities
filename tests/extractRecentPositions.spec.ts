import extractRecentPosition from "../src/modules/extractRecentPosition"

it("should throw error when no valid path is inputted", async () => {
  await expect(extractRecentPosition("", 80)).rejects.toThrow()
})

const testGCode = "tests/data/CE3_DEF.gcode"

it("should throw error when submitted layer is not found", async () => {
  await expect(extractRecentPosition(testGCode, 999)).rejects.toThrow()
})

test("Return valid object when layer is found", async () => {
  const result = await extractRecentPosition(testGCode, 80)

  expect(result.X).toBe(145.595)
  expect(result.Y).toBe(27.89)
  expect(result.Z).toBe(9.72)
  expect(result.E).toBe(3015.43661)
  expect(result.hotendTemperature).toBe(200)
  expect(result.bedTemperature).toBe(50)
})
