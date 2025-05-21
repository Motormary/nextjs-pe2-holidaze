"use client"

import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/venue/map"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "300px", width: "100%" }}
      className="flex items-center justify-center bg-gray-100"
    >
      Loading map...
    </div>
  ),
})

export default Map
