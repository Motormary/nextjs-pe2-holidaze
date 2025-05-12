import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/components/user-provider"
import MobileNav from "@/components/mobile-nav"
import TopNav from "@/components/top-nav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Holidaze",
  description: "Book your next dream vacation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} [&_*]: relative flex min-h-svh flex-col items-center antialiased outline`}
      >
        <UserProvider>
          <TopNav />
          {children}
          <MobileNav />
        </UserProvider>
      </body>
    </html>
  )
}
