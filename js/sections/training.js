import { getSheet, getTable } from "../api/api.js";

export async function Training() {

    const [settings, programs] = await Promise.all([
        getSheet("05_التدريب"),
        getTable("05_التدريب")
    ]);

    if (!settings) return "";

    const groupedPrograms = programs.reduce((groups, program) => {
        const category = program["التصنيف"] ?? "";

        if (!groups.has(category)) {
            groups.set(category, []);
        }

        groups.get(category).push(program);

        return groups;
    }, new Map());

    const totalHours = programs.reduce((total, program) => {
        const normalizedHours = String(program["عدد الساعات"] ?? "")
            .replace(/[٠-٩]/g, digit => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
            .replace(/[^\d.-]/g, "");

        return total + (Number(normalizedHours) || 0);
    }, 0);

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

        <div class="training-statistics">

            <article class="training-stat">
                <strong>${programs.length.toLocaleString("ar-SA")}</strong>
                <span>عدد الدورات</span>
            </article>

            <article class="training-stat">
                <strong>${totalHours.toLocaleString("ar-SA")}</strong>
                <span>إجمالي الساعات التدريبية</span>
            </article>

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

    </div>

</section>
`;

}
