# codeup - A Portable VSCode Manager

A CLI tool by @codemonument named "codeup" to manage Portable VSCode installations (currently for windows only)

Language: Typescript 
Run via: deno / as portable cli 
Command (currently): codeup.exe

Available at: 
- Deno Main Package: https://deno.land/x/codeup
- Deno Secondary Package (for visibility): https://deno.land/x/portable_vscode_manager (also uses codeup command)
- Base Git Repo: <https://github.com/codemonument/portable-vscode-manager>

## How to use 

1. Install the package from deno.land/x as cli `codeup`:  
   ```
   deno install --allow-read --allow-write --allow-net --allow-run --allow-env --name codeup https://deno.land/x/codeup/main.ts
   ```
2. Enjoy codeup command! (Run `codeup help` to get usage information)
3. Optional: You can change the command to anything you like by simply passing another --name instead of `codeup`

## VSCode install location detection 

- Auto-detect vscode install for updating: 
    1. Search --installLocation option passed to the executable 
       (currently only available for the 'update' command)
    2. Search in current working dir for a vscode install
    3. Search in env var VSCODE_INSTALL and update the vscode install found at that location 

---

## Repo Structure 

- src - contains ts source files 
- main.ts - contains the main entrypoint for this script 
- playground - the current working directory for trying this script

## VSCode Download API 

The vscode update api at `https://update.code.visualstudio.com/api/update/win32-x64-archive/stable/productCommit`
seems broken for some time now. 
Therefore the vscode zip will be downloaded from the following url: 

- stable, win32 x64 zip/archive variant
https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-archive


## Additional info

Original Stack overflow issue: 
https://stackoverflow.com/questions/66644107/api-public-to-get-the-latest-and-stable-vscode-version-available-to-download-f

Usage in VSCode (probably update routine): 
https://github.com/microsoft/vscode/blob/640fa1af29d47b4d4fa09ff9b7c12521679ef634/src/vs/platform/update/electron-main/abstractUpdateService.ts#L17

available versions of vscode: 
https://code.visualstudio.com/Download





