// ResumeCraft: live preview, browser save/load, templates and A4 printing.
const form = document.getElementById("resumeForm");
const templateSelect = document.getElementById("templateSelect");
const resumePreview = document.getElementById("resumePreview");
const educationEntriesContainer = document.getElementById("educationEntries");
const educationEntryTemplate = document.getElementById("educationEntryTemplate");
const addEducationButton = document.getElementById("addEducationButton");
const experienceEntriesContainer = document.getElementById("experienceEntries");
const experienceEntryTemplate = document.getElementById("experienceEntryTemplate");
const addExperienceButton = document.getElementById("addExperienceButton");
const projectEntriesContainer = document.getElementById("projectEntries");
const projectEntryTemplate = document.getElementById("projectEntryTemplate");
const addProjectButton = document.getElementById("addProjectButton");
const certificationEntriesContainer = document.getElementById("certificationEntries");
const certificationEntryTemplate = document.getElementById("certificationEntryTemplate");
const addCertificationButton = document.getElementById("addCertificationButton");
const achievementEntriesContainer = document.getElementById("achievementEntries");
const achievementEntryTemplate = document.getElementById("achievementEntryTemplate");
const addAchievementButton = document.getElementById("addAchievementButton");

const fields = [
    "name", "email", "phone", "location", "summary",
    "dateOfBirth", "nationality", "linkedin", "github", "portfolio", "address", "languages", "software",
    "skills", "certifications", "accomplishments", "strengths", "interests"
];

const previewMappings = {
    name: "previewName",
    email: "previewEmail",
    phone: "previewPhone",
    location: "previewLocation",
    summary: "previewSummary",
    languages: "previewLanguages",
    software: "previewSoftware",
    skills: "previewSkills",
    certifications: "previewCertifications",
    accomplishments: "previewAccomplishments",
    strengths: "previewStrengths",
    interests: "previewInterests"
};

const placeholders = {
    name: "Your Name",
    email: "your@email.com",
    phone: "",
    location: "",
    summary: "Your professional summary will appear here.",
    dateOfBirth: "", nationality: "", linkedin: "", github: "", portfolio: "", address: "",
    languages: "",
    software: "",
    skills: "Your skills will appear here.",
    certifications: "Your certifications will appear here.",
    accomplishments: "",
    strengths: "",
    interests: ""
};

const EDUCATION_FIELDS = ["degree", "institution", "year", "score", "location", "details"];
const EXPERIENCE_FIELDS = ["role", "company", "startDate", "endDate", "location", "responsibilities", "achievements"];
const PROJECT_FIELDS = ["title", "technologies", "description", "github", "demo"];
const CERTIFICATION_FIELDS = ["name", "issuer", "date", "link"];
const ACHIEVEMENT_FIELDS = ["title", "description", "organization", "date"];

function blankEducationEntry() {
    return { degree: "", institution: "", year: "", score: "", location: "", details: "" };
}

function readEducationEntriesFromForm() {
    if (!educationEntriesContainer) return [];
    return [...educationEntriesContainer.querySelectorAll(".education-entry")].map((card) => {
        const entry = {};
        EDUCATION_FIELDS.forEach((field) => {
            const input = card.querySelector(`[data-education-field="${field}"]`);
            entry[field] = input ? input.value.trim() : "";
        });
        return entry;
    });
}

function addEducationEntry(values = {}, focus = false) {
    if (!educationEntriesContainer || !educationEntryTemplate) return;
    const fragment = educationEntryTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".education-entry");
    EDUCATION_FIELDS.forEach((field) => {
        const input = card.querySelector(`[data-education-field="${field}"]`);
        if (input) {
            input.value = values[field] || "";
            input.addEventListener("input", () => {
                updateEducationEntryTitles();
                updatePreview();
            });
        }
    });
    const removeButton = card.querySelector(".remove-entry-button");
    removeButton.addEventListener("click", () => {
        card.remove();
        if (!educationEntriesContainer.querySelector(".education-entry")) addEducationEntry();
        updateEducationEntryTitles();
        updatePreview();
    });
    educationEntriesContainer.appendChild(fragment);
    updateEducationEntryTitles();
    if (focus) {
        const firstInput = educationEntriesContainer.lastElementChild?.querySelector("input");
        if (firstInput) firstInput.focus();
    }
}

