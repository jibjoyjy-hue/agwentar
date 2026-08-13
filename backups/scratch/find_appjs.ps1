$logPath = "C:\Users\Joy\.gemini\antigravity\brain\56fd65fe-5ae8-4173-a836-7a5c996aabf6\.system_generated\logs\transcript_full.jsonl"

# Read transcript line by line
$lines = Get-Content -Path $logPath

# Let's search all matches
Write-Host "Searching for matches older than line 4300..."
$matchCount = 0
for ($i = $lines.Count - 1; $i -ge 0; $i--) {
    $line = $lines[$i]
    if ($line -like "*app.js*" -and $i -lt 4300) {
        # Check if the line is a write_to_file or replace_file_content tool call
        # Or check the length. A complete file content or big chunk would make the line very long (e.g. > 10,000 characters).
        if ($line.Length -gt 50000) {
            Write-Host "Found LARGE match at line $i (Length: $($line.Length))"
            $line | Out-File -FilePath "scratch\large_match_$i.json" -Encoding utf8
            $matchCount++
            if ($matchCount -gt 5) { break }
        }
    }
}
