<#
.SYNOPSIS
    Normalises the non-standard abbreviation "e.t.c" (and the trailing-period
    form "e.t.c.") to the correct "etc." across all .mdx files.

.DESCRIPTION
    "et cetera" is two words, so its abbreviation takes a single trailing
    period: "etc." The site historically used "e.t.c", which treats it as three
    initials. This script rewrites every occurrence in .mdx files under the
    given root.

    The regex `e\.t\.c\.?` matches both "e.t.c" and "e.t.c." and replaces either
    with "etc." (so we never end up with a doubled period).

    Files are read and written as UTF-8 without a BOM to match the repo's
    existing encoding. Only files that actually change are rewritten.

.PARAMETER Root
    Directory to search. Defaults to the repo's src/content/pages.

.PARAMETER WhatIf
    Show which files would change without writing anything.
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [string]$Root = (Join-Path $PSScriptRoot '..\src\content\pages')
)

$pattern = 'e\.t\.c\.?'
$replacement = 'etc.'
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

$files = Get-ChildItem -Path $Root -Recurse -Filter '*.mdx' -File
$changedFiles = 0
$totalReplacements = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $matches = [regex]::Matches($content, $pattern)
    if ($matches.Count -eq 0) { continue }

    $newContent = [regex]::Replace($content, $pattern, $replacement)
    if ($newContent -eq $content) { continue }

    if ($PSCmdlet.ShouldProcess($file.FullName, "Replace $($matches.Count) occurrence(s)")) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, $utf8NoBom)
    }
    $changedFiles++
    $totalReplacements += $matches.Count
    Write-Host ("{0,3} fixed  {1}" -f $matches.Count, $file.FullName)
}

Write-Host ""
Write-Host ("Done. {0} replacement(s) across {1} file(s)." -f $totalReplacements, $changedFiles)
