export * from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
export {
  default,
  default as yargs,
} from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
export * from "https://deno.land/x/yargs@v17.5.1-deno/deno-types.ts";

/**
 * Make YargsInstace type useable in my code
 */
import yargs from "https://deno.land/x/yargs@v17.5.1-deno/deno.ts";
export type YargsInstance = ReturnType<typeof yargs>;
