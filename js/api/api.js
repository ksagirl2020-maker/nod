/* ==========================================================
   Portfolio API
========================================================== */

const API_URL =
  "https://script.google.com/macros/s/AKfycbwKMQj5pGFMiTBrf4B6XIcu990z52oew8QfRRcvKnWGkINhlbBheK5CUz2g_qBcPzb74w/exec";

const CACHE_PREFIX = "portfolio-api:v1:";
const CACHE_DURATION = 30 * 60 * 1000;
const pendingRequests = new Map();

function readCache(key) {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);

    if (!cached) return;

    const entry = JSON.parse(cached);

    if (entry.expiresAt <= Date.now()) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return;
    }

    return entry.data;
  } catch {
    return;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(
      `${CACHE_PREFIX}${key}`,
      JSON.stringify({
        data,
        expiresAt: Date.now() + CACHE_DURATION
      })
    );
  } catch {
    // يستمر الموقع بالعمل عند تعطيل التخزين المحلي أو امتلائه.
  }
}

async function requestData(sheetName, type) {
  const key = `${sheetName}:${type}`;
  const cached = readCache(key);

  if (cached !== undefined) return cached;
  if (pendingRequests.has(key)) return pendingRequests.get(key);

  const query = new URLSearchParams({ sheet: sheetName });

  if (type === "table") {
    query.set("type", "table");
  }

  const request = fetch(`${API_URL}?${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.json();
    })
    .then(json => {
      if (!json.success) {
        throw new Error(json.message);
      }

      writeCache(key, json.data);

      return json.data;
    })
    .finally(() => {
      pendingRequests.delete(key);
    });

  pendingRequests.set(key, request);

  return request;
}

/* ==========================================================
   قراءة إعدادات الصفحة (Key / Value)
========================================================== */

export async function getSheet(sheetName) {
  try {
    return await requestData(sheetName, "sheet");
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
    return await requestData(sheetName, "table") || [];
  } catch (error) {
    console.error("getTable()", error);
    return [];
  }
}

/* ==========================================================
   قراءة رأس القسم وجدوله من نفس الشيت
========================================================== */

export async function getSectionData(sheetName) {
  const [header, table] = await Promise.all([
    getSheet(sheetName),
    getTable(sheetName)
  ]);

  if (!header) return null;

  const headerKeys = new Set([
    "SectionTitle",
    "SectionSubtitle",
    "SectionDescription"
  ]);

  const items = table.filter(row => {
    const values = Object.values(row).map(value => String(value).trim());
    const isHeaderRow = values.some(value => headerKeys.has(value));
    const isEmptyRow = values.every(value => value === "");

    return !isHeaderRow && !isEmptyRow;
  });

  return {
    section: {
      title: header.SectionTitle,
      subtitle: header.SectionSubtitle,
      description: header.SectionDescription
    },
    items
  };
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
