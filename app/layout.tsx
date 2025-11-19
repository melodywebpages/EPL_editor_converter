import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

export const metadata: Metadata = {
  title: 'EPL Editor & Converter - Edit, Preview & Convert EPL to ZPL/PDF',
  description: 'Free online EPL editor and converter. Edit EPL code with live preview, convert EPL (Eltron Programming Language) files to ZPL, PDF, or PNG formats instantly. Real-time visualization, syntax editing, and multi-format export. No registration required.',
  keywords: 'EPL editor, EPL converter, ZPL converter, EPL to PDF, EPL to ZPL, label editor, label converter, Eltron, Zebra, barcode label editor, shipping label editor, EPL code editor',
  authors: [{ name: 'EPL Editor Team' }],
  creator: 'EPL Editor & Converter',
  publisher: 'EPL Editor & Converter',
  robots: 'index, follow',
  openGraph: {
    title: 'EPL Editor & Converter - Edit, Preview & Convert Labels',
    description: 'Free online EPL editor with live preview. Edit EPL code and convert to ZPL, PDF, or PNG formats instantly. Real-time visualization.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPL Editor & Converter',
    description: 'Edit EPL code with live preview and convert to ZPL, PDF, or PNG formats instantly.',
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
      <body>
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}

