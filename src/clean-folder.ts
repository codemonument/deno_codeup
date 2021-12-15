import { walk } from "https://deno.land/std@0.117.0/fs/mod.ts";
import { startKia } from "./utils/start-kia.ts";

export interface CleanFolderOptions {
  // do not clean files or folders in this list
  // will be checked with fsEntry.path.startsWith(ignoreEntry), therefore
  // they can have the format of
  // data/xxx.txt to ignore files or folders in greater depth
  ignore?: string[];
}

export async function cleanFolder(
  path = ".",
  { ignore }: CleanFolderOptions,
) {
  const kia = await startKia(
    "Delete old vscode files, but keeping user dir and new vscode zip",
  );

  for await (const entry of walk(path)) {
    if (entry.path === ".") continue;
    if (
      ignore &&
      ignore.find((ignorePrefix) => entry.path.startsWith(ignorePrefix))
    ) {
      console.log(`Ignored path during cleanup: `, entry.path);
      continue;
    }

    await Deno.remove(entry.path);
  }

  await kia.succeed(`Deleted old vscode files`);
}
