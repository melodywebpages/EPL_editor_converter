import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GoogleAdsense from '@/components/GoogleAdsense'

export const metadata: Metadata = {
  title: 'EPL to PDF Converter - Free Online EPL to PDF Converter Tool',
  description: 'Convert EPL files to PDF instantly. Free online EPL to PDF converter - no registration required. Convert EPL (Eltron Programming Language) labels to PDF format quickly and easily.',
  keywords: 'EPL to PDF, EPL to PDF converter, convert EPL to PDF, EPL converter, EPL to PDF online, free EPL to PDF, EPL label converter, Eltron to PDF, EPL file converter',
  authors: [{ name: 'EPL Editor Team' }],
  creator: 'EPL Editor & Converter',
  publisher: 'EPL Editor & Converter',
  robots: 'index, follow',
  openGraph: {
    title: 'EPL to PDF Converter - Free Online EPL to PDF Converter',
    description: 'Convert EPL files to PDF instantly. Free online EPL to PDF converter tool - no registration required.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPL to PDF Converter - Free Online Tool',
    description: 'Convert EPL files to PDF instantly. Free online EPL to PDF converter - no registration required.',
  },
  verification: {
    // Add your Google Site Verification code here
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <GoogleAdsense />
      </head>
      <body>
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}

