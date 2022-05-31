import {
  assertEquals,
  assertThrows,
  describe,
  it,
} from "../deps/_testing.std.ts";
import { log } from "../deps/_log.std.ts";
import { parseCliArgs } from "./parse-cli-args.ts";

describe(`parse-cli-args`, () => {
  it(`on --help arg: showHelp & exit(0)`, async () => {
    await assertThrows(() => parseCliArgs(["--help"]));
  });

  it(`on help cmd: showHelp & exit(0)`, async () => {
    await assertThrows(() => parseCliArgs(["help"]));
  });

  //   Cannot happen since i don't have any required args anymore
  //   it(`should exit with code 1 on parse error`, async () => {
  //     await assertThrows(() => parseCliArgs(["--installLotion", "50"]));
  //   });

  it(`should run main command`, () => {
    assertEquals(parseCliArgs([]), {
      safeExtract: false,
      installLocation: undefined,
    });
  });
});
