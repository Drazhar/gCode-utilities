export function extractLines(input: string): line[] {
  const inputAsArray = input.split("\n")
  const isMovementWithExtrusion: boolean[] = []
  const output: line[] = []
  for (let i = 0; i < inputAsArray.length; i++) {
    isMovementWithExtrusion.push(checkIfMovesAndExtrudes(inputAsArray[i]))
    if (isMovementWithExtrusion[i]) {
      if (!isMovementWithExtrusion[i - 1]) {
        output.push({
          fromIndex: i - 1,
          toIndex: i,
          x: [0],
          y: [0],
          E: [0],
        })
      }
    }
  }

  console.log(output)
  return output
}

interface line {
  fromIndex: number
  toIndex: number
  x: number[]
  y: number[]
  E: number[]
}

export function checkIfMovesAndExtrudes(input: string): boolean {
  const regExpWithE = new RegExp(`x([.0-9]+) y([.0-9]+) e([.0-9]+)`, "gi")
  if (regExpWithE.test(input)) return true
  return false
}
