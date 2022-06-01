export * from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

/**
 * This is a custom denoPlatformShim to fix import errors in original:
 * https://deno.land/x/yargs@v17.5.1-deno/deno.ts
 */
import denoPlatformShim from "./_yargs.denoPlattformShim.ts";
import { YargsFactory } from "https://deno.land/x/yargs@v17.5.1-deno/build/lib/yargs-factory.js";

const yargs = YargsFactory(denoPlatformShim);
export default yargs;

/**
 * Make YargsInstace type useable in my code
 */
export type YargsInstance = ReturnType<typeof yargs>;

/**
 * How to import / use yargs in deno: https://deno.land/x/yargs@v17.5.1-deno#deno
 * Yargs API Docs: https://github.com/yargs/yargs/blob/HEAD/docs/api.md
 */
