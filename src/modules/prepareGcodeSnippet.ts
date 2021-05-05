import { recentSettings, readFileOrThrow } from "./extractRecentPosition"
import path from "path"

export async function prepareGcodeSnippet(
  settings: recentSettings,
  type: breakType
): Promise<string> {
  const rawSnippet = await readFileOrThrow(
    path.resolve(__dirname, `../../gcodeTemplates/${type}.gcode`)
  )
  return replacePlaceholders(rawSnippet, settings)
}

function replacePlaceholders(rawSnippet: string, settings: recentSettings): string {
  const extendedSettings: extendedSettings = { ...settings }
  extendedSettings.Z1 = settings.Z + 1
  for (const prop in extendedSettings) {
    const regExp = new RegExp(`{{${prop}}}`, "gi")
    rawSnippet = rawSnippet.replace(
      regExp,
      `${Math.round(extendedSettings[prop] * 100000) / 100000}`
    )
  }
  return rawSnippet
}

export enum breakType {
  filamentChange = "filamentChange",
  pause = "pause",
}

interface extendedSettings extends recentSettings {
  [propName: string]: number
}
