import { getPositionOfLayer } from "./extractRecentPosition"

export function insertSnippet(base: string, toInsert: string, layer: number): string {
  const layerPosition = getPositionOfLayer(base, layer)
  base = checkIfAndRemoveExtraExtrusion(base, layerPosition)
  const insertPosition = layerPosition - 1
  return base.slice(0, insertPosition) + toInsert + "\n" + base.slice(insertPosition)
}

function checkIfAndRemoveExtraExtrusion(base: string, layerPosition: number): string {
  let indexOf = base
    .substring(layerPosition)
    .search(new RegExp("g[01] f[.0-9]+ E[.0-9]+", "i"))
  if (indexOf >= 0) {
    indexOf += layerPosition
    const endOfLine = base.indexOf("\n", indexOf)
    base = base.slice(0, indexOf - 1) + base.slice(endOfLine)
  }
  return base
}
