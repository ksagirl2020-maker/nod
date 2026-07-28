import { getSheet, getTable } from "../api/api.js";

export async function Education() {

    const [settings, qualifications] = await Promise.all([
        getSheet("03_المؤهلات التعليمية"),
        getTable("03_المؤهلات التعليمية")
    ]);

    if (!settings) return "";

    const orderedQualifications = [...qualifications].sort((a, b) =>
        String(a["الترتيب"] ?? "").localeCompare(
            String(b["الترتيب"] ?? ""),
            "ar",
            { numeric: true }
        )
    );

    return `
<section
    class="education-section"
    id="qualifications"
    ${settings["لون الخلفية"] ? `style="background:${settings["لون الخلفية"]}"` : ""}
>

    <div class="container">

        <div class="section-header">

            <span class="section-tag">
                ${settings["عنوان القسم"] ?? ""}
            </span>

            <h2>
                ${settings["العنوان الرئيسي"] ?? ""}
            </h2>

            <p class="section-subtitle">
                ${settings["العنوان الفرعي"] ?? ""}
            </p>

        </div>

        <div class="education-timeline">

            ${orderedQualifications.map(qualification => `
                <article class="education-item">

                    <span class="education-order">
                        ${qualification["الترتيب"] ?? ""}
                    </span>

                    <div class="education-card">

                        <div class="education-card-header">

                            <h3>
                                ${qualification["الدرجة العلمية"] ?? ""}
                            </h3>

                            <span class="education-year">
                                ${qualification["سنة التخرج"] ?? ""}
                            </span>

                        </div>

                        <p class="education-specialization">
                            ${qualification["التخصص"] ?? ""}
                        </p>

                        <p class="education-institution">
                            ${qualification["الجهة التعليمية"] ?? ""}
                        </p>

                    </div>

                </article>
            `).join("")}

        </div>

    </div>

</section>
`;

}
