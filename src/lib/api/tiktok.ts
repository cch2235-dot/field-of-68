// ============================================================
// TIKTOK API SERVICE
// ============================================================
// Credentials needed:
//   TIKTOK_ACCESS_TOKEN — from TikTok Developer Portal
//   TIKTOK_CLIENT_KEY   — your app's client key
//
// Setup steps:
//   1. Create an app at developers.tiktok.com
//   2. Add "Login Kit" and "Content Posting API" products
//   3. Complete app review for content display permissions
//   4. Exchange auth code for access token
//   5. Add to .env.local
//
// NOTE: TikTok's public API for displaying content on external
// sites requires app review. Until approved, use fallback data
// or embed individual TikTok videos using their oEmbed API.
//
// oEmbed (no auth required): https://www.tiktok.com/oembed?url=VIDEO_URL
//
// Without token, falls back to /data/tiktok.json.
// ============================================================

import { TikTokPost } from '@/types';
import fallbackPosts from '../../../data/tiktok.json';

export function formatTikTokViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
}

export async function getTikTokPosts(limit = 8): Promise<TikTokPost[]> {
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn('[TikTok] No access token — using fallback data.');
    return fallbackPosts as TikTokPost[];
  }

  try {
    // TikTok Content Posting API — requires approved app
    const res = await fetch(
      'https://open.tiktokapis.com/v2/video/list/?fields=id,title,cover_image_url,video_description,duration,view_count,like_count,comment_count,share_count,create_time,share_url',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ max_count: limit }),
        next: { revalidate: 900 },
      }
    );

    if (!res.ok) throw new Error(`TikTok API error: ${res.status}`);

    const data = await res.json();
    const videos = data.data?.videos || [];

    return videos.map((v: any): TikTokPost => ({
      id: v.id,
      caption: v.video_description || v.title || '',
      thumbnail: v.cover_image_url,
      viewCount: v.view_count || 0,
      likesCount: v.like_count || 0,
      commentsCount: v.comment_count || 0,
      sharesCount: v.share_count || 0,
      publishedAt: new Date(v.create_time * 1000).toISOString(),
      duration: v.duration || 0,
      url: v.share_url || 'https://www.tiktok.com/@fieldof68',
    }));
  } catch (error) {
    console.error('[TikTok] API error, using fallback data:', error);
    return fallbackPosts as TikTokPost[];
  }
}
