$logPath = "C:\Users\Joy\.gemini\antigravity\brain\56fd65fe-5ae8-4173-a836-7a5c996aabf6\.system_generated\logs\transcript_full.jsonl"
$lines = Get-Content -Path $logPath

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line.Length -gt 100000 -and $line -like "*app.js*") {
        Write-Host "Found VERY LARGE match at line $i (Length: $($line.Length))"
        # Parse and write to a JSON file to inspect
        $line | Out-File -FilePath "scratch\huge_match_$i.json" -Encoding utf8
    }
}
