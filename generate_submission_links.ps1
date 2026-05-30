# PBL Library - Auto generate submission_links SQL
# Chay: powershell -ExecutionPolicy Bypass -File generate_submission_links.ps1

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# ─── CAU HINH ───────────────────────────────────────────────────────────────
$FOLDER_PATH  = "D:\WordForInstall"
$BASE_URL     = "http://localhost:8080/api/reports/download"
$OUTPUT_SQL   = "$PSScriptRoot\submission_links_generated.sql"
$START_ID     = 1
$START_SUB_ID = 1001
# ────────────────────────────────────────────────────────────────────────────

function Get-LinkType([string]$n) {
    $n = $n.ToLower()
    if ($n -match "baocao|bao.cao|report|mau.bao") { return "report" }
    if ($n -match "lab|thuc.hanh|packet|ipv6")      { return "lab" }
    if ($n -match "ooad|so.do|class|sequence|diagram") { return "diagram" }
    if ($n -match "pbl|quan.ly.de.tai|de.tai")      { return "pbl_project" }
    if ($n -match "coding|kiem.thu|quy.tac|chuong") { return "guideline" }
    if ($n -match "source.code|link.source")        { return "source_code" }
    if ($n -match "sinh.vien|student|quan.ly")      { return "project" }
    if ($n -match "^\d{2}nh|nhom|group|baitap|nop") { return "assignment" }
    return "document"
}

function Get-Description([string]$fileName, [string]$linkType) {
    $base = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
    $map = @{
        "report"       = "Bao cao tai lieu"
        "lab"          = "Tai lieu thuc hanh"
        "diagram"      = "So do thiet ke he thong"
        "pbl_project"  = "Bao cao de tai PBL"
        "guideline"    = "Tai lieu huong dan ky thuat"
        "source_code"  = "Lien ket ma nguon du an"
        "project"      = "Do an / Du an"
        "assignment"   = "Bai tap / Nop bai"
        "document"     = "Tai lieu dinh kem"
    }
    $prefix = if ($map.ContainsKey($linkType)) { $map[$linkType] } else { "Tai lieu" }
    return ($prefix + ": " + $base)
}

function EscSql([string]$v) { return $v -replace "'", "''" }

# ─── QUET THU MUC ───────────────────────────────────────────────────────────
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  PBL Library - Tu dong sinh SQL cho bang submission_links" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $FOLDER_PATH)) {
    Write-Host "LOI: Khong tim thay thu muc '$FOLDER_PATH'" -ForegroundColor Red
    exit 1
}

$files = Get-ChildItem -Path $FOLDER_PATH -Filter "*.docx" | Sort-Object Name
if ($files.Count -eq 0) {
    Write-Host "CANH BAO: Khong co file .docx nao trong '$FOLDER_PATH'" -ForegroundColor Yellow
    exit 0
}

Write-Host "  Thu muc  : $FOLDER_PATH" -ForegroundColor Green
Write-Host "  So file  : $($files.Count) file .docx" -ForegroundColor Green
Write-Host "  Base URL : $BASE_URL" -ForegroundColor Green
Write-Host "  Xuat ra  : $OUTPUT_SQL" -ForegroundColor Green
Write-Host ""

# ─── XAY DUNG NOI DUNG SQL ──────────────────────────────────────────────────
$lines = New-Object System.Collections.Generic.List[string]

