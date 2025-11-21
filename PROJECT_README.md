# EPL Editor & Converter

Free online EPL (Eltron Programming Language) editor with live preview. Edit EPL code and convert to ZPL, PDF, or PNG formats.

## 🚀 Features

- 📝 **Live EPL Code Editor** - Edit EPL code with syntax highlighting
- 👁️ **Real-time Preview** - See your label as you type
- 🔄 **Multi-Format Export** - Convert to ZPL, PDF, or PNG
- 📦 **Multiple Label Support** - Handle multiple labels in one file
- 🎨 **Dark Mode** - Eye-friendly dark theme
- 📱 **Mobile Responsive** - Works on all devices
- 🔒 **Privacy First** - No file storage, client-side processing

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Labelary API** (for ZPL rendering)

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit http://localhost:3000

## 🚀 Deployment

This app is configured for Google Cloud Run deployment:

```bash
# Deploy to Cloud Run
gcloud run deploy epl-editor-converter --source .
```

See `deployment` folder for Docker and Cloud Build configs.

## 📁 Project Structure

```
epl-pdf-zpl/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main converter page
│   ├── layout.tsx         # Root layout with Footer
│   ├── privacy-policy/    # Privacy policy page
│   ├── terms-of-service/  # Terms page
│   ├── contact/           # Contact page
│   └── report-bug/        # Bug report page
├── components/            # React components
│   ├── Footer.tsx         # Professional footer
│   ├── GoogleAnalytics.tsx
│   ├── GoogleAdsense.tsx
│   └── CookieConsent.tsx
├── utils/                 # Utility functions
│   └── eplToZpl.ts       # EPL to ZPL conversion logic
├── professional-template/ # 📦 Reusable template for other projects
└── public/               # Static files
```

## 📦 Professional Template

The `professional-template/` folder contains a **complete reusable template** for adding professional components to any Next.js app.

**Includes:**
- Professional Footer with MelodyWebPages branding
- Google Analytics & AdSense integration
- Cookie consent banner
- Legal pages (Privacy, Terms, Contact, Bug Report)
- Deployment configuration
- Complete documentation

**To use in other projects:**
```bash
# Copy .cursorrules to your other project and let Cursor AI implement
cp professional-template/.cursorrules /path/to/your-project/

# Or see professional-template/README.md for manual instructions
```

## 🌐 Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## 📄 License

This project is created by MelodyWebPages.

## 📞 Contact

- **Email:** melodywebpages@gmail.com
- **Response Time:** 24-48 hours

---

Made with ❤️ by **MelodyWebPages** 𝄞

