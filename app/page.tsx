"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
  const [config, setConfig] = useState(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [showOverlay, setShowOverlay] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration
      easing: 'ease-out-cubic', // Smooth easing
      once: true, // Animation happens only once when scrolling down
      offset: 100, // Trigger animations 100px before element comes into view
      delay: 0, // Global delay
    })
    
    // Refresh AOS when config changes
    if (config) {
      AOS.refresh()
    }
  }, [config])

  // Prevent scrolling when overlay is shown
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showOverlay])

  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => setConfig(data.invitation))
      .catch((error) => console.error("Error loading config:", error))
  }, [])

  useEffect(() => {
    if (!config) return

    // Map Indonesian month names to numbers
    const monthMap: { [key: string]: string } = {
      "Januari": "01",
      "Februari": "02",
      "Maret": "03",
      "April": "04",
      "Mei": "05",
      "Juni": "06",
      "Juli": "07",
      "Agustus": "08",
      "September": "09",
      "Oktober": "10",
      "November": "11",
      "Desember": "12",
    }

    const month = monthMap[config.date.month] || "01"
    const eventDate = new Date(`${config.date.year}-${month}-${config.date.date}T18:00:00`)

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
    if (!audioRef.current) {
      audioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gamelan-Gambelan-MEPANDES-POTONG-4xn6cEX1N0fFAXMpRATxbXmkPygq9C.mp3")
      audioRef.current.loop = true
    }
    audioRef.current.play().catch((error) => console.log("Audio play failed:", error))
    setIsPlaying(true)
    setShowOverlay(false)
  }

  const handleMusicToggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gamelan-Gambelan-MEPANDES-POTONG-4xn6cEX1N0fFAXMpRATxbXmkPygq9C.mp3")
      audioRef.current.loop = true
    }
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  if (!config) {
    return (
      <div className="min-h-screen invitation-bg flex items-center justify-center">
        <div className="text-cream text-lg sm:text-xl font-serif">Loading...</div>
      </div>
    )
  }

  return (
    <div className="invitation-bg relative overflow-hidden min-h-screen">
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: -2s;
        }
        .animate-rotate-slow {
          animation: rotate 20s linear infinite;
        }
        .shine-effect {
          position: relative;
          background: linear-gradient(90deg, #D4AF37, #FFD700, #FFF8DC, #FFD700, #D4AF37);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 10s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shine {
          0% { background-position: 300% 0; }
          100% { background-position: 0% 0; }
        }
      `}</style>

      {/* Music control button */}
      <button
        onClick={handleMusicToggle}
        className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 bg-slate-800/80 text-cream px-2 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg font-serif text-xs sm:text-base transition-all duration-300 hover:bg-slate-700/90"
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>

      {/* Responsive Decorative Elements */}
      <Image
        src="/assets/mantra-2.png"
        alt=""
        width={400}
        height={400}
        className="absolute top-0 left-0 opacity-70 z-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[400px] lg:h-[400px] animate-float"
      />
      <Image
        src="/assets/mantra-5.png"
        alt=""
        width={350}
        height={350}
        className="absolute top-1/4 right-0 opacity-70 z-0 w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-24 lg:w-[400px] lg:h-[200px] animate-float-delayed"
      />
      <Image
        src="/assets/mantra-1.png"
        alt=""
        width={450}
        height={450}
        className="absolute bottom-3/4 right-0 opacity-70 z-0 w-24 h-30 sm:w-40 sm:h-50 md:w-60 md:h-60 lg:w-[400px] lg:h-[400px] animate-float"
      />
      <Image
        src="/assets/mantra-1.png"
        alt=""
        width={450}
        height={450}
        className="absolute bottom-0 left-0 opacity-70 z-0 scale-x-[-1] w-20 h-20 sm:w-32 sm:h-32 md:w-60 md:h-60 lg:w-[450px] lg:h-[450px] animate-float-delayed"
      />
      
      {/* Smaller floating decorative elements with responsive sizing */}
      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={200}
        height={200}
        className="absolute top-32 left-32 opacity-50 z-0 rotate-12 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-[200px] lg:h-[200px] animate-rotate-slow"
      />
      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={300}
        height={300}
        className="absolute top-2/3 right-1/4 opacity-40 z-0 -rotate-45 hidden sm:block w-20 h-20 md:w-32 md:h-32 lg:w-[300px] lg:h-[300px] animate-float"
      />
      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={300}
        height={300}
        className="absolute bottom-1/3 left-1/3 opacity-45 z-0 rotate-90 hidden md:block w-24 h-24 lg:w-[300px] lg:h-[300px] animate-float-delayed"
      />
      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={220}
        height={220}
        className="absolute top-1/4 right-20 opacity-45 z-0 -rotate-24 w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-[220px] lg:h-[220px] animate-rotate-slow"
      />
      <Image
        src="/assets/mantra-4.png"
        alt=""
        width={200}
        height={200}
        className="absolute bottom-10 right-1/3 opacity-50 z-0 rotate-45 w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-[200px] lg:h-[200px] animate-float"
      />

      {showOverlay && (
        <div
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg z-50 flex items-center justify-center cursor-pointer transition-opacity duration-1000"
          onClick={handleOverlayClick}
        >
          {/* Overlay Decorations */}
          <Image
            src="/assets/mantra-2.png"
            alt=""
            width={180}
            height={180}
            className="absolute top-0 left-0 opacity-80 z-50 w-28 h-28 sm:w-36 sm:h-36"
          />
          <Image
            src="/assets/mantra-5.png"
            alt=""
            width={140}
            height={140}
            className="absolute top-0 right-0 opacity-70 z-50 w-20 h-20 sm:w-32 sm:h-32"
          />
          <Image
            src="/assets/mantra-1.png"
            alt=""
            width={160}
            height={160}
            className="absolute bottom-0 right-1 opacity-70 z-50 w-24 h-24 sm:w-32 sm:h-32"
          />
          <Image
            src="/assets/mantra-4.png"
            alt=""
            width={120}
            height={120}
            className="absolute bottom-0 right-0 opacity-60 z-50 w-20 h-20 sm:w-28 sm:h-28"
          />
          <Image
            src="/assets/mantra-4.png"
            alt=""
            width={80}
            height={80}
            className="absolute top-1/2 left-1/4 opacity-50 z-50 w-12 h-12 sm:w-20 sm:h-20"
          />
          {/* Overlay Content */}
          <div className="relative text-center px-4 max-w-md sm:max-w-lg md:max-w-2xl mx-auto z-50">
            <p className="text-cream text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 tracking-widest font-serif">
              {config.invitationHeader}
            </p>
            <p className="text-cream text-base sm:text-lg mb-4 font-serif italic">
              {config.eventType}
            </p>
            <h1 className="text-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 font-serif italic">
              {config.ceremonyName.split(" ")[0]}
            </h1>
            <h1 className="text-gold text-2xl sm:text-3xl md:text-5xl lg:text-7xl mb-6 sm:mb-8 font-serif italic">
              {config.ceremonyName.split(" ")[1]}
            </h1>
            <p className="text-cream text-sm sm:text-base mb-2 sm:mb-4 font-serif italic">
              {config.date.day}
            </p>
            <p className="text-gold text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 font-serif">
              {config.date.date} / {config.date.month} / {config.date.year}
            </p>
            <p className="text-cream text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto font-serif leading-relaxed">
              Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami.
            </p>
            <button className="bg-transparent border border-cream text-cream px-4 sm:px-8 py-2 text-sm sm:text-lg tracking-widest hover:bg-cream hover:text-slate-800 transition-all duration-300 font-serif animate-pulse">
              OPEN INVITATION
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6">
        {/* First Section - Full Height */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center py-8 sm:py-12" data-aos="fade-up">
          <h4 className="text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6">
            {config.greeting}
          </h4>

          <p className="text-cream text-sm sm:text-base lg:text-lg italic mb-6 sm:mb-8 lg:mb-10 font-serif leading-relaxed px-2">
            {config.description}
          </p>
          
          <h2 className="text-cream text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-12 sm:mb-16 lg:mb-20 font-serif italic">
            {config.title}
          </h2>

          <p className="text-gold text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10 font-serif italic px-4 shine-effect" data-aos="fade-left" data-aos-delay="100">
            Anak Agung Gde Dalem Widya Adnyana
          </p>
          <p className="text-gold text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10 font-serif italic" data-aos="zoom-in" data-aos-delay="200">
            &
          </p>
          <p className="text-gold text-xl sm:text-2xl lg:text-3xl mb-12 sm:mb-16 lg:mb-20 font-serif italic px-4 shine-effect" data-aos="fade-right" data-aos-delay="300">
            Anak Agung Istri Dyah Widya Tantri
          </p>
        </section>

        {/* Second Section - Event Details */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center py-8 sm:py-12" data-aos="fade-up">
          <div className="bg-slate-800/30 backdrop-blur-lg rounded-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 max-w-2xl mx-auto" data-aos="zoom-in" data-aos-delay="400">
            <div className="text-cream font-serif">
              <h2 className="text-cream text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-12 sm:mb-16 lg:mb-20 font-serif italic">
            Upacara Kami Laksanakan Pada
          </h2>
              <p className="text-base sm:text-lg lg:text-xl mb-2 italic font-bold">
                {config.date.day}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gold mb-4">
                {config.date.date} / {config.date.month} / {config.date.year}
              </p>
              <div className="relative flex mb-4 justify-center items-center">
                <div className="w-16 sm:w-24 lg:w-30 border-t border-gray-400"></div>
              </div>

              <p className="text-base sm:text-lg lg:text-xl mb-2 italic">Pukul</p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gold mb-4 sm:mb-6">
                {config.date.time}
              </p>
              <div className="relative flex mb-4 justify-center items-center">
                <div className="w-16 sm:w-24 lg:w-30 border-t border-gray-400"></div>
              </div>

              <p className="text-base sm:text-lg lg:text-xl mb-2 italic">
                {config.location.title}
              </p>
              <p className="text-gold text-base sm:text-lg lg:text-xl mb-2 px-2">
                {config.location.address}
              </p>
              <p className="text-cream text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 px-2">
                {config.location.subAddress}
              </p>
            </div>

            <p className="text-cream text-sm sm:text-base lg:text-lg font-serif leading-relaxed px-2">
              {config.closingMessage}
            </p>

            <p className="text-cream text-sm sm:text-base lg:text-lg mt-4 font-serif leading-relaxed px-2">
              Atas kehadiran dan doanya kami ucapkan terima kasih.
            </p>
            
            <h3 className="text-gold text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 font-serif italic px-4">
              {config.mantra}
            </h3>
          </div>

          {/* Responsive countdown */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 text-center mt-6 sm:mt-8" data-aos="fade-up" data-aos-delay="100">
            <div className="flex flex-col items-center bg-slate-800/40 rounded-lg px-2 sm:px-3 py-2 min-w-[60px] sm:min-w-[70px] backdrop-blur-sm">
              <div className="text-cream text-xl sm:text-2xl md:text-3xl font-serif">{timeLeft.days}</div>
              <div className="text-cream text-xs sm:text-sm md:text-base font-serif">Days</div>
            </div>
            <div className="flex flex-col items-center bg-slate-800/40 rounded-lg px-2 sm:px-3 py-2 min-w-[60px] sm:min-w-[70px] backdrop-blur-sm">
              <div className="text-cream text-xl sm:text-2xl md:text-3xl font-serif">{timeLeft.hours}</div>
              <div className="text-cream text-xs sm:text-sm md:text-base font-serif">Hours</div>
            </div>
            <div className="flex flex-col items-center bg-slate-800/40 rounded-lg px-2 sm:px-3 py-2 min-w-[60px] sm:min-w-[70px] backdrop-blur-sm">
              <div className="text-cream text-xl sm:text-2xl md:text-3xl font-serif">{timeLeft.minutes}</div>
              <div className="text-cream text-xs sm:text-sm md:text-base font-serif">Minutes</div>
            </div>
            <div className="flex flex-col items-center bg-slate-800/40 rounded-lg px-2 sm:px-3 py-2 min-w-[60px] sm:min-w-[70px] backdrop-blur-sm">
              <div className="text-cream text-xl sm:text-2xl md:text-3xl font-serif">{timeLeft.seconds}</div>
              <div className="text-cream text-xs sm:text-sm md:text-base font-serif">Seconds</div>
            </div>
          </div>
        </section>

        <section className="text-center py-8 sm:py-12" data-aos="fade-up">
          <h4 className="text-gold text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 font-serif italic px-4" data-aos="fade-up" data-aos-delay="200">
            {config.locationPageTitle}
          </h4>

          <div className="bg-white rounded-lg overflow-hidden mb-6 sm:mb-8 w-full max-w-5xl mx-auto shadow-2xl" data-aos="zoom-in" data-aos-delay="300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3945.633247422044!2d115.405284!3d-8.534939999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMzInMDUuOCJTIDExNcKwMjQnMTkuMCJF!5e0!3m2!1sid!2sid!4v1756273677020!5m2!1sid!2sid"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="sm:h-[400px] md:h-[450px] lg:h-[500px]"
            />
          </div>

          <p className="text-gold text-base sm:text-lg mb-6 sm:mb-8 font-serif italic" data-aos="fade-up" data-aos-delay="400">
            Upacara Mepandes
          </p>

          <button className="bg-transparent border border-cream text-cream px-4 sm:px-8 py-2 text-sm sm:text-base lg:text-lg tracking-widest hover:bg-cream hover:text-slate-800 transition-all duration-300 font-serif animate-pulse" data-aos="flip-up" data-aos-delay="500">
            <a href="https://maps.app.goo.gl/vk4KSkXgtkKPgSoX9">Buka Peta</a>
          </button>
        </section>

        <footer className="flex flex-col justify-center items-center text-center py-8 sm:py-12" data-aos="fade-up">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cream rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="border-t border-cream/20 w-32 mx-auto mb-6"></div>
          <p className="text-cream text-xs sm:text-sm font-serif">© Copyright Mepandes.my.id</p>
          <p className="text-cream text-xs sm:text-sm font-serif">By Ode Widya</p>
        </footer>
      </div>
    </div>
  )
}