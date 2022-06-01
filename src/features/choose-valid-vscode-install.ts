import {
  IncompleteVSCodeInstallLocation,
  VSCodeInstallLocation,
} from "../types/vscode-install-location.ts";
import { resolve } from "../deps/_path.std.ts";
import { isVSCodeFolder } from "../utils/is-vscode-folder.ts";

function isString(input?: string): input is string {
  return typeof input === "string" && input.length > 0;
}

export async function chooseValidVSCodeInstall(
  cliArg: IncompleteVSCodeInstallLocation,
  envVar: IncompleteVSCodeInstallLocation,
  cwd: IncompleteVSCodeInstallLocation,
): Promise<VSCodeInstallLocation> {
  console.debug(`Checking VSCode Install locations: `, [cliArg, envVar, cwd]);

  // 1. Check if install location was passed via cli arg
  if (isString(cliArg.location)) {
    const absPath = resolve(cliArg.location);
    const isValid = await isVSCodeFolder(absPath);
    return { type: "CLI_ARG", location: absPath, isValid };
  }

  // 2. Check if install location was passed via env var VSCODE_INSTALL
  if (isString(envVar.location)) {
    const absPath = resolve(envVar.location);
    const isValid = await isVSCodeFolder(absPath);
    return { type: "ENV_VSCODE_INSTALL", location: absPath, isValid };
  }

  // 3. Check if cwd is a valid vscode install location
  if (isString(cwd.location)) {
    const absPath = resolve(cwd.location);
    const isValid = await isVSCodeFolder(absPath);
    return { type: "CWD", location: absPath, isValid };
  }

  throw new Deno.errors.NotFound(
    `[chooseValidVSCodeInstall] No valid VSCode install location found. 
     You can pass VSCode Install paths via cli arg, by setting VSCODE_INSTALL env var 
     or by using it inside a valid vscode install dir. (ordered by priority)`,
  );
}