$lines.Add("-- ================================================================")
$lines.Add("--  FILE: submission_links_generated.sql")
$lines.Add("--  Sinh tu dong boi: generate_submission_links.ps1")
$lines.Add("--  Thoi gian: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$lines.Add("--  Thu muc nguon: $FOLDER_PATH")
$lines.Add("--  Tong so ban ghi: $($files.Count)")
$lines.Add("-- ================================================================")
$lines.Add("")

# CREATE TABLE
$lines.Add("-- ----------------------------------------------------------------")
$lines.Add("--  PHAN 1: TAO BANG submission_links")
$lines.Add("--  (PostgreSQL) - Bo qua neu bang da ton tai")
$lines.Add("-- ----------------------------------------------------------------")
$lines.Add("")
$lines.Add("CREATE TABLE IF NOT EXISTS submission_links (")
$lines.Add("    id            BIGINT          PRIMARY KEY,")
$lines.Add("    description   VARCHAR(500),")
$lines.Add("    link_type     VARCHAR(50)     NOT NULL,")
$lines.Add("    url           VARCHAR(1000)   NOT NULL,")
$lines.Add("    submission_id BIGINT          NOT NULL")
$lines.Add(");")
$lines.Add("")
$lines.Add("-- SQL Server equivalent:")
$lines.Add("-- IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='submission_links' AND xtype='U')")
$lines.Add("-- CREATE TABLE submission_links (")
$lines.Add("--     id            BIGINT          PRIMARY KEY,")
$lines.Add("--     description   NVARCHAR(500),")
$lines.Add("--     link_type     NVARCHAR(50)    NOT NULL,")
$lines.Add("--     url           NVARCHAR(1000)  NOT NULL,")
$lines.Add("--     submission_id BIGINT          NOT NULL")
$lines.Add("-- );")
$lines.Add("")
$lines.Add("-- ----------------------------------------------------------------")
$lines.Add("--  PHAN 2: INSERT DU LIEU ($($files.Count) ban ghi)")
$lines.Add("-- ----------------------------------------------------------------")
$lines.Add("")

$id    = $START_ID
$subId = $START_SUB_ID
$stats = @{}

foreach ($file in $files) {
    $fileName    = $file.Name
    $linkType    = Get-LinkType -n $fileName
    $description = Get-Description -fileName $fileName -linkType $linkType
    $encodedName = [System.Uri]::EscapeDataString($fileName)
    $url         = "$BASE_URL/$encodedName"

    $dSql  = EscSql -v $description
    $uSql  = EscSql -v $url

    $lines.Add("-- [$id] $fileName")
    $lines.Add("INSERT INTO submission_links (id, description, link_type, url, submission_id)")
    $lines.Add("VALUES ($id, '$dSql', '$linkType', '$uSql', $subId);")
    $lines.Add("")

    # Hien thi tren console
    Write-Host "  [$id] " -ForegroundColor Yellow -NoNewline
    Write-Host $fileName -ForegroundColor White
    Write-Host "       link_type : " -NoNewline
    Write-Host $linkType -ForegroundColor Magenta
    Write-Host "       url       : " -NoNewline
    Write-Host $url -ForegroundColor DarkCyan
    Write-Host ""

    # Thong ke
    if (-not $stats.ContainsKey($linkType)) { $stats[$linkType] = 0 }
    $stats[$linkType]++

    $id++
    $subId++
}

# Thong ke cuoi file SQL
$lines.Add("-- ----------------------------------------------------------------")
$lines.Add("--  THONG KE PHAN LOAI (link_type)")
foreach ($kv in ($stats.GetEnumerator() | Sort-Object Key)) {
    $lines.Add("--    $($kv.Key.PadRight(16)): $($kv.Value) file")
}
$lines.Add("-- ----------------------------------------------------------------")

# ─── GHI FILE SQL ────────────────────────────────────────────────────────────
[System.IO.File]::WriteAllLines($OUTPUT_SQL, $lines, [System.Text.Encoding]::UTF8)

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  HOAN THANH! Da xu ly $($files.Count) file .docx" -ForegroundColor Green
Write-Host ""
Write-Host "  Phan loai link_type:" -ForegroundColor Yellow
foreach ($kv in ($stats.GetEnumerator() | Sort-Object Key)) {
    Write-Host ("    {0,-18}: {1} file" -f $kv.Key, $kv.Value) -ForegroundColor White
}
Write-Host ""
Write-Host "  File SQL xuat ra:" -ForegroundColor Yellow
Write-Host "    $OUTPUT_SQL" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
