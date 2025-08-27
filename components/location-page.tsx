"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface LocationPageProps {
  config: {
    mantra: string
    locationPageTitle: string
    location: {
      googleMapsUrl: string
    }
    directionsButton: string
  }
  onBack: () => void
}

export default function LocationPage({ config, onBack }: LocationPageProps) {
  const handleDirections = () => {
    window.open(config.location.googleMapsUrl, "_blank")
  }

  return (
    <div className="min-h-screen invitation-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1 right-0 w-32 h-32 opacity-30">
        <Image src="/assets/mantra-4.png" alt="Decorative leaves" width={128} height={128} className="object-contain" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header message */}
          <p className="text-sm md:text-base text-cream/90 max-w-2xl mx-auto">
            Atas kehadiran dan doanya kami ucapkan terima kasih.
          </p>

          {/* Mantra */}
          <h1 className="text-3xl md:text-4xl font-serif text-gold font-light tracking-wide italic">{config.mantra}</h1>

          {/* Location title */}
          <h2 className="text-2xl md:text-3xl font-serif text-gold mt-16">{config.locationPageTitle}</h2>

          {/* Map placeholder - In a real app, you'd integrate Google Maps */}
          <div className="w-full max-w-4xl mx-auto h-64 md:h-96 bg-white/10 rounded-lg border border-cream/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="text-cream">
                <p className="font-semibold">Jalan Darmawangsa No.4</p>
                <p className="text-sm text-cream/80">Delod Peken Tabanan</p>
              </div>
            </div>
          </div>

          {/* Directions button */}
          <Button
            onClick={handleDirections}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            {config.directionsButton}
          </Button>

          {/* Back button */}
          <Button
            onClick={onBack}
            variant="outline"
            className="mt-4 border-cream/50 text-cream hover:bg-cream/10 px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  )
}
