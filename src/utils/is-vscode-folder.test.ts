import { assertEquals, describe, it } from "../deps/_testing.std.ts";
import { isVSCodeFolder } from "./is-vscode-folder.ts";

describe(`isVSCodeFolder`, () => {
  it(`should return false for ./playground `, async () => {
    assertEquals(await isVSCodeFolder("./dist"), false);
  });
});
