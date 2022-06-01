import {
  args,
  EarlyExitFlag,
  Flag,
  MAIN_COMMAND,
  PARSE_FAILURE,
  PartialOption,
  Text,
} from "../deps/_args.ts";
import { log } from "../deps/_log.std.ts";
import { CliArgs } from "./cli-args.type.ts";

function showHelp(cmdPath: readonly string[] = []) {
  if (!cmdPath.length) {
    log.info(`\nUSAGE: => TODO\n`);
  }
  log.info(`\n${parser.help(...cmdPath)}\n`);
}

const parser = args
  .describe(
    "Update a portable vscode install on Windows, extracted from a zip file",
  ).with(
    EarlyExitFlag("help", {
      describe: "Show help",
      exit() {
        showHelp();
        return Deno.exit();
      },
    }),
  ).with(
    Flag("safeExtract", {
      alias: ["s"],
      describe:
        "Do not override files while extracting the update-zip, if they exist already",
    }),
  ).with(Flag("allowInstall", {
    alias: ["i"],
    describe:
      "Allows installation of vscode when 'installLocation' path dir is empty",
  })).with(PartialOption("installLocation", {
    type: Text,
    describe:
      `[Optional] A path to the install location of the vscode instance, which should be updated. 
      Can also be set via VSCODE_INSTALL env or by running this cli inside a vscode directory`,
    default: undefined,
  }))
  .sub("help", args.describe("Shows this help text"));

/**
 * @param args should normally contain Deno.args, but can also contain mocked data for testing
 */
export function parseCliArgs(args: string[]): CliArgs {
  const res = parser.parse(args);

  switch (res.tag) {
    case PARSE_FAILURE:
      console.error(res?.error?.toString());
      Deno.exit(1);
      break;
    case MAIN_COMMAND: {
      const { safeExtract, installLocation, allowInstall } = res.value;
      return {
        safeExtract,
        installLocation,
        allowInstall,
      };
    }
    case "help":
      showHelp();
      Deno.exit();
      break;
  }
}
