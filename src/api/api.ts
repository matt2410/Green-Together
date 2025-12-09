// ======================== UTIL: FORMAT CURRENT DATE =========================
export function getCurrentDate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`; // "2025-12-09"
}

const API = import.meta.env.VITE_API_KEY_AQ;

// ============================ 🔥 GET PARAMETERS (VIETNAM) ============================
export async function getAvailableParameters(countryId = 56) {
  const res = await fetch(`/api/v3/countries/${countryId}`, {
    headers: { "X-API-Key": API }
  });
  const data = await res.json();
  return data?.results?.[0]?.parameters ?? [];
}

// ============================ 🔥 GET SENSORS IN VIETNAM ============================
export async function getSensorsVN() {
  const res = await fetch(`/api/v3/locations?iso=VN&limit=1000`, {
    headers: { "X-API-Key": API }
  });
  const data = await res.json();

  // lọc sensor hoạt động trong vòng 24h
  return data?.results?.filter((item: any) => {
    if (!item.datetimeLast?.local) return false;
    const last = new Date(item.datetimeLast.local);
    return ((Date.now() - last.getTime()) / (1000 * 60 * 60)) <= 24;
  }) ?? [];
}

// ============================ 🔥 MEASUREMENTS DAILY ============================
export async function getDailyMeasurements(sensorId: number, date = getCurrentDate()) {
  const url = `/api/v3/sensors/${sensorId}/measurements/daily?datetime_from=${date}&limit=10&page=1`;

  const res = await fetch(url, {
    headers: { "X-API-Key": API }
  });

  const data = await res.json();
  return data?.results ?? [];
}


// ============================ 🔥 LIVE MEASUREMENTS BY AREA ============================
export async function fetchOpenAQLive(bounds: any, parameter: string) {
  if (!bounds) return [];

  const lat = (bounds.north + bounds.south) / 2;
  const lon = (bounds.east + bounds.west) / 2;
  const radius = Math.min(Math.max(2000, ((bounds.north - bounds.south) * 111000) / 2), 25000);

  const url = `/api/v3/locations?coordinates=${lat},${lon}&radius=${Math.round(radius)}&limit=100&parameters=${parameter}`;

  const res = await fetch(url, {
    headers: { "X-API-Key": API }
  });

  const data = await res.json();
  return data.results.map((r: any) => ({
    id: r.id,
    name: r.name ?? r.location,
    lat: r.coordinates.latitude,
    lng: r.coordinates.longitude,
    values: r.sensors?.map((s: any) => ({
      parameter: s.parameter.name,
      value: s.value,
      unit: s.parameter.units
    })) ?? []
  }));
}
