// lib/openaq.ts
import { getCurrentDate } from "@/lib/utils";
import { getBaseUrl } from "@/lib/utils";

async function safeFetch(path: string) {
    const url = path.startsWith("http")
        ? path
        : `${getBaseUrl()}${path}`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        console.error("OpenAQ API Error:", res.status, res.statusText, url);
        return null;
    }

    return res.json();
}

/* ----------------------- GET AVAILABLE PARAMETERS ------------------------ */
export async function getAvailableParameters(countryId = 56) {
    const data = await safeFetch(
        `/api/openaq/countries/${countryId}`
    );

    return data?.results?.[0]?.parameters ?? [];
}

/* ----------------------------- GET SENSORS VN ----------------------------- */

function isSensorActive(item: any): boolean {
    if (!item?.datetimeLast?.local) return false;
    const last = new Date(item.datetimeLast.local);
    const diffHours = (Date.now() - last.getTime()) / 3600000;
    return diffHours <= 24;
}

export async function getSensorsVN() {
    const data = await safeFetch(
        `/api/openaq/locations?iso=VN&limit=1000`
    );

    return data?.results?.filter(isSensorActive) ?? [];
}

/* ----------------------- GET DAILY MEASUREMENTS -------------------------- */
export async function getDailyMeasurements(
    sensorId: number,
    date = getCurrentDate()
) {
    const url = `/api/openaq/sensors/${sensorId}/measurements/daily?datetime_from=${date}&limit=10&page=1`;
    const data = await safeFetch(url);

    return data?.results ?? [];
}

/* ----------------------- LIVE MEASUREMENTS BY AREA ------------------------ */
export async function fetchOpenAQLive(bounds: any, parameter: string) {
    if (!bounds) return [];

    const lat = (bounds.north + bounds.south) / 2;
    const lon = (bounds.east + bounds.west) / 2;

    const radius = Math.min(
        Math.max(2000, ((bounds.north - bounds.south) * 111000) / 2),
        25000
    );

    const url = `/api/openaq/locations?coordinates=${lat},${lon}&radius=${Math.round(
        radius
    )}&limit=100&parameters=${parameter}`;

    const data = await safeFetch(url);

    if (!data?.results) return [];

    return data.results.map((r: any) => ({
        id: r.id,
        name: r.name ?? r.location,
        lat: r.coordinates.latitude,
        lng: r.coordinates.longitude,
        values:
            r.sensors?.map((s: any) => ({
                parameter: s.parameter.name,
                value: s.value,
                unit: s.parameter.units
            })) ?? []
    }));
}
