import { getSectionData, getImage } from "../api/api.js";

let certificatesData = [];

export async function Certificates() {

    const data = await getSectionData("06_شهادات الشكر");

    if (!data) return "";

    const { section, items: certificates } = data;
    certificatesData = certificates;

    const managerCertificates = certificates.filter(certificate =>
        String(certificate["الجهة المانحة"] ?? "").includes("المدير العام")
    ).length;

    const uniqueIssuers = new Set(
        certificates
            .map(certificate => String(certificate["الجهة المانحة"] ?? "").trim())
            .filter(Boolean)
    ).size;

    const statistics = [
        {
            label: "إجمالي عدد الشهادات",
            value: certificates.length
        },
        {
            label: "شهادات المدير العام",
            value: managerCertificates
        },
        {
            label: "الشهادات من الجهات المختلفة",
            value: certificates.length - managerCertificates
        },
        {
            label: "الجهات المانحة الفريدة",
            value: uniqueIssuers
        }
    ];

    return `
<section class="certificates-section" id="certificates">

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

        <div class="certificates-statistics">

            ${statistics.map(statistic => `
                <article class="certificate-stat">
                    <strong>${statistic.value}</strong>
                    <span>${statistic.label}</span>
                </article>
            `).join("")}

        </div>

        <div class="certificates-grid">

            ${certificates.map((certificate, index) => {
                const image = getImage(certificate["معرف الصورة"] ?? "");

                return `
                    <button
                        class="certificate-card"
                        type="button"
                        data-certificate-index="${index}"
                        aria-label="${certificate["اسم الشهادة"] ?? ""}"
                    >

                        <span class="certificate-thumbnail">
                            ${image ? `
                                <img
                                    src="${image}"
                                    alt="${certificate["اسم الشهادة"] ?? ""}"
                                    loading="lazy"
                                >
                            ` : ""}
                        </span>

                        <span class="certificate-content">

                            <strong>
                                ${certificate["اسم الشهادة"] ?? ""}
                            </strong>

                            <span class="certificate-issuer">
                                ${certificate["الجهة المانحة"] ?? ""}
                            </span>

                            <span class="certificate-date">
                                ${certificate["التاريخ"] ?? ""}
                            </span>

                        </span>

                    </button>
                `;
            }).join("")}

        </div>

    </div>

</section>

<div
    class="certificate-lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="عرض الشهادة"
    hidden
>

    <button
        class="lightbox-close"
        type="button"
        aria-label="إغلاق"
    >×</button>

    <button
        class="lightbox-control lightbox-previous"
        type="button"
        aria-label="الشهادة السابقة"
    >‹</button>

    <figure class="lightbox-content">
        <img class="lightbox-image" src="" alt="">
        <figcaption class="lightbox-caption">
            <strong></strong>
            <span></span>
            <time></time>
        </figcaption>
    </figure>

    <button
        class="lightbox-control lightbox-next"
        type="button"
        aria-label="الشهادة التالية"
    >›</button>

</div>
`;

}

export function initCertificates() {

    const lightbox = document.querySelector(".certificate-lightbox");
    const cards = [...document.querySelectorAll(".certificate-card")];
    const certificates = certificatesData;

    if (!lightbox || !cards.length) return;

    const image = lightbox.querySelector(".lightbox-image");
    const title = lightbox.querySelector(".lightbox-caption strong");
    const issuer = lightbox.querySelector(".lightbox-caption span");
    const date = lightbox.querySelector(".lightbox-caption time");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-previous");
    const nextButton = lightbox.querySelector(".lightbox-next");
    let activeIndex = 0;
    let touchStartX = 0;

    const showCertificate = index => {
        activeIndex = (index + certificates.length) % certificates.length;

        const certificate = certificates[activeIndex];

        image.src = getImage(certificate["معرف الصورة"] ?? "");
        image.alt = certificate["اسم الشهادة"] ?? "";
        title.textContent = certificate["اسم الشهادة"] ?? "";
        issuer.textContent = certificate["الجهة المانحة"] ?? "";
        date.textContent = certificate["التاريخ"] ?? "";
    };

    const openLightbox = index => {
        showCertificate(index);
        lightbox.hidden = false;
        document.body.classList.add("lightbox-open");

        requestAnimationFrame(() => {
            lightbox.classList.add("is-open");
            closeButton.focus();
        });
    };

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");

        setTimeout(() => {
            lightbox.hidden = true;
            cards[activeIndex]?.focus();
        }, 250);
    };

    cards.forEach(card => {
        card.addEventListener("click", () => {
            openLightbox(Number(card.dataset.certificateIndex));
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", () => showCertificate(activeIndex - 1));
    nextButton.addEventListener("click", () => showCertificate(activeIndex + 1));

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });

    lightbox.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", event => {
        const distance = event.changedTouches[0].clientX - touchStartX;

        if (Math.abs(distance) < 50) return;

        showCertificate(activeIndex + (distance > 0 ? -1 : 1));
    }, { passive: true });

    document.addEventListener("keydown", event => {
        if (lightbox.hidden) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") showCertificate(activeIndex - 1);
        if (event.key === "ArrowLeft") showCertificate(activeIndex + 1);
    });

}
