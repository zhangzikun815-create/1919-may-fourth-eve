@echo off
cd /d "%~dp0"

if not exist "node_modules\vite\bin\vite.js" (
  echo Website dependencies are missing.
  pause
  exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$url='http://127.0.0.1:5173/'; try { $response=Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 1; if($response.StatusCode -ge 200 -and $response.Content -match '1919'){ Start-Process $url; exit 0 } } catch {}; exit 1"
if not errorlevel 1 exit /b 0

start "1919 Web Server - close this window to stop" powershell.exe -NoExit -ExecutionPolicy Bypass -Command "Set-Location -LiteralPath '%~dp0'; node '.\node_modules\vite\bin\vite.js' --host 127.0.0.1"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$url='http://127.0.0.1:5173/'; for($i=0;$i -lt 40;$i++){ try { $response=Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 1; if($response.StatusCode -ge 200){ Start-Process $url; exit 0 } } catch { Start-Sleep -Milliseconds 250 } }; Write-Host 'Website server startup timed out.'; exit 1"

if errorlevel 1 pause
