$json = Get-Content -Raw scratch\match_index_4136.json | ConvertFrom-Json
$argsObj = $json.tool_calls[0].args
$argsObj.ReplacementContent | Out-File -FilePath "scratch\content_4136.txt" -Encoding utf8
Write-Host "Extracted ReplacementContent to scratch\content_4136.txt"
