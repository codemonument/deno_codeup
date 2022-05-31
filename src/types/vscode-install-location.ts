export interface VSCodeInstallLocation {
  type: "CLI_ARG" | "ENV_VSCODE_INSTALL" | "CWD";
  location: string;
  isValid: boolean;
}

export function isValidVSCodeInstallDir(
  install: Partial<VSCodeInstallLocation>,
): install is VSCodeInstallLocation {
  return install.location !== undefined;
}
