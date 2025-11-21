# Customization Checklist

Use this checklist when applying the template to a new Next.js app. Check off items as you complete them.

---

## Phase 1: Initial Setup (10 minutes)

### File Structure
- [ ] Create `/components` directory
- [ ] Create `/app/privacy-policy` directory
- [ ] Create `/app/terms-of-service` directory
- [ ] Create `/app/contact` directory
- [ ] Create `/app/report-bug` directory

### Dependencies
- [ ] Verify Next.js is installed
- [ ] Verify Tailwind CSS is configured
- [ ] Install axios if needed: `npm install axios`
- [ ] Run `npm install` to ensure all dependencies are current

---

## Phase 2: Copy Components (15 minutes)

### Copy Files
- [ ] Copy `template-components/Footer.tsx` → `components/Footer.tsx`
- [ ] Copy `template-components/GoogleAnalytics.tsx` → `components/GoogleAnalytics.tsx`
- [ ] Copy `template-components/GoogleAdsense.tsx` → `components/GoogleAdsense.tsx`
- [ ] Copy `template-components/CookieConsent.tsx` → `components/CookieConsent.tsx`

### Copy Pages
- [ ] Copy `template-pages/privacy-policy-page.tsx` → `app/privacy-policy/page.tsx`
- [ ] Copy `template-pages/terms-of-service-page.tsx` → `app/terms-of-service/page.tsx`
- [ ] Copy `template-pages/contact-page.tsx` → `app/contact/page.tsx`
- [ ] Copy `template-pages/report-bug-page.tsx` → `app/report-bug/page.tsx`

---

## Phase 3: Deployment Files (10 minutes)

### Copy Deployment Config
- [ ] Copy `template-deployment/Dockerfile` → `Dockerfile`
- [ ] Copy `template-deployment/cloudbuild.yaml` → `cloudbuild.yaml`
- [ ] Copy `template-deployment/env-example.txt` → `.env.example`
- [ ] Copy `template-deployment/robots.txt` → `public/robots.txt`
- [ ] Copy `template-deployment/ads.txt` → `public/ads.txt` (if using AdSense)
- [ ] Append `template-deployment/.gitignore-additions` to `.gitignore`

### Update Next.js Config
- [ ] Add `output: 'standalone'` to `next.config.js`
- [ ] If no `next.config.js` exists, copy `template-deployment/next.config.example.js`

---

## Phase 4: Update Layout (10 minutes)

### Modify app/layout.tsx
- [ ] Import Footer: `import Footer from '@/components/Footer'`
- [ ] Import CookieConsent: `import CookieConsent from '@/components/CookieConsent'`
- [ ] Import GoogleAnalytics: `import GoogleAnalytics from '@/components/GoogleAnalytics'`
- [ ] Import GoogleAdsense: `import GoogleAdsense from '@/components/GoogleAdsense'`
- [ ] Add `<GoogleAnalytics />` inside `<head>`
- [ ] Add `<GoogleAdsense />` inside `<head>`
- [ ] Add `<Footer />` after `{children}` in `<body>`
- [ ] Add `<CookieConsent />` after `<Footer />` in `<body>`

---

## Phase 5: Customize Text - CRITICAL! (30 minutes)

### Determine Your App Details
Before customizing, write down:
- [ ] **App Name:** _______________________
- [ ] **App Slug (lowercase, no spaces):** _______________________
- [ ] **One-line Description:** _______________________
- [ ] **Main Functionality:** _______________________
- [ ] **What Data You Collect:** _______________________
- [ ] **Data Storage Policy:** _______________________

### Global Search & Replace

Search ALL files for these placeholders and replace:

#### In ALL Files:
- [ ] Find: `[Your App Name]` → Replace with: Your actual app name
- [ ] Find: `[your-app-name]` → Replace with: Your app slug (e.g., `my-converter`)

#### In Footer.tsx:
- [ ] Update About section description (lines ~12-14) with what your app does
- [ ] Verify all links work: `/privacy-policy`, `/terms-of-service`, `/contact`, `/report-bug`
- [ ] Keep MelodyWebPages branding intact
- [ ] Keep G clef animation (𝄞) intact

