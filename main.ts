import { VERSION } from "./VERSION.ts";
import { log } from "./src/deps/_log.std.ts";
import { runCli } from "./src/cli-definition/runCli.ts";

try {
  log.info(
    `Running codeup, the portable-vscode-updater
     Version: ${VERSION} \n`,
  );
  // Main Command
  await runCli(Deno.args);
} catch (error) {
  log.error(error);
  Deno.exit();
}
