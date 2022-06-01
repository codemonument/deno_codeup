import { download } from "https://deno.land/x/download/mod.ts";
import { VSCodeProductResponse } from "../models/vscode-product-response.ts";
import { startKia } from "../utils/start-kia.ts";
import { basename, dirname } from "../deps/_path.std.ts";
import { log } from "../deps/_log.std.ts";

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
  filepath: string,
) {
  const kia = await startKia("Downloading vscode zip");

  const url =
    `https://update.code.visualstudio.com/api/update/win32-x64-${packageFormat}/stable/productCommit`;
  const json: VSCodeProductResponse = await (await fetch(url)).json();
  console.log(`VSCodeProductResponse json: `, json);

  if (!json.url || json.url.length < 1) {
    kia.fail(
      `No download url available in json response from update.code.visualstudio.com`,
    );
    Deno.exit();
  }

  const dir = dirname(filepath);
  const file = basename(filepath);
  const result = await download(json.url, { dir, file, mode: 0o777 });
  await kia.succeed(`Downloaded VSCode Zip`);

  return result;
}
