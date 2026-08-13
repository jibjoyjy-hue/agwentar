$logPath = "C:\Users\Joy\.gemini\antigravity\brain\56fd65fe-5ae8-4173-a836-7a5c996aabf6\.system_generated\logs\transcript_full.jsonl"
$lines = Get-Content -Path $logPath

# Find where index.html was first viewed or loaded
for ($i = 0; $i -lt 50; $i++) {
    $line = $lines[$i]
    if ($line -like "*index.html*" -and $line -like "*view_file*" -and $line.Length -gt 20000) {
        Write-Host "Found index.html view at line $i (Length: $($line.Length))"
        $line | Out-File -FilePath "scratch\initial_index_log.json" -Encoding utf8
    }
}
