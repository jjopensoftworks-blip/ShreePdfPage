/**
 * Copyright (c) 2026 jjopensoftworks-blip. All rights reserved.
 * ShreePdf Engine - Radiant Aesthetics and Intelligent PDF Engineering for .NET
 */

// ShreePdf Interactive Playground Application Logic (v1.14.0 Engine Release)
document.addEventListener('DOMContentLoaded', () => {
    let currentSource = 'markdown';
    let currentTheme = 'glassdark';
    let isAutoFit = true;
    let isRagEnabled = true;

    // Elements
    const sourceBtns = document.querySelectorAll('#sourceTabs .seg-btn');
    const themeBtns = document.querySelectorAll('#themePicker .theme-btn');
    const autoFitToggle = document.getElementById('autoFitToggle');
    const ragToggle = document.getElementById('ragToggle');

    const generatedCodeEl = document.getElementById('generatedCode');
    const pdfPaper = document.getElementById('pdfPaper');

    const pdfBody = document.getElementById('pdfBody');
    const ragJsonCode = document.getElementById('ragJsonCode');

    // Ingestion Templates for v1.14.0 (Markdown, C# DSL, JSON, HTML / Razor)
    const sourceTemplates = {
        markdown: {
            title: '⚡ AI Performance Brief',
            quote: '"Loss-free RAG indexing enabled. High-speed vector rendering via SkiaSharp."',
            csharp: `// 1. Ingest LLM Markdown Output Directly
string llmResponse = """
# AI Performance Brief
- Revenue up **24%** | Churn down **3%**
> Loss-free RAG indexing enabled.
""";

var doc = Document.FromMarkdown(llmResponse, ThemePresets.GlassmorphicDark)
    .AddBarChart("Quarterly Performance", ("Q1", 240), ("Q2", 310), ("Q3", 410))
    .EnableAutoFit(true)
    .EnableRagMetadata(true);

doc.Save("AiPerformanceBrief.pdf");`,
            htmlBody: `
                <h1 class="pdf-h1" id="pdfTitle">⚡ AI Performance Brief</h1>
                <p class="pdf-quote" id="pdfQuote">"Loss-free RAG indexing enabled. High-speed vector rendering via SkiaSharp."</p>

                <div class="pdf-section-title">EXECUTIVE METRICS</div>
                <table class="pdf-table" id="pdfTable">
                    <thead>
                        <tr>
                            <th>Core Innovation</th>
                            <th>Benchmark</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Anti-Orphan Auto-Fit</td>
                            <td>1.05 Spill -> 1 Page</td>
                            <td><span class="tag tag-success">ACTIVE</span></td>
                        </tr>
                        <tr>
                            <td>Native Vector Charts</td>
                            <td>Bar / Line / Pie / Donut</td>
                            <td><span class="tag tag-success">v1.8.0</span></td>
                        </tr>
                        <tr>
                            <td>Native SkiaSharp Engine</td>
                            <td>15ms / 15MB Footprint</td>
                            <td><span class="tag tag-primary">OPTIMAL</span></td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        html: {
            title: '🌐 Razor & HTML View Middleware',
            quote: '"Zero-dependency HTML tag parsing (h1-h6, b, i, a, p, table, ul, li) directly into PDF AST."',
            csharp: `// 2. ASP.NET Core Razor & HTML Middleware
app.MapGet("/api/pdf/report", () => {
    string htmlContent = "<h1 style='color:#38bdf8;'>Executive Razor View</h1><p>Zero Chrome overhead.</p>";
    return PdfResult.FromHtml(htmlContent, ThemePresets.SaaSAnalytics);
});`,
            htmlBody: `
                <h1 class="pdf-h1" id="pdfTitle" style="color: var(--accent);">🌐 Razor & HTML View Middleware</h1>
                <p class="pdf-quote" id="pdfQuote">"Zero-dependency HTML tag parsing directly into ShreePdf layout AST."</p>

                <div class="pdf-section-title">ASP.NET CORE MINIMAL API</div>
                <div class="pdf-container-box" style="border-left: 3px solid #38bdf8; background: rgba(56, 189, 248, 0.08);">
                    <div class="box-title" style="color: #38bdf8;">IResult PdfResult.FromHtml() Ready</div>
                    <div class="box-desc">Renders Razor HTML views without launching heavy Headless Chrome or Docker native binaries.</div>
                </div>
            `
        },
        csharp: {
            title: '💼 Executive Dashboard & KPIs',
            quote: '"Fluent C# DSL for native vector charts, stat cards, barcodes, and multi-column flow."',
            csharp: `// 3. Direct C# Fluent API Construction (v1.8.0)
var doc = Document.Create("Executive Dashboard")
    .WithTheme(ThemePresets.GlassmorphicDark)
    .AddStatCards(
        new StatCard("Revenue", "$1.24M", "+14.2%", deltaPositive: true),
        new StatCard("Active Users", "42.5K", "+8.1%", deltaPositive: true))
    .AddBadge("Quarterly Target Achieved", BadgeStatus.Success)
    .AddBarChart("Quarterly Sales", ("Q1", 240), ("Q2", 310), ("Q3", 410))
    .AddSparkline(SparklineType.Line, 12, 18, 15, 22, 28, 34)
    .AddProgressBar("Storage Quota", value: 78, max: 100)
    .AddBarcode(BarcodeType.Code128, "INV-2026-9901")
    .AddQrCode("https://example.com/invoice/9901")
    .AddMultiColumn("ShreePdf balances text cleanly across columns.", columns: 2, height: 100);`,
            htmlBody: `
                <h1 class="pdf-h1" id="pdfTitle">💼 Executive Dashboard & KPIs</h1>
                <p class="pdf-quote" id="pdfQuote">"Fluent C# DSL for native vector charts, stat cards, barcodes, and multi-column flow."</p>

                <table class="pdf-table">
                    <thead>
                        <tr><th>Metric</th><th>Current</th><th>Trend</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Quarterly Revenue</td><td>$1.24M</td><td><span class="tag tag-success">+14.2%</span></td></tr>
                        <tr><td>Active Workspaces</td><td>42.5K</td><td><span class="tag tag-success">+8.1%</span></td></tr>
                        <tr><td>Code128 / QR Code</td><td>INV-2026-9901</td><td><span class="tag tag-primary">VERIFIED</span></td></tr>
                    </tbody>
                </table>
            `
        },
        json: {
            title: '📊 Quarterly Data Report',
            quote: '"Data-bound payload serialized from JSON REST API response."',
            csharp: `// 4. JSON Payload Ingestion
string jsonPayload = File.ReadAllText("report_payload.json");

var doc = Document.FromJson(jsonPayload, ThemePresets.GlassmorphicDark)
    .EnableAutoFit(true)
    .EnableRagMetadata(true);

byte[] pdfBytes = doc.GenerateBytes();`,
            htmlBody: `
                <h1 class="pdf-h1" id="pdfTitle">📊 Quarterly Data Report</h1>
                <p class="pdf-quote" id="pdfQuote">"Data-bound payload serialized from JSON REST API response."</p>

                <div class="pdf-container-box">
                    <div class="box-title">REST API PAYLOAD BOUND</div>
                    <div class="box-desc">Automated multi-source document ingestion complete. 100% RAG metadata stream active.</div>
                </div>
            `
        }
    };

    // Source Tabs Event Listener
    sourceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sourceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSource = btn.getAttribute('data-source');
            updatePlayground();
        });
    });

    // Theme Picker Event Listener
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTheme = btn.getAttribute('data-theme');
            updatePlayground();
        });
    });

    // Toggles
    if (autoFitToggle) {
        autoFitToggle.addEventListener('change', (e) => {
            isAutoFit = e.target.checked;
            updatePlayground();
        });
    }

    if (ragToggle) {
        ragToggle.addEventListener('change', (e) => {
            isRagEnabled = e.target.checked;
            updatePlayground();
        });
    }

    // Update Playground State
    function updatePlayground() {
        const tpl = sourceTemplates[currentSource] || sourceTemplates.markdown;

        if (generatedCodeEl) generatedCodeEl.textContent = tpl.csharp;
        if (pdfBody && tpl.htmlBody) pdfBody.innerHTML = tpl.htmlBody;

        // Apply Theme styling to simulated sheet
        if (pdfPaper) pdfPaper.className = 'pdf-paper theme-' + currentTheme;

        // Update RAG JSON Inspector
        const ragAstObj = {
            EngineVersion: "1.8.0",
            TargetFramework: ".NET 8.0 | .NET 10.0 Dual Target",
            Title: tpl.title,
            Author: "ShreePdf Engine v1.8.0",
            CreatedAtUtc: new Date().toISOString(),
            IsAutoFitApplied: isAutoFit,
            IsRagStreamActive: isRagEnabled,
            TestSuiteCoverage: "726 Passing Unit Tests (100%)",
            Nodes: [
                { Type: "Header", Content: tpl.title },
                { Type: "Blockquote", Content: tpl.quote },
                { Type: "VisualSubsystem", Content: "Vector Charts | Barcodes | QR Codes | KPI Meters | MultiColumn" },
                { Type: "Table", Content: "Anti-Orphan Auto-Fit | ACTIVE\nAI / RAG Dual Stream | ENABLED\nNative SkiaSharp Engine | OPTIMAL" }
            ]
        };

        if (ragJsonCode) ragJsonCode.textContent = JSON.stringify(ragAstObj, null, 2);
    }

    // Initialize Playground State
    updatePlayground();
});

// Switch Tab between PDF View & RAG Inspector
function switchPreviewTab(tab) {
    const pdfTab = document.getElementById('tabPdfView');
    const ragTab = document.getElementById('tabRagView');
    const pdfStage = document.getElementById('pdfStage');
    const ragStage = document.getElementById('ragStage');

    if (tab === 'pdf') {
        if (pdfTab) pdfTab.classList.add('active');
        if (ragTab) ragTab.classList.remove('active');
        if (pdfStage) pdfStage.classList.remove('hidden');
        if (ragStage) ragStage.classList.add('hidden');
    } else {
        if (ragTab) ragTab.classList.add('active');
        if (pdfTab) pdfTab.classList.remove('active');
        if (ragStage) ragStage.classList.remove('hidden');
        if (pdfStage) pdfStage.classList.add('hidden');
    }
}

// Toast notification helper
function showToast(msg) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalToast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2400);
}

// Copy NuGet Command
function copyNugetCmd(event) {
    const cmd = "dotnet add package ShreePdf";
    navigator.clipboard.writeText(cmd);
    showToast("Copied 'dotnet add package ShreePdf' to clipboard!");
}

// FAQ Accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}
document.addEventListener('DOMContentLoaded', initFaqAccordion);

// Copy Generated C# Code
function copyGeneratedCode() {
    const code = document.getElementById('generatedCode').textContent;
    navigator.clipboard.writeText(code);
    showToast("C# code snippet copied to clipboard!");
}

// Site Protection & Security Hardening: Disable context menu (right click), image dragging, devtools shortcuts
function initSiteProtection() {
    // Disable right click with feedback
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        showToast("🔒 Content protected — Right-click is disabled");
    });

    // Disable dragging images and links
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
            e.preventDefault();
        }
    });

    // Disable common scraping/inspection shortcut keys
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source), Ctrl+S (Save Page)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            return false;
        }
    });
}
document.addEventListener('DOMContentLoaded', initSiteProtection);
