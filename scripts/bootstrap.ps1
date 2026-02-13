param(
    [switch]$Dev
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Push-Location $repoRoot

try {
    $uv = Get-Command uv -ErrorAction SilentlyContinue
    if (-not $uv) {
        Write-Error "uv wurde nicht gefunden. Installiere uv zuerst: powershell -ExecutionPolicy ByPass -c \"irm https://astral.sh/uv/install.ps1 | iex\""
    }

    $venvPython = ".venv/Scripts/python.exe"
    if (-not (Test-Path $venvPython)) {
        Write-Host "Erstelle .venv ..."
        uv venv .venv
    }
    else {
        Write-Host ".venv existiert bereits."
    }

    if (Test-Path "requirements.txt") {
        Write-Host "Installiere Runtime-Dependencies aus requirements.txt ..."
        uv pip install --python $venvPython -r requirements.txt
    }
    else {
        Write-Warning "requirements.txt nicht gefunden. Runtime-Installation übersprungen."
    }

    if ($Dev) {
        if (Test-Path "requirements-dev.txt") {
            Write-Host "Installiere Dev-Dependencies aus requirements-dev.txt ..."
            uv pip install --python $venvPython -r requirements-dev.txt
        }
        else {
            Write-Warning "-Dev gesetzt, aber requirements-dev.txt fehlt. Dev-Installation übersprungen."
        }
    }

    if (-not (Test-Path ".env")) {
        Write-Warning ".env fehlt. Lege eine .env auf Basis von .env.example an."
    }

    Write-Host "Bootstrap abgeschlossen."
}
finally {
    Pop-Location
}