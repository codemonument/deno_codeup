import { cleanupUserTempDirs } from "./src/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "./src/download-vscode-zip.ts";
import { startKia } from "./src/utils/start-kia.ts";
import { cleanFolder } from "./src/clean-folder.ts";
import { decompress } from "https://deno.land/x/zip@v1.2.2/mod.ts";

/**
 * IMPORTANT: This script assumes to be started inside an extracted vscode installation
 *
 * VERSION: 1.0.0
 */
const updateZip = "vscode-update.zip";

try {
  console.info("Updating vscode...");

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
  const result = await decompress(updateZip, ".");
  if (result === false) throw new Error(`Zip Extraction failed!`);
  await kiaUnzip.succeed(`Unzipped ${updateZip}`);

  const kiaZipDelete = await startKia(`Remove ${updateZip}`);
  await Deno.remove(updateZip);
  await kiaZipDelete.succeed(`Removed ${updateZip}`);

  console.info("VSCode Update finished successfully!");
} catch (error) {
  console.error(error);
  Deno.exit();
}
