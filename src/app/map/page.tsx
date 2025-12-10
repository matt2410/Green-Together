// src/app/map/page.tsx
"use client"

import { AQLocation, Parameter, Sensor } from "@/models/AQLocation";
import { GoogleMap, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";

import { fetchOpenAQLive, getAvailableParameters, getDailyMeasurements, getSensorsVN } from "@/lib/openap";

const DEFAULT_CENTER = { lat: 21.0278, lng: 105.8342 }
const DEFAULT_ZOOM = 12

export default function EnvActionMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,   // thay import.meta → env Nextjs
    libraries: ["visualization"]
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [bounds, setBounds] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [parameter, setParameter] = useState<Parameter>()
  const [availableParams, setAvailableParams] = useState<Parameter[]>([])
  const [lastActiveLocations, setLastActiveLocations] = useState<AQLocation[]>([])
  const [mapData, setMapData] = useState<any[]>([])
  const [openAQPoints, setOpenAQPoints] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)

  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])

  /** load params + sensor */
  useEffect(() => { loadBase() }, [])
  async function loadBase() {
    const params = await getAvailableParameters()
    setAvailableParams(params)
    setParameter(params[0])

    const sensors = await getSensorsVN()
    setLastActiveLocations(sensors)
  }

  /** fetch data theo parameter */
  useEffect(() => { loadFilter() }, [lastActiveLocations, parameter])
  async function loadFilter() {
    if (!parameter || !lastActiveLocations.length) return;
    let active: Sensor[] = []

    lastActiveLocations.map(loc => {
      active = active.concat(
        loc.sensors.filter(s => s.parameter.id === parameter.id).map(s => ({
          ...s,
          coordinates: loc.coordinates
        }))
      )
    })

    const daily = await Promise.all(active.map(async s => {
      try {
        const m = await getDailyMeasurements(s.id)
        return m.length ? { location: { lat: s.coordinates.latitude, lng: s.coordinates.longitude }, value: m[0].value } : null
      } catch { return null }
    }))

    setMapData(daily.filter(Boolean))
  }

  /** render markers */
  useEffect(() => {
    markerRef.current.forEach(m => (m.map = null))
    markerRef.current = []

    if (!map || !mapData.length) return

      ; (async () => {
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary
        mapData.forEach(p => {
          const el = document.createElement("div")
          el.className = "w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white"
          el.style.background = p.value < 50 ? "#4CAF50" : p.value < 100 ? "#FFC107" : "#F44336"
          el.innerText = Math.round(p.value)

          const marker = new AdvancedMarkerElement({ map, position: p.location, content: el })
          markerRef.current.push(marker)
        })
      })()
  }, [map, mapData])

  async function searchArea() {
    if (!bounds) return;
    setLoading(true)
    const result = await fetchOpenAQLive(bounds, parameter?.name || "")
    setOpenAQPoints(result)
    setLoading(false)
  }

  const heatmap = useMemo(() => openAQPoints.map(p => {
    const v = p.values?.find(x => x.parameter === parameter?.name)
    if (!v) return null
    return { location: new google.maps.LatLng(p.lat, p.lng), weight: Math.min(v.value / 15, 6) }
  }).filter(Boolean), [openAQPoints, parameter])

  if (!isLoaded) return <>Loading Map...</>

  return (
    <div className="p-4">
      <div className="flex gap-3 mb-3 items-center">
        <h2 className="text-xl font-semibold flex-1">🌍 ENV AIR QUALITY MAP</h2>

        <select className="border px-2 py-1 rounded" value={parameter?.name}
          onChange={e => setParameter(availableParams.find(p => p.name === e.target.value)!)}>
          {availableParams.map(p =>
            <option key={p.id} value={p.name}>{p.name.toUpperCase()} ({p.units})</option>
          )}
        </select>

        <button onClick={searchArea} disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded">
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      <GoogleMap
        onLoad={setMap}
        onIdle={() => map && setBounds(map.getBounds()?.toJSON())}
        zoom={DEFAULT_ZOOM}
        center={DEFAULT_CENTER}
        mapContainerStyle={{ width: "100%", height: "70vh" }}
      >
        {heatmap.length > 0 && <HeatmapLayer data={heatmap} />}
      </GoogleMap>
    </div>
  )
}
