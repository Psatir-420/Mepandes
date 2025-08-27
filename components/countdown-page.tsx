"use client"

import Image from "next/image"
import CountdownTimer from "./countdown-timer"
import { Button } from "@/components/ui/button"

interface CountdownPageProps {
  config: {
    invitationHeader: string
    eventType: string
    ceremonyName: string
    date: {
      day: string
      date: string
      month: string
      year: string
    }
    location: {
      address: string
      subAddress: string
    }
    countdownLabels: {
      days: string
      hours: string
      minutes: string
      seconds: string
    }
  }
  onNext: () => void
}

export default function CountdownPage({ config, onNext }: CountdownPageProps) {
  const targetDate = `${config.date.year}-10-01T18:00:00`

  return (
    <div className="min-h-screen invitation-bg relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
        <Image src="/assets/mantra-1.png" alt="Decorative leaves" width={256} height={256} className="object-contain" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <p className="text-sm md:text-base text-cream/80 tracking-widest uppercase">{config.invitationHeader}</p>

          {/* Event type */}
          <p className="text-lg md:text-xl text-cream/90 font-serif italic">{config.eventType}</p>

          {/* Ceremony name */}
          <h1 className="text-4xl md:text-6xl font-serif text-gold font-light tracking-wide">
            {config.ceremonyName.split(" ")[0]}
          </h1>
          <h2 className="text-4xl md:text-6xl font-serif text-gold font-light tracking-wide -mt-4">
            {config.ceremonyName.split(" ")[1]}
          </h2>

          {/* Date */}
          <div className="space-y-2 mt-12">
            <p className="text-cream/80 text-sm">{config.date.day}</p>
            <p className="text-2xl md:text-3xl text-gold font-serif">
              {config.date.date} / {config.date.month} / {config.date.year}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <p className="text-cream/80 text-sm">Bertempat di</p>
            <p className="text-lg md:text-xl text-cream">
              {config.location.address} {config.location.subAddress}
            </p>
          </div>

          {/* Countdown */}
          <CountdownTimer targetDate={targetDate} labels={config.countdownLabels} />

          {/* Next button */}
          <Button
            onClick={onNext}
            className="mt-12 bg-gold/20 hover:bg-gold/30 text-cream border border-gold/50 px-8 py-3 rounded-full transition-all duration-300"
          >
            Lihat Lokasi
          </Button>
        </div>
      </div>
    </div>
  )
}
