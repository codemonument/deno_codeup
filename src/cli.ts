import { Command, HelpCommand } from "./deps/cliffy.ts";
import { VERSION } from "../VERSION.ts";
import { mainCommand } from "./cliffy-commands/mainCommand.ts";
import { installCommand } from "./cliffy-commands/înstallCommand.ts";
import { updateCommand } from "./cliffy-commands/updateCommand.ts";

/**
 * Defines the command hierarchy with options and args which should be available in this cli.
 * + Starts parsing
 */
export async function runCli(denoArgs: string[]) {
  const cli = new Command()
    .name(`codeup`)
    .description(`Installs or updates portable vscode installations`)
    .version(`${VERSION}`)
    .action(mainCommand)
    .command("help", new HelpCommand().global().alias("h"))
    .command("install", installCommand)
    .command("update", updateCommand);

  const { options, cmd } = await cli.parse(denoArgs);
}
