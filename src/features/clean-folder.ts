import { walk } from "https://deno.land/std@0.117.0/fs/mod.ts";
import { startKia } from "../utils/start-kia.ts";

export interface CleanFolderOptions {
  // do not clean files or folders in this list
  // will only go through one depth level,
  // so ignore can only contain top level childs inside vscode installation folder
  ignore?: string[];
}

export async function cleanFolder(
  path = ".",
  { ignore }: CleanFolderOptions,
) {
  const kia = await startKia(
    "Delete old vscode files, but keeping user dir and new vscode zip",
  );

  for await (const entry of walk(path, { maxDepth: 1 })) {
    if (entry.path === ".") continue;
    if (
      ignore &&
      ignore.find((ignorePrefix) => entry.path.startsWith(ignorePrefix))
    ) {
      console.log(`Ignored path during cleanup: `, entry.path);
      continue;
    }

    try {
      await Deno.remove(entry.path, { recursive: true });
    } catch (error) {
      // if error is: File not found, then ignore it (since when we delete folders recursively, all following file paths in the list get invalid)
      console.log(error);
      continue;
    }
  }

  await kia.succeed(`Deleted old vscode files`);
}
