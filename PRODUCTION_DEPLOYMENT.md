# 🚀 Production Deployment Guide for Google Cloud Run

Complete guide to deploy your EPL Editor & Converter to production.

---

## 📋 Prerequisites

### 1. Install Google Cloud SDK

**Windows:**
```powershell
# Download and install from:
https://cloud.google.com/sdk/docs/install
```

**Verify installation:**
```bash
gcloud --version
```

### 2. Create Google Cloud Account

1. Go to https://cloud.google.com/
2. Sign up (get $300 free credit)
3. Create a new project

---

## 🔧 Setup Steps

### Step 1: Initialize Google Cloud

```bash
# Login to Google Cloud
gcloud auth login

# Set your project ID (replace with your actual project ID)
gcloud config set project YOUR_PROJECT_ID

# Set default region
gcloud config set run/region us-central1
```

### Step 2: Enable Required APIs

```bash
# Enable Cloud Run
gcloud services enable run.googleapis.com

# Enable Cloud Build
gcloud services enable cloudbuild.googleapis.com

# Enable Container Registry
gcloud services enable containerregistry.googleapis.com
```

### Step 3: Configure Environment Variables

Create `.env.production` file (DON'T commit to git):

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense (When approved)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

---

## 🚀 Deployment Options

### Option 1: Automated Script (Recommended)

**On Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**On Windows:**
```powershell
bash deploy.sh
```

### Option 2: Manual Deployment

```bash
# Build and deploy in one command
gcloud run deploy epl-editor-converter \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --port 8080
```

### Option 3: Using Docker

```bash
# Build Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/epl-editor-converter .

# Push to Google Container Registry
docker push gcr.io/YOUR_PROJECT_ID/epl-editor-converter

# Deploy from image
gcloud run deploy epl-editor-converter \
  --image gcr.io/YOUR_PROJECT_ID/epl-editor-converter \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated
```

---

## 🌐 Custom Domain Setup

### Step 1: Verify Domain

```bash
# Map custom domain
gcloud beta run domain-mappings create \
  --service epl-editor-converter \
  --domain yourdomain.com \
  --region us-central1
```

### Step 2: Update DNS Records

Add these records to your domain registrar (e.g., GoDaddy, Namecheap):

```
Type: A
Name: @
Value: [IP provided by Google Cloud]

Type: AAAA
Name: @
Value: [IPv6 provided by Google Cloud]
```

### Step 3: Update Environment

Update `.env.production`:
```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Redeploy:
```bash
./deploy.sh
```

---

## 📊 Google Analytics Setup

### 1. Create GA4 Property

1. Go to https://analytics.google.com
2. Create new GA4 property
3. Get Measurement ID (format: G-XXXXXXXXXX)

### 2. Add to Environment

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Redeploy

```bash
gcloud run services update epl-editor-converter \
  --update-env-vars NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
  --region us-central1
```

---

## 💰 Google AdSense Setup

### 1. Apply for AdSense

1. Go to https://www.google.com/adsense
2. Apply with your domain
3. Wait for approval (1-2 weeks)

### 2. Get Publisher ID

After approval:
1. Sign in to AdSense
2. Go to Account → Account Information
3. Copy Publisher ID (format: ca-pub-XXXXXXXXXXXXXXXX)

### 3. Add to Environment

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

### 4. Create Ad Units

1. In AdSense, go to Ads → By ad unit
2. Create ad units
3. Copy ad slot IDs

### 5. Place Ads in Your App

Edit `app/page.tsx` to add ads:

```typescript
import AdBanner from '@/components/AdBanner';

// Inside your component, add:
<AdBanner 
  adSlot="1234567890"  // Your ad slot ID
  adFormat="auto"
  className="my-8"
/>
```

---

## 🔒 Security Checklist

- [x] ✅ Security headers configured (middleware.ts)
- [x] ✅ Rate limiting enabled (60 req/min)
- [x] ✅ HTTPS enforced (automatic on Cloud Run)
- [x] ✅ No sensitive data in code
- [x] ✅ Environment variables for secrets
- [x] ✅ CORS configured properly
- [x] ✅ XSS protection enabled
- [x] ✅ SQL injection not applicable (no database)
- [x] ✅ Non-root Docker user
- [x] ✅ No test files in production build

---

## 📈 Monitoring & Logging

### View Logs

```bash
# Real-time logs
gcloud run logs tail epl-editor-converter --region us-central1

# Recent logs
gcloud run logs read epl-editor-converter --limit=100 --region us-central1
```

### View Metrics

```bash
# Service details
gcloud run services describe epl-editor-converter --region us-central1

# Get service URL
gcloud run services describe epl-editor-converter \
  --region us-central1 \
  --format 'value(status.url)'
```

### Health Check

```bash
# Test health endpoint
curl https://YOUR_SERVICE_URL/api/health
```

---

## 💵 Cost Optimization

### Cloud Run Pricing (Free Tier)

- **2 million requests/month** - FREE
- **360,000 GB-seconds** - FREE
- **180,000 vCPU-seconds** - FREE

### Your Configuration

```
Memory: 512Mi
CPU: 1
Max Instances: 10
```

**Estimated Cost:**
- Low traffic (< 100k requests/month): **$0/month** (free tier)
- Medium traffic (500k requests/month): **~$5-10/month**
- High traffic (1M requests/month): **~$15-25/month**

### Cost Reduction Tips

1. **Set min instances to 0** (cold starts acceptable)
2. **Reduce max instances** if traffic is low
3. **Use Cloud CDN** for static assets
4. **Enable HTTP/2** (automatic)

---

## 🔄 CI/CD Setup (Optional)

### Automatic Deployments on Git Push

1. **Connect GitHub to Cloud Build:**

```bash
gcloud builds connect github
```

2. **Create Trigger:**

```bash
gcloud builds triggers create github \
  --repo-name=EPL_editor_converter \
  --repo-owner=melodywebpages \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

Now every push to `main` branch auto-deploys!

---

## 🚨 Troubleshooting

### Issue: Deployment Fails

```bash
# Check build logs
gcloud builds list --limit=5

# Get specific build log
gcloud builds log BUILD_ID
```

### Issue: Service Not Accessible

```bash
# Check service status
gcloud run services describe epl-editor-converter --region us-central1

# Check if service is public
gcloud run services get-iam-policy epl-editor-converter --region us-central1
```

### Issue: Out of Memory

```bash
# Increase memory
gcloud run services update epl-editor-converter \
  --memory 1Gi \
  --region us-central1
```

### Issue: Slow Response

```bash
# Increase CPU
gcloud run services update epl-editor-converter \
  --cpu 2 \
  --region us-central1
```

---

## 📞 Support Resources

- **Google Cloud Run Docs**: https://cloud.google.com/run/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Cloud Run Pricing**: https://cloud.google.com/run/pricing
- **Stack Overflow**: Tag `google-cloud-run`

---

## ✅ Post-Deployment Checklist

- [ ] Service deployed successfully
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic)
- [ ] Google Analytics working
- [ ] Health check endpoint responding
- [ ] Privacy Policy updated with domain
- [ ] Terms of Service updated with domain
- [ ] Contact page updated
- [ ] ads.txt file updated
- [ ] Sitemap updated with domain
- [ ] Google Search Console configured
- [ ] Google AdSense applied (if not already)
- [ ] Monitoring enabled
- [ ] Backup strategy in place (code on GitHub ✓)

---

## 🎉 You're Live!

Your EPL Editor & Converter is now production-ready and deployed!

**Next Steps:**
1. Test all features
2. Monitor logs for first few days
3. Apply for Google AdSense
4. Set up Google Analytics goals
5. Submit to Google Search Console
6. Share with users!

Good luck! 🚀

