"use client"

import { useEffect, useState } from "react"
import { Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"

const farmerIcon = new L.Icon({
  iconUrl: "/icons/farmer-marker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -30],
})

export default function LocationTracker() {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const map = useMap()

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude]
        setPosition(coords)
        map.flyTo(coords, 14)
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [map])

  if (!position) return null

  return (
    <Marker position={position} icon={farmerIcon}>
      <Popup>You are here 🌾</Popup>
    </Marker>
  )
}
