import { emptyDir, ensureDir } from "https://deno.land/std@0.117.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.117.0/path/mod.ts";
import * as log from "https://deno.land/std@0.117.0/log/mod.ts";
import { cleanupUserTempDirs } from "./src/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "./src/download-vscode-zip.ts";

/**
 * IMPORTANT: This script assumes to be started inside an extracted vscode installation
 */
const logger = log.getLogger();

// will be appended in debug mode for easier testing of this script
// TODO: set to empty string for production!!!
const cwdPrefix = "playground";
const cwd = join(Deno.cwd(), cwdPrefix);

try {
  await cleanupUserTempDirs(cwd);
  logger.info("Success: Cleaned temp files in user Data");

  await downloadVSCodeZip();
  logger.info("Success: Downloaded VSCode Zip");
} catch (error) {
  logger.error(error);
}
