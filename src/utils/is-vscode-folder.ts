import { log } from "../deps/std.ts";
import { path } from "../deps/std.ts";

/**
 * @param path The path to check whether it is a vscode install folder or not.
 */
export async function isVSCodeFolder(
  installDirPath: string | undefined,
): Promise<boolean> {
  try {
    if (installDirPath === undefined) {
      log.debug(
        `[isVSCodeFolder] Got undefined as path to test. Returning false`,
      );
      return false;
    }

    const absPath = path.resolve(installDirPath);
    const installDirStats = await Deno.stat(absPath);

    // Check if install dir path is a directory
    if (!installDirStats.isDirectory) {
      log.debug(
        `[isVscodeFolder] installDir ${absPath} is not a directory`,
      );
      return false;
    }

    // check if install dir contains a Code.exe
    const vscodeExePath = path.join(absPath, "Code.exe");
    const hasVscodeExe = await Deno.stat(vscodeExePath);
    if (!hasVscodeExe.isFile) {
      log.debug(
        `[isVscodeFolder] vscodeExe ${vscodeExePath} is not a file`,
      );
      return false;
    }
  } catch (error: unknown) {
    if (error instanceof Deno.errors.NotFound) {
      log.debug(`[isVscodeFolder] vscode folder or Code.exe was not found`);
      return false;
    }

    log.error(error);
    return false;
  }

  return true;
}

/**
 * @param path The path to check whether it is a vscode install folder or not.
 */
export function isVSCodeFolderSync(
  installDirPath: string | undefined,
): boolean {
  try {
    if (installDirPath === undefined) {
      log.debug(
        `[isVSCodeFolder] Got undefined as path to test. Returning false`,
      );
      return false;
    }

    const absPath = path.resolve(installDirPath);
    const installDirStats = Deno.statSync(absPath);

    // Check if install dir path is a directory
    if (!installDirStats.isDirectory) {
      log.debug(
        `[isVscodeFolder] installDir ${absPath} is not a directory`,
      );
      return false;
    }

    // check if install dir contains a Code.exe
    const vscodeExePath = path.join(absPath, "Code.exe");
    const hasVscodeExe = Deno.statSync(vscodeExePath);
    if (!hasVscodeExe.isFile) {
      log.debug(
        `[isVscodeFolder] vscodeExe ${vscodeExePath} is not a file`,
      );
      return false;
    }
  } catch (error: unknown) {
    if (error instanceof Deno.errors.NotFound) {
      log.debug(`[isVscodeFolder] vscode folder or Code.exe was not found`);
      return false;
    }

    log.error(error);
    return false;
  }

  return true;
}
