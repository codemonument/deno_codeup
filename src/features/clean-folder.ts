import { emptyDir, walk } from "../deps/std.ts";
import { VSCodeInstallLocation } from "../types/vscode-install-location.ts";
import { startKia } from "../utils/start-kia.ts";

export interface CleanFolderOptions {
  // do not clean files or folders in this list
  // will only go through one depth level,
  // so ignore can only contain top level childs inside vscode installation folder
  ignore?: string[];
}

export async function cleanFolder(
  vscodeInstall: VSCodeInstallLocation,
  { ignore }: CleanFolderOptions
) {
  const path = vscodeInstall.location;
  const kia = await startKia(
    "Delete old vscode files, but keeping user dir and new vscode zip"
  );

  for await (const entry of walk(path, { maxDepth: 1 })) {
    if (entry.path === ".") continue;
    if (entry.path === "..") continue;
    if (
      ignore &&
      ignore.find((ignorePrefix) => entry.path.startsWith(ignorePrefix))
    ) {
      console.log(`Ignored path during cleanup: `, entry.path);
      continue;
    }

    try {
      // Note: dn not use Deno.emove with recursive option here!
      // This would also delete the parent/root folder!
      await emptyDir(entry.path);
    } catch (error) {
      // if error is: File not found, then ignore it (since when we delete folders recursively, all following file paths in the list get invalid)
      console.log(error);
      continue;
    }
  }

  await kia.succeed(`Deleted old vscode files`);
}
