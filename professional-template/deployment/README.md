# Template Deployment Configuration

This directory contains all files needed to deploy your Next.js app to Google Cloud Run with Docker and CI/CD automation.

---

## Files Included

### 1. **Dockerfile**
Multi-stage Docker build configuration optimized for Next.js production deployment.

**Features:**
- Multi-stage build for smaller image size
- Node 18 Alpine Linux base (lightweight)
- Non-root user for security
- Port 8080 for Google Cloud Run
- Production-optimized

**Installation:**
```bash
cp template-deployment/Dockerfile ./Dockerfile
```

**No customization needed** - this file works as-is for most Next.js apps.

---

### 2. **cloudbuild.yaml**
Google Cloud Build CI/CD configuration for automatic deployments.

**Features:**
- Automatic builds on git push
- Docker image creation and push to GCR
- Auto-deployment to Cloud Run
- Configurable memory and CPU
- Environment variable support

**Installation:**
```bash
cp template-deployment/cloudbuild.yaml ./cloudbuild.yaml
```

**Required Customization:**
Replace all instances of `[your-app-name]` with your app's slug:
- Example: `epl-converter`, `pdf-tool`, `my-app`
- Must be lowercase, no spaces
- Used for Docker image and Cloud Run service name

**Optional:** Add environment variables in the deploy step (see comments in file).

---

### 3. **.env.example**
Template for environment variables.

**Installation:**
```bash
cp template-deployment/.env.example ./.env.example
```

**Local Development:**
```bash
cp .env.example .env.local
# Edit .env.local with your actual keys
```

**Included Variables:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` - Google AdSense

**Add your own variables** as needed for your app.

---

### 4. **next.config.example.js**
Next.js configuration with required settings for Docker deployment.

**Critical Setting:**
```javascript
output: 'standalone'
```

This is **REQUIRED** for Docker builds to work.

**Installation:**

If you don't have `next.config.js`:
```bash
cp template-deployment/next.config.example.js ./next.config.js
```

If you already have `next.config.js`:
```javascript
// Just add this line to your existing config:
const nextConfig = {
  output: 'standalone',
  // ... your other settings
}
```

---

### 5. **robots.txt**
Search engine crawler configuration.

**Installation:**
```bash
cp template-deployment/robots.txt ./public/robots.txt
```

**Required Customization:**
Replace `https://yourdomain.com` with your actual domain.

---

### 6. **ads.txt**
Google AdSense verification file (only needed if using AdSense).

**Installation:**
```bash
cp template-deployment/ads.txt ./public/ads.txt
```

**Required Customization:**
Replace `pub-XXXXXXXXXXXXXXXX` with your actual AdSense Publisher ID.

**If NOT using AdSense:** Skip this file.

---

### 7. **.gitignore-additions**
Important additions for your `.gitignore` file.

**Installation:**
```bash
cat template-deployment/.gitignore-additions >> .gitignore
```

This ensures `.env.local` and other sensitive files are never committed.

---

## Complete Deployment Guide

### Prerequisites

1. **Google Cloud Account**
   - Create account at https://cloud.google.com
   - Create a new project or select existing one

2. **Install gcloud CLI**
   - Download from https://cloud.google.com/sdk/docs/install
   - Install and restart terminal

3. **Node.js and npm**
   - Node 18+ recommended
   - Verify: `node --version` and `npm --version`

---

### Step 1: Initial Setup

```bash
# 1. Authenticate with Google Cloud
gcloud auth login

# 2. Set your project
gcloud config set project [YOUR_PROJECT_ID]

# 3. Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

---

### Step 2: Copy Template Files

```bash
# Copy deployment files
cp template-deployment/Dockerfile ./
cp template-deployment/cloudbuild.yaml ./
cp template-deployment/.env.example ./
cp template-deployment/robots.txt ./public/
cp template-deployment/ads.txt ./public/  # Only if using AdSense

# Update .gitignore
cat template-deployment/.gitignore-additions >> .gitignore

# Create local environment file
cp .env.example .env.local
```

---

### Step 3: Customize Files

1. **cloudbuild.yaml:**
   - Replace `[your-app-name]` (7 occurrences) with your app slug

2. **next.config.js:**
   - Add `output: 'standalone'` to config

3. **.env.local:**
   - Fill in your Google Analytics ID
   - Fill in your AdSense ID
   - Add any other secrets

4. **robots.txt:**
   - Update domain URL

5. **ads.txt** (if using):
   - Update Publisher ID

---

### Step 4: Test Locally

```bash
# Install dependencies
npm install

# Build the app
npm run build

# Test the build
npm start

