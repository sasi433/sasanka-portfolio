[CmdletBinding()]
param(
  [ValidateRange(1, 65535)]
  [int]$Port = 8787
)

$ErrorActionPreference = 'Stop'

$repositoryRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$dockerCommand = Get-Command docker -ErrorAction Stop

& $dockerCommand.Source version --format '{{.Server.Version}}' | Out-Null
if ($LASTEXITCODE -ne 0) {
  throw 'Docker Desktop is installed but its Linux engine is not available.'
}

$containerCommand = "corepack enable && corepack prepare pnpm@11.20.0 --activate && pnpm config set store-dir /pnpm/store && pnpm install --frozen-lockfile && pnpm preview -- --ip 0.0.0.0 --port $Port"

$dockerArguments = @(
  'run'
  '--rm'
  '--init'
  '--label'
  'com.sasanka-portfolio.task=preview'
  '--publish'
  "${Port}:${Port}"
  '--volume'
  "${repositoryRoot}:/app"
  '--volume'
  'sasanka_portfolio_node_modules:/app/node_modules'
  '--volume'
  'sasanka_portfolio_pnpm_store:/pnpm/store'
  '--workdir'
  '/app'
  '--env'
  'CI=1'
  'node:24.18.1-bookworm-slim'
  'sh'
  '-lc'
  $containerCommand
)

Write-Host "Starting the Cloudflare Workers preview at http://127.0.0.1:$Port"
Write-Host 'Press Ctrl+C to stop and remove the preview container.'

& $dockerCommand.Source @dockerArguments
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}
