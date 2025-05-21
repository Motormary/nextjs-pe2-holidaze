"use client"

import type { LatLngExpression } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect } from "react"
import { Icon } from "leaflet"

// Fix for default marker icons
import { useMap } from "react-leaflet"

// This component forces a map invalidation after mounting
function MapInvalidator() {
  const map = useMap()

  useEffect(() => {
    // This forces the map to recalculate its size and redraw tiles
    setTimeout(() => {
      map.invalidateSize()
    }, 100)
  }, [map])

  return null
}

type Props = {
  location: number[]
  address: string
}

export default function Map({ location, address }: Props) {
  console.log("🚀 ~ Map ~ location:", location)
  return (
    <MapContainer
      className="h-[300px] w-full"
      center={location as LatLngExpression}
      zoom={13}
    >
      <MapInvalidator />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={location as LatLngExpression}
        icon={
          new Icon({
            iconUrl: "/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  )
}
