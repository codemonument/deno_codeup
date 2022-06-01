import { MAIN_COMMAND, PARSE_FAILURE } from "../deps/_args.ts";
import { log } from "../deps/_log.std.ts";
import { CliArgs } from "./cli-args.type.ts";
import { parser } from "./cli-args.parser.ts";
import { help } from "../commands/help.ts";
import { install } from "../commands/install.ts";
import { update } from "../commands/update.ts";

/**
 * @param args should normally contain Deno.args, but can also contain mocked data for testing
 */
export async function runCli(args: string[]): void {
  const res = parser.parse(args);

  switch (res.tag) {
    case PARSE_FAILURE:
      console.error(res?.error?.toString());
      Deno.exit(1);
      break;
    case MAIN_COMMAND: {
      const remaining = res.remaining().rawValues();
      if (remaining.length) {
        console.error(`Invalid subcommand: ${remaining[0]}`);
      } else {
        console.error("Missing subcommand");
      }

      // show usage when main exe was called without subcommands
      help(parser);
      Deno.exit();
      break;
    }
    // const { safeExtract, installLocation, allowInstall } = res.value;
    // return {
    //   safeExtract,
    //   installLocation,
    //   allowInstall,
    // };
    case "install":
      await install(res.value.value);
      break;
    case "update":
      await update(res.value.value);
      break;
    case "help":
    default:
      help(parser, res.remaining().rawValues());
      Deno.exit();
  }
}
