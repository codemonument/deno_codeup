import { YargsInstance } from "../deps/_yargs.ts";
import { modup } from "../deps/modup.ts";

export async function upgradeSelf() {
  await modup({
    cliName: "codeup",
    targetVersion: "latest",
    dryRun: false,
    force: false,
  });
}

/**
 * Export yargs command module
 * See: https://github.com/yargs/yargs/blob/main/docs/advanced.md#providing-a-command-module
 */

export const upgradeSelfYargsCommand = {
  command: ["upgrade-self"],
  handler: upgradeSelf,
  builder: (yargs: YargsInstance) => {
    return yargs;
  },
  describe: `Upgrades codeup itself to the newest tool version`,
};