#### In Privacy Policy:
- [ ] Section 1: Update service description
- [ ] Section 2.1: List data YOUR app collects from users
- [ ] Section 2.2: Verify automatic data collection is accurate
- [ ] Section 3: Update "How We Use Your Information" with actual uses
- [ ] Section 4: Describe YOUR data storage practices accurately
- [ ] Section 5: List ALL third-party services your app uses
- [ ] Replace generic `[placeholders]` with real information
- [ ] Update "Last Updated" date

#### In Terms of Service:
- [ ] Section 2: Describe what your service actually does
- [ ] Section 3.1: List permitted uses specific to your app
- [ ] Section 4: Explain how your app handles user content
- [ ] Section 5: Update intellectual property information
- [ ] Section 6: List all third-party dependencies
- [ ] Section 7.2: Update limitations specific to your app
- [ ] Section 13: Add your governing jurisdiction
- [ ] Replace all `[placeholders]` with real information
- [ ] Update "Last Updated" date

#### In Contact Page:
- [ ] Write 4-5 FAQ items relevant to YOUR app
- [ ] Update data storage FAQ answer
- [ ] Update pricing/free service FAQ answer
- [ ] Add app-specific technical questions
- [ ] Verify email address is correct

#### In Report Bug Page:
- [ ] List 3-4 common issues users face with YOUR app
- [ ] Provide troubleshooting tips for each issue
- [ ] Update sample data requirements if needed
- [ ] Add app-specific debugging info

#### In Layout Metadata:
- [ ] Update `title` with app name and tagline
- [ ] Write 150-160 character SEO-friendly `description`
- [ ] Add relevant `keywords` (comma-separated)
- [ ] Update `authors`, `creator`, `publisher`
- [ ] Update OpenGraph title and description
- [ ] Update Twitter card metadata

---

## Phase 6: Environment Variables (5 minutes)

