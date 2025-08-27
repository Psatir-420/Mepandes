"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Home() {
  const [config, setConfig] = useState(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => setConfig(data.invitation))
      .catch((error) => console.error("Error loading config:", error))
  }, [])

  useEffect(() => {
    if (!config) return

    const eventDate = new Date(`${config.date.year}-10-${config.date.date}T18:00:00`)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [config])

  const handleOverlayClick = () => {
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gamelan-Gambelan-MEPANDES-POTONG-4xn6cEX1N0fFAXMpRATxbXmkPygq9C.mp3")
    audio.play().catch((error) => console.log("Audio play failed:", error))
    setShowOverlay(false)
  }

  if (!config) {
    return (
      <div className="min-h-screen invitation-bg flex items-center justify-center">
        <div className="text-cream text-xl font-serif">Loading...</div>
      </div>
    )
  }

  return (
    <div className="invitation-bg relative overflow-hidden min-h-screen">
      {/* Top left corner - large botanical branch */}
      <Image
        src="/assets/mantra-2.png"
        alt=""
        width={400}
        height={400}
        className="absolute top-0 left-0 opacity-70 z-0"
      />

      {/* Top right corner - botanical elements */}
      <Image
        src="/assets/mantra-5.png"
        alt=""
        width={350}
        height={350}
        className="absolute top-1/3 right-0 opacity-70 z-0"
      />

      {/* Bottom right corner - large botanical branch */}
      <Image
        src="/assets/mantra-1.png"
        alt=""
        width={450}
        height={450}
        className="absolute bottom-2/3 right-0 opacity-70 z-0"
      />

      <Image
        src="/assets/mantra-1.png"
        alt=""
        width={450}
        height={450}
        className="absolute bottom-0 left-0 opacity-70 z-0 scale-x-[-1]"
      />

      {/* Floating leaves - scattered around */}
      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={60}
        height={60}
        className="absolute top-32 left-32 opacity-50 z-0 rotate-12"
      />

      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={80}
        height={80}
        className="absolute top-2/3 right-1/4 opacity-40 z-0 -rotate-45"
      />

      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={70}
        height={70}
        className="absolute bottom-1/3 left-1/3 opacity-45 z-0 rotate-90"
      />

      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={50}
        height={50}
        className="absolute top-2/3 left-16 opacity-35 z-0 -rotate-12"
      />

      {showOverlay && (
        <div
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center cursor-pointer transition-opacity duration-1000"
          onClick={handleOverlayClick}
        >
          <div className="text-center">
            <p className="text-cream text-sm mb-8 tracking-widest font-serif">{config.invitationHeader}</p>
            <p className="text-cream text-lg mb-4 font-serif italic">{config.eventType}</p>
            <h1 className="text-gold text-6xl md:text-7xl mb-2 font-serif italic">
              {config.ceremonyName.split(" ")[0]}
            </h1>
            <h1 className="text-gold text-6xl md:text-7xl mb-8 font-serif italic">
              {config.ceremonyName.split(" ")[1]}
            </h1>
            <p className="text-cream text-base mb-4 font-serif italic">{config.date.day}</p>
            <p className="text-cream text-sm mb-8 font-serif">Special Invitation to</p>
            <p className="text-cream text-sm mb-12 max-w-2xl mx-auto font-serif">
              Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami.
            </p>
            <button className="bg-transparent border border-cream text-cream px-8 py-2 text-sm tracking-widest hover:bg-cream hover:text-slate-800 transition-colors font-serif animate-pulse">
              OPEN INVITATION
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 mt-20">
        <section className="text-center mb-32">
          <p className="text-cream text-lg mb-20 mt-10 tracking-widest font-serif">{config.invitationHeader}</p>

          <p className="text-cream text-lg mb-4 font-serif italic">{config.eventType}</p>

          <h1 className="text-gold text-6xl md:text-7xl mb-2 font-serif italic">{config.ceremonyName.split(" ")[0]}</h1>
          <h1 className="text-gold text-6xl md:text-7xl mb-15 font-serif italic">{config.ceremonyName.split(" ")[1]}</h1>

          <p className="text-cream text-2xl mt-20 mb-4 font-serif italic">{config.date.day}</p>
          <p className="text-gold text-3xl mb-8 font-serif">30 / Agustus / 2025</p>
          <p className="text-cream text-sm mb-12 max-w-2xl mx-auto font-serif">
            Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami.
          </p>

          <p className="text-gold text-lg mt-12 mb-8 font-serif">
            {config.location.address}, {config.location.subAddress}
          </p>

          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-cream text-3xl font-serif">{timeLeft.days}</div>
              <div className="text-cream text-sm font-serif">Days</div>
            </div>
            <div>
              <div className="text-cream text-3xl font-serif">{timeLeft.hours}</div>
              <div className="text-cream text-sm font-serif">Hours</div>
            </div>
            <div>
              <div className="text-cream text-3xl font-serif">{timeLeft.minutes}</div>
              <div className="text-cream text-sm font-serif">Minutes</div>
            </div>
            <div>
              <div className="text-cream text-3xl font-serif">{timeLeft.seconds}</div>
              <div className="text-cream text-sm font-serif">Seconds</div>
            </div>
          </div>
        </section>

        <section className="text-center mb-32">
          <h2 className="text-cream text-4xl md:text-5xl mb-20 font-serif italic">{config.title}</h2>

          <p className="text-gold text-3xl mb-8 font-serif italic">{config.subtitle}</p>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-8 mb-8 max-w-2xl mx-auto">
            <h4 className="text-gold text-6xl italic mb-6 italic">{config.greeting}</h4>

            <p className="text-cream text-lg italic mb-6 font-serif">{config.description}</p>

            <div className="text-cream font-serif">
              <p className="text-base mb-2 italic">{config.date.day}</p>
              <p className="text-lg mb-4">
                {config.date.date} / {config.date.month} / {config.date.year}
              </p>

              <p className="text-base mb-2 italic">Pukul</p>
              <p className="text-lg mb-6">{config.date.time}</p>

              <p className="text-base mb-2 italic">{config.location.title}</p>
              <p className="text-gold text-lg mb-2">{config.location.address}</p>
              <p className="text-cream text-base mb-6">{config.location.subAddress}</p>
            </div>

            <p className="text-cream text-sm font-serif">{config.closingMessage}</p>

            <p className="text-cream text-sm mt-4 font-serif">Atas kehadiran dan doanya kami ucapkan terima kasih.</p>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-gold text-4xl mb-8 font-serif italic">{config.mantra}</h3>

          <p className="text-cream text-base mb-4 font-serif italic">Special Invitation</p>
          <p className="text-cream text-sm mb-12 max-w-2xl mx-auto font-serif">
            Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami.
          </p>

          <h4 className="text-gold text-2xl mb-8 font-serif italic">{config.locationPageTitle}</h4>

          <div className="bg-white rounded-lg overflow-hidden mb-8 max-w-2xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.2!2d115.1!3d-8.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzAnMDAuMCJTIDExNcKwMDYnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="text-gold text-lg mb-8 font-serif italic">Upacara Mepandes</p>

          <p className="text-cream text-sm mb-12 max-w-2xl mx-auto font-serif">
            Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami.
          </p>
        </section>

        <footer className="text-center mt-32 pt-16 border-t border-cream/20">
          <div className="w-8 h-8 bg-cream rounded-full mx-auto mb-4"></div>
          <p className="text-cream text-xs font-serif">© Copyright Acarakami.com</p>
          <p className="text-cream text-xs font-serif">Best Invitation Online</p>
        </footer>
      </div>
    </div>
  )
}
