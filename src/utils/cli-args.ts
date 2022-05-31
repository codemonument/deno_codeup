export interface CliArgs {
  /**
   * If true, this cli does not override any files hile extracting the update zip.
   */
  safeExtract: boolean;

  /**
   * If true, allows installation to installLocation, when installLocation is empty
   */
  allowInstall: boolean;

  /**
   * The path of the vscode installation which should be updated
   */
  installLocation?: string;
}
