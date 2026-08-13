$body = @{
    contents = @(
        @{
            parts = @(
                @{ text = "hello" }
            )
        }
    )
} | ConvertTo-Json -Depth 5

try {
    $res = Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=TEST_INVALID" -Method Post -ContentType "application/json" -Body $body
    Write-Host "Success: $res"
} catch {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    Write-Host "Error Response:"
    Write-Host $reader.ReadToEnd()
}
