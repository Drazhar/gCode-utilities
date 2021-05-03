import { recentSettings } from "./extractRecentPosition"

export enum breakType {
  filamentChange = 1,
  pause,
}

export function prepareGcodeSnippet(settings: recentSettings, type: breakType): string {
  switch (type) {
    case breakType.filamentChange:
      return ""
    default:
      throw TypeError("Unknown breakType")
  }
}
