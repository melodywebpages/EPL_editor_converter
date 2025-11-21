# Template Pages

This directory contains complete legal and support page templates for Next.js applications.

## Pages Included

### 1. privacy-policy-page.tsx
Comprehensive GDPR and CCPA-compliant privacy policy template.

**Sections Covered:**
- Introduction
- Information Collection (user-provided and automatic)
- How information is used
- Data storage and processing
- Third-party services
- Cookies and tracking
- User rights (GDPR/CCPA)
- Data security
- Children's privacy
- Policy changes
- Contact information

**Installation:**
1. Create directory: `mkdir -p app/privacy-policy`
2. Copy file: `cp template-pages/privacy-policy-page.tsx app/privacy-policy/page.tsx`
3. Customize all `[bracketed placeholders]` with your app-specific information

**Critical Customizations:**
- Replace `[Your App Name]` throughout
- Update "Information We Collect" section with actual data your app collects
- Describe your data storage practices accurately (client-side vs server-side, retention policies)
- List ALL third-party services your app uses
- Update contact email if different from melodywebpages@gmail.com

---

### 2. terms-of-service-page.tsx
Comprehensive Terms of Service template covering legal requirements.

**Sections Covered:**
- Acceptance of Terms
- Service Description
- Use License (permitted use & restrictions)
- User Content and Responsibility
- Intellectual Property
- Third-Party Services
- Disclaimers and Warranties
- Limitation of Liability
- Indemnification
- Privacy Policy reference
- Service Modifications
- Terms Changes
- Governing Law
- Contact Information

**Installation:**
1. Create directory: `mkdir -p app/terms-of-service`
2. Copy file: `cp template-pages/terms-of-service-page.tsx app/terms-of-service/page.tsx`
3. Customize all `[bracketed placeholders]` with your app-specific information

**Critical Customizations:**
- Replace `[Your App Name]` throughout
- Update "Description of Service" with what your app actually does
- List permitted uses and restrictions specific to your app
- Explain how you handle user content
- List all third-party dependencies
- Update governing jurisdiction

---

### 3. contact-page.tsx
Professional contact page with FAQ section.

**Features:**
- Email contact card with icon
- Customizable FAQ section
- Bug report and feature request links
- Response time information
- Clean, modern design

**Installation:**
1. Create directory: `mkdir -p app/contact`
2. Copy file: `cp template-pages/contact-page.tsx app/contact/page.tsx`
3. Customize FAQ items with questions relevant to YOUR app

**Critical Customizations:**
- Replace all `[bracketed placeholders]`
- Write 4-5 FAQ items that are actually relevant to your app's functionality
- Update data storage explanation
- Update pricing/free service information
- Customize technical capability questions

---

### 4. report-bug-page.tsx
Dedicated bug report page with structured reporting guidelines.

**Features:**
- Clear bug reporting instructions
- Required information checklist
- Common issues section
- Response time expectations
- Feature suggestion CTA

**Installation:**
1. Create directory: `mkdir -p app/report-bug`
2. Copy file: `cp template-pages/report-bug-page.tsx app/report-bug/page.tsx`
3. Customize common issues section with your app's actual common problems

**Critical Customizations:**
- Replace `[Your App Name]`
- List 3-4 common issues users face with your app
- Provide troubleshooting tips for each common issue
- Update the sample data requirement if relevant to your app type

---

## General Customization Guidelines

### Search and Replace

Before deploying, search ALL page files for these placeholders and replace them:

1. `[Your App Name]` → Your actual application name
2. `[brief service description]` → One-line description of what your app does
3. `[Type of data/files]` → Specific data types your app handles
4. `[Your Jurisdiction]` → Your legal jurisdiction (e.g., "California, USA")

### App-Specific Content

Each page MUST be customized with:

- **Accurate service descriptions** - Don't use generic text; describe what YOUR app actually does
- **Real data practices** - Accurately reflect how your app stores/processes data
- **Actual third-party services** - List every external API, service, or library that collects data
- **Relevant FAQs** - Write questions users actually ask about YOUR app
- **Common issues** - Document bugs/issues specific to your app's functionality

### Legal Considerations

⚠️ **Important:** These templates provide a starting point but are not legal advice. Consider:

- Having a lawyer review your Privacy Policy and Terms of Service
- Ensuring compliance with GDPR (EU), CCPA (California), and other regulations
- Updating policies when you add new features or third-party services
- Maintaining accurate "Last Updated" dates
- Notifying users of material changes to terms

---

## Styling

All pages use:
- Gradient background: `from-blue-50 via-white to-purple-50`
- White card with `rounded-2xl shadow-xl`
- Consistent typography with Tailwind prose classes
- Responsive design (mobile-first)
- Accessible color contrast ratios

Ensure Tailwind CSS is configured in your project.

---

## Navigation

All pages include a "Back to [Your App Name]" link at the bottom. Update this if your app name or home route is different.

---

## Testing Checklist

After copying and customizing pages:

- [ ] All pages build without errors
- [ ] All `[placeholder]` text replaced
- [ ] Content accurately describes your app
- [ ] All internal links work (/privacy-policy, /terms-of-service, /contact, /report-bug)
- [ ] External links open correctly
- [ ] Mobile responsive (test on phone)
- [ ] No Lorem ipsum or generic filler text
- [ ] "Last Updated" date is current
- [ ] Email addresses are correct
- [ ] Footer component renders on all pages

---

## Quick Installation Script

```bash
# Create all directories
mkdir -p app/privacy-policy app/terms-of-service app/contact app/report-bug

# Copy all pages
cp template-pages/privacy-policy-page.tsx app/privacy-policy/page.tsx
cp template-pages/terms-of-service-page.tsx app/terms-of-service/page.tsx
cp template-pages/contact-page.tsx app/contact/page.tsx
cp template-pages/report-bug-page.tsx app/report-bug/page.tsx

# Now customize each file with your app-specific content!
```

---

## Support

For questions about these templates:
- Email: melodywebpages@gmail.com
- See TEMPLATE_IMPLEMENTATION_GUIDE.md for complete integration instructions

---

**Remember:** Generic legal pages look unprofessional and may not accurately reflect your app's practices. Always customize these templates to match your specific application!

