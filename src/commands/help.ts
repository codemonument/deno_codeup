import { log } from "../deps/_log.std.ts";

type ParserWithHelpFunction = { help: (...cmdPath: string[]) => void };

/**
 * Implements the help command for codeup cli
 *
 * @param parser This is the args parser instance
 */
export function help<T extends ParserWithHelpFunction>(
  parser: T,
  cmdPath: readonly string[] = [],
) {
  if (!cmdPath.length) {
    log.info(`\nUSAGE: => TODO: Output usage information!\n`);
  }
  log.info(`\n${parser.help(...cmdPath)}\n`);
}
