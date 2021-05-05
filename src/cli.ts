import arg from "arg"
import inquirer from "inquirer"
import Listr from "listr"
import { breakType, prepareGcodeSnippet } from "./modules/prepareGcodeSnippet"
import { extractRecentPosition, readFileOrThrow } from "./modules/extractRecentPosition"
import { insertSnippet } from "./modules/insertSnippet"
import * as fs from "fs/promises"
import path from "path"

export async function cli(args): Promise<void> {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  console.log(options)
  let baseContent, recentSettings, snippet, newContent
  const tasks = new Listr([
    {
      title: "Loading inputfile",
      task: async () => {
        baseContent = await readFileOrThrow(options.input)
      },
    },
    {
      title: "Extracting data",
      task: async () => {
        recentSettings = await extractRecentPosition(baseContent, options.layer)
      },
    },
    {
      title: "Preparing gCode snippet",
      task: async () => {
        snippet = await prepareGcodeSnippet(recentSettings, breakType.filamentChange)
      },
    },
    {
      title: "Inserting snippet",
      task: async () => {
        newContent = insertSnippet(baseContent, snippet, options.layer)
      },
    },
    {
      title: "Writing new file",
      task: async () => {
        await fs.writeFile(
          path.resolve(path.dirname(options.input), options.output),
          newContent,
          "ascii"
        )
      },
    },
  ])
  await tasks.run()
}

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--input": String,
      "--output": String,
      "--type": String,
      "--layer": Number,
      "-i": "--input",
      "-o": "--output",
      "-t": "--type",
      "-l": "--layer",
    },
    {
      argv: rawArgs.slice(2),
    }
  )
  return {
    input: args["--input"] || "",
    output: args["--output"] || "",
    type: args["--type"] || "",
    layer: args["--layer"] || 0,
  }
}

async function promptForMissingOptions(options) {
  const questions = []
  if (!options.input) {
    questions.push({
      type: "input",
      name: "input",
      message: "Please enter a path to the gcode input file",
    })
  }

  if (!options.output) {
    questions.push({
      type: "input",
      name: "output",
      message: "Please enter the name for the outfile",
      default: false,
    })
  }

  if (!options.type) {
    questions.push({
      type: "list",
      name: "type",
      message: "Please select the break type:",
      choices: ["filamentChange"],
      default: "filamentChange",
    })
  }

  if (!options.layer) {
    questions.push({
      type: "number",
      name: "layer",
      message: "Please select layer before which the break should be added:",
    })
  }

  const answers = await inquirer.prompt(questions)
  return {
    ...options,
    input: options.input || answers.input,
    output: options.output || answers.output,
    type: options.type || answers.type,
    layer: options.layer || answers.layer,
  }
}
