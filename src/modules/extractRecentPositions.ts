import * as fs from "fs/promises"

interface recentPosition {
  E: number
  X: number
  Y: number
  Z: number
}

export default async function extractRecentPosition(
  filepath: string,
  layer: number
): Promise<recentPosition> {
  const fileContent = await readFileOrThrow(filepath)
  const layerPosition = getPositionOfLayer(fileContent, layer)

  const sliced = fileContent.slice(0, layerPosition).split("\n")
  const resPos = {
    E: { val: null, regExp: new RegExp(/e([.0-9]+)/i) },
    X: { val: null, regExp: new RegExp(/x([.0-9]+)/i) },
    Y: { val: null, regExp: new RegExp(/y([.0-9]+)/i) },
    Z: { val: null, regExp: new RegExp(/z([.0-9]+)/i) },
  }
  for (let i = sliced.length - 1; i >= 0; i--)
    for (const axis in resPos)
      if (resPos[axis].val == null)
        if (resPos[axis].regExp.test(sliced[i])) {
          const match = sliced[i].match(resPos[axis].regExp)
          resPos[axis].val = parseFloat(match[1])
        }
  return {
    E: resPos.E.val,
    X: resPos.X.val,
    Y: resPos.Y.val,
    Z: resPos.Z.val,
  }
}

async function readFileOrThrow(filepath: string): Promise<string> {
  try {
    return await fs.readFile(filepath, { encoding: "ascii" })
  } catch (err) {
    throw ReferenceError(err)
  }
}

function getPositionOfLayer(fileContent: string, layer: number): number {
  const layerPosition = fileContent.indexOf(`LAYER:${layer}`)
  if (layerPosition < 0) throw RangeError("Layer not found")
  return layerPosition
}
