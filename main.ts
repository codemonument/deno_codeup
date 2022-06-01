import { cleanupUserTempDirs } from "./src/features/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "./src/features/download-vscode-zip.ts";
import { startKia } from "./src/utils/start-kia.ts";
import { cleanFolder } from "./src/features/clean-folder.ts";
import { decompress } from "./src/forks/zip@1.2.3/mod.ts";
import { VERSION } from "./VERSION.ts";
import { runCli } from "./src/utils/runCli.ts";
import { log } from "./src/deps/_log.std.ts";
import { join } from "./src/deps/_path.std.ts";
import { chooseValidVSCodeInstall } from "./src/features/choose-valid-vscode-install.ts";

try {
  log.info(
    `Running codeup, the portable-vscode-updater \n Version ${VERSION} \n`,
  );

  // Main Command
  await runCli(Deno.args);
} catch (error) {
  log.error(error);
  Deno.exit();
}
