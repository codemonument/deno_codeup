export interface IncompleteVSCodeInstallLocation {
  type: "CLI_ARG" | "ENV_VSCODE_INSTALL" | "CWD";
  location?: string;
  isValid?: boolean;
}

export interface VSCodeInstallLocation {
  type: "CLI_ARG" | "ENV_VSCODE_INSTALL" | "CWD";
  location: string;
  isValid: boolean;
}
