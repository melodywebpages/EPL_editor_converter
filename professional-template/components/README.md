# Template Components

This directory contains ready-to-use React/Next.js components with MelodyWebPages branding.

## Components Included

### 1. Footer.tsx
Professional footer with:
- 3-column responsive grid layout
- About, Legal, and Support sections
- MelodyWebPages branding with rotating orange G clef icon
- Copyright and links
- Cookie notice
- **IMPORTANT:** Keep the "Created with love by MelodyWebPages" section and G clef animation intact

**Customization Required:**
- Replace `[Your App Name]` with your app name
- Update the About section description with what your app does
- Verify all links point to correct routes in your app

### 2. GoogleAnalytics.tsx
Google Analytics integration component:
- Reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` from environment
- Uses Next.js Script component for optimal loading
- Returns null if no GA ID is configured
- Client-side component ('use client')

**Setup:**
1. Add to your `app/layout.tsx` inside `<head>`
2. Set environment variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

### 3. GoogleAdsense.tsx
Google AdSense integration component:
- Reads `NEXT_PUBLIC_ADSENSE_CLIENT_ID` from environment
- Uses Next.js Script component
- Pushes ads after mount
- Returns null if no AdSense ID is configured
- Client-side component ('use client')

**Setup:**
1. Add to your `app/layout.tsx` inside `<head>`
2. Set environment variable: `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX`
3. Create `public/ads.txt` with your publisher ID

### 4. CookieConsent.tsx
GDPR-compliant cookie consent banner:
- Shows after 1 second delay
- Stores consent in localStorage
- Accept and Decline buttons
- Link to privacy policy
- Fixed bottom position with z-index 50
- Client-side component ('use client')

**Setup:**
1. Add to your `app/layout.tsx` after Footer
2. Ensure `/privacy-policy` page exists
3. Banner only shows once per user (stored in localStorage)

## Installation

1. Copy all files to your `/components` directory:
   ```bash
   cp template-components/*.tsx your-project/components/
   ```

2. Update imports in your `app/layout.tsx`:
   ```tsx
   import Footer from '@/components/Footer'
   import CookieConsent from '@/components/CookieConsent'
   import GoogleAnalytics from '@/components/GoogleAnalytics'
   import GoogleAdsense from '@/components/GoogleAdsense'
   ```

3. Add components to layout:
   ```tsx
   <html>
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
   ```

## Environment Variables

Create `.env.local` and add:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## Styling Requirements

All components use Tailwind CSS. Ensure your project has:
- Tailwind CSS configured
- Standard Tailwind colors (gray, blue, orange)
- No conflicting global styles that override Tailwind

## Testing

After installation:
1. Run `npm run dev`
2. Visit your site and verify:
   - Footer appears at bottom of all pages
   - G clef icon rotates smoothly
   - Cookie banner appears after 1 second
   - Accept/Decline buttons work
   - All links navigate correctly
   - Responsive on mobile devices

## Support

For issues with these components:
- Email: melodywebpages@gmail.com
- Check the main TEMPLATE_IMPLEMENTATION_GUIDE.md for detailed setup instructions