function updateEducationEntryTitles() {
    if (!educationEntriesContainer) return;
    [...educationEntriesContainer.querySelectorAll(".education-entry")].forEach((card, index) => {
        const degree = (card.querySelector('[data-education-field="degree"]')?.value || "").trim();
        const institution = (card.querySelector('[data-education-field="institution"]')?.value || "").trim();
        const title = card.querySelector(".entry-title");
        if (title) title.textContent = degree || institution || `Education ${index + 1}`;
    });
}

function setEducationEntries(entries) {
    if (!educationEntriesContainer) return;
    educationEntriesContainer.replaceChildren();
    const validEntries = Array.isArray(entries) && entries.length ? entries : [blankEducationEntry()];
    validEntries.forEach((entry) => addEducationEntry(entry || {}));
}


function blankExperienceEntry() {
    return { role: "", company: "", startDate: "", endDate: "", location: "", responsibilities: "", achievements: "" };
}

function readExperienceEntriesFromForm() {
    if (!experienceEntriesContainer) return [];
    return [...experienceEntriesContainer.querySelectorAll(".experience-entry")].map((card) => {
        const entry = {};
        EXPERIENCE_FIELDS.forEach((field) => {
            const input = card.querySelector(`[data-experience-field="${field}"]`);
            entry[field] = input ? input.value.trim() : "";
        });
        return entry;
    });
}

function addExperienceEntry(values = {}, focus = false) {
    if (!experienceEntriesContainer || !experienceEntryTemplate) return;
    const fragment = experienceEntryTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".experience-entry");
    EXPERIENCE_FIELDS.forEach((field) => {
        const input = card.querySelector(`[data-experience-field="${field}"]`);
        if (!input) return;
        input.value = values[field] || "";
        input.addEventListener("input", () => {
            updateExperienceEntryTitles();
            updatePreview();
        });
    });
    card.querySelector(".remove-entry-button").addEventListener("click", () => {
        card.remove();
        if (!experienceEntriesContainer.querySelector(".experience-entry")) addExperienceEntry();
        updateExperienceEntryTitles();
        updatePreview();
    });
    experienceEntriesContainer.appendChild(fragment);
    updateExperienceEntryTitles();
    if (focus) {
        const firstInput = experienceEntriesContainer.lastElementChild?.querySelector("input");
        if (firstInput) firstInput.focus();
    }
}

function updateExperienceEntryTitles() {
    if (!experienceEntriesContainer) return;
    [...experienceEntriesContainer.querySelectorAll(".experience-entry")].forEach((card, index) => {
        const role = (card.querySelector('[data-experience-field="role"]')?.value || "").trim();
        const company = (card.querySelector('[data-experience-field="company"]')?.value || "").trim();
        const title = card.querySelector(".entry-title");
        if (title) title.textContent = [role, company].filter(Boolean).join(" — ") || `Experience ${index + 1}`;
    });
}

function setExperienceEntries(entries) {
    if (!experienceEntriesContainer) return;
    experienceEntriesContainer.replaceChildren();
    const validEntries = Array.isArray(entries) && entries.length ? entries : [blankExperienceEntry()];
    validEntries.forEach((entry) => addExperienceEntry(entry || {}));
}


