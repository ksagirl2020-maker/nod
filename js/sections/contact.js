import { getSheet, getTable } from "../api/api.js";

function getContactValue(contacts, names) {

    const normalizedNames = names.map(name => name.toLowerCase());

    for (const contact of contacts) {
        for (const name of names) {
            const directValue = String(contact[name] ?? "").trim();

            if (directValue) return directValue;
        }
    }

    const contact = contacts.find(item => {
        const type = String(
            item["نوع التواصل"] ??
            item["وسيلة التواصل"] ??
            item["النوع"] ??
            item["العنوان"] ??
            ""
        ).trim().toLowerCase();

        return normalizedNames.some(name => type.includes(name));
    });

    if (!contact) return "";

    return String(
        contact["القيمة"] ??
        contact["بيانات التواصل"] ??
        contact["التفاصيل"] ??
        ""
    ).trim();

}

function normalizeDigits(value) {
    return String(value ?? "")
        .replace(/[٠-٩]/g, digit => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
        .replace(/\D/g, "");
}

function getSaudiNumber(value) {
    let number = normalizeDigits(value);

    if (number.startsWith("00")) {
        number = number.slice(2);
    }

    if (number.startsWith("966")) return number;
    if (number.startsWith("0")) return `966${number.slice(1)}`;
    if (number.length === 9 && number.startsWith("5")) return `966${number}`;

    return number;
}

function getPhoneDisplay(value) {
    const number = normalizeDigits(value);

    if (number.length === 9 && number.startsWith("5")) {
        return `0${number}`;
    }

    return String(value ?? "").trim();
}

export async function Contact() {

    const [settings, contacts] = await Promise.all([
        getSheet("07_التواصل"),
        getTable("07_التواصل")
    ]);

    if (!settings) return "";

    const phone = getContactValue(
        contacts,
        ["phone", "الهاتف", "رقم الهاتف", "الجوال"]
    );
    const whatsapp = getContactValue(
        contacts,
        ["whatsapp", "واتساب", "رقم الواتساب"]
    );
    const email = getContactValue(
        contacts,
        ["email", "البريد الإلكتروني", "البريد"]
    );
    const phoneDisplay = getPhoneDisplay(phone);
    const whatsappDisplay = getPhoneDisplay(whatsapp);
    const phoneLink = getSaudiNumber(phone);
    const whatsappNumber = getSaudiNumber(whatsapp);

    const contactCards = [
        {
            type: "phone",
            label: "الهاتف",
            value: phoneDisplay,
            href: `tel:+${phoneLink}`,
            icon: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/>
                </svg>
            `
        },
        {
            type: "whatsapp",
            label: "واتساب",
            value: whatsappDisplay,
            href: `https://wa.me/${whatsappNumber}`,
            icon: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.5 9.5 0 0 1-4.2-1L3 21l1.5-4.5A8.5 8.5 0 1 1 21 11.5z"/>
                    <path d="M8.5 8.5c.5 3 2 4.5 5 5"/>
                </svg>
            `
        },
        {
            type: "email",
            label: "البريد الإلكتروني",
            value: email,
            href: `mailto:${email}`,
            icon: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                    <path d="m3 7 9 6 9-6"/>
                </svg>
            `
        }
    ];

    return `
<section
    class="contact-section"
    id="contact"
    ${settings["لون الخلفية"] ? `style="background:${settings["لون الخلفية"]}"` : ""}
>

    <div class="container">

        <div class="contact-heading">

            <span class="section-tag">
                ${settings["عنوان القسم"] ?? ""}
            </span>

            <h2>شكراً لزيارتك</h2>

            <p>
                ${settings["نص الشكر"] ?? ""}
            </p>

        </div>

        <div class="contact-grid">

            ${contactCards.map(card => `
                <a
                    class="contact-card contact-card-${card.type}"
                    href="${card.href}"
                    ${card.type === "whatsapp" ? `target="_blank" rel="noopener"` : ""}
                >

                    <span class="contact-icon">
                        ${card.icon}
                    </span>

                    <span class="contact-card-content">
                        <strong>${card.label}</strong>
                        <span dir="ltr">${card.value}</span>
                    </span>

                    <span class="contact-arrow" aria-hidden="true">←</span>

                </a>
            `).join("")}

        </div>

    </div>

</section>
`;

}
