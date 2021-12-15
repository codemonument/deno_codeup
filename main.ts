import { emptyDir, ensureDir } from "https://deno.land/std@0.117.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.117.0/path/mod.ts";
import * as log from "https://deno.land/std@0.117.0/log/mod.ts";
import { cleanupUserTempDirs } from "./src/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "./src/download-vscode-zip.ts";
import { startKia } from "./src/utils/start-kia.ts";

/**
 * IMPORTANT: This script assumes to be started inside an extracted vscode installation
 */
const logger = log.getLogger();

try {
  logger.info("Updating vscode...");

  await cleanupUserTempDirs();
  await downloadVSCodeZip();

  logger.info("VSCode Update finished successfully!");
} catch (error) {
  logger.error(error);
}