function blankCertificationEntry() { return { name: "", issuer: "", date: "", link: "" }; }
function blankAchievementEntry() { return { title: "", description: "", organization: "", date: "" }; }
function readRepeatableEntries(container, selector, fields, prefix) {
    if (!container) return [];
    return [...container.querySelectorAll(selector)].map(card => {
        const entry = {};
        fields.forEach(field => { const input = card.querySelector(`[data-${prefix}-field="${field}"]`); entry[field] = input ? input.value.trim() : ""; });
        return entry;
    });
}
function setupRepeatableEntries(container, template, fields, prefix, values, titleField, label, focus=false) {
    if (!container || !template) return;
    const fragment = template.content.cloneNode(true), card = fragment.querySelector(`.${prefix}-entry`);
    fields.forEach(field => { const input = card.querySelector(`[data-${prefix}-field="${field}"]`); if (!input) return; input.value = values[field] || ""; input.addEventListener("input", () => { updateRepeatableTitles(container, prefix, titleField, label); updatePreview(); }); });
    card.querySelector(".remove-entry-button").addEventListener("click", () => { card.remove(); if (!container.querySelector(`.${prefix}-entry`)) setupRepeatableEntries(container, template, fields, prefix, {}, titleField, label); updateRepeatableTitles(container, prefix, titleField, label); updatePreview(); });
    container.appendChild(fragment); updateRepeatableTitles(container, prefix, titleField, label);
    if (focus) container.lastElementChild?.querySelector("input")?.focus();
}
function updateRepeatableTitles(container, prefix, titleField, label) {
    if (!container) return;
    [...container.querySelectorAll(`.${prefix}-entry`)].forEach((card, i) => { const title = card.querySelector(`[data-${prefix}-field="${titleField}"]`)?.value.trim(); const node = card.querySelector(".entry-title"); if (node) node.textContent = title || `${label} ${i+1}`; });
}
function setCertificationEntries(entries) { certificationEntriesContainer?.replaceChildren(); (Array.isArray(entries) && entries.length ? entries : [{}]).forEach(e => setupRepeatableEntries(certificationEntriesContainer, certificationEntryTemplate, CERTIFICATION_FIELDS, "certification", e || {}, "name", "Certification")); }
function setAchievementEntries(entries) { achievementEntriesContainer?.replaceChildren(); (Array.isArray(entries) && entries.length ? entries : [{}]).forEach(e => setupRepeatableEntries(achievementEntriesContainer, achievementEntryTemplate, ACHIEVEMENT_FIELDS, "achievement", e || {}, "title", "Achievement")); }
function renderStructuredList(containerId, sectionId, entries, fields, prefix) {
    const container = document.getElementById(containerId), section = document.getElementById(sectionId);
    if (!container || !section) return;
    container.replaceChildren();
    const valid = entries.filter(entry => fields.some(field => (entry[field] || "").trim()));
    valid.forEach(entry => {
        const item = document.createElement("div"); item.className = "structured-preview-entry";
        const titleValue = entry.name || entry.title;
        if (titleValue) { const title = document.createElement("strong"); title.textContent = titleValue; item.appendChild(title); }
        const meta = [entry.issuer || entry.organization, entry.date].filter(Boolean).join(" • ");
        if (meta) { const line = document.createElement("div"); line.className = "structured-preview-meta"; line.textContent = meta; item.appendChild(line); }
        if (entry.description) { const desc = document.createElement("p"); desc.textContent = entry.description; item.appendChild(desc); }
        if (entry.link) { const link = document.createElement("a"); link.href = entry.link; link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "Credential link"; item.appendChild(link); }
        container.appendChild(item);
    });
    section.hidden = valid.length === 0;
}

function blankProjectEntry() {
    return { title: "", technologies: "", description: "", github: "", demo: "" };
}

function readProjectEntriesFromForm() {
    if (!projectEntriesContainer) return [];
    return [...projectEntriesContainer.querySelectorAll(".project-entry")].map((card) => {
        const entry = {};
        PROJECT_FIELDS.forEach((field) => {
            const input = card.querySelector(`[data-project-field="${field}"]`);
            entry[field] = input ? input.value.trim() : "";
        });
        return entry;
    });
}

function addProjectEntry(values = {}, focus = false) {
    if (!projectEntriesContainer || !projectEntryTemplate) return;
    const fragment = projectEntryTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".project-entry");
    PROJECT_FIELDS.forEach((field) => {
        const input = card.querySelector(`[data-project-field="${field}"]`);
        if (!input) return;
        input.value = values[field] || "";
        input.addEventListener("input", () => {
            updateProjectEntryTitles();
            updatePreview();
        });
    });
    card.querySelector(".remove-entry-button").addEventListener("click", () => {
        card.remove();
        if (!projectEntriesContainer.querySelector(".project-entry")) addProjectEntry();
        updateProjectEntryTitles();
        updatePreview();
    });
    projectEntriesContainer.appendChild(fragment);
    updateProjectEntryTitles();
    if (focus) {
        const firstInput = projectEntriesContainer.lastElementChild?.querySelector("input");
        if (firstInput) firstInput.focus();
    }
}

