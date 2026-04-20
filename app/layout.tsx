import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import CartProvider from '@/components/CartProvider'
import Cart from '@/components/Cart'
import Script from 'next/script'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '900'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Target Furniture Palace - Quality Furniture and Appliances in Mwingi',
  description: 'Shop quality furniture and household appliances in Mwingi, Kenya. Same-day delivery in Mwingi. Sofas, beds, TVs, kitchen appliances and more.',
  keywords: 'furniture Mwingi, appliances Mwingi, sofas Kenya, beds Mwingi, Target Furniture Palace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZWKPXB1P79" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZWKPXB1P79');
          `}
        </Script>
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} font-sans bg-[#fdf8f2] text-gray-900 overflow-x-hidden`}>
        <CartProvider>
          {children}
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
}