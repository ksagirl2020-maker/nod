import { getSheet, getTable } from "../api/api.js";

export async function Training() {

    const settings = await getSheet("05_التدريب");
    const programs = await getTable("05_التدريب");

    if (!settings) return "";

    const groupedPrograms = programs.reduce((groups, program) => {
        const category = program["التصنيف"] ?? "";

        if (!groups.has(category)) {
            groups.set(category, []);
        }

        groups.get(category).push(program);

        return groups;
    }, new Map());

    return `
<section
    class="training-section"
    id="training"
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

        <div class="training-groups">

            ${[...groupedPrograms].map(([category, categoryPrograms]) => `
                <section class="training-group">

                    <div class="training-group-heading">
                        <span class="training-group-mark" aria-hidden="true"></span>
                        <h3>${category}</h3>
                    </div>

                    <div class="training-grid">

                        ${categoryPrograms.map(program => `
                            <article class="training-card">

                                <div class="training-card-meta">

                                    <span class="training-year">
                                        ${program["سنة التنفيذ"] ?? ""}
                                    </span>

                                    <span class="training-hours">
                                        ${program["عدد الساعات"] ?? ""}
                                    </span>

                                </div>

                                <h4>
                                    ${program["اسم البرنامج"] ?? ""}
                                </h4>

                                <p>
                                    ${program["الجهة المنفذة"] ?? ""}
                                </p>

                            </article>
                        `).join("")}

                    </div>

                </section>
            `).join("")}

        </div>

        <nav class="training-navigation" aria-label="التنقل بين الأقسام">
            <a class="btn btn-outline" href="#experience">السابق</a>
            <a class="btn btn-primary" href="#certificates">التالي</a>
        </nav>

    </div>

</section>
`;

}
