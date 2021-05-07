import {
  extractGCommands,
  parseGCommand,
  parseInputToArray,
  gCommand,
  extractLinesFromGCommands,
} from "../src/modules/extractLines"

describe("parseGCommand", () => {
  const cases: [string, number, gCommand][] = [
    ["G1 F2700 E0", 1, { lineIndex: 1, x: false, y: false, E: 0 }],
    [
      "G0 F6000 X101.219 Y120.478 Z0.2",
      22,
      { lineIndex: 22, x: 101.219, y: 120.478, E: false },
    ],
    [
      "G1 F1200 X101.219 Y120.677 E0.00662",
      333,
      { lineIndex: 333, x: 101.219, y: 120.677, E: 0.00662 },
    ],
    [
      "G0 F6000 X101.619 Y120.277",
      4444,
      { lineIndex: 4444, x: 101.619, y: 120.277, E: false },
    ],
  ]
  it.each(cases)(
    "Input %p with index %p should extract correct values",
    (input, index, expected) => {
      expect(parseGCommand(input, index)).toEqual(expected)
    }
  )
})

let inputAsArray: string[]
beforeAll(() => {
  const input = `M107
  ;MESH:flat_d.stl
  G0 F6000 X101.219 Y120.478 Z0.2
  ;TYPE:WALL-INNER
  G1 F2700 E0
    G1 F1200 X101.219 Y120.677 E0.00662
    G1 X101.418 Y120.677 E0.0109
    G1 X106.261 Y120.676 E0.17198
    G1 X107.844 Y120.609 E0.22468
    G1 X109.402 Y120.406 E0.27694
    G1 X110.893 Y120.063 E0.32782
    G1 X112.3 Y119.576 E0.37734
    G1 X113.609 Y118.944 E0.42569
    G1 X114.804 Y118.161 E0.47321
    G1 X115.864 Y117.227 E0.5202
    G1 X116.77 Y116.137 E0.56734
    G1 X117.503 Y114.894 E0.61533
    G1 X118.045 Y113.503 E0.66499
    G1 X118.381 Y111.966 E0.71731
    G1 X118.494 Y110.291 E0.77315
    G1 X118.381 Y108.37 E0.83715
    G1 X118.055 Y106.68 E0.8944
    G1 X117.516 Y105.162 E0.94798
    G1 X116.78 Y103.831 E0.99856
    G1 X115.858 Y102.686 E1.04746
    G1 X114.77 Y101.727 E1.0957
    G1 X113.534 Y100.945 E1.14434
    G1 X112.171 Y100.332 E1.19405
    G1 X110.692 Y99.874 E1.24555
    G1 X109.098 Y99.559 E1.29959
    G1 X107.449 Y99.381 E1.35475
    G1 X105.676 Y99.323 E1.41376
    G1 X101.219 Y99.323 E1.562
    G1 X101.219 Y120.478 E2.26561
    G0 F6000 X101.619 Y120.277
    G1 F1200 X106.252 Y120.276 E2.41971
    G1 X107.81 Y120.21 E2.47157
    G1 X109.331 Y120.012 E2.52259
    G1 X110.782 Y119.678 E2.57211
    G1 X112.147 Y119.206 E2.62015
    G1 X113.412 Y118.595 E2.66687
    G1 X114.561 Y117.842 E2.71257
    G1 X115.576 Y116.947 E2.75757
    G1 X116.442 Y115.906 E2.80261
    G1 X117.142 Y114.719 E2.84845
    G1 X117.661 Y113.387 E2.89599
    G1 X117.984 Y111.91 E2.94628
    G1 X118.093 Y110.289 E3.00032
    G1 X117.983 Y108.42 E3.06259
    G1 X117.668 Y106.785 E3.11797
    G1 X117.15 Y105.327 E3.16943
    G1 X116.447 Y104.055 E3.21777
    G1 X115.568 Y102.964 E3.26437
    G1 X114.529 Y102.048 E3.31044
    G1 X113.344 Y101.298 E3.35708
    G1 X112.029 Y100.707 E3.40503
    G1 X110.594 Y100.262 E3.455
    G1 X109.038 Y99.955 E3.50775
    G1 X107.421 Y99.78 E3.56185
    G1 X105.669 Y99.723 E3.62015
    G1 X101.619 Y99.723 E3.75485
    G1 X101.619 Y120.277 E4.43848
    G1 F2700 E-0.56152
    G0 F6000 X101.319 Y120.277
    G0 X101.049 Y118.75
    G0 X102.484 Y118.75
    G0 X101.023 Y127.651
    G0 X101.023 Y126.176
    G0 X94.933 Y126.386`
  inputAsArray = parseInputToArray(input)
})

describe("Convert input text to array", () => {
  it("should convert the input line by line to an array", () => {
    expect(inputAsArray.length).toBe(69)
  })
})

describe("extract Lines", () => {
  it("should create an array of all coherent lines in the given gCode", () => {
    const result = extractGCommands(inputAsArray)
    expect(result.length).toBe(66)
  })
})

describe("Extract lines from gCommands", () => {
  let gCommands: gCommand[]
  beforeAll(() => {
    gCommands = extractGCommands(inputAsArray)
  })
  it("should collect the lines from a list of gCommands", () => {
    const result = extractLinesFromGCommands(gCommands)
    console.log(result)
  })
})
