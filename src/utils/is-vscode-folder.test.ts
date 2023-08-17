import { assertEquals, describe, it } from "../deps/_testing.std.ts";
import { isVSCodeFolder } from "./is-vscode-folder.ts";
import { ensureFile } from "../deps/std.ts";

describe(`isVSCodeFolder`, () => {
  it(`should return false for existing folder ./dist `, async () => {
    assertEquals(await isVSCodeFolder("./dist"), false);
  });

  it(`should return false for illegal folder ./bob `, async () => {
    assertEquals(await isVSCodeFolder("./bob"), false);
  });

  it(`should return true for folder with fake Code.exe`, async () => {
    const fakeExe = `./playground/Code.exe`;
    await ensureFile(fakeExe);
    assertEquals(await isVSCodeFolder("./playground"), true);
    await Deno.remove(fakeExe);
  });
});
