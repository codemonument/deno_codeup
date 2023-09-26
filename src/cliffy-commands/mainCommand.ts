/**
 * This is the default command function.
 * Will be run when no explicit command is given.
 *
 * It contains/should contain an interactive process for detecting and upgrading existing portable vscode installations.
 */

export async function mainCommand(_rawOptions: any, ...args: any[]) {
  console.log(`main function called`, { _rawOptions, args });
  console.info(`interactive vscode install/update is work in progress!`);
}
