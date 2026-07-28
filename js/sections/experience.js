import { getSectionData } from "../api/api.js";

export async function Experience() {

    const data = await getSectionData("04_الخبرات المهنية");

    if (!data) return "";

    const { section, items: experiences } = data;
    return `
<section class="experience-section" id="experience">

    <div class="container">

        <div class="section-header">

            <span class="section-tag">
                ${section.title}
            </span>

            <h2>
                ${section.subtitle}
            </h2>

            <p class="section-subtitle">
                ${section.description}
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

    </div>

</section>
`;

}
