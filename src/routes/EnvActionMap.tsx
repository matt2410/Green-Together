import { GoogleMap, HeatmapLayer, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AQLocation, Parameter, Sensor } from "../models/AQLocation";

const DEFAULT_CENTER = { lat: 21.0278, lng: 105.8342 };
const DEFAULT_ZOOM = 12;

import { getSensorsVN, getAvailableParameters, fetchOpenAQLive, getDailyMeasurements } from "../api/api";

export default function EnvActionMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    libraries: ["visualization"]
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Move map → Search area");

  const [openAQPoints, setOpenAQPoints] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const [parameter, setParameter] = useState("pm25");          // selected filter
  const [availableParams, setAvailableParams] = useState<Parameter[]>([]); // list dynamic

  const [lastActiveSensors, setLastActiveSensors] = useState<AQLocation[]>([]);

  // ====================  GET AVAILABLE PARAMETERS (Vietnam) ====================
  // LOAD PARAMETERS + SENSOR LIST
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const params = await getAvailableParameters();
    setAvailableParams(params);
    if (!params.find(p => p.name === parameter)) setParameter(params[0].name);

    const sensors = await getSensorsVN();
    setLastActiveSensors(sensors);
    const measurement = await getDailyMeasurements(11357396)
    console.log('measurement', measurement);
    
  }

  // SEARCH BUTTON
  async function searchArea() {
    if (!bounds) return;
    setLoading(true);
    const aq = await fetchOpenAQLive(bounds, parameter);
    setOpenAQPoints(aq);
    setMessage(`📡 Loaded OpenAQ ${aq.length}`);
    setLoading(false);
  }


  // MAP EVENTS ----------------------------------------------------------
  const onLoad = useCallback((mapObj: google.maps.Map) => setMap(mapObj), []);
  const onIdle = () => {
    if (!map) return;
    const b = map.getBounds();
    setBounds({
      south: b?.getSouthWest().lat(),
      west: b?.getSouthWest().lng(),
      north: b?.getNorthEast().lat(),
      east: b?.getNorthEast().lng(),
    });
  };

  // ==================== HEATMAP DATA =======================
  const heatmapData = useMemo(() => {
    return openAQPoints
      .map(p => {
        const v = p.values?.find((x: any) => x.parameter === parameter);
        if (!v) return null;
        return {
          location: new google.maps.LatLng(p.lat, p.lng),
          weight: Math.min(v.value / 15, 6)
        };
      })
      .filter(Boolean) as any;
  }, [openAQPoints, parameter]);

  const heatmapOptions = {
    radius: 45,
    opacity: 0.9,
    gradient: [
      "rgba(0, 0, 255, 0)",
      "rgba(0, 150, 255, 1)",
      "rgba(0, 255, 200, 1)",
      "rgba(255, 255, 0, 1)",
      "rgba(255, 150, 0, 1)",
      "rgba(255, 60, 0, 1)",
      "rgba(255, 0, 0, 1)"
    ]
  };

  if (!isLoaded) return <>Loading map…</>;

  return (
    <div className="p-4">
      <div className="flex gap-3 items-center mb-3">
        <h2 className="text-xl font-semibold flex-1">🌍 ENV REALTIME AIR QUALITY MAP</h2>

        {/* === UPDATED DROPDOWN: dynamic filter === */}
        <select className="border px-2 py-1 rounded" value={parameter}
          onChange={(e) => setParameter(e.target.value)}>
          {availableParams.map(p => (
            <option key={p.id} value={p.name}>{p.name.toUpperCase()} ({p.units})</option>
          ))}
        </select>

        <button onClick={searchArea} disabled={loading}
          className="bg-blue-600 text-white px-3 py-1 rounded">
          {loading ? "Loading..." : "Search area"}
        </button>
      </div>

      {/* GOOGLE MAP */}
      <div className="h-[70vh] border rounded relative overflow-hidden">
        <GoogleMap
          onLoad={onLoad}
          onIdle={onIdle}
          zoom={DEFAULT_ZOOM}
          center={DEFAULT_CENTER}
          mapContainerStyle={{ width: "100%", height: "100%" }}>

          {heatmapData.length > 0 && <HeatmapLayer data={heatmapData} options={heatmapOptions} />}

          {selected && (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
              <div className="text-[13px]">
                <b>{selected.name}</b>
                <div className="mt-1">
                  {selected.values?.map((v: any) => (
                    <div key={v.parameter}>{v.parameter.toUpperCase()}: {v.value} {v.unit}</div>
                  ))}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        {/* LEGEND */}
        <div className="absolute right-3 bottom-3 bg-white shadow-md p-2 rounded text-[12px]">
          <b>AQI {parameter.toUpperCase()}</b>
          <div className="flex w-40 h-3 rounded mt-1"
            style={{ background: "linear-gradient(to right, blue, cyan, lightgreen, yellow, orange, orangered, red)" }}>
          </div>
          <div className="flex justify-between text-[11px] mt-1 opacity-70">
            <span>Good</span><span>Moderate</span><span>Bad</span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-sm">{message}</div>
    </div>
  );
}
