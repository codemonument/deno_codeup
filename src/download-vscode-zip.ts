import { download } from "https://deno.land/x/download/mod.ts";
import { VSCodeProductResponse } from "./models/vscode-product-response.ts";
import { startKia } from "./utils/start-kia.ts";
import * as log from "https://deno.land/std@0.117.0/log/mod.ts";
import { existsSync } from "https://deno.land/std@0.117.0/fs/mod.ts";

/**
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
  dir = "./",
  file = "vscode.zip",
) {
  const kia = await startKia("Downloading vscode zip");

  if (existsSync("vscode.zip")) {
    kia.succeed(`VSCode zip already downloaded`);
    return;
  }

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

  const result = await download(json.url, { dir, file, mode: 0o777 });
  await kia.succeed(`Downloaded VSCode Zip`);

  return result;
}
