#!/bin/bash

# Deployment script for Google Cloud Run
# Run this script to deploy your application

set -e  # Exit on error

echo "🚀 Deploying EPL Editor & Converter to Google Cloud Run..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Error: gcloud CLI is not installed"
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is logged in
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo "❌ Error: Not logged in to Google Cloud"
    echo "Run: gcloud auth login"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo "❌ Error: No Google Cloud project set"
    echo "Run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "📦 Project ID: $PROJECT_ID"
echo "🌍 Region: us-central1"

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and deploy
echo "🏗️  Building and deploying..."
gcloud run deploy epl-editor-converter \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --port 8080 \
  --timeout 60

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your application is now live!"
echo ""
echo "View your service:"
echo "gcloud run services describe epl-editor-converter --region us-central1"
echo ""
echo "View logs:"
echo "gcloud run logs tail epl-editor-converter --region us-central1"

