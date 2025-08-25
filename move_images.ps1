# PowerShell script to move images from images/ to appropriate galleries
# This helps when you drag images directly into the images folder via IDE

param(
    [string]$Gallery = "ask"  # "corsono", "art", or "ask"
)

$sourceDir = "images"
$corsonoDir = "images/corsono"
$artDir = "images/art"

# Ensure target directories exist
if (!(Test-Path $corsonoDir)) {
    New-Item -ItemType Directory -Path $corsonoDir -Force
}
if (!(Test-Path $artDir)) {
    New-Item -ItemType Directory -Path $artDir -Force
}

# Get all image files in the source directory (excluding subdirectories)
$imageFiles = Get-ChildItem -Path $sourceDir -File | Where-Object { 
    $_.Extension -match "\.(jpg|jpeg|png|webp|gif|bmp|mp4|mov)$" 
}

if ($imageFiles.Count -gt 0) {
    Write-Host "Found $($imageFiles.Count) media file(s) to organize..."
    
    foreach ($file in $imageFiles) {
        $targetDir = $corsonoDir  # Default
        
        if ($Gallery -eq "ask") {
            Write-Host "`nFile: $($file.Name)"
            Write-Host "1. Corsono Photo Gallery (fashion/product photos)"
            Write-Host "2. Art Gallery (artwork/creative pieces)"
            $choice = Read-Host "Where should this go? (1/2)"
            
            if ($choice -eq "2") {
                $targetDir = $artDir
                Write-Host "Moving to Art Gallery..."
            } else {
                $targetDir = $corsonoDir
                Write-Host "Moving to Corsono Gallery..."
            }
        } elseif ($Gallery -eq "art") {
            $targetDir = $artDir
        } else {
            $targetDir = $corsonoDir
        }
        
        $destinationPath = Join-Path $targetDir $file.Name
        
        # Check if file already exists in destination
        if (Test-Path $destinationPath) {
            $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
            $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
            $extension = $file.Extension
            $newName = "${nameWithoutExt}_${timestamp}${extension}"
            $destinationPath = Join-Path $targetDir $newName
            Write-Host "File exists, renaming to: $newName"
        }
        
        Move-Item -Path $file.FullName -Destination $destinationPath
        Write-Host "✓ Moved: $($file.Name)"
    }
    
    Write-Host "`n🎉 All files organized successfully!"
    Write-Host "Visit http://localhost:3001/corsono/gallery for fashion photos"
    Write-Host "Visit http://localhost:3001/art/gallery for artwork"
} else {
    Write-Host "No media files found in $sourceDir directory."
}

# Usage examples:
# .\move_images.ps1                    # Interactive mode - asks where to put each file
# .\move_images.ps1 -Gallery corsono   # Move all to Corsono gallery
# .\move_images.ps1 -Gallery art       # Move all to Art gallery
