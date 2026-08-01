/**
 * Copyright (c) 2026 jjopensoftworks-blip. All rights reserved.
 * ShreePdf Engine - Radiant Aesthetics and Intelligent PDF Engineering for .NET
 */

// ShreePdf Interactive Playground Application Logic (v1.3.0 Engine Release)
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

    // Ingestion Templates for v1.3.0 (Markdown, C# DSL, JSON, HTML / Razor)
    const sourceTemplates = {
        markdown: {
            title: '⚡ AI Performance Brief',
            quote: '"Loss-free RAG indexing enabled. High-speed vector rendering via SkiaSharp."',
            csharp: `// 1. Ingest LLM Markdown Output Directly
string llmResponse = "# AI Performance Brief\\n> Loss-free RAG indexing enabled.";

var doc = Document.FromMarkdown(llmResponse, ThemePresets.GlassmorphicDark)
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
                            <td>AI / RAG Dual Stream</td>
                            <td>Loss-Free Embedded AST</td>
                            <td><span class="tag tag-success">ENABLED</span></td>
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
            csharp: `// 2. ASP.NET Core Razor & HTML Middleware (v1.3.0)
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
            title: '📄 Invoice #INV-2026-8801',
            quote: '"Itemized breakdown generated via C# Fluent DSL layout budgeter."',
            csharp: `// 3. Direct C# Fluent API Construction
var doc = Document.Create("Invoice #INV-2026-8801")
    .WithTheme(ThemePresets.GlassmorphicDark)
    .SetPageSize(PageSize.A4)
    .AddText("OFFICIAL INVOICE", fontSize: 20f, isBold: true)
    .AddTable(table => {
        table.Columns.Add(new TableColumn { Header = "Item", WidthRatio = 3.0f });
        table.Rows.Add(new TableRow { Cells = { "ShreePdf Runtime License", "$2,499.00" } });
    })
    .EnableAutoFit(true);`,
            htmlBody: `
                <h1 class="pdf-h1" id="pdfTitle">📄 Invoice #INV-2026-8801</h1>
                <p class="pdf-quote" id="pdfQuote">"Itemized breakdown generated via C# Fluent DSL layout budgeter."</p>

                <table class="pdf-table">
                    <thead>
                        <tr><th>Description</th><th>Qty</th><th>Amount</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>ShreePdf Enterprise License</td><td>1</td><td>$2,499.00</td></tr>
                        <tr><td>SkiaSharp Vector Engine Support</td><td>1</td><td>INCLUDED</td></tr>
                    </tbody>
                </table>
            `
        },
        json: {
            title: '📊 Quarterly Sales Report',
            quote: '"Data-bound payload serialized from JSON REST API response."',
            csharp: `// 4. JSON Payload Ingestion
string jsonPayload = File.ReadAllText("report_payload.json");

var doc = Document.FromJson(jsonPayload, ThemePresets.GlassmorphicDark)
    .EnableAutoFit(true)
    .EnableRagMetadata(true);

byte[] pdfBytes = doc.GenerateBytes();`,
            htmlBody: `
                <h1 class="pdf-h1" id="pdfTitle">📊 Quarterly Sales Report</h1>
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
            EngineVersion: "1.3.0",
            TargetFramework: ".NET 9.0 | Standard 2.0",
            Title: tpl.title,
            Author: "ShreePdf Engine v1.3.0",
            CreatedAtUtc: new Date().toISOString(),
            IsAutoFitApplied: isAutoFit,
            IsRagStreamActive: isRagEnabled,
            TestSuiteCoverage: "316 Passing Unit Tests (100%)",
            Nodes: [
                { Type: "Header", Content: tpl.title },
                { Type: "Blockquote", Content: tpl.quote },
                { Type: "Middleware", Content: "ASP.NET Core Razor & Minimal API Ready" },
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
