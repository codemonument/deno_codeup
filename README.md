# codeup - A Portable VSCode Manager

A manager for portable vscode installation currently Windows only

Language: Typescript 
Run via: deno / as portable cli 
Command (currently): codeup.exe

## How to use 

1. Install the package from deno.land/x:  
   ```
   deno install --allow-read --allow-write --allow-net --allow-run --allow-env --name codeup https://deno.land/x/codeup/main.ts
   ```
2. Enjoy codeup command! (Run `coudeup help` to get usage information)

---

## Repo Structure 

- src - contains ts source files 
- main.ts - contains the main entrypoint for this script 
- playground - the current working directory for trying this script

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

available versions of vscode: 
https://code.visualstudio.com/Download

## TODOs

- Auto-detect vscode install for updating: 
    1. Search arguments passed to the executable
    2. Search in current working dir 
    3. Add an env var VSCODE_INSTALL reading and update the install found at that location 

