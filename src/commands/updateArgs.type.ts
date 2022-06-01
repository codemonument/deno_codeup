export interface UpdateArgs {
  /**
   * If true, this cli does not override any files hile extracting the update zip.
   */
  safeExtract: boolean;

  /**
   * The path of the vscode installation which should be updated
   */
  installLocation?: string;
}
