import { Command } from "../deps/cliffy.ts";
import { log } from "../deps/std.ts";

function commandAction(_rawOptions: any, ...args: any[]) {
  log.info("Dummy Log for update command");
}

export const updateCommand = new Command()
  .alias("u")
  .description(
    `Updates a given portable vscode installation to the latest version`
  )
  //   .option()
  //   .arguments()
  .action(commandAction);
