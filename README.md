# The Field of 68 — Media Hub Website

A full Next.js 14 website serving as the central home for all Field of 68 college basketball content across YouTube, Instagram, TikTok, Twitter/X, and Beehiiv.

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add your API keys (see **API Keys** section below). The site runs without any keys using fallback data.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

---

## API Keys — Where to Add Them

All credentials live in `.env.local`. Copy `.env.example` to get started.

### YouTube
```
YOUTUBE_API_KEY=your_key_here
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxx
```
- Get your API key from [Google Cloud Console](https://console.cloud.google.com) → Enable "YouTube Data API v3"
- Find your Channel ID in YouTube Studio → Settings → Channel → Advanced Settings
- Without these, the site uses `/data/youtube.json`

### Beehiiv
```
BEEHIIV_API_KEY=your_key_here
BEEHIIV_PUBLICATION_ID=pub_xxxx
```
- Get from [Beehiiv Settings → Integrations](https://app.beehiiv.com/settings/integrations)
- Without these, the site uses `/data/articles.json` and simulates newsletter subscriptions

### Instagram
```
INSTAGRAM_ACCESS_TOKEN=your_token_here
```
- Set up at [developers.facebook.com](https://developers.facebook.com) via Instagram Basic Display API
- Long-lived tokens last 60 days — use a cron job to refresh them
- Without this, the site uses `/data/instagram.json`

### TikTok
```
TIKTOK_ACCESS_TOKEN=your_token_here
TIKTOK_CLIENT_KEY=your_client_key
```
- Set up at [developers.tiktok.com](https://developers.tiktok.com)
- Note: TikTok's Content API requires app review
- Without this, the site uses `/data/tiktok.json`

### Twitter / X
```
X_BEARER_TOKEN=your_bearer_token_here
```
- Get from [developer.twitter.com](https://developer.twitter.com) → Your App → Keys and Tokens
- Without this, the site uses `/data/twitter.json`

---

## How Each Integration Works

### YouTube (`src/lib/api/youtube.ts`)
1. Fetches the channel's "uploads" playlist ID
2. Gets the latest video IDs from that playlist
3. Fetches full video details (duration, view count, thumbnails)
4. Falls back to `/data/youtube.json` if credentials are missing

### Beehiiv (`src/lib/api/beehiiv.ts`)
- Fetches confirmed (published) posts from the publication
- Newsletter subscriptions post to the Beehiiv subscriptions endpoint
- The `/api/subscribe` route handles signups from the frontend
- Falls back to `/data/articles.json`

### Instagram (`src/lib/api/instagram.ts`)
- Uses Instagram Basic Display API to fetch the user's media feed
- Note: Basic Display API doesn't expose like/comment counts; those require the Graph API with business account access
- Falls back to `/data/instagram.json`

### TikTok (`src/lib/api/tiktok.ts`)
- Uses the TikTok Content Posting API to list the user's videos
- Falls back to `/data/tiktok.json`

### Twitter/X (`src/lib/api/twitter.ts`)
- Fetches recent tweets from `@FieldOf68` and `@JonRothstein`
- Edit `X_HANDLES` array in the file to change which accounts are pulled
- Falls back to `/data/twitter.json`

---

## Replacing Placeholder Data

All fallback data lives in `/data/*.json`. Update these files to change the sample content shown before APIs are connected.

| File | Purpose |
|---|---|
| `/data/youtube.json` | Sample videos |
| `/data/articles.json` | Sample articles |
| `/data/instagram.json` | Sample Instagram posts |
| `/data/tiktok.json` | Sample TikTok posts |
| `/data/twitter.json` | Sample tweets |
| `/data/shows.json` | Show information and metadata |

**Shows** (`/data/shows.json`) is always used as the source for show data. Update it to change show names, descriptions, hosts, YouTube playlist URLs, and podcast links.

---

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    page.tsx              # Homepage
    videos/               # Videos page
    social/               # Unified social feed
    articles/             # Articles listing
    shows/                # Shows directory
    about/                # About page
    contact/              # Contact / Advertise
    api/
      subscribe/           # Newsletter signup API route
  components/             # Reusable React components
    Header.tsx
    Footer.tsx
    VideoCard.tsx
    ArticleCard.tsx
    SocialPostCard.tsx     # Instagram, TikTok & Tweet cards
    ShowCard.tsx
    NewsletterSignup.tsx
    SponsorCTA.tsx
  lib/
    api/                  # API service files
      youtube.ts
      beehiiv.ts
      instagram.ts
      tiktok.ts
      twitter.ts
    utils.ts              # Shared helpers
  types/
    index.ts              # TypeScript type definitions
data/                     # Fallback JSON data
```

---

## Pages Overview

| URL | Page | Revalidation |
|---|---|---|
| `/` | Home | 30 min |
| `/videos` | Videos with category filters | 30 min |
| `/social` | Unified social feed with platform tabs | 15 min |
| `/articles` | Article grid + newsletter CTA | 30 min |
| `/shows` | All shows with episode details | Static |
| `/about` | Team & mission page | Static |
| `/contact` | Advertise / partnership inquiry | Client |

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/field-of-68.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New Project"
3. Import your GitHub repository
4. Select "Next.js" framework (auto-detected)

### 3. Add Environment Variables

In your Vercel project settings → Environment Variables, add all the keys from your `.env.local`:
- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_ID`
- `BEEHIIV_API_KEY`
- `BEEHIIV_PUBLICATION_ID`
- `INSTAGRAM_ACCESS_TOKEN`
- `TIKTOK_ACCESS_TOKEN`
- `TIKTOK_CLIENT_KEY`
- `X_BEARER_TOKEN`
- `NEXT_PUBLIC_SITE_URL` (set to your production domain, e.g. `https://fieldof68.com`)

### 4. Deploy

Click "Deploy" — Vercel will build and deploy automatically. Every push to `main` will trigger a new deploy.

### Custom Domain

In Vercel → Project Settings → Domains, add `fieldof68.com` and follow the DNS instructions.

---

## Performance Notes

- All API calls use Next.js `fetch` with `revalidate` for ISR (Incremental Static Regeneration)
- Images use `next/image` for automatic optimization and lazy loading
- The site is fully mobile-first and works great on all screen sizes
- Fonts (Bebas Neue + Barlow) are loaded from Google Fonts via the CSS layer

---

## Adding a New Show

Edit `/data/shows.json` and add an object following the existing format:

```json
{
  "id": "show007",
  "name": "Your Show Name",
  "slug": "your-show-slug",
  "tagline": "Short tagline here.",
  "description": "Full description of the show.",
  "hosts": ["Host Name"],
  "thumbnail": "https://your-image-url.com/thumbnail.jpg",
  "youtubePlaylistUrl": "https://youtube.com/playlist?list=xxx",
  "podcastUrl": "https://open.spotify.com/show/xxx",
  "appleUrl": "https://podcasts.apple.com/xxx",
  "latestEpisode": {
    "title": "Episode Title",
    "date": "2025-01-15T00:00:00Z",
    "url": "https://youtube.com/watch?v=xxx",
    "thumbnail": "https://your-image-url.com/episode.jpg"
  },
  "episodeCount": 1,
  "color": "#1A1A1A",
  "accentColor": "#E8530A"
}
```

---

## Contact

For questions about this codebase or the Field of 68 website:
- Twitter: [@FieldOf68](https://twitter.com/FieldOf68)
- Email: partnerships@fieldof68.com
