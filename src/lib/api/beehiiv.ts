import { Article } from '@/types';
import fallbackArticles from '../../../data/articles.json';
const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';
export async function getArticles(limit = 24): Promise<Article[]> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) { console.warn('[Beehiiv] No credentials found — using fallback data.'); return fallbackArticles as Article[]; }
  try {
    const res = await fetch(`${BEEHIIV_API_BASE}/publications/${publicationId}/posts?status=confirmed&limit=${limit}`, {
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error(`Beehiiv API error: ${res.status}`);
    const data = await res.json();
    return data.data.map((post: any): Article => ({
      id: post.id, title: post.subject || post.slug, excerpt: post.preview_text || '',
      content: '', author: post.authors?.[0]?.name || 'Field of 68',
      publishedAt: new Date(post.publish_date * 1000).toISOString(),
      thumbnail: post.thumbnail_url || 'https://picsum.photos/seed/fallback/800/450',
      category: post.content_tags?.[0]?.name || 'The Daily',
      tags: post.content_tags?.map((t: any) => t.name) || [],
      url: post.web_url || `https://fieldof68.beehiiv.com/p/${post.slug}`,
      readTime: '5 min read',
    }));
  } catch (error) { console.error('[Beehiiv] API error, using fallback data:', error); return fallbackArticles as Article[]; }
}
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return { success: true, message: 'Subscribed successfully!' };
  try {
    const res = await fetch(`${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, reactivate_existing: false, send_welcome_email: true }),
    });
    if (!res.ok) throw new Error('Subscription failed');
    return { success: true, message: "You're subscribed! Check your inbox." };
  } catch (error: any) { return { success: false, message: error.message || 'Something went wrong.' }; }
}
