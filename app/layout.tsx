import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond } from "next/font/google"
import "./globals.css"


const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  style: "italic"
})

export const metadata: Metadata = {
  title: "Invitation - Upacara Mepandes",
  description: "Invitation to Upacara Mepandes ceremony",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} font-serif`}>{children}</body>
    </html>
  )
}
