import { getSheet, getTable } from "../api/api.js";

export async function Experience() {

    const [settings, experiences] = await Promise.all([
        getSheet("04_الخبرات المهنية"),
        getTable("04_الخبرات المهنية")
    ]);

    if (!settings) return "";

    return `
<section
    class="experience-section"
    id="experience"
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

        <div class="career-timeline">

            ${experiences.map(experience => `
                <article class="career-item">

                    <span class="career-marker" aria-hidden="true"></span>

                    <div class="career-card">

                        <div class="career-card-top">

                            <span class="career-period">
                                ${experience["الفترة الزمنية"] ?? ""}
                            </span>

                            <span class="career-company">
                                ${experience["جهة العمل"] ?? ""}
                            </span>

                        </div>

                        <h3>
                            ${experience["المسمى الوظيفي"] ?? ""}
                        </h3>

                        <p class="career-description">
                            ${experience["الوصف"] ?? ""}
                        </p>

                    </div>

                </article>
            `).join("")}

        </div>

        <nav class="experience-navigation" aria-label="التنقل بين الأقسام">
            <a class="btn btn-outline" href="#qualifications">السابق</a>
            <a class="btn btn-primary" href="#training">التالي</a>
        </nav>

    </div>

</section>
`;

}
