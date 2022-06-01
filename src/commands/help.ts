import { log } from "../deps/_log.std.ts";
import { YargsInstance } from "../deps/_yargs.ts";

/**
 * Implements the help command for codeup cli
 *
 * @param parser This is the args parser instance
 */
export function help(
  parser: YargsInstance,
) {
  // if (!cmdPath.length) {
  //   console.log("USAGE:");
  //   console.log("  <program> help [command]");
  //   console.log("  <program> install");
  //   console.log("  <program> update");
  // }
  console.log(`\n${parser.getHelp()}\n`);
}

export function registerHelpCommand(yargs: YargsInstance): YargsInstance {
  return yargs.command("help", "Shows this help text", yargs);
}
