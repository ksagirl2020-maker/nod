export function renderSections(...sections) {

    const app = document.querySelector("#app");

    app.innerHTML = sections.join("");

}