### Local Development
- [ ] Create `.env.local` from `.env.example`
- [ ] Get Google Analytics ID from https://analytics.google.com
- [ ] Add `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to `.env.local`
- [ ] Get Google AdSense ID from https://adsense.google.com
- [ ] Add `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX` to `.env.local`
- [ ] Add any app-specific environment variables
- [ ] Verify `.env.local` is in `.gitignore`

### Update Public Files
- [ ] Update `public/robots.txt` with your actual domain
- [ ] Update `public/ads.txt` with your actual AdSense Publisher ID (if using)

---

## Phase 7: Deployment Configuration (10 minutes)

### Google Cloud Build
- [ ] Open `cloudbuild.yaml`
- [ ] Find all 7 instances of `[your-app-name]`
- [ ] Replace with your app slug (lowercase, no spaces)
- [ ] Example: `my-converter-app`, `pdf-tool`, `epl-editor`

### Next.js Config
- [ ] Verify `output: 'standalone'` is in `next.config.js`
- [ ] This is REQUIRED for Docker builds

---

## Phase 8: Testing (20 minutes)

### Local Build Test
- [ ] Run `npm run build`
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No console warnings about missing files

### Local Run Test
- [ ] Run `npm run dev` or `npm start`
- [ ] App loads at http://localhost:3000 (or 8080)
- [ ] Visit homepage - no errors
- [ ] Click Footer links - all work
- [ ] Visit `/privacy-policy` - renders correctly
- [ ] Visit `/terms-of-service` - renders correctly
- [ ] Visit `/contact` - renders correctly
- [ ] Visit `/report-bug` - renders correctly

### Component Tests
- [ ] Footer appears at bottom of all pages
- [ ] G clef icon (𝄞) rotates smoothly in Footer
- [ ] Cookie consent banner appears after 1 second
- [ ] Click "Accept" on cookie banner - it disappears and doesn't show again
- [ ] Click "Decline" on cookie banner - it disappears
- [ ] Clear localStorage and refresh - banner shows again

### Mobile Responsive Test
- [ ] Open DevTools mobile view
- [ ] Test on iPhone (375px width)
- [ ] Test on iPad (768px width)
- [ ] Footer stacks properly on mobile
- [ ] Legal pages readable on mobile
- [ ] Cookie banner fits on mobile screen

### Content Verification
- [ ] NO `[placeholder]` text remains anywhere
- [ ] NO "Lorem ipsum" or generic filler text
- [ ] All app names are correct
- [ ] All descriptions match your app
- [ ] All FAQ items are relevant
- [ ] Email addresses are correct
- [ ] "Last Updated" dates are current

---

## Phase 9: SEO & Analytics (10 minutes)

### Metadata Verification
- [ ] View page source on homepage
- [ ] `<title>` tag contains your app name
- [ ] `<meta name="description">` contains your description
- [ ] OpenGraph tags present (`og:title`, `og:description`)
- [ ] Twitter card tags present

### Analytics Check
- [ ] Google Analytics script loads (check Network tab)
- [ ] GA Measurement ID is correct
- [ ] No console errors from GA
- [ ] Google AdSense script loads (if using)
- [ ] AdSense Client ID is correct

### Sitemap (Optional)
- [ ] Create or update `app/sitemap.ts`
- [ ] Include all routes: `/`, `/privacy-policy`, `/terms-of-service`, `/contact`, `/report-bug`
- [ ] Verify `public/robots.txt` points to sitemap

---

## Phase 10: Production Deployment (Optional - 30 minutes)

### Google Cloud Setup
- [ ] Create Google Cloud account
- [ ] Create new project or select existing
- [ ] Install gcloud CLI
- [ ] Run `gcloud auth login`
- [ ] Run `gcloud config set project [PROJECT_ID]`
- [ ] Enable Cloud Run API
- [ ] Enable Cloud Build API
- [ ] Enable Container Registry API

### First Deployment
- [ ] Run `gcloud run deploy [your-app-name] --source .`
- [ ] Wait for build (5-10 minutes first time)
- [ ] Get deployment URL
- [ ] Visit URL and test app
- [ ] Set environment variables in Cloud Run console

### CI/CD Setup (Optional)
- [ ] Push code to GitHub repository
- [ ] Connect GitHub to Google Cloud Build
- [ ] Create Build Trigger for main branch
- [ ] Point trigger to `cloudbuild.yaml`
- [ ] Test automatic deployment with a commit

---

## Final Verification Checklist

### Visual Check
- [ ] MelodyWebPages branding appears in Footer
- [ ] Orange rotating G clef (𝄞) animates
- [ ] All pages have consistent styling
- [ ] No broken images or icons
- [ ] Colors match (blue primary, orange G clef)

### Functionality Check
- [ ] All navigation links work
- [ ] Cookie consent stores preference
- [ ] No 404 errors
- [ ] No JavaScript console errors
- [ ] Forms work (if any)

### Content Check
- [ ] All text is app-specific (not generic)
- [ ] Legal pages accurately describe YOUR app
- [ ] Contact page FAQ items are relevant
- [ ] Privacy policy matches your data practices
- [ ] Terms of service match your actual service

### Performance Check
- [ ] Page load time < 3 seconds
- [ ] No layout shift on load
- [ ] Images optimized
- [ ] Build size reasonable (<5MB)

### Accessibility Check
- [ ] Footer links have proper contrast
- [ ] Buttons have proper labels
- [ ] Images have alt text
- [ ] Keyboard navigation works

---

## Common Mistakes to Avoid

- ❌ Leaving `[Your App Name]` placeholders in production
- ❌ Using generic privacy policy without customization
- ❌ Forgetting to add `output: 'standalone'` to next.config.js
- ❌ Not testing cookie consent banner
- ❌ Committing `.env.local` to git
- ❌ Skipping the G clef animation
- ❌ Not updating FAQ items to match your app
- ❌ Forgetting to update `Last Updated` dates on legal pages
- ❌ Not testing on mobile devices
- ❌ Leaving generic lorem ipsum text anywhere

---

## Success Criteria

Your implementation is complete when:

✅ All files copied and customized  
✅ Build succeeds without errors  
✅ All pages load correctly  
✅ Footer with MelodyWebPages branding appears everywhere  
✅ Rotating orange G clef works  
✅ Cookie consent functions properly  
✅ All placeholder text replaced  
✅ Legal pages accurately describe your app  
✅ Mobile responsive  
✅ No console errors  
✅ Environment variables configured  
✅ Ready for deployment  

---

## Time Estimate

- **Minimum (experienced developer):** 1.5 hours
- **Average:** 2-3 hours
- **First time:** 3-4 hours
- **With deployment:** Add 1-2 hours

---

## Support

Stuck on something? 
- Review `TEMPLATE_IMPLEMENTATION_GUIDE.md` for detailed instructions
- Check component READMEs in `template-components/` and `template-pages/`
- Email: melodywebpages@gmail.com

---

**Remember:** The goal is a professional, production-ready site with consistent MelodyWebPages branding. Take your time to customize ALL text to accurately match your specific app!

