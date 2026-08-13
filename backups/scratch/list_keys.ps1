$json = Get-Content -Raw scratch\match_index_4136.json | ConvertFrom-Json
$json.tool_calls[0].arguments | Get-Member -MemberType NoteProperty | Select-Object Name
