import { log } from "../deps/_log.std.ts";
import { yargs } from "../deps/_yargs.ts";
import { VERSION } from "../../VERSION.ts";
import { updateYargsCommand } from "../commands/update.ts";
import { installYargsCommand } from "../commands/install.ts";

/**
 * The yargs parser instance.
 * Exported for easier unit testing
 */
export const parser = yargs()
  .command(
    "$0",
    "Installs or Updates portable vscode installations",
    // () => console.log("default command was called!"),
  )
  .command(installYargsCommand)
  .command(updateYargsCommand)
  .help()
  .version(VERSION);

/**
 * @param args should normally contain Deno.args, but can also contain mocked data for testing
 */
export async function runCli(args: string[]): Promise<void> {
  const res = await parser.parseAsync(args).argv;
}
