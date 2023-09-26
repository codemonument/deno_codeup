import { Command } from "./deps/cliffy.ts";
import { VERSION } from "../VERSION.ts";
import { mainCommand } from "./cliffy-commands/mainCommand.ts";
import { installCommand } from "./cliffy-commands/înstallCommand.ts";

/**
 * Defines the command hierarchy with options and args which should be available in this cli.
 * + Starts parsing
 */
export async function runCli(denoArgs: string[]) {
  const cli = new Command()
    .name(`codeup`)
    .description(`Installs or Updates portable vscode installations`)
    .version(`${VERSION}`)
    // .option(
    //   "-p, --port <port:number>",
    //   "The port number for the local server.",
    //   {
    //     default: 8080,
    //   }
    // )
    // .option("--host <hostname>", "The host name for the local server.", {
    //   default: "localhost",
    // })
    // .arguments("[domain]")
    .action(mainCommand)
    .command("install", installCommand);

  const { options, cmd } = await cli.parse(denoArgs);
}
