/* ==========================================================
   Icons Manager
========================================================== */

const icons = {

  "megaphone": `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path d="M3 11v2"/>
      <path d="M11 5 6 9H3v6h3l5 4z"/>
      <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
      <path d="M18 6a8 8 0 0 1 0 12"/>
    </svg>
  `,

  "pen-square": `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path d="M3 21h18"/>
      <path d="M7 17 17.5 6.5a2.1 2.1 0 1 1 3 3L10 20H7z"/>
    </svg>
  `,

  "calendar": `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path d="M16 3v4"/>
      <path d="M8 3v4"/>
      <path d="M3 10h18"/>
    </svg>
  `,

  "camera": `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-2h6l2 2h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  `,

  "palette": `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <circle cx="13.5" cy="6.5" r=".5"/>
      <circle cx="17.5" cy="10.5" r=".5"/>
      <circle cx="8.5" cy="7.5" r=".5"/>
      <circle cx="6.5" cy="12.5" r=".5"/>
      <path d="M12 22a10 10 0 1 1 10-10c0 2-1.5 3-3 3h-2a2 2 0 0 0-2 2c0 .8.7 1.5 1.5 1.5S18 19.2 18 20c0 1.1-2.7 2-6 2z"/>
    </svg>
  `,

  "lightbulb": `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
      <path d="M12 2a7 7 0 0 0-4 12c1 1 1.5 2 1.5 4h5c0-2 0.5-3 1.5-4A7 7 0 0 0 12 2z"/>
    </svg>
  `,

  "handshake": `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path d="M11 12 8 9a3 3 0 0 0-4 4l3 3"/>
      <path d="M13 12l3-3a3 3 0 0 1 4 4l-3 3"/>
      <path d="M8 15l2 2a2 2 0 0 0 3 0l3-3"/>
    </svg>
  `,

  "briefcase": `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <path d="M2 13h20"/>
    </svg>
  `

};

export function getIcon(name){

    return icons[name] || "";

}