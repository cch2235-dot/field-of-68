// ============================================================
// BEEHIIV API SERVICE
// ============================================================
// Credentials needed:
//   BEEHIIV_API_KEY        — from Beehiiv Settings > Integrations
//   BEEHIIV_PUBLICATION_ID — your pub_xxx ID from Beehiiv Settings
//
// API Docs: https://developers.beehiiv.com/docs/v2
//
// To activate: add both variables to .env.local.
// Without credentials, falls back to /data/articles.json.
// ============================================================

import { Article } from '@/types';
import fallbackArticles from '../../../data/articles.json';

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';

export async function getArticles(limit = 12): Promise<Article[]> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.warn('[Beehiiv] No credentials found — using fallback data.');
    return fallbackArticles as Article[];
  }

  try {
    const res = await fetch(
      `${BEEHIIV_API_BASE}/publications/${publicationId}/posts?status=confirmed&limit=${limit}&expand[]=free_web_content`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 }, // Cache 30 minutes
      }
    );

    if (!res.ok) throw new Error(`Beehiiv API error: ${res.status}`);

    const data = await res.json();

    return data.data.map((post: any): Article => ({
      id: post.id,
      title: post.subject || post.slug,
      excerpt: post.preview_text || post.subtitle || '',
      content: '',
      author: post.authors?.[0]?.name || 'Field of 68',
      publishedAt: new Date(post.publish_date * 1000).toISOString(),
      thumbnail:
        post.thumbnail_url ||
        post.content_tags?.[0]?.thumbnail_url ||
        'https://picsum.photos/seed/fallback/800/450',
      category: post.content_tags?.[0]?.name || 'Analysis',
      tags: post.content_tags?.map((t: any) => t.name) || [],
      url: post.web_url || `https://fieldof68.beehiiv.com/p/${post.slug}`,
      readTime: `${Math.ceil((post.stats?.unique_opens || 500) / 100)} min read`,
    }));
  } catch (error) {
    console.error('[Beehiiv] API error, using fallback data:', error);
    return fallbackArticles as Article[];
  }
}

// ============================================================
// NEWSLETTER SUBSCRIBE
// ============================================================
// Sends an email address to Beehiiv's subscribe endpoint.
// Called from the NewsletterSignup component (client-side
// route handler: /api/subscribe).
// ============================================================
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    // In development without credentials, simulate success
    console.warn('[Beehiiv] No credentials — simulating subscribe success.');
    return { success: true, message: 'Subscribed successfully!' };
  }

  try {
    const res = await fetch(
      `${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'fieldof68.com',
          utm_medium: 'website',
          utm_campaign: 'newsletter_signup',
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Subscription failed');
    }

    return { success: true, message: "You're subscribed! Check your inbox." };
  } catch (error: any) {
    console.error('[Beehiiv] Subscribe error:', error);
    return { success: false, message: error.message || 'Something went wrong.' };
  }
}
