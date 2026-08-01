// ShreePdf Interactive Playground Application Logic
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
    const pdfWatermark = document.getElementById('pdfWatermark');

    const pdfTitle = document.getElementById('pdfTitle');
    const pdfQuote = document.getElementById('pdfQuote');

    const ragJsonCode = document.getElementById('ragJsonCode');

    // Ingestion Templates
    const sourceTemplates = {
        markdown: {
            title: '⚡ AI Performance Brief',
            quote: '"Loss-free RAG indexing enabled. High-speed vector rendering via SkiaSharp."',
            csharp: `// Ingest LLM Markdown Output Directly
string llmResponse = "# AI Performance Brief\\n> Loss-free RAG indexing enabled.";

var doc = Document.FromMarkdown(llmResponse, ThemePresets.GlassmorphicDark)
    .EnableAutoFit(true)
    .EnableRagMetadata(true);

doc.Save("AiPerformanceBrief.pdf");`
        },
        csharp: {
            title: '📄 Invoice #INV-2026-8801',
            quote: '"Itemized breakdown generated via C# Fluent DSL layout budgeter."',
            csharp: `// Direct C# Fluent API Construction
var doc = Document.Create("Invoice #INV-2026-8801")
    .WithTheme(ThemePresets.GlassmorphicDark)
    .SetPageSize(PageSize.A4)
    .AddText("OFFICIAL INVOICE", fontSize: 20f, isBold: true)
    .AddTable(table => {
        table.Columns.Add(new TableColumn { Header = "Item", WidthRatio = 3.0f });
        table.Rows.Add(new TableRow { Cells = { "ShreePdf Runtime License", "$2,499.00" } });
    })
    .EnableAutoFit(true);`
        },
        json: {
            title: '📊 Quarterly Sales Report',
            quote: '"Data-bound payload serialized from JSON REST API response."',
            csharp: `// JSON Payload Ingestion
string jsonPayload = File.ReadAllText("report_payload.json");

var doc = Document.FromJson(jsonPayload, ThemePresets.GlassmorphicDark)
    .EnableAutoFit(true)
    .EnableRagMetadata(true);

byte[] pdfBytes = doc.GenerateBytes();`
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
    autoFitToggle.addEventListener('change', (e) => {
        isAutoFit = e.target.checked;
        updatePlayground();
    });

    ragToggle.addEventListener('change', (e) => {
        isRagEnabled = e.target.checked;
        updatePlayground();
    });

    // Update Playground State
    function updatePlayground() {
        const tpl = sourceTemplates[currentSource] || sourceTemplates.markdown;

        pdfTitle.textContent = tpl.title;
        pdfQuote.textContent = tpl.quote;
        generatedCodeEl.textContent = tpl.csharp;

        // Apply Theme styling to simulated sheet
        pdfPaper.className = 'pdf-paper theme-' + currentTheme;

        // Update RAG JSON Inspector
        const ragAstObj = {
            Title: tpl.title,
            Author: "ShreePdf Engine v1.0",
            CreatedAtUtc: new Date().toISOString(),
            IsAutoFitApplied: isAutoFit,
            IsRagStreamActive: isRagEnabled,
            Nodes: [
                { Type: "Header", Content: tpl.title },
                { Type: "Blockquote", Content: tpl.quote },
                { Type: "Table", Content: "Anti-Orphan Auto-Fit | ACTIVE\nAI / RAG Dual Stream | ENABLED\nNative SkiaSharp Engine | OPTIMAL" }
            ]
        };

        ragJsonCode.textContent = JSON.stringify(ragAstObj, null, 2);
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
        pdfTab.classList.add('active');
        ragTab.classList.remove('active');
        pdfStage.classList.remove('hidden');
        ragStage.classList.add('hidden');
    } else {
        ragTab.classList.add('active');
        pdfTab.classList.remove('active');
        ragStage.classList.remove('hidden');
        pdfStage.classList.add('hidden');
    }
}

// Copy NuGet Command
function copyNugetCmd(event) {
    const cmd = "dotnet add package ShreePdf";
    navigator.clipboard.writeText(cmd);
    const btn = event.currentTarget.querySelector('.btn-copy');
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = original; }, 2000);
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
    alert("C# code snippet copied to clipboard!");
}
