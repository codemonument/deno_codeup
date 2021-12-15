import { emptyDir, ensureDir } from "https://deno.land/std@0.117.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.117.0/path/mod.ts";
import * as log from "https://deno.land/std@0.117.0/log/mod.ts";
import { Kia } from "https://deno.land/x/kia@v0.1.0/kia.ts";
import { cleanupUserTempDirs } from "./src/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "./src/download-vscode-zip.ts";

/**
 * IMPORTANT: This script assumes to be started inside an extracted vscode installation
 */
const logger = log.getLogger();

try {
  logger.info("Updating vscode...");

  const kiaCleanup = new Kia("Cleanup user temp dirs...");
  await kiaCleanup.start();
  await cleanupUserTempDirs();
  await kiaCleanup.succeed("Cleaned temp files in user Data");

  const kiaZipDownload = new Kia("Downloading vscode zip");
  await kiaZipDownload.start();
  await downloadVSCodeZip();
  await kiaZipDownload.succeed(`Downloaded VSCode Zip`);

  logger.info("VSCode Update finished successfully!");
} catch (error) {
  logger.error(error);
}
