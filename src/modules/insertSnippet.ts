import { getPositionOfLayer } from "./extractRecentPosition"

export function insertSnippet(base: string, toInsert: string, layer: number): string {
  const layerPosition = getPositionOfLayer(base, layer)
  const insertPosition = layerPosition - 1
  return base.slice(0, insertPosition) + toInsert + "\n" + base.slice(insertPosition)
}
