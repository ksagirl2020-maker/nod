export function Navbar() {

    return `

<nav class="navbar">

<div class="container nav-container">

<a class="logo" href="#home">
NOD
</a>

<ul class="nav-links">

<li><a href="#home">الرئيسية</a></li>

<li><a href="#about">نبذة</a></li>

<li><a href="#qualifications">المؤهلات</a></li>

<li><a href="#experience">الخبرات</a></li>

<li><a href="#other-experience">الخبرات القيادية والتكليفات</a></li>

<li><a href="#training">التدريب</a></li>

<li><a href="#certificates">شهادات الشكر</a></li>

<li><a href="#volunteering">التطوع</a></li>

<li><a href="#contact">تواصل</a></li>

</ul>

</div>

</nav>

`;

}

export function initNavbar() {

    const links = [...document.querySelectorAll(".nav-links a")];
    const sections = links
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const setActiveLink = id => {
        links.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
            );
        });
    };

    links.forEach(link => {
        link.addEventListener("click", event => {
            const section = document.querySelector(link.getAttribute("href"));

            if (!section) return;

            event.preventDefault();
            section.scrollIntoView({ behavior: "smooth" });
        });
    });

    if (!sections.length) return;

    setActiveLink(sections[0].id);

    const observer = new IntersectionObserver(entries => {
        const visibleSection = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
            setActiveLink(visibleSection.target.id);
        }
    }, {
        rootMargin: "-80px 0px -45% 0px",
        threshold: [0, .25, .5]
    });

    sections.forEach(section => observer.observe(section));

}
