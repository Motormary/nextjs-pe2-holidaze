import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { UserProvider } from "@/hooks/use-user"
import MobileNav from "@/components/mobile-nav"

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
        className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-svh flex-col items-center antialiased [&_*]:outline`}
      >
        <UserProvider>
          <nav className="w-full py-1.5 max-md:hidden">
            <div className="container mx-auto flex justify-between px-4">
              <Link prefetch={false} href="/">
                <picture>
                  <img className="max-h-8" src="logo.png" alt="logo" />
                </picture>
              </Link>
              <ul className="flex gap-4">
                <li>Home</li>
                <li>Venues</li>
                <li>Profile</li>
              </ul>
            </div>
          </nav>
          {children}
          <MobileNav />
        </UserProvider>
      </body>
    </html>
  )
}
