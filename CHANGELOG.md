# 📋 ShreePdf Release Notes & Public Changelog

All notable public releases and upcoming pipeline updates for the ShreePdf Engine.

---

## 🟢 [v1.6.0] — *Latest Official Release*

> **Focus**: Everyday Essentials — the features every PDF library is expected to have, plus a 379-test suite.

### Release Highlights
- 🖼️ **Content Elements**: Images (`AddImage` from file / bytes / base64 / URL), clickable hyperlinks and in-document anchors, and first-class ordered/unordered/nested lists.
- 🔢 **Dynamic Page Numbers**: `AddPageNumber("Page {page} of {pages}")` with `{page}`/`{pages}`/`{title}`/`{author}`/`{date}` tokens, repeated across pages.
- 📐 **Landscape Orientation & Watermarks**: `SetLandscape()` and developer-defined diagonal watermarks (`SetWatermark`).
- 📊 **Advanced Tables**: multi-page tables with repeating header rows, per-cell styling (background/color/bold/alignment), and content-aware auto column sizing.
- ⚙️ **API & Output**: async generation (`GenerateBytesAsync` / `SaveAsync`), `{{token}}` templating for mail-merge, full-bleed page backgrounds, and direct `Stream` output with bounded memory.
- 🧪 **379 Unit Test Suite**: 100% pass rate.

---

## 🟢 [v1.3.0] — *ASP.NET Core Middleware Release (Aug 1, 2026)*

> **Focus**: ASP.NET Core Middleware, HTML/Razor Ingestion & 316+ Test Suite

### Release Highlights
- 🌐 **ASP.NET Core Razor & HTML Ingestion**: Direct HTML tag parsing (`<h1>`–`<h6>`, `<p>`, `<table>`, `<div>`, `<hr>`) and Minimal API `PdfResult` integration without external browser runtimes.
- ⚡ **Smart Code Modernizer Tool**: Standalone web utility (`tools/code_converter.html`) for T4 template conversion to C# 11 Raw String Literals or Razor views.
- 🧪 **316 Unit Test Suite**: Comprehensive QA coverage matrix across 8 core engine categories with 100% pass rate.
- 🎨 **Visual Components & Page Presets**: Expanded color models (`FromRgb`, `FromRgba`, 3-digit hex, transparent), page sizes (`A5`, `B5`), KPI stat cards, and status badges.
- 🤖 **Universal Markdown & RAG Metadata**: Native LLM response string parsing and loss-free AST JSON metadata embedding.
- 🛡️ **Cryptographic Security**: RSA/HMAC-SHA256 license validation.

---

## 🚀 [v1.7.0] — *In Pipeline*

> **Focus**: Navigation & Advanced Tables

### Pipeline Preview
- 🔖 **Bookmarks / Document Outline**: reader-sidebar navigation tree built from headings.
- 📑 **Auto Table of Contents**: generated from headings/anchors with clickable page links.
- 🔗 **Merged Cells & Images in Cells**: row/column spanning and inline cell imagery.

*Later milestones: rich charts & barcodes, custom fonts & full Unicode/CJK, encryption & digital signatures, PDF/A, and merge/split — see the engine roadmap.*