function updateProjectEntryTitles() {
    if (!projectEntriesContainer) return;
    [...projectEntriesContainer.querySelectorAll(".project-entry")].forEach((card, index) => {
        const title = (card.querySelector('[data-project-field="title"]')?.value || "").trim();
        const label = card.querySelector(".entry-title");
        if (label) label.textContent = title || `Project ${index + 1}`;
    });
}

function setProjectEntries(entries) {
    if (!projectEntriesContainer) return;
    projectEntriesContainer.replaceChildren();
    const validEntries = Array.isArray(entries) && entries.length ? entries : [blankProjectEntry()];
    validEntries.forEach((entry) => addProjectEntry(entry || {}));
}

function renderProjectPreview() {
    const preview = document.getElementById("previewProjects");
    const section = document.getElementById("projectsSection");
    if (!preview || !section) return;
    const entries = readProjectEntriesFromForm().filter((entry) =>
        PROJECT_FIELDS.some((field) => (entry[field] || "").trim())
    );
    preview.replaceChildren();
    entries.forEach((entry) => {
        const item = document.createElement("div");
        item.className = "project-preview-entry";

        if (entry.title) {
            const title = document.createElement("div");
            title.className = "project-preview-title";
            title.textContent = entry.title;
            item.appendChild(title);
        }
        if (entry.technologies) {
            const technologies = document.createElement("div");
            technologies.className = "project-preview-tech";
            technologies.textContent = `Technologies: ${entry.technologies}`;
            item.appendChild(technologies);
        }
        if (entry.description) {
            const description = document.createElement("p");
            description.className = "project-preview-description";
            description.textContent = entry.description;
            item.appendChild(description);
        }

        const links = document.createElement("div");
        links.className = "project-preview-links";
        [["GitHub", entry.github], ["Live demo", entry.demo]].forEach(([label, url]) => {
            if (!url) return;
            const anchor = document.createElement("a");
            anchor.textContent = label;
            anchor.href = url;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            links.appendChild(anchor);
        });
        if (links.childElementCount) item.appendChild(links);
        preview.appendChild(item);
    });
    section.hidden = entries.length === 0;
}

function renderExperiencePreview() {
    const preview = document.getElementById("previewExperience");
    const section = document.getElementById("experienceSection");
    if (!preview || !section) return;
    const entries = readExperienceEntriesFromForm().filter((entry) =>
        EXPERIENCE_FIELDS.some((field) => (entry[field] || "").trim())
    );
    preview.replaceChildren();
    entries.forEach((entry) => {
        const item = document.createElement("div");
        item.className = "experience-preview-entry";
        const headingText = [entry.role, entry.company].filter(Boolean).join(" — ");
        if (headingText) {
            const heading = document.createElement("div");
            heading.className = "experience-preview-heading";
            heading.textContent = headingText;
            item.appendChild(heading);
        }
        const dates = [entry.startDate, entry.endDate].filter(Boolean).join(" – ");
        const metaText = [entry.location, dates].filter(Boolean).join(" • ");
        if (metaText) {
            const meta = document.createElement("div");
            meta.className = "experience-preview-meta";
            meta.textContent = metaText;
            item.appendChild(meta);
        }
        if (entry.responsibilities) {
            const responsibilities = document.createElement("p");
            responsibilities.className = "experience-preview-text";
            responsibilities.textContent = entry.responsibilities;
            item.appendChild(responsibilities);
        }
        if (entry.achievements) {
            const achievements = document.createElement("p");
            achievements.className = "experience-preview-text experience-preview-achievements";
            achievements.textContent = `Achievements: ${entry.achievements}`;
            item.appendChild(achievements);
        }
        preview.appendChild(item);
    });
    section.hidden = entries.length === 0;
}

