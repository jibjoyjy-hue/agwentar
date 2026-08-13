$logPath = "C:\Users\Joy\.gemini\antigravity\brain\56fd65fe-5ae8-4173-a836-7a5c996aabf6\.system_generated\logs\transcript_full.jsonl"

$lines = Get-Content -Path $logPath
Write-Host "Total lines in log: $($lines.Count)"

# Let's search backwards for view_file or write_to_file tool calls or outputs for app.js
for ($i = $lines.Count - 1; $i -ge 0; $i--) {
    $line = $lines[$i]
    if ($line -like "*app.js*" -and $line -like "*view_file*" -and $i -lt 4300) {
        Write-Host "Found view_file match for app.js at line $i (Length: $($line.Length))"
        $line | Out-File -FilePath "scratch\view_appjs_$i.json" -Encoding utf8
    }
}
