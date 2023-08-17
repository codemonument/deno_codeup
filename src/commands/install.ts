import { log } from "../deps/std.ts";
import { InstallArgs } from "./installArgs.type.ts";

/**
 * Implements the install command for codeup cli
 */
export function install({}: InstallArgs) {
  log.info("Dummy Log for install command");
}

/**
 * Export yargs command module
 * See: https://github.com/yargs/yargs/blob/main/docs/advanced.md#providing-a-command-module
 */

export const installYargsCommand = {
  command: ["install", "i"],
  handler: install,
  describe:
    `WIP: Installs a fresh copy of portable vscode into an empty folder`,
};
