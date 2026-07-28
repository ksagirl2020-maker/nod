import { getSheet, getTable } from "../api/api.js";
import { getIcon } from "../utils/icons.js";
export async function About() {

    const [settings, items] = await Promise.all([
        getSheet("02_نبذة_تعريفية"),
        getTable("02_نبذة_تعريفية")
    ]);

    if (!settings) return "";

    return `
<section class="about-section" id="about"
style="background:${settings["لون الخلفية"] || "#fff"}">

<div class="container">

    <div class="section-header">

        <span class="section-tag">
            ${settings["عنوان القسم"] || ""}
        </span>

        <h2>
            ${settings["العنوان الرئيسي"] || ""}
        </h2>

        <p class="section-subtitle">
            ${settings["العنوان الفرعي"] || ""}
        </p>

        <div class="about-text">
            ${settings["النبذة"] || ""}
        </div>

    </div>

    <div class="about-grid">

        ${items.map(card => `

        <article class="about-card">

            <div class="card-icon">
        ${getIcon(card["الأيقونة"])}
            </div>

            <h3>
                ${card["العنوان"]}
            </h3>

            <p>
                ${card["الوصف"]}
            </p>

        </article>

        `).join("")}

    </div>

</div>

</section>
`;

}
