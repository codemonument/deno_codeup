import {
  AssertionError,
  assertThrows,
  describe,
  it,
} from "../deps/_testing.std.ts";
import { log } from "../deps/_log.std.ts";
import { parseCliArgs } from "./parse-cli-args.ts";

describe(`parse-cli-args`, () => {
  it(`should exit with code 0 on --help`, async () => {
    await assertThrows(() => parseCliArgs(["--help"]));
  });
});
