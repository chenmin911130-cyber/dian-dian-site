#!/usr/bin/env bash
# One-time GCP setup + deploy for diandianyudita.com (Cloud Run).
# Run on your machine with gcloud installed and billing enabled.
set -euo pipefail

PROJECT_ID="${GCP_PROJECT_ID:-}"
REGION="${GCP_REGION:-australia-southeast1}"
SERVICE="${GCP_SERVICE:-dian-dian-site}"
AR_REPO="${GCP_AR_REPO:-dian-dian-site}"
DOMAIN="${GCP_DOMAIN:-diandianyudita.com}"

if [[ -z "$PROJECT_ID" ]]; then
  echo "Set GCP_PROJECT_ID to your Google Cloud project id, e.g.:"
  echo "  export GCP_PROJECT_ID=my-nz-site-prod"
  exit 1
fi

gcloud config set project "$PROJECT_ID"

echo "Enabling APIs (first run may take a minute)..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  --quiet

if ! gcloud artifacts repositories describe "$AR_REPO" --location="$REGION" &>/dev/null; then
  gcloud artifacts repositories create "$AR_REPO" \
    --repository-format=docker \
    --location="$REGION" \
    --description="DianDian site containers"
fi

echo "Building and deploying via Cloud Build..."
gcloud builds submit --config cloudbuild.yaml \
  --substitutions="_REGION=${REGION},_SERVICE=${SERVICE},_AR_REPO=${AR_REPO}"

URL="$(gcloud run services describe "$SERVICE" --region="$REGION" --format='value(status.url)')"
echo ""
echo "Service URL: $URL"
echo "Open this URL and confirm the site loads before changing DNS."
echo ""
echo "Custom domain (after site looks correct on $URL):"
echo "  gcloud beta run domain-mappings create \\"
echo "    --service $SERVICE \\"
echo "    --domain $DOMAIN \\"
echo "    --region $REGION"
echo ""
echo "Then add the DNS records gcloud prints (usually CNAME/A/AAAA at your registrar)."
echo "Remove diandianyudita.com from Railway after DNS propagates and HTTPS works on GCP."
