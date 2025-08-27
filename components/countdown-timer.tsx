"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: string
  labels: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
}

export default function CountdownTimer({ targetDate, labels }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-center gap-8 mt-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-cream">{timeLeft.days}</div>
        <div className="text-sm text-cream/80">{labels.days}</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-cream">{timeLeft.hours}</div>
        <div className="text-sm text-cream/80">{labels.hours}</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-cream">{timeLeft.minutes}</div>
        <div className="text-sm text-cream/80">{labels.minutes}</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-cream">{timeLeft.seconds}</div>
        <div className="text-sm text-cream/80">{labels.seconds}</div>
      </div>
    </div>
  )
}
