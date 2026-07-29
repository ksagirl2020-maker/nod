import { Hero } from "../sections/hero.js";
import { About } from "../sections/about.js";
import { Education } from "../sections/education.js";
import { Experience } from "../sections/experience.js";
import { OtherExperience } from "../sections/otherExperience.js";
import { Training } from "../sections/training.js";
import {
    Certificates,
    initCertificates
} from "../sections/gallery.js";
import {
    Volunteering,
    initVolunteering
} from "../sections/volunteering.js";
import { Contact } from "../sections/contact.js";
import { Navbar, initNavbar } from "../components/navbar.js";

async function init() {

    const app = document.querySelector("#app");
    const header = document.querySelector("#header");

    header.innerHTML = Navbar();

    const sections = await Promise.all([
        Hero(),
        About(),
        Education(),
        Experience(),
        OtherExperience(),
        Training(),
        Certificates(),
        Volunteering(),
        Contact()
    ]);

    app.innerHTML = sections.join("");

    initNavbar();
    initCertificates();
    initVolunteering();

}

init();
