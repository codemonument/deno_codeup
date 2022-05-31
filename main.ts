import { cleanupUserTempDirs } from "./src/features/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "./src/features/download-vscode-zip.ts";
import { startKia } from "./src/utils/start-kia.ts";
import { cleanFolder } from "./src/features/clean-folder.ts";
import { decompress } from "./src/forks/zip@1.2.3/mod.ts";
import { VERSION } from "./VERSION.ts";
import { parseCliArgs } from "./src/utils/parse-cli-args.ts";
import { log } from "./src/deps/_log.std.ts";
import { join } from "./src/deps/_path.std.ts";
import { chooseValidVSCodeInstall } from "./src/features/choose-valid-vscode-install.ts";

try {
  log.info(`Running portable-vscode-updater Version ${VERSION}`);
  log.info("Updating vscode...");
  const cliArgs = parseCliArgs(Deno.args);

  const workingVscodeDir = await chooseValidVSCodeInstall(
    { type: "CLI_ARG", location: cliArgs.installLocation },
    { type: "ENV_VSCODE_INSTALL", location: Deno.env.get("VSCODE_INSTALL") },
    { type: "CWD", location: Deno.cwd() },
  );

  const updateZipName = "vscode-update.zip";
  const updateZipPath = join(workingVscodeDir.location, updateZipName);

  await cleanupUserTempDirs(workingVscodeDir);
  await downloadVSCodeZip("archive", workingVscodeDir.location, updateZipName);
  await cleanFolder(".", {
    ignore: [
      "data",
      updateZipName,
      ".gitkeep",
      "portable-vscode-updater.exe",
      "wcvm.exe",
    ],
  });

  /**
   * Unzip update zip
   */
  const kiaUnzip = await startKia(`Unzip ${updateZipPath}`);
  const result = await decompress(updateZipPath, workingVscodeDir.location, {
    overwrite: true,
  });
  if (result === false) throw new Error(`Zip Extraction failed!`);
  await kiaUnzip.succeed(`Unzipped ${updateZipPath}`);

  /**
   * Delete update zip
   */
  const kiaZipDelete = await startKia(`Remove ${updateZipPath}`);
  await Deno.remove(updateZipPath);
  await kiaZipDelete.succeed(`Removed ${updateZipPath}`);

  log.info("VSCode Update finished successfully!");
} catch (error) {
  log.error(error);
  Deno.exit();
}
