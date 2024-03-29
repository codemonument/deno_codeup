import { Command } from "../deps/cliffy.ts";
import { log } from "../deps/std.ts";
import { chooseValidVSCodeInstall } from "../features/choose-valid-vscode-install.ts";
import { cleanFolder } from "../features/clean-folder.ts";
import { cleanupUserTempDirs } from "../features/cleanup-user-temp-dirs.ts";
import { downloadVSCodeZip } from "../features/download-vscode-zip.ts";
import { decompress } from "../forks/zip@1.2.3/mod.ts";
import { startKia } from "../utils/start-kia.ts";
import { ensureDir } from "../deps/std.ts";

interface UpdateArgs {
  /**
   * If true, this cli does not override any files hile extracting the update zip.
   */
  safeExtract: boolean;

  /**
   * The path of the vscode installation which should be updated
   */
  installLocation?: string | true;
}

async function commandAction({ safeExtract, installLocation }: UpdateArgs) {
  log.info("Updating vscode...");

  if (installLocation === true) {
    console.error(
      `--installLocation option must be used with a value or not used at all, in case an env var should be used!`
    );
    return;
  }

  const workingVscodeDir = await chooseValidVSCodeInstall(
    { type: "CLI_ARG", location: installLocation },
    { type: "ENV_VSCODE_INSTALL", location: Deno.env.get("VSCODE_INSTALL") },
    { type: "CWD", location: Deno.cwd() }
  );

  console.log(`Working with VSCode Folder: `, workingVscodeDir);
  await ensureDir(workingVscodeDir.location);

  const updateZipName = "vscode-update.zip";
  const updateZipPath = await Deno.makeTempFile({ suffix: updateZipName });

  await cleanupUserTempDirs(workingVscodeDir);
  await downloadVSCodeZip("archive", updateZipPath);
  await cleanFolder(workingVscodeDir, {
    ignore: [
      // ignore .gitkeep for testing environment
      ".gitkeep",
      // ignore data to keep userdata around
      "data",
      // ignore these two executables to avoid deleting myself when run from the same dir as vscode install
      "portable-vscode-updater.exe",
      "codeup.exe",
    ],
  });

  /**
   * Unzip update zip
   */
  const kiaUnzip = await startKia(`Unzip ${updateZipPath}`);
  const result = await decompress(updateZipPath, workingVscodeDir.location, {
    // default for safeExtract is false
    overwrite: !safeExtract,
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
}

export const updateCommand = new Command()
  .alias("u")
  .description(
    `Updates a given portable vscode installation to the latest version`
  )
  .option(
    `-s, --safeExtract [safeExtract:boolean]`,
    `If true, do not override files while extracting the update-zip, if they exist already`,
    { default: false }
  )
  .option(
    `--installLocation [installLocation:string]`,
    `[Optional] A path to the install location of the vscode instance, which should be updated. 
     Can also be set via VSCODE_INSTALL env or by running this cli inside a vscode directory`,
    {
      value: (value) => {
        if (value === true) return undefined;
        return value;
      },
    }
  )
  .action(commandAction);
