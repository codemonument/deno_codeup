# Source: https://github.com/microsoft/vscode/issues/56326
# Remove temp file from portable user data
Remove-Item -Recurse -Force -Path "data/user-data" -Include @("Backups", "Cache", "CachedData", "GPUCache", "logs")

# Download latest insiders build
curl.exe -L https://vscode-update.azurewebsites.net/latest/win32-x64-archive/insider -o insider.zip
# Delete anything except user data, update script and downloaded zip file
Get-ChildItem -Exclude @("data", "update.ps1", "insider.zip") | Remove-Item -Recurse -Force
# Unzip it
Expand-Archive -Path "insider.zip" -DestinationPath .
# Delete downloaded package
Remove-Item -Path "insider.zip"
Pause