import {
  assertEquals,
  assertThrows,
  describe,
  it,
} from "../deps/_testing.std.ts";
import { log } from "../deps/std.ts";
import { runCli } from "./runCli.ts";

describe(`runCli`, () => {
  it(`on arg '--help': showHelp & exit(0)`, async () => {
    await assertThrows(() => runCli(["--help"]));
  });

  it(`on command 'help': showHelp & exit(0)`, async () => {
    await assertThrows(() => runCli(["help"]));
  });

  it(`on command 'help install': showHelp about install command & exit(0)`, async () => {
    await assertThrows(() => runCli(["help", "install"]));
  });

  //   Cannot happen since i don't have any required args anymore
  //   it(`should exit with code 1 on parse error`, async () => {
  //     await assertThrows(() => parseCliArgs(["--installLotion", "50"]));
  //   });

  // it(`should run main command`, () => {
  //   assertEquals(parseCliArgs([]), {
  //     safeExtract: false,
  //     allowInstall: false,
  //     installLocation: undefined,
  //   });
  // });
});
