$logPath = "C:\Users\Joy\.gemini\antigravity\brain\56fd65fe-5ae8-4173-a836-7a5c996aabf6\.system_generated\logs\transcript_full.jsonl"
$lines = Get-Content -Path $logPath

Write-Host "Searching for index.html tool calls in the logs..."
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line -like "*index.html*" -and $line -like "*color-page-2*") {
        Write-Host "Found match at line $i (Length: $($line.Length))"
        # Save a snippet or info
        $line | Out-File -FilePath "scratch\match_index_$i.json" -Encoding utf8
    }
}