# Open http://localhost:8080
```

If build succeeds and app runs, you're ready to deploy!

---

### Step 5: Manual Deployment (First Time)

```bash
# Deploy to Cloud Run (manual)
gcloud run deploy [your-app-name] \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --port 8080
```

Wait for build and deployment (5-10 minutes first time).

You'll get a URL like: `https://your-app-name-xxxxx-uc.a.run.app`

---

### Step 6: Set Environment Variables in Production

```bash
# Set Google Analytics
gcloud run services update [your-app-name] \
  --region us-central1 \
  --set-env-vars "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX"

# Set Google AdSense
gcloud run services update [your-app-name] \
  --region us-central1 \
  --set-env-vars "NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX"

# Or set multiple at once:
gcloud run services update [your-app-name] \
  --region us-central1 \
  --set-env-vars "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX,NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX"
```

---

### Step 7: Setup CI/CD with GitHub (Optional but Recommended)

1. **Connect GitHub to Cloud Build:**
   - Go to: https://console.cloud.google.com/cloud-build/triggers
   - Click "Connect Repository"
   - Select GitHub, authenticate, choose your repo

2. **Create Build Trigger:**
   - Name: `Deploy on Push to Main`
   - Event: Push to branch
   - Branch: `^main$` (or `^master$`)
   - Configuration: Cloud Build configuration file (yaml or json)
   - Location: `/cloudbuild.yaml`
   - Click "Create"

3. **Test Automatic Deployment:**
   ```bash
   # Make a change and push
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```

   - Check Cloud Build dashboard for progress
   - Deployment happens automatically!

---

## Useful Commands

### View Logs
```bash
gcloud run logs read [your-app-name] --limit=50
```

### Update Service
```bash
# Update memory
gcloud run services update [your-app-name] --memory 1Gi --region us-central1

# Update max instances
gcloud run services update [your-app-name] --max-instances 20 --region us-central1
```

### Delete Service
```bash
gcloud run services delete [your-app-name] --region us-central1
```

### Test Docker Build Locally
```bash
# Build image
docker build -t [your-app-name] .

# Run locally
docker run -p 8080:8080 [your-app-name]

# Test at http://localhost:8080
```

---

## Troubleshooting

### Build Fails

**Error: "output: standalone not found"**
- Solution: Add `output: 'standalone'` to `next.config.js`

**Error: "Module not found"**
- Solution: Delete `node_modules` and `.next`, run `npm install` and `npm run build`

### Deployment Fails

**Error: "Permission denied"**
- Solution: Enable required APIs (see Step 1)
- Or: Check IAM permissions in Cloud Console

**Error: "Port binding failed"**
- Solution: Ensure `PORT=8080` in Dockerfile
- Cloud Run requires port 8080

### Environment Variables Not Working

**Variables undefined in production:**
- Check: Did you set them with `gcloud run services update`?
- Check: Are they prefixed with `NEXT_PUBLIC_` for client-side?
- Server-side variables don't need `NEXT_PUBLIC_` prefix

---

## Cost Estimates

Google Cloud Run Pricing (as of 2024):

- **Free Tier:** 180,000 vCPU-seconds, 360,000 GiB-seconds per month
- **Small App:** ~$0-5/month (within free tier)
- **Medium Traffic:** ~$10-30/month
- **High Traffic:** Scales automatically, pay-per-use

**Tips to minimize costs:**
- Use `--memory 512Mi` (sufficient for most Next.js apps)
- Set `--max-instances 10` to limit scale
- Enable `--cpu-throttling` when idle

---

## Security Best Practices

1. **Never commit secrets:**
   - Keep `.env.local` in `.gitignore`
   - Use Cloud Secret Manager for sensitive data

2. **Use non-root user:**
   - Dockerfile already configured with non-root user

3. **Keep dependencies updated:**
   ```bash
   npm audit
   npm update
   ```

4. **Enable Cloud Armor (optional):**
   - DDoS protection
   - Rate limiting

---

## Custom Domain Setup

1. **Verify domain ownership in Google Cloud**
2. **Map domain to Cloud Run:**
   ```bash
   gcloud run domain-mappings create \
     --service [your-app-name] \
     --domain yourdomain.com \
     --region us-central1
   ```
3. **Update DNS records** as instructed by Cloud Console

---

## Support

For deployment issues:
- Google Cloud Docs: https://cloud.google.com/run/docs
- Next.js Docs: https://nextjs.org/docs/deployment
- Email: melodywebpages@gmail.com

---

**Remember:** Test locally before deploying! Always run `npm run build` successfully before pushing to production.

