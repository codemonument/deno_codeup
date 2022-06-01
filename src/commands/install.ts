import { InstallArgs } from "./installArgs.type.ts";

/**
 * Implements the install command for codeup cli
 */
export async function install({}: InstallArgs) {
}

/**
 * Export yargs command module
 * See: https://github.com/yargs/yargs/blob/main/docs/advanced.md#providing-a-command-module
 */

export const command = "install";
export const handler = install;
export const describe =
  "Installs a fresh copy of portable vscode into an empty folder";
