import { cleanupUserTempDirs } from "./src/features/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "./src/features/download-vscode-zip.ts";
import { startKia } from "./src/utils/start-kia.ts";
import { cleanFolder } from "./src/features/clean-folder.ts";
import { decompress } from "./src/forks/zip@1.2.3/mod.ts";
import { VERSION } from "./VERSION.ts";
import { parseCliArgs } from "./src/utils/parse-cli-args.ts";
import { log } from "./src/deps/_log.std.ts";

/**
 * IMPORTANT: This script assumes to be started inside an extracted vscode installation
 */
const updateZip = "vscode-update.zip";
const cliArgs = parseCliArgs(Deno.args);

try {
  log.info(`Running portable-vscode-updater Version ${VERSION}`);
  log.info("Updating vscode...");

  await cleanupUserTempDirs();
  await downloadVSCodeZip("archive", "./", updateZip);
  await cleanFolder(".", {
    ignore: [
      "data",
      updateZip,
      ".gitkeep",
      "portable-vscode-updater.exe",
      "wcvm.exe",
    ],
  });

  const kiaUnzip = await startKia(`Unzip ${updateZip}`);
  const result = await decompress(updateZip, ".", { overwrite: true });
  if (result === false) throw new Error(`Zip Extraction failed!`);
  await kiaUnzip.succeed(`Unzipped ${updateZip}`);

  const kiaZipDelete = await startKia(`Remove ${updateZip}`);
  await Deno.remove(updateZip);
  await kiaZipDelete.succeed(`Removed ${updateZip}`);

  log.info("VSCode Update finished successfully!");
} catch (error) {
  log.error(error);
  Deno.exit();
}
