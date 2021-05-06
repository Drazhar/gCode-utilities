import * as fs from "fs/promises"

export async function readFileOrThrow(filepath: string): Promise<string> {
  try {
    return await fs.readFile(filepath, { encoding: "ascii" })
  } catch (err) {
    throw ReferenceError(err)
  }
}
