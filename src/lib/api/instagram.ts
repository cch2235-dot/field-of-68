// ============================================================
// INSTAGRAM API SERVICE
// ============================================================
// Credentials needed:
//   INSTAGRAM_ACCESS_TOKEN — Long-lived token from Facebook
//                            Developers (Instagram Basic Display API)
//
// Setup steps:
//   1. Create a Facebook App at developers.facebook.com
//   2. Add "Instagram Basic Display" product
//   3. Generate a User Access Token
//   4. Exchange for a long-lived token (valid 60 days, refreshable)
//   5. Add to .env.local as INSTAGRAM_ACCESS_TOKEN
//
// API Docs: https://developers.facebook.com/docs/instagram-basic-display-api
//
// Without token, falls back to /data/instagram.json.
// ============================================================

import { InstagramPost } from '@/types';
import fallbackPosts from '../../../data/instagram.json';

const IG_API_BASE = 'https://graph.instagram.com';

export async function getInstagramPosts(limit = 12): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn('[Instagram] No access token — using fallback data.');
    return fallbackPosts as InstagramPost[];
  }

  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,timestamp,permalink';
    const res = await fetch(
      `${IG_API_BASE}/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`,
      { next: { revalidate: 900 } } // Cache 15 minutes
    );

    if (!res.ok) throw new Error(`Instagram API error: ${res.status}`);

    const data = await res.json();

    return data.data.map((post: any): InstagramPost => ({
      id: post.id,
      caption: post.caption || '',
      thumbnail: post.thumbnail_url || post.media_url,
      mediaType: post.media_type,
      publishedAt: post.timestamp,
      // NOTE: Basic Display API does not expose like/comment counts.
      // For those metrics, use the Instagram Graph API (requires a
      // Facebook Business account and app review).
      likesCount: 0,
      commentsCount: 0,
      url: post.permalink,
    }));
  } catch (error) {
    console.error('[Instagram] API error, using fallback data:', error);
    return fallbackPosts as InstagramPost[];
  }
}
