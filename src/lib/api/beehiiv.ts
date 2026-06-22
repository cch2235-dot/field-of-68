import { Article } from '@/types';

const BEEHIIV_API_BASE = 'https://api.beehiiv.com/v2';

export async function getArticles(limit = 24): Promise<Article[]> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return [];
  try {
    const res = await fetch(
      `${BEEHIIV_API_BASE}/publications/${publicationId}/posts?status=confirmed&limit=${limit}&order_by=publish_date&direction=desc`,
      { headers: { Authorization: `Bearer ${apiKey}` }, next: { revalidate: 1800 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data.map((post: any): Article => ({
      id: post.id,
      title: post.subject || post.slug,
      excerpt: post.preview_text || '',
      content: '',
      author: post.authors?.[0]?.name || 'Field of 68',
      publishedAt: new Date(post.publish_date * 1000).toISOString(),
      thumbnail: post.thumbnail_url || '',
      category: post.content_tags?.[0]?.name || 'The Daily',
      tags: post.content_tags?.map((t: any) => t.name) || [],
      url: post.web_url || `https://fieldof68.beehiiv.com/p/${post.slug}`,
      readTime: '5 min read',
    }));
  } catch { return []; }
}

export async function getBeehiivPosts(limit = 60) { return getArticles(limit); }

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return { success: true, message: 'Subscribed!' };
  try {
    const res = await fetch(`${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, reactivate_existing: false, send_welcome_email: true }),
    });
    if (!res.ok) throw new Error('Failed');
    return { success: true, message: "You're subscribed!" };
  } catch (e: any) { return { success: false, message: e.message || 'Error' }; }
}
