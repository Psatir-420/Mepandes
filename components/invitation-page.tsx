"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface InvitationConfig {
  title: string
  subtitle: string
  greeting: string
  description: string
  date: {
    day: string
    date: string
    month: string
    year: string
    time: string
  }
  location: {
    title: string
    address: string
    subAddress: string
  }
  closingMessage: string
}

interface InvitationPageProps {
  config: InvitationConfig
  onNext: () => void
}

export default function InvitationPage({ config, onNext }: InvitationPageProps) {
  return (
    <div className="min-h-screen invitation-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30">
        <Image src="/assets/mantra-1.png" alt="Decorative leaves" width={256} height={256} className="object-contain" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-serif text-cream font-light tracking-wide">{config.title}</h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gold font-serif italic">{config.subtitle}</p>

          {/* Greeting */}
          <h2 className="text-3xl md:text-4xl font-serif text-gold font-light tracking-wider mt-12">
            {config.greeting}
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-cream/90 leading-relaxed max-w-xl mx-auto">{config.description}</p>

          {/* Date */}
          <div className="space-y-2">
            <p className="text-cream/80 text-sm">{config.date.day}</p>
            <p className="text-2xl md:text-3xl text-gold font-serif">
              {config.date.date} / {config.date.month} / {config.date.year}
            </p>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <p className="text-cream/80 text-sm">Pukul</p>
            <p className="text-xl md:text-2xl text-cream">{config.date.time}</p>
            <div className="w-16 h-px bg-cream/50 mx-auto"></div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <p className="text-cream/80 text-sm">{config.location.title}</p>
            <p className="text-xl md:text-2xl text-gold font-serif">{config.location.address}</p>
            <p className="text-cream/90">{config.location.subAddress}</p>
          </div>

          {/* Closing message */}
          <p className="text-sm md:text-base text-cream/90 leading-relaxed max-w-lg mx-auto mt-8">
            {config.closingMessage}
          </p>

          {/* Next button */}
          <Button
            onClick={onNext}
            className="mt-12 bg-gold/20 hover:bg-gold/30 text-cream border border-gold/50 px-8 py-3 rounded-full transition-all duration-300"
          >
            Lihat Detail Acara
          </Button>
        </div>
      </div>
    </div>
  )
}
