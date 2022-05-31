import {
  args,
  EarlyExitFlag,
  Flag,
  MAIN_COMMAND,
  Option,
  PARSE_FAILURE,
  Text,
} from "../deps/_args.ts";
import { log } from "../deps/_log.std.ts";

const parser = args
  .describe(
    "Update a portable vscode install on Windows, extracted from a zip file",
  ).with(
    EarlyExitFlag("help", {
      describe: "Show help",
      exit() {
        log.info(parser.help());
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

/**
 * @param args should normally contain Deno.args, but can also contain mocked data for testing
 */
export function parseCliArgs(args: string[]) {
  const res = parser.parse(args);

  switch (res.tag) {
    case PARSE_FAILURE:
      console.error(res.error.toString());
      Deno.exit(1);
      break;
    case MAIN_COMMAND:
      console.log("no command", res.value);
      break;
  }
}
