$json = Get-Content -Raw scratch\match_index_4136.json | ConvertFrom-Json
$json | Format-List * | Out-File -FilePath "scratch\json_structure.txt" -Encoding utf8
Write-Host "Dumped JSON structure to scratch\json_structure.txt"
