import { emptyDir, ensureDir } from "https://deno.land/std@0.117.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.117.0/path/mod.ts";
import * as log from "https://deno.land/std@0.117.0/log/mod.ts";



export function cleanupUserTempDirs(cwd = Deno.cwd()): Promise<void[]> {
    // remove temp files from portable user data
const tempFolderRemovalPromises = [
    "Backups",
    "Cache",
    "CachedData",
    "GPUCache",
    "logs",
  ].map((tempFolderName) => {
    const path = join(cwd, "data", "user-data", tempFolderName);
    return emptyDir(path);
  });

  return Promise.all(tempFolderRemovalPromises);
}