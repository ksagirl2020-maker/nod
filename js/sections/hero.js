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

    return `
        <section class="hero" id="home">

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
                            <span class="hero-icon">📍</span>
                            <span>${profile["المدينة"] ?? ""}</span>
                        </div>

                        <div class="hero-info-item">
                            <span class="hero-icon">🏆</span>
                            <span>${profile["عدد سنوات الخبرة"] ?? ""} سنة خبرة</span>
                        </div>

                        <div class="hero-info-item">
                            <span class="hero-icon">✉️</span>
                            <span>${profile["البريد الإلكتروني"] ?? ""}</span>
                        </div>

                        <div class="hero-info-item">
                            <span class="hero-icon">📱</span>
                            <span>${profile["رقم الجوال"] ?? ""}</span>
                        </div>

                    </div>

                    <div class="hero-buttons">

                        <a
                            href="${finalCV}"
                            target="_blank"
                            rel="noopener"
                        >
                            ${Button("تحميل السيرة الذاتية")}
                        </a>

                        <a
                            href="mailto:${profile["البريد الإلكتروني"] ?? ""}"
                        >
                            ${Button("تواصل معي", "outline")}
                        </a>

                    </div>

                </div>

                <div class="hero-image">

                    <div class="hero-avatar">

                        ${
                            finalImage
                                ? `<img src="${finalImage}" alt="${profile["الاسم الكامل"]}" loading="lazy">`
                                : ""
                        }

                    </div>

                </div>

            </div>

        </section>
    `;
}
