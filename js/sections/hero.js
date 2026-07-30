import { Button } from "../components/button.js";
import { getSheet } from "../api/api.js";

export async function Hero() {

    const profile = await getSheet("01_الملف_الشخصي");

    // ===============================
    // تحويل رابط صورة Google Drive
    // ===============================

    const imageUrl = profile["الصورة الشخصية"] ?? "";

    const imageMatch = imageUrl.match(/\/d\/([^/]+)/);

    const finalImage = imageMatch
        ? `https://drive.google.com/thumbnail?id=${imageMatch[1]}&sz=w1000`
        : imageUrl;

    // ===============================
    // تحويل رابط السيرة الذاتية
    // ===============================

    const cvUrl = profile["ملف السيرة الذاتية"] ?? "";

    const cvMatch = cvUrl.match(/\/d\/([^/]+)/);

    const finalCV = cvMatch
        ? `https://drive.google.com/file/d/${cvMatch[1]}/view`
        : cvUrl;

    const phone = profile["رقم الجوال"] ?? "";
    const phoneLink = String(phone).replace(/\s+/g, "");

    return `
        <section class="hero" id="home">

            <time class="hero-current-date"></time>

            <div class="container hero-content">

                <div class="hero-text">

                    <h1>
                        ${profile["الاسم الكامل"] ?? ""}
                    </h1>

                    <h2>
                        ${profile["المسمى الوظيفي"] ?? ""}
                    </h2>

                    <p class="hero-description">
                        ${profile["النبذة المختصرة"] ?? ""}
                    </p>

                    <div class="hero-info">

                        <div class="hero-info-item">

                            <span class="hero-icon">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/>
                                    <circle cx="12" cy="10" r="2.5"/>
                                </svg>
                            </span>

                            <span class="hero-info-content">
                                <small>الموقع</small>
                                <strong>${profile["المدينة"] ?? ""}</strong>
                            </span>

                        </div>

                        <div class="hero-info-item">

                            <span class="hero-icon">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8 21h8"/>
                                    <path d="M12 17v4"/>
                                    <path d="M7 4h10v4a5 5 0 0 1-10 0z"/>
                                    <path d="M7 6H4v1a4 4 0 0 0 4 4"/>
                                    <path d="M17 6h3v1a4 4 0 0 1-4 4"/>
                                </svg>
                            </span>

                            <span class="hero-info-content">
                                <small>سنوات الخبرة</small>
                                <strong>${profile["عدد سنوات الخبرة"] ?? ""}</strong>
                            </span>

                        </div>

                        <a
                            class="hero-info-item"
                            href="mailto:${profile["البريد الإلكتروني"] ?? ""}"
                        >

                            <span class="hero-icon">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                                    <path d="m3 7 9 6 9-6"/>
                                </svg>
                            </span>

                            <span class="hero-info-content">
                                <small>البريد الإلكتروني</small>
                                <strong dir="ltr">${profile["البريد الإلكتروني"] ?? ""}</strong>
                            </span>

                        </a>

                        <a
                            class="hero-info-item"
                            href="tel:${phoneLink}"
                        >

                            <span class="hero-icon">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="7" y="2" width="10" height="20" rx="2"/>
                                    <path d="M11 18h2"/>
                                </svg>
                            </span>

                            <span class="hero-info-content">
                                <small>رقم الجوال</small>
                                <strong dir="ltr">${phone}</strong>
                            </span>

                        </a>

                    </div>

                    <div class="hero-buttons">

                        <a
                            href="${finalCV}"
                            target="_blank"
                            rel="noopener"
                        >
                            ${Button("تحميل السيرة الذاتية")}
                        </a>

                    </div>

                </div>

                <div class="hero-image">

                    <div class="hero-avatar">

                        ${
                            finalImage
                                ? `<img src="${finalImage}" alt="${profile["الاسم الكامل"]}" loading="eager" fetchpriority="high">`
                                : ""
                        }

                    </div>

                </div>

            </div>

        </section>
    `;
}

export function initHeroDate() {

    const dateElement = document.querySelector(".hero-current-date");

    if (!dateElement) return;

    const formatter = new Intl.DateTimeFormat("ar-SA", {
        calendar:"gregory",
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    });

    const updateDate = () => {
        const now = new Date();

        dateElement.textContent = formatter.format(now);
        dateElement.dateTime = now.toISOString().split("T")[0];
    };

    updateDate();
    setInterval(updateDate, 60 * 1000);

}
