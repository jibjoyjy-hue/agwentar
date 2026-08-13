$json = Get-Content -Raw scratch\large_match_961.json | ConvertFrom-Json
if ($json.content) {
    $json.content | Out-File -FilePath "scratch\extracted_content_961.txt" -Encoding utf8
    Write-Host "Extracted content from match 961 to scratch\extracted_content_961.txt (Length: $($json.content.Length))"
} else {
    Write-Host "No content found in match 961"
}
