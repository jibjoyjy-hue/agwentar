$json = Get-Content -Raw scratch\match_index_4136.json | ConvertFrom-Json
$json.tool_calls[0].arguments.ReplacementContent | Out-File -FilePath "scratch\content_4136.txt" -Encoding utf8
Write-Host "Extracted ReplacementContent of 4136 to scratch\content_4136.txt"
