import { getSectionData } from "../api/api.js";

export async function Volunteering() {

    const data = await getSectionData("08_التطوع");

    if (!data) return "";

    const { section, items: volunteering } = data;
    const orderedVolunteering = [...volunteering].sort((a, b) =>
        String(a["الترتيب"] ?? "").localeCompare(
            String(b["الترتيب"] ?? ""),
            "ar",
            { numeric: true }
        )
    );

    const totalHours = volunteering.reduce(
        (total, item) => total + (Number(item["عدد الساعات"]) || 0),
        0
    );

    return `
<section class="volunteering-section" id="volunteering">

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

        <div class="volunteering-counter">
            <strong
                class="volunteering-total"
                data-total-hours="${totalHours}"
            >0</strong>
            <span>إجمالي ساعات التطوع</span>
        </div>

        <div class="volunteering-grid">

            ${orderedVolunteering.map(item => `
                    <article class="volunteering-card">

                        <div class="volunteering-card-content">

                            <span class="volunteering-order">
                                ${item["الترتيب"] ?? ""}
                            </span>

                            <h3>
                                ${item["الجهة"] ?? ""}
                            </h3>

                            <p>
                                <strong>${item["عدد الساعات"] ?? ""}</strong>
                                <span>ساعة تطوعية</span>
                            </p>

                        </div>

                    </article>
            `).join("")}

        </div>

    </div>

</section>
`;

}

export function initVolunteering() {

    const counter = document.querySelector(".volunteering-total");

    if (!counter) return;

    const total = Number(counter.dataset.totalHours) || 0;
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const setCounter = value => {
        counter.textContent = Math.round(value).toLocaleString("ar-SA");
    };

    if (reducedMotion) {
        setCounter(total);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;

        observer.disconnect();

        const duration = 1600;
        let startTime;

        const animate = time => {
            startTime ??= time;

            const progress = Math.min((time - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCounter(total * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, {
        threshold:.35
    });

    observer.observe(counter);

}
