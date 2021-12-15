import { download } from "https://deno.land/x/download/mod.ts";

/**

 *
 * Arches:
 * -
 *
 * Package formats:
 * - archive
 * - user
 */
export async function downloadVSCodeZip(
  packageFormat: "archive" | "user" = "archive",
  dir = "./",
  file = "vscode.zip",
) {
  const url =
    `https://update.code.visualstudio.com/api/update/win32-x64-${packageFormat}/stable/productCommit`;
  const json = await (await fetch(url)).json();

  if (!json.url || json.url.length < 1) {
    throw new Error(
      `No download url available in json response from update.code.visualstudio.com`,
      json,
    );
  }

  return download(json.url, { dir, file, mode: 0o777 });
}
