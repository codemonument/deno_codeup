import { download } from "https://deno.land/x/download/mod.ts";
import { VSCodeProductResponse } from "../models/vscode-product-response.ts";
import { startKia } from "../utils/start-kia.ts";
import { path } from "../deps/std.ts";
import { log } from "../deps/std.ts";

// TODO: pass options via this interface
// export interface DownloadVSCodeZipOptions {

// }

/**
 * Returns the path to the downloaded zip file
 *
 * Example API Paths
 * https://update.code.visualstudio.com/api/update/win32-x64-archive/stable/productCommit
 * https://update.code.visualstudio.com/api/update/win32-x64-archive/insider/productCommit
 *
 * Arches:
 * - x64
 *
 * Package formats:
 * - archive
 * - user
 *
 * stability:
 * - stable
 * - insider
 */
export async function downloadVSCodeZip(
  packageFormat: "archive" | "user" = "archive",
  filepath: string
) {
  const kia = await startKia("Downloading latest stable vscode zip");

  const url = `https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-${packageFormat}`;

  const dir = path.dirname(filepath);
  const file = path.basename(filepath);
  const result = await download(url, { dir, file, mode: 0o777 });
  await kia.succeed(`Downloaded VSCode Zip`);

  return result;
}
