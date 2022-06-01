import { emptyDir } from "https://deno.land/std@0.117.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.117.0/path/mod.ts";
import { startKia } from "../utils/start-kia.ts";
import { VSCodeInstallLocation } from "../types/vscode-install-location.ts";

// remove temp files from portable user data
export async function cleanupUserTempDirs(
  vscodeInstall: VSCodeInstallLocation,
): Promise<void[]> {
  const kiaCleanup = await startKia("Cleanup user temp dirs...");

  const tempFolderRemovalPromises = [
    "Backups",
    "Cache",
    "CachedData",
    "GPUCache",
    "logs",
  ].map((tempFolderName) => {
    const path = join(
      vscodeInstall.location,
      "data",
      "user-data",
      tempFolderName,
    );
    return emptyDir(path);
  });

  const result = await Promise.all(tempFolderRemovalPromises);
  await kiaCleanup.succeed("Cleaned temp files in user Data");

  return result;
}
