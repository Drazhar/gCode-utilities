import * as fs from "fs/promises"

export interface recentSettings {
  E: number
  X: number
  Y: number
  Z: number
  hotendTemperature: number
  bedTemperature: number
}

interface recentData {
  [propName: string]: { val: number | null; regExp: RegExp }
}

export async function extractRecentPosition(
  fileContent: string,
  layer: number
): Promise<recentSettings> {
  const recentData: recentData = {
    E: { val: null, regExp: new RegExp(/e([.0-9]+)/i) },
    X: { val: null, regExp: new RegExp(/x([.0-9]+)/i) },
    Y: { val: null, regExp: new RegExp(/y([.0-9]+)/i) },
    Z: { val: null, regExp: new RegExp(/z([.0-9]+)/i) },
    hotendTemperature: { val: null, regExp: new RegExp(/m104 s([0-9]+)/i) },
    bedTemperature: { val: null, regExp: new RegExp(/m140 s([0-9]+)/i) },
  }

  collectRecentData(fileContent, recentData, layer)

  return {
    E: recentData.E.val,
    X: recentData.X.val,
    Y: recentData.Y.val,
    Z: recentData.Z.val,
    hotendTemperature: recentData.hotendTemperature.val,
    bedTemperature: recentData.bedTemperature.val,
  }
}

export async function readFileOrThrow(filepath: string): Promise<string> {
  try {
    return await fs.readFile(filepath, { encoding: "ascii" })
  } catch (err) {
    throw ReferenceError(err)
  }
}

function collectRecentData(fileContent: string, resPos: recentData, layer: number): void {
  const layerPosition = getPositionOfLayer(fileContent, layer)
  const sliced = fileContent.slice(0, layerPosition).split("\n")
  for (let i = sliced.length - 1; i >= 0; i--)
    for (const axis in resPos)
      if (resPos[axis].val == null)
        if (resPos[axis].regExp.test(sliced[i])) {
          const match = sliced[i].match(resPos[axis].regExp)
          resPos[axis].val = parseFloat(match[1])
        }
}

export function getPositionOfLayer(fileContent: string, layer: number): number {
  const layerPosition = fileContent.indexOf(`LAYER:${layer}`)
  if (layerPosition < 0) throw RangeError("Layer not found")
  return layerPosition
}
