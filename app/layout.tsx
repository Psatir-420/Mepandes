import type React from "react"
import type { Metadata } from "next"
import { Geist as Geist_Sans } from "next/font/google"
import { Cormorant_Garamond } from "next/font/google"
import "./globals.css"

const geistSans = Geist_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Invitation - Upacara Mepandes",
  description: "Invitation to Upacara Mepandes ceremony",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-serif ${geistSans.variable} ${cormorantGaramond.variable}`}>{children}</body>
    </html>
  )
}
