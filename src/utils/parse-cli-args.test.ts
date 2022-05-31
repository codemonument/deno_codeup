import { assertThrows, describe, it } from "../deps/_testing.std.ts";
import { log } from "../deps/_log.std.ts";
import { parseCliArgs } from "./parse-cli-args.ts";

describe(`parse-cli-args`, () => {
  it(`should exit with code 0 on --help`, async () => {
    await assertThrows(() => parseCliArgs(["--help"]));
  });

  //   Cannot happen since i don't have any required args anymore
  //   it(`should exit with code 1 on parse error`, async () => {
  //     await assertThrows(() => parseCliArgs(["--installLotion", "50"]));
  //   });

  it(`should run main command`, () => {
    parseCliArgs([]);
  });

  it(`should run help command`, () => {
    parseCliArgs(["help"]);
  });
});
