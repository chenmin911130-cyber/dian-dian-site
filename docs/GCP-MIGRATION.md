# Migrate diandianyudita.com from Railway to Google Cloud (Cloud Run)

This site is a Vite + React SPA. Production serves `dist/client` with `serve -s` (same as Railway). Cloud Run runs the included `Dockerfile`.

## Why Cloud Run (not Firebase-only)

- Same behaviour as Railway (`npm run build` → static files + SPA fallback).
- Keeps `worker/` and Sites handoff paths unchanged in the repo.
- Custom domain + managed TLS via Cloud Run domain mapping.

Region suggestion for New Zealand visitors: **`australia-southeast1` (Sydney)**.

## 1. Create Google Cloud project

1. [Google Cloud Console](https://console.cloud.google.com/) → create project (e.g. `dian-dian-site-prod`).
2. Link **billing** (Cloud Run free tier covers light traffic; billing account still required).
3. Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) and run:

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

## 2. Deploy from this repo

From the repository root (branch `main`, commit `a7e4903` or later):

```bash
export GCP_PROJECT_ID=YOUR_PROJECT_ID
chmod +x scripts/deploy-gcp-cloud-run.sh
./scripts/deploy-gcp-cloud-run.sh
```

This enables APIs, creates an Artifact Registry repo, builds the Docker image, and deploys to Cloud Run.

**Manual alternative** (no helper script):

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_REGION=australia-southeast1,_SERVICE=dian-dian-site
```

Note the **`*.run.app`** URL and open it in a browser. You should see campus photos and AI articles (not the old ICL content).

## 3. Attach custom domain

```bash
gcloud beta run domain-mappings create \
  --service dian-dian-site \
  --domain diandianyudita.com \
  --region australia-southeast1
```

Follow the **DNS records** Cloud Run prints. At your domain registrar, replace Railway records with Google’s. Propagation can take up to 48 hours; often much less.

Optional `www`:

```bash
gcloud beta run domain-mappings create \
  --service dian-dian-site \
  --domain www.diandianyudita.com \
  --region australia-southeast1
```

## 4. GitHub auto-deploy (optional)

1. Cloud Console → **Cloud Build** → **Triggers** → Connect GitHub repo `chenmin911130-cyber/dian-dian-site`.
2. Trigger on push to **`main`**, config file **`cloudbuild.yaml`**, same substitutions as above.

## 5. Turn off Railway

After `https://diandianyudita.com` serves the new build (check `/images/campus/uni-auckland.webp` returns `image/webp`):

1. Railway → project **dian-dian-site** → remove custom domain **diandianyudita.com**.
2. Optionally delete or pause the Railway service to avoid duplicate hosts.

## 6. Verify

```bash
curl -sI "https://diandianyudita.com/images/campus/uni-auckland.webp" | grep -i content-type
# expect: image/webp

curl -s "https://diandianyudita.com/" | grep -o 'assets/index-[^"]*\.js'
# bundle hash should differ from old index-C6MZW4F_.js
```

## Troubleshooting

| Issue | Action |
|--------|--------|
| Build fails on `test:sites` | Run `npm run build && npm run test:sites` locally first. |
| 403 on deploy | Cloud Build service account needs **Cloud Run Admin** + **Artifact Registry Writer** (default when using Cloud Build trigger). |
| Domain mapping pending | DNS not pointing to Google yet; wait or re-check registrar. |
| Railway still shows old site | DNS still on Railway; flush local DNS or use `dig diandianyudita.com`. |

## Cost (rough)

Low-traffic consulting site: often within Cloud Run free tier; main cost is domain + minimal Cloud Build minutes. Set a [budget alert](https://cloud.google.com/billing/docs/how-to/budgets) in Billing.
