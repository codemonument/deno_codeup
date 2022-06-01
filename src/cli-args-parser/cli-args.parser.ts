import { help } from "../commands/help.ts";
import {
  args,
  EarlyExitFlag,
  Flag,
  PartialOption,
  Text,
} from "../deps/_args.ts";

const helpCommand = args.describe("Shows this help text");

const updateCommand = args
  .describe("Updates a given portable vscode installation")
  .with(
    PartialOption("installLocation", {
      type: Text,
      describe:
        `[Optional] A path to the install location of the vscode instance, which should be updated. 
                    Can also be set via VSCODE_INSTALL env or by running this cli inside a vscode directory`,
      default: undefined,
    }),
  )
  .with(
    Flag("safeExtract", {
      alias: ["s"],
      describe:
        "Do not override files while extracting the update-zip, if they exist already",
    }),
  );

const installCommand = args
  .describe(`Installs a fresh copy of portable vscode into an empty folder`);

const parser = args
  .describe("A portable vscode manager cli")
  .sub("help", helpCommand)
  .sub("install", installCommand)
  .sub("update", updateCommand)
  .with(
    EarlyExitFlag("help", {
      describe: "Show help",
      exit() {
        help(parser);
        return Deno.exit();
      },
    }),
  );
