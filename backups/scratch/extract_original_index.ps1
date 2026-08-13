$logPath = "C:\Users\Joy\.gemini\antigravity\brain\56fd65fe-5ae8-4173-a836-7a5c996aabf6\.system_generated\logs\transcript_full.jsonl"
$lines = Get-Content -Path $logPath

$line = $lines[5]
$json = $line | ConvertFrom-Json

if ($json.content) {
    $json.content | Out-File -FilePath "scratch\original_index.html" -Encoding utf8
    Write-Host "Success! Extracted original index.html to scratch\original_index.html (Length: $($json.content.Length))"
} else {
    Write-Host "No content found in line 5."
}
