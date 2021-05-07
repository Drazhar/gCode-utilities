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
    E: { val: null, regExp: new RegExp(/g[01].*[xy].*e([.0-9]+)/i) },
    X: { val: null, regExp: new RegExp(/x([.0-9]+)/i) },
    Y: { val: null, regExp: new RegExp(/y([.0-9]+)/i) },
    Z: { val: null, regExp: new RegExp(/z([.0-9]+)/i) },
    hotendTemperature: { val: null, regExp: new RegExp(/m104 s([0-9]+)/i) },
    bedTemperature: { val: null, regExp: new RegExp(/m140 s([0-9]+)/i) },
  }

  collectRecentData(fileContent, recentData, layer)

  const result: recentSettings = {
    E: 0,
    X: 0,
    Y: 0,
    Z: 0,
    hotendTemperature: 0,
    bedTemperature: 0,
  }
  let prop: keyof typeof result
  for (prop in result) {
    result[prop] = recentData[prop].val as number
  }

  return result
}

function collectRecentData(fileContent: string, resPos: recentData, layer: number) {
  const layerPosition = getPositionOfLayer(fileContent, layer)
  const sliced = fileContent.slice(0, layerPosition).split("\n")
  for (let i = sliced.length - 1; i >= 0; i--)
    for (const axis in resPos)
      if (resPos[axis].val == null)
        if (resPos[axis].regExp.test(sliced[i])) {
          const match = sliced[i].match(resPos[axis].regExp)
          if (match) resPos[axis].val = parseFloat(match[1])
        }
}

export function getPositionOfLayer(fileContent: string, layer: number): number {
  const layerPosition = fileContent.indexOf(`LAYER:${layer}`)
  if (layerPosition < 0) throw RangeError("Layer not found")
  return layerPosition
}
