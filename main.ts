import { cleanupUserTempDirs } from "./src/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "./src/download-vscode-zip.ts";
import { startKia } from "./src/utils/start-kia.ts";
import { cleanFolder } from "./src/clean-folder.ts";
import { unZipFromFile } from "https://deno.land/x/zip@v1.1.0/mod.ts";

/**
 * IMPORTANT: This script assumes to be started inside an extracted vscode installation
 */
const updateZip = "vscode-update.zip";

try {
  console.info("Updating vscode...");

  await cleanupUserTempDirs();
  await downloadVSCodeZip("archive", "./", updateZip);
  await cleanFolder(".", {
    ignore: ["data", updateZip, ".gitkeep"],
  });

  const kiaUnzip = await startKia(`Unzip ${updateZip}`);
  const result = await unZipFromFile(updateZip, ".");
  if (result.valueOf() === false) throw new Error(`Zip Extraction failed!`);
  await kiaUnzip.succeed(`Unzipped ${updateZip}`);

  const kiaZipDelete = await startKia(`Remove ${updateZip}`);
  await Deno.remove(updateZip);
  await kiaZipDelete.succeed(`Removed ${updateZip}`);

  console.info("VSCode Update finished successfully!");
} catch (error) {
  console.error(error);
  Deno.exit();
}
