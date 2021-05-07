export function extractLinesFromGCommands(input: gCommand[]): line[] {
  const extractedLines: line[] = []
  for (let i = 0; i < input.length; i++) {
    if (input[i].E !== false) {
      if (input[i - 1].E === false) {
        let lastX, lastY, lastE
        for (let j = i - 1; j >= 0; j--) {
          if (typeof lastX === "undefined" && input[j].x !== false) lastX = input[j].x
          if (typeof lastX === "undefined" && input[j].y !== false) lastY = input[j].y
          if (typeof lastX === "undefined" && input[j].E !== false) lastE = input[j].E
        }
        extractedLines.push({
          fromIndex: input[i - 1].lineIndex,
          toIndex: i,
          x: [lastX as number],
          y: [lastY as number],
          E: [lastE as number],
        })
      }
    }
  }
  return extractedLines
}

export function extractGCommands(input: string[]): gCommand[] {
  const gCommands: gCommand[] = []
  for (let i = 0; i < input.length; i++) {
    if (input[i].trimStart()[0].toLowerCase() == "g") {
      gCommands.push(parseGCommand(input[i], i))
    }
  }
  return gCommands
}

export function parseInputToArray(input: string): string[] {
  return input.split("\n")
}

export function parseGCommand(input: string, index: number): gCommand {
  const regExps = {
    x: new RegExp(/x([.0-9]+)/i),
    y: new RegExp(/y([.0-9]+)/i),
    E: new RegExp(/e([.0-9]+)/i),
  }
  const output: gCommand = { lineIndex: index, x: false, y: false, E: false }
  let prop: keyof typeof regExps
  for (prop in regExps) {
    const match = input.match(regExps[prop])
    if (match) {
      output[prop] = parseFloat(match[1])
    }
  }

  return output
}

export interface gCommand {
  lineIndex: number
  x: number | false
  y: number | false
  E: number | false
}

interface line {
  fromIndex: number
  toIndex: number
  x: number[]
  y: number[]
  E: number[]
}
