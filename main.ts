import { VERSION } from "./VERSION.ts";
import { log } from "./src/deps/std.ts";
import { runCli } from "./src/cli-definition/runCli.ts";

/**
 * IMPORTANT: DO NOT RENAME THIS FILE!
 * It is used for installing codeup, so it might produce problems with older installations!
 */

try {
  log.info(
    `Running codeup, the portable-vscode-updater
     Version: ${VERSION} \n`
  );
  // Main Command
  await runCli(Deno.args);
} catch (error) {
  log.error(error);
  Deno.exit();
}
