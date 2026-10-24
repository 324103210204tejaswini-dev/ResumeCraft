ResumeCraft — Structured Certifications, Achievements & Word Export

What's new
- Repeatable Certifications cards: certification name, issuing organization, date/year, and optional credential link.
- Repeatable Achievements & Awards cards: title, description, organization/event, and date/year.
- Live preview, add/remove controls, hidden empty sections, and browser Local Storage support.
- Migrates older free-text certification/accomplishment values into structured entries when loading saved resume data.
- Download Word button creates an editable .docx file from the current resume preview. The document converter is loaded from jsDelivr, so an internet connection is needed for Word export.
- Existing five templates, structured Education, Work Experience, Projects, and Save as PDF/print remain included.

Install/update
1. Extract this ZIP.
2. Copy index.html, script.js, and style.css into:
   D:\Projects\resume-builder\src\main\resources\static
   Replace the existing files when prompted.
3. Restart your Spring Boot app if needed.
4. Open http://localhost:9090/index.html and press Ctrl+F5 to hard-refresh.
5. Test Certifications, Achievements, Save details, Save as PDF, and Download Word.

Notes
- Resume data is saved in this browser's Local Storage. Use Save details after editing if you want to keep a saved copy.
- Word output is editable and follows the resume preview content, though exact visual fidelity may vary between Word versions.
