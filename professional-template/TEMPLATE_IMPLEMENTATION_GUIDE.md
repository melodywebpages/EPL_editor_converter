# Professional Next.js Site Template - Implementation Guide

## Overview

This guide provides complete, ready-to-copy code for adding professional components to any Next.js application. All components include MelodyWebPages branding with the signature rotating orange G clef icon.

---

## Table of Contents

1. [Quick Start Checklist](#quick-start-checklist)
2. [Component Code](#component-code)
3. [Page Templates](#page-templates)
4. [Layout Integration](#layout-integration)
5. [Deployment Configuration](#deployment-configuration)
6. [Environment Setup](#environment-setup)
7. [Customization Guide](#customization-guide)

---

## Quick Start Checklist

### Phase 1: Setup (10 minutes)
- [ ] Create `/components` directory if not exists
- [ ] Install dependencies: `npm install axios` (if needed)
- [ ] Create `.env.local` file
- [ ] Copy `.env.example` template

### Phase 2: Components (20 minutes)
- [ ] Create `components/Footer.tsx`
- [ ] Create `components/GoogleAnalytics.tsx`
- [ ] Create `components/GoogleAdsense.tsx`
- [ ] Create `components/CookieConsent.tsx`

### Phase 3: Legal Pages (30 minutes)
- [ ] Create `app/privacy-policy/page.tsx`
- [ ] Create `app/terms-of-service/page.tsx`
- [ ] Create `app/contact/page.tsx`
- [ ] Create `app/report-bug/page.tsx`

### Phase 4: Integration (15 minutes)
- [ ] Update `app/layout.tsx` with new components
- [ ] Customize metadata for your app
- [ ] Update all page content with app-specific text

### Phase 5: Deployment (30 minutes)
- [ ] Create `Dockerfile`
- [ ] Create `cloudbuild.yaml`
- [ ] Update `next.config.js`
- [ ] Create `public/robots.txt`
- [ ] Create `public/ads.txt` (if using AdSense)

### Phase 6: Testing & Customization (20 minutes)
- [ ] Test build: `npm run build`
- [ ] Test all pages locally
- [ ] Verify Footer on all pages
- [ ] Test cookie consent
- [ ] Check mobile responsiveness
- [ ] Replace all placeholder text with app-specific content

---

## Component Code

### 1. Footer Component

**File:** `components/Footer.tsx`

```tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">[Your App Name]</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              [Brief description of what your app does - 2-3 sentences highlighting key features and benefits]
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/report-bug" className="hover:text-white transition-colors">
                  Report a Bug
                </a>
              </li>
              <li>
                <a href="mailto:melodywebpages@gmail.com" className="hover:text-white transition-colors">
                  Email Support
                </a>
              </li>
            </ul>
            <p className="text-xs text-gray-400 mt-4">
              Response time: 24-48 hours
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} [Your App Name]. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          {/* Created by section with rotating G clef */}
          <div className="flex items-end justify-center gap-1.5 mt-6">
            <p className="text-sm text-gray-400" style={{ paddingBottom: '0.1px' }}>
              Created with love by <span className="text-white font-semibold">MelodyWebPages</span>
            </p>
            <style>{`
              @keyframes rotate3d {
                0% { transform: perspective(500px) rotateY(0deg); }
                100% { transform: perspective(500px) rotateY(360deg); }
              }
              .gclef-3d {
                animation: rotate3d 4s linear infinite;
                transform-style: preserve-3d;
                filter: drop-shadow(0 3px 6px rgba(249, 115, 22, 0.6));
                display: inline-block;
              }
            `}</style>
            <span 
              className="gclef-3d text-4xl font-bold"
              style={{
                color: '#f97316',
                fontWeight: 900,
                lineHeight: 1
              }}
              aria-label="G Clef"
            >
              𝄞
            </span>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            This site uses cookies for analytics and advertising. By using this site, you agree to our use of cookies.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Customization Notes:**
- Replace `[Your App Name]` with your actual app name
- Replace the description paragraph with what your app actually does
- Keep the MelodyWebPages branding and G clef animation intact

---

### 2. Google Analytics Component

**File:** `components/GoogleAnalytics.tsx`

```tsx
'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
```

---

### 3. Google AdSense Component

**File:** `components/GoogleAdsense.tsx`

```tsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function GoogleAdsense() {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Push ads after component mount
    if (adsenseClientId) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [adsenseClientId]);

  if (!adsenseClientId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
```

---

### 4. Cookie Consent Component

**File:** `components/CookieConsent.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-2xl z-50 border-t-4 border-blue-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">🍪 Cookie Notice</h3>
          <p className="text-sm text-gray-300">
            We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
            By clicking "Accept", you consent to our use of cookies. 
            <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 ml-1 underline">
              Learn more in our Privacy Policy
            </a>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={declineCookies}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Layout Integration

### Updated Root Layout

**File:** `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GoogleAdsense from '@/components/GoogleAdsense'

export const metadata: Metadata = {
  title: '[Your App Name] - [Short Tagline]',
  description: '[Detailed description of your app - 150-160 characters for SEO]',
  keywords: '[relevant, keywords, for, your, app, separated, by, commas]',
  authors: [{ name: '[Your App Name] Team' }],
  creator: '[Your App Name]',
  publisher: '[Your App Name]',
  robots: 'index, follow',
  openGraph: {
    title: '[Your App Name] - [Short Tagline]',
    description: '[Shorter description for social media sharing]',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Your App Name]',
    description: '[Twitter description]',
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
```

**Customization Checklist:**
- [ ] Replace `[Your App Name]` everywhere
- [ ] Write descriptive title and tagline
- [ ] Write 150-160 character SEO description
- [ ] Add relevant keywords
- [ ] Customize OpenGraph and Twitter metadata

---

## Page Templates

### Privacy Policy Template

**File:** `app/privacy-policy/page.tsx`

```tsx
export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to [Your App Name] ("we," "our," or "us"). We are committed to protecting your privacy 
              and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, 
              and safeguard your information when you use our [service description].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>[Type of data your app collects from users]</li>
              <li>[Any user-generated content]</li>
              <li>[Preferences or settings]</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">2.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address (anonymized)</li>
              <li>Usage statistics and analytics data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We use the collected information for:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Providing [core functionality of your app]</li>
              <li>Improving our service</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Detecting and preventing technical issues</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              [Describe how your app stores data - client-side only, temporary server storage, permanent storage, etc.]
            </p>
            <p className="text-gray-700 leading-relaxed">
              [Explain data retention policies and when data is deleted]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Google Analytics</strong> - For website analytics</li>
              <li><strong>Google Ads</strong> - For advertising purposes</li>
              <li>[Any other third-party APIs or services your app uses]</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              These services may collect information as governed by their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Remember your preferences</li>
              <li>Analyze site traffic and usage</li>
              <li>Personalize advertising content</li>
              <li>Improve site functionality</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              You can control cookies through your browser settings. However, disabling cookies may affect 
              site functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights (GDPR/CCPA)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your data against 
              unauthorized access, alteration, disclosure, or destruction. However, no internet transmission 
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you believe we have collected information from 
              a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-3">
              <p className="text-gray-700">
                <strong>Email:</strong> melodywebpages@gmail.com
              </p>
            </div>
          </section>

          <section className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By using our service, you acknowledge that you have read and understood this Privacy Policy 
              and agree to its terms.
            </p>
          </section>
        </div>

        <div className="mt-8">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to [Your App Name]
          </a>
        </div>
      </div>
    </main>
  );
}
```

**Customization Required:**
- Replace all `[Your App Name]` placeholders
- Update information collection section with what your app actually collects
- Describe your data storage practices accurately
- List all third-party services your app uses
- Update contact information if needed

---

### Terms of Service Template

**File:** `app/terms-of-service/page.tsx`

See the Privacy Policy structure above - follow the same pattern for Terms of Service with sections including:
1. Acceptance of Terms
2. Description of Service (customize based on your app)
3. Use License (Permitted Use & Restrictions)
4. User Content
5. Intellectual Property
6. Third-Party Services
7. Disclaimers and Warranties
8. Limitation of Liability
9. Indemnification
10. Privacy
11. Modifications to Service
12. Changes to Terms
13. Governing Law
14. Contact Information

---

### Contact Page Template

**File:** `app/contact/page.tsx`

```tsx
export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We'd love to hear from you! Whether you have questions, feedback, or need support, 
              feel free to reach out to us through any of the channels below.
            </p>
          </section>

          <section className="flex justify-center">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 max-w-md w-full">
              <div className="text-blue-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-700">
                For all inquiries, support requests, bug reports, and feature suggestions:
              </p>
              <p className="text-gray-700 mt-4">
                <a href="mailto:melodywebpages@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
                  melodywebpages@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {/* Add FAQ items relevant to YOUR app */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">[Common Question About Your App]</h3>
                <p className="text-gray-700">
                  [Answer specific to your app's functionality]
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Is the service free?</h3>
                <p className="text-gray-700">
                  [Describe your pricing model]
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Response Time</h2>
            <p className="text-gray-700 leading-relaxed">
              We typically respond to emails within 24-48 hours during business days.
            </p>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Report a Bug or Suggest a Feature</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Help us improve! If you've found a bug, please visit our <a href="/report-bug" className="text-blue-600 hover:text-blue-800 font-semibold">Bug Report page</a> for detailed instructions.
            </p>
            <p className="text-gray-700">
              Have a feature request? Email us at <a href="mailto:melodywebpages@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold">melodywebpages@gmail.com</a> with your suggestion!
            </p>
          </section>
        </div>

        <div className="mt-8">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to [Your App Name]
          </a>
        </div>
      </div>
    </main>
  );
}
```

---

### Report Bug Page Template

**File:** `app/report-bug/page.tsx`

```tsx
export default function ReportBug() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Report a Bug</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Found a Bug?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We appreciate you taking the time to report bugs and help us improve [Your App Name]. 
              Your feedback helps us make the tool better for everyone!
            </p>
          </section>

          <section className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">How to Report a Bug</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Please email us at <a href="mailto:melodywebpages@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold">melodywebpages@gmail.com</a> with the following information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
              <li>
                <strong>Description:</strong> Detailed explanation of what went wrong
              </li>
              <li>
                <strong>Steps to Reproduce:</strong> What actions led to the bug?
              </li>
              <li>
                <strong>Expected Behavior:</strong> What should have happened?
              </li>
              <li>
                <strong>Actual Behavior:</strong> What actually happened?
              </li>
              <li>
                <strong>Browser & OS:</strong> Which browser and operating system are you using?
              </li>
              <li>
                <strong>Screenshots:</strong> If applicable, include screenshots showing the issue
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Response Time</h2>
            <p className="text-gray-700 leading-relaxed">
              We typically respond to bug reports within 24-48 hours during business days. 
              Critical bugs affecting many users will be prioritized.
            </p>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Want to Suggest a Feature Instead?</h2>
            <p className="text-gray-700 leading-relaxed">
              Have an idea for a new feature? Email us at <a href="mailto:melodywebpages@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold">melodywebpages@gmail.com</a> with 
              your feature request. We love hearing from our users!
            </p>
          </section>
        </div>

        <div className="mt-8">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to [Your App Name]
          </a>
        </div>
      </div>
    </main>
  );
}
```

---

## Deployment Configuration

### Dockerfile

**File:** `Dockerfile`

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set production environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js application
RUN npm run build

# Production image, copy all files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 8080

# Set port environment variable for Cloud Run
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]
```

---

### Google Cloud Build Configuration

**File:** `cloudbuild.yaml`

```yaml
# Google Cloud Build configuration for automatic deployments

steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/[your-app-name]:$COMMIT_SHA'
      - '-t'
      - 'gcr.io/$PROJECT_ID/[your-app-name]:latest'
      - '.'
    timeout: 1200s

  # Push the container image to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/[your-app-name]:$COMMIT_SHA'

  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/[your-app-name]:latest'

  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - '[your-app-name]'
      - '--image'
      - 'gcr.io/$PROJECT_ID/[your-app-name]:$COMMIT_SHA'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
      - '--memory'
      - '512Mi'
      - '--cpu'
      - '1'
      - '--max-instances'
      - '10'
      - '--port'
      - '8080'

images:
  - 'gcr.io/$PROJECT_ID/[your-app-name]:$COMMIT_SHA'
  - 'gcr.io/$PROJECT_ID/[your-app-name]:latest'

timeout: 1800s
```

**Replace:** `[your-app-name]` with your app's slug (lowercase, no spaces)

---

### Next.js Configuration Update

**File:** `next.config.js`

Add or update with:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Docker deployment
  // ... any other existing config
}

module.exports = nextConfig
```

---

## Environment Setup

### Environment Variables Template

**File:** `.env.example`

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# Add any other environment variables your app needs
```

**File:** `.env.local` (Create locally, do NOT commit)

```bash
# Copy from .env.example and fill in real values
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-actual-ga-id
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your-actual-adsense-id
```

---

### Public Files

**File:** `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

**File:** `public/ads.txt` (if using Google AdSense)

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Replace `pub-XXXXXXXXXXXXXXXX` with your actual AdSense publisher ID.

---

## Package.json Scripts

Ensure these scripts exist in your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 8080",
    "lint": "next lint",
    "docker:build": "docker build -t [your-app-name] .",
    "docker:run": "docker run -p 8080:8080 [your-app-name]"
  }
}
```

---

## Customization Guide

### Critical Replacements

Search and replace these placeholders throughout ALL files:

1. `[Your App Name]` → Your actual app name
2. `[your-app-name]` → Lowercase slug for Docker/Cloud Run
3. `[service description]` → What your app does
4. `[Type of data your app collects]` → Actual data collected
5. All FAQ sections → App-specific questions and answers

### App-Specific Content

For each legal page, customize:
- **Service description sections** - Describe what your app actually does
- **Data collection sections** - List what data YOUR app collects
- **Third-party services** - List ALL external APIs/services used
- **Feature lists** - Describe actual features
- **Contact information** - Verify email and response times

### Footer Customization

In `components/Footer.tsx`:
- Update the About section description to match your app
- Keep MelodyWebPages branding intact
- Keep the rotating G clef animation unchanged
- Verify all links point to correct pages

---

## Testing Checklist

Before deploying:

- [ ] Run `npm run build` successfully
- [ ] Test all pages in development (`npm run dev`)
- [ ] Verify Footer appears on all pages
- [ ] Check G clef animation works
- [ ] Test cookie consent banner (clear localStorage to see again)
- [ ] Click all links to verify no 404s
- [ ] Test on mobile viewport
- [ ] Check browser console for errors
- [ ] Verify environment variables work
- [ ] Test Docker build locally: `npm run docker:build`
- [ ] All placeholder text replaced with app-specific content

---

## Deployment Steps

### Google Cloud Platform Setup

1. Create a Google Cloud project
2. Install gcloud CLI: https://cloud.google.com/sdk/docs/install
3. Authenticate: `gcloud auth login`
4. Set project: `gcloud config set project [PROJECT_ID]`
5. Enable required APIs:
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

### Manual Deployment

```bash
gcloud run deploy [your-app-name] --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --port 8080
```

### CI/CD with GitHub

1. Push `cloudbuild.yaml` to your repository
2. In Google Cloud Console, go to Cloud Build > Triggers
3. Create a new trigger:
   - Event: Push to branch
   - Branch: `^main$` (or your deployment branch)
   - Configuration: cloudbuild.yaml
4. Connect your GitHub repository
5. Every push to main will auto-deploy!

---

## Support

For issues with this template:
- Email: melodywebpages@gmail.com
- Maintained by: MelodyWebPages

---

**Remember:** This template is designed to make ANY Next.js app look professional. Always customize all text to accurately describe YOUR specific app's functionality!

