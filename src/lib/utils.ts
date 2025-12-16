// ======================== UTIL: FORMAT CURRENT DATE =========================
export function getCurrentDate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export function optimizeUnsplash(url: string, width = 800) {
  if (!url.includes("images.unsplash.com")) return url

  return `${url}?auto=format&fit=crop&w=${width}&q=70`
}