function renderEducationPreview() {
    const preview = document.getElementById("previewEducation");
    const section = document.getElementById("educationSection");
    if (!preview || !section) return;

    const entries = readEducationEntriesFromForm().filter((entry) =>
        EDUCATION_FIELDS.some((field) => (entry[field] || "").trim())
    );
    preview.replaceChildren();

    entries.forEach((entry) => {
        const item = document.createElement("div");
        item.className = "education-preview-entry";

        const headingText = [entry.degree, entry.institution].filter(Boolean).join(" — ");
        if (headingText) {
            const heading = document.createElement("div");
            heading.className = "education-preview-heading";
            heading.textContent = headingText;
            item.appendChild(heading);
        }

        const metaText = [
            entry.location,
            entry.year,
            entry.score
        ].filter(Boolean).join(" • ");
        if (metaText) {
            const meta = document.createElement("div");
            meta.className = "education-preview-meta";
            meta.textContent = metaText;
            item.appendChild(meta);
        }

        if (entry.details) {
            const details = document.createElement("p");
            details.className = "education-preview-details";
            details.textContent = entry.details;
            item.appendChild(details);
        }
        preview.appendChild(item);
    });

    section.hidden = entries.length === 0;
}

function updatePreview() {
    fields.forEach((field) => {
        const input = document.getElementById(field);
        const preview = document.getElementById(previewMappings[field]);
        if (!input || !preview) return;

        const value = input.value.trim();
        preview.textContent = value || placeholders[field] || "";

        const optionalFields = [
            "languages", "software", "accomplishments", "strengths", "interests"
        ];
        if (optionalFields.includes(field)) {
            const section = preview.closest(".resume-section");
            if (section) section.hidden = !value;
        }
    });

    renderEducationPreview();
    renderExperiencePreview();
    renderProjectPreview();
    renderStructuredList("previewCertifications", "certificationsSection", readRepeatableEntries(certificationEntriesContainer, ".certification-entry", CERTIFICATION_FIELDS, "certification"), CERTIFICATION_FIELDS, "certification");
    renderStructuredList("previewAccomplishments", "accomplishmentsSection", readRepeatableEntries(achievementEntriesContainer, ".achievement-entry", ACHIEVEMENT_FIELDS, "achievement"), ACHIEVEMENT_FIELDS, "achievement");

    const personalDetailLabels = [
        ["dateOfBirth", "Date of Birth"], ["nationality", "Nationality"],
        ["linkedin", "LinkedIn"], ["github", "GitHub"],
        ["portfolio", "Portfolio"], ["address", "Address"]
    ];
    const personalLines = personalDetailLabels
        .map(([id, label]) => [label, (document.getElementById(id)?.value || "").trim()])
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`);
    const personalPreview = document.getElementById("previewPersonalDetails");
    if (personalPreview) personalPreview.textContent = personalLines.join("\n");
    const personalSection = document.getElementById("personalDetailsSection");
    if (personalSection) personalSection.hidden = personalLines.length === 0;
}

function getResumeDetails() {
    const details = {};
    fields.forEach((field) => {
        const input = document.getElementById(field);
        details[field] = input ? input.value : "";
    });
    details.educationEntries = readEducationEntriesFromForm();
    details.experienceEntries = readExperienceEntriesFromForm();
    details.projectEntries = readProjectEntriesFromForm();
    details.certificationEntries = readRepeatableEntries(certificationEntriesContainer, ".certification-entry", CERTIFICATION_FIELDS, "certification");
    details.achievementEntries = readRepeatableEntries(achievementEntriesContainer, ".achievement-entry", ACHIEVEMENT_FIELDS, "achievement");
    return details;
}

function saveResumeDetails(showMessage = true) {
    try {
        localStorage.setItem("resumeDetails", JSON.stringify(getResumeDetails()));
        if (showMessage) alert("Your resume details have been saved in this browser.");
        return true;
    } catch (error) {
        console.error("Unable to save resume details:", error);
        if (showMessage) alert("Unable to save details. Please check your browser storage settings.");
        return false;
    }
}

function loadSavedDetails() {
    try {
        const saved = localStorage.getItem("resumeDetails");
        if (!saved) {
            setEducationEntries([blankEducationEntry()]);
            setExperienceEntries([blankExperienceEntry()]);
            setProjectEntries([blankProjectEntry()]);
            setCertificationEntries([blankCertificationEntry()]);
            setAchievementEntries([blankAchievementEntry()]);
            return;
        }
        const details = JSON.parse(saved);
        fields.forEach((field) => {
            const input = document.getElementById(field);
            if (input) input.value = details[field] || "";
        });

        // Keep education data saved by earlier versions of ResumeCraft.
        if (Array.isArray(details.educationEntries)) {
            setEducationEntries(details.educationEntries);
        } else if (typeof details.education === "string" && details.education.trim()) {
            setEducationEntries([{ ...blankEducationEntry(), details: details.education.trim() }]);
        } else {
            setEducationEntries([blankEducationEntry()]);
        }

        // Preserve previously saved free-text work experience.
        if (Array.isArray(details.experienceEntries)) {
            setExperienceEntries(details.experienceEntries);
        } else if (typeof details.experience === "string" && details.experience.trim()) {
            setExperienceEntries([{ ...blankExperienceEntry(), responsibilities: details.experience.trim() }]);
        } else {
            setExperienceEntries([blankExperienceEntry()]);
        }

        // Load structured certifications/achievements, migrating legacy free-text values.
        if (Array.isArray(details.certificationEntries)) setCertificationEntries(details.certificationEntries);
        else if (typeof details.certifications === "string" && details.certifications.trim()) setCertificationEntries(details.certifications.split(/\n|;/).map(name => name.trim()).filter(Boolean).map(name => ({...blankCertificationEntry(), name})));
        else setCertificationEntries([blankCertificationEntry()]);
        if (Array.isArray(details.achievementEntries)) setAchievementEntries(details.achievementEntries);
        else if (typeof details.accomplishments === "string" && details.accomplishments.trim()) setAchievementEntries(details.accomplishments.split(/\n|;/).map(title => title.trim()).filter(Boolean).map(title => ({...blankAchievementEntry(), title})));
        else setAchievementEntries([blankAchievementEntry()]);

        // Load structured projects, and migrate older free-text project content if present.
        if (Array.isArray(details.projectEntries)) {
            setProjectEntries(details.projectEntries);
        } else if (typeof details.projects === "string" && details.projects.trim()) {
            setProjectEntries([{ ...blankProjectEntry(), description: details.projects.trim() }]);
        } else {
            setProjectEntries([blankProjectEntry()]);
        }
    } catch (error) {
        console.error("Unable to load saved details:", error);
        setEducationEntries([blankEducationEntry()]);
        setExperienceEntries([blankExperienceEntry()]);
        setProjectEntries([blankProjectEntry()]);
        setCertificationEntries([blankCertificationEntry()]);
        setAchievementEntries([blankAchievementEntry()]);
    }
}

function applyTemplate() {
    if (!templateSelect || !resumePreview) return;
    const selectedTemplate = templateSelect.value;
    const validTemplates = ["professional", "modern", "minimalist", "creative", "student"];
    if (!validTemplates.includes(selectedTemplate)) return;

    resumePreview.classList.remove(...validTemplates);
    resumePreview.classList.add(selectedTemplate);

    try {
        localStorage.setItem("resumeTemplate", selectedTemplate);
    } catch (error) {
        console.error("Unable to save template:", error);
    }
}

function loadSavedTemplate() {
    if (!templateSelect) return;
    try {
        const savedTemplate = localStorage.getItem("resumeTemplate");
        const validTemplates = ["professional", "modern", "minimalist", "creative", "student"];
        if (validTemplates.includes(savedTemplate)) templateSelect.value = savedTemplate;
    } catch (error) {
        console.error("Unable to load template:", error);
    }
    applyTemplate();
}

fields.forEach((field) => {
    const input = document.getElementById(field);
    if (input) input.addEventListener("input", updatePreview);
});

if (addEducationButton) {
    addEducationButton.addEventListener("click", () => {
        addEducationEntry(blankEducationEntry(), true);
    });
}

if (addExperienceButton) {
    addExperienceButton.addEventListener("click", () => {
        addExperienceEntry(blankExperienceEntry(), true);
    });
}

if (addCertificationButton) addCertificationButton.addEventListener("click", () => setupRepeatableEntries(certificationEntriesContainer, certificationEntryTemplate, CERTIFICATION_FIELDS, "certification", blankCertificationEntry(), "name", "Certification", true));
if (addAchievementButton) addAchievementButton.addEventListener("click", () => setupRepeatableEntries(achievementEntriesContainer, achievementEntryTemplate, ACHIEVEMENT_FIELDS, "achievement", blankAchievementEntry(), "title", "Achievement", true));

if (addProjectButton) {
    addProjectButton.addEventListener("click", () => {
        addProjectEntry(blankProjectEntry(), true);
    });
}

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        updatePreview();
        saveResumeDetails(false);
        alert("Your resume preview is updated!");
    });
}

const saveButton = document.getElementById("saveButton");
if (saveButton) saveButton.addEventListener("click", () => saveResumeDetails(true));

if (templateSelect) templateSelect.addEventListener("change", applyTemplate);

const downloadButton = document.getElementById("downloadButton");
if (downloadButton) {
    downloadButton.addEventListener("click", () => {
        updatePreview();
        window.print();
    });
}

const downloadWordButton = document.getElementById("downloadWordButton");
if (downloadWordButton) downloadWordButton.addEventListener("click", () => {
    updatePreview();
    if (!window.htmlDocx || typeof window.htmlDocx.asBlob !== "function") { alert("Word export needs an internet connection to load its document converter. Please reconnect and try again."); return; }
    const clone = resumePreview.cloneNode(true);
    clone.querySelectorAll("[hidden]").forEach(el => el.remove());
    clone.querySelectorAll("a").forEach(a => { a.style.color = "#1d4ed8"; });
    const styles = `body{font-family:Arial,sans-serif;color:#222;font-size:10pt} .resume{width:100%;padding:24px;background:white} h1{font-size:24pt;margin:0 0 6pt} h2,h3{font-size:13pt;margin:14pt 0 5pt;border-bottom:1px solid #bbb;padding-bottom:3pt} p{white-space:pre-wrap;margin:4pt 0} .resume-section{margin-bottom:10pt} .project-preview-entry,.education-preview-entry,.experience-preview-entry,.structured-preview-entry{margin-bottom:8pt} .structured-preview-meta,.education-preview-meta,.experience-preview-meta,.project-preview-tech{font-size:9pt;color:#555;margin:2pt 0} a{color:#1d4ed8;text-decoration:none}`;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${styles}</style></head><body>${clone.outerHTML}</body></html>`;
    try { const blob = window.htmlDocx.asBlob(html, {orientation: "portrait", margins: {top: 720, right: 720, bottom: 720, left: 720}}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${(document.getElementById("name")?.value || "Resume").trim().replace(/[^a-z0-9_-]+/gi, "_")}_ResumeCraft.docx`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); } catch (error) { console.error("Word export failed:", error); alert("Unable to create the Word document. Please try again."); }
});

const clearButton = document.getElementById("clearButton");
if (clearButton) {
    clearButton.addEventListener("click", () => {
        if (!confirm("Are you sure you want to clear your resume details?")) return;
        if (form) form.reset();
        setEducationEntries([blankEducationEntry()]);
        setExperienceEntries([blankExperienceEntry()]);
        setProjectEntries([blankProjectEntry()]);
        setCertificationEntries([blankCertificationEntry()]);
        setAchievementEntries([blankAchievementEntry()]);
        try {
            localStorage.removeItem("resumeDetails");
        } catch (error) {
            console.error("Unable to clear saved details:", error);
        }
        updatePreview();
    });
}

loadSavedDetails();
loadSavedTemplate();
updatePreview();
console.log("ResumeCraft loaded successfully.");