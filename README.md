# Windows (VS)Code Version Manager (wcvm)

A version manager for portable vscode installation on windows

Language: Typescript 
Run via: deno / as portable cli 
Command: wcvm

## VSCode Update API 

The update api for vscode has the following endpoints (inclomplete): 

- stable, zip/archive variant
https://update.code.visualstudio.com/api/update/win32-x64-archive/stable/productCommit

- stable windows install in user directory

## Additional info

Original Stack overflow issue: 
https://stackoverflow.com/questions/66644107/api-public-to-get-the-latest-and-stable-vscode-version-available-to-download-f

Usage in VSCode (probably update routine): 
https://github.com/microsoft/vscode/blob/640fa1af29d47b4d4fa09ff9b7c12521679ef634/src/vs/platform/update/electron-main/abstractUpdateService.ts#L17
