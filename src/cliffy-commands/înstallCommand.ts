import { Command } from "../deps/cliffy.ts";
import { log } from "../deps/std.ts";

function commandAction(_rawOptions: any, ...args: any[]) {
  log.info("Dummy Log for install command");
}

export const installCommand = new Command()
  .alias("i")
  .description(
    `WIP: Installs a fresh copy of portable vscode into an empty folder`
  )
  //   .option()
  //   .arguments()
  .action(commandAction);
