import { runCli } from "./cli.ts";
import { assertThrows } from "./deps/_testing.std.ts";

/**
 * Note: These tests fail currently because the functions are calling Deno.exit() and the exit sanitization seems to fail. :/
 * TODO: Figure out why the Deno.exit() sanitizer fails!
 */

Deno.test(
  `on arg '--help': showHelp & exit(0)`,
  {
    sanitizeExit: true,
  },
  async () => {
    await assertThrows(() => runCli(["--help"]));
  }
);

Deno.test(`on command 'help': showHelp & exit(0)`, async () => {
  await assertThrows(() => runCli(["help"]));
});

Deno.test(
  `on command 'help install': showHelp about install command & exit(0)`,
  async () => {
    await assertThrows(() => runCli(["help", "install"]));
  }
);
