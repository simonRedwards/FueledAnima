import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import { Inter } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const sourceSans = Source_Sans_3({ 
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-source-sans',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anima',
  description: 'The app for classical musicians',
  icons: [
    { rel: 'icon', url: '/fav.png' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable} font-sans ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
