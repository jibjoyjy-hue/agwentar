$logPath = "C:\Users\Joy\.gemini\antigravity\brain\56fd65fe-5ae8-4173-a836-7a5c996aabf6\.system_generated\logs\transcript_full.jsonl"
$lines = Get-Content -Path $logPath

$line = $lines[5]
$json = $line | ConvertFrom-Json

if ($json.content) {
    $json.content | Out-File -FilePath "scratch\original_appjs.js" -Encoding utf8
    Write-Host "Success! Extracted original app.js to scratch\original_appjs.js (Length: $($json.content.Length))"
} else {
    Write-Host "No content in line 5. Trying to find where 'content' is."
    # Let's inspect the keys of line 5
    $json | Get-Member
}
