import { args, EarlyExitFlag, Flag, Option, Text } from "./deps/_args.ts";

export const argsParser = args
  .describe(
    "Update a portable vscode install on Windows, extracted from a zip file",
  ).with(
    EarlyExitFlag("help", {
      describe: "Show help",
      exit() {
        console.log(argsParser.help());
        return Deno.exit();
      },
    }),
  ).with(
    Flag("safeExtract", {
      alias: ["s"],
      describe:
        "Do not override files while extracting the update-zip, if they exist already",
    }),
  ).with(Option("installLocation", {
    type: Text,
    describe:
      "A path to the install location of the vscode instance, which should be updated",
  }));
