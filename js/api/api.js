/* ==========================================================
   Portfolio API
========================================================== */

const API_URL =
  "https://script.google.com/macros/s/AKfycbwKMQj5pGFMiTBrf4B6XIcu990z52oew8QfRRcvKnWGkINhlbBheK5CUz2g_qBcPzb74w/exec";

/* ==========================================================
   قراءة إعدادات الصفحة (Key / Value)
========================================================== */

export async function getSheet(sheetName) {
  try {
    const response = await fetch(
      `${API_URL}?sheet=${encodeURIComponent(sheetName)}`
    );

    const json = await response.json();

    if (!json.success) {
      throw new Error(json.message);
    }

    return json.data;
  } catch (error) {
    console.error("getSheet()", error);
    return null;
  }
}

/* ==========================================================
   قراءة جدول داخل الشيت
========================================================== */

export async function getTable(sheetName) {
  try {
    const response = await fetch(
      `${API_URL}?sheet=${encodeURIComponent(sheetName)}&type=table`
    );

    const json = await response.json();

    if (!json.success) {
      throw new Error(json.message);
    }

    return json.data || [];
  } catch (error) {
    console.error("getTable()", error);
    return [];
  }
}

/* ==========================================================
   Google Drive Image
========================================================== */

export function getImage(url) {
  if (!url) return "";

  const match = url.match(/[-\w]{25,}/);

  if (!match) return url;

  return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1200`;
}

/* ==========================================================
   Google Drive File
========================================================== */

export function getFile(url) {
  if (!url) return "#";

  const match = url.match(/[-\w]{25,}/);

  if (!match) return url;

  return `https://drive.google.com/file/d/${match[0]}/view`;
}