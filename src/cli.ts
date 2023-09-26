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
    .description(
      `Installs or updates portable vscode installations
    
    Auto-detect vscode install for updating: 
    1. Search --installLocation option passed to the executable 
       (currently only available for the 'update' command)
    2. Search in current working dir for a vscode install
    3. Search in env var VSCODE_INSTALL and update the vscode install found at that location 
    
    `
    )
    .version(`${VERSION}`)
    .action(mainCommand)
    .command("help", new HelpCommand().global().alias("h"))
    .command("install", installCommand)
    .command("update", updateCommand);

  const { options, cmd } = await cli.parse(denoArgs);
}
