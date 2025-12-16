// src/app/map/page.tsx
"use client"

import { AQLocation, Parameter, Sensor } from "@/models/AQLocation"
import { GoogleMap, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useMemo, useRef, useState } from "react"

import {
  fetchOpenAQLive,
  getAvailableParameters,
  getDailyMeasurements,
  getSensorsVN,
} from "@/lib/openap"

const DEFAULT_CENTER = { lat: 21.0278, lng: 105.8342 }
const DEFAULT_ZOOM = 12

export default function EnvActionMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!,
    libraries: ["visualization"],
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [bounds, setBounds] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [parameter, setParameter] = useState<Parameter>()
  const [availableParams, setAvailableParams] = useState<Parameter[]>([])
  const [lastActiveLocations, setLastActiveLocations] = useState<AQLocation[]>([])
  const [mapData, setMapData] = useState<any[]>([])
  const [openAQPoints, setOpenAQPoints] = useState<any[]>([])

  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])

  /* load params + sensors */
  useEffect(() => {
    loadBase()
  }, [])

  async function loadBase() {
    const params = await getAvailableParameters()
    setAvailableParams(params)
    setParameter(params[0])

    const sensors = await getSensorsVN()
    setLastActiveLocations(sensors)
  }

  /* filter theo parameter */
  useEffect(() => {
    loadFilter()
  }, [lastActiveLocations, parameter])

  async function loadFilter() {
    if (!parameter || !lastActiveLocations.length) return

    let active: Sensor[] = []

    lastActiveLocations.forEach(loc => {
      active = active.concat(
        loc.sensors
          .filter(s => s.parameter.id === parameter.id)
          .map(s => ({
            ...s,
            coordinates: loc.coordinates,
          }))
      )
    })

    const daily = await Promise.all(
      active.map(async s => {
        try {
          const m = await getDailyMeasurements(s.id)
          return m.length
            ? {
                location: {
                  lat: s.coordinates.latitude,
                  lng: s.coordinates.longitude,
                },
                value: m[0].value,
              }
            : null
        } catch {
          return null
        }
      })
    )

    setMapData(daily.filter(Boolean))
  }

  /* render markers */
  useEffect(() => {
    markerRef.current.forEach(m => (m.map = null))
    markerRef.current = []

    if (!map || !mapData.length) return

    ;(async () => {
      const { AdvancedMarkerElement } =
        (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary

      mapData.forEach(p => {
        const el = document.createElement("div")
        el.className =
          "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg border border-white"
        el.style.background =
          p.value < 50 ? "#22c55e" : p.value < 100 ? "#facc15" : "#ef4444"
        el.innerText = `${Math.round(p.value)}`

        const marker = new AdvancedMarkerElement({
          map,
          position: p.location,
          content: el,
        })

        markerRef.current.push(marker)
      })
    })()
  }, [map, mapData])

  async function searchArea() {
    if (!bounds) return
    setLoading(true)
    const result = await fetchOpenAQLive(bounds, parameter?.name || "")
    setOpenAQPoints(result)
    setLoading(false)
  }

  const heatmap = useMemo<google.maps.visualization.WeightedLocation[]>(() => {
    return openAQPoints
      .map(p => {
        const v = p.values?.find((x: any) => x.parameter === parameter?.name)
        if (!v) return null

        return {
          location: new google.maps.LatLng(p.lat, p.lng),
          weight: Math.min(v.value / 15, 6),
        }
      })
      .filter(Boolean) as google.maps.visualization.WeightedLocation[]
  }, [openAQPoints, parameter])

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Đang tải bản đồ...
      </div>
    )

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="card p-5 flex flex-wrap gap-4 items-center bg-white/90 backdrop-blur">
        <div className="flex-1">
          <h2 className="text-xl font-bold">🌍 Bản đồ ô nhiễm không khí</h2>
          <p className="text-sm text-gray-600">
            Theo dõi chất lượng không khí theo thời gian thực tại Việt Nam
          </p>
        </div>

        <select
          className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
          value={parameter?.name}
          onChange={e =>
            setParameter(
              availableParams.find(p => p.name === e.target.value)!
            )
          }
        >
          {availableParams.map(p => (
            <option key={p.id} value={p.name}>
              {p.name.toUpperCase()} ({p.units})
            </option>
          ))}
        </select>

        <button
          onClick={searchArea}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Đang tải..." : "Quét khu vực"}
        </button>
      </div>

      {/* MAP */}
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <GoogleMap
          onLoad={setMap}
          onIdle={() => map && setBounds(map.getBounds()?.toJSON())}
          zoom={DEFAULT_ZOOM}
          center={DEFAULT_CENTER}
          mapContainerStyle={{ width: "100%", height: "70vh" }}
          options={{
            mapId: process.env.NEXT_PUBLIC_MAP_ID,
            fullscreenControl: false,
            streetViewControl: false,
          }}
        >
          {heatmap.length > 0 && <HeatmapLayer data={heatmap} />}
        </GoogleMap>

        {/* LEGEND */}
        <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow p-3 text-xs space-y-1">
          <div className="font-semibold mb-1">Chỉ số AQI</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span>Tốt (&lt; 50)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span>Trung bình (50–100)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span>Kém (&gt; 100)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
