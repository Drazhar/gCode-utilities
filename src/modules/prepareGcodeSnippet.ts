import { recentSettings, readFileOrThrow } from "./extractRecentPosition"

export enum breakType {
  filamentChange = "filamentChange",
  pause = "pause",
}

export async function prepareGcodeSnippet(
  settings: recentSettings,
  type: breakType
): Promise<string> {
  const rawSnippet = await readFileOrThrow(`src/gcodeTemplates/${type}.gcode`)
  return replacePlaceholders(rawSnippet, settings)
}

function replacePlaceholders(rawSnippet: string, settings: recentSettings): string {
  let extendedSettings: any = settings
  extendedSettings.Z1 = settings.Z + 1
  for (const prop in extendedSettings) {
    const regExp = new RegExp(`{{${prop}}}`, "gi")
    rawSnippet = rawSnippet.replace(regExp, settings[prop])
  }
  return rawSnippet
}
