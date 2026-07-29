import { getSectionData } from "../api/api.js";

export async function OtherExperience() {

    const data = await getSectionData(
        "05_الخبرات_القيادية_والتكليفات"
    );

    if (!data) return "";

    const { section, items } = data;
    const orderedItems = [...items].sort((a, b) =>
        String(a["الترتيب"] ?? "").localeCompare(
            String(b["الترتيب"] ?? ""),
            undefined,
            { numeric:true }
        )
    );

    return `
<section class="other-experience-section" id="other-experience">

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

        <div class="other-experience-list">

            ${orderedItems.map((item, index) => `
                <article
                    class="other-experience-item"
                    style="--item-index:${index}"
                >

                    <div class="other-experience-content">

                        <h3>${item["اسم المهمة"] ?? ""}</h3>

                        <p>${item["الوصف"] ?? ""}</p>

                    </div>

                    <time class="other-experience-date">
                        ${item["التاريخ"] ?? ""}
                    </time>

                </article>
            `).join("")}

        </div>

    </div>

</section>
`;

}
