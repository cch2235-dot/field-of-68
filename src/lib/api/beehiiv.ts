export interface BeehiivPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  status: string;
  publish_date: number;
  displayed_date: number;
  web_url: string;
  thumbnail_url: string | null;
  preview_text: string;
  authors: Array<{ name: string }>;
  audience: 'free' | 'premium';
}

const PUB_ID = process.env.BEEHIIV_PUBLICATION_ID;
const API_KEY = process.env.BEEHIIV_API_KEY;
const BASE = 'https://api.beehiiv.com/v2';

async function fetchPosts(limit: number): Promise<BeehiivPost[]> {
  if (!PUB_ID || !API_KEY) return [];
  try {
    const res = await fetch(
      `${BASE}/publications/${PUB_ID}/posts?limit=${limit}&status=confirmed&order_by=publish_date&direction=desc`,
      { headers: { Authorization: `Bearer ${API_KEY}` }, next: { revalidate: 1800 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []) as BeehiivPost[];
  } catch {
    return [];
  }
}

export async function getBeehiivPosts(limit = 60): Promise<BeehiivPost[]> {
  return fetchPosts(limit);
}

export async function getArticles(limit = 6): Promise<BeehiivPost[]> {
  return fetchPosts(limit);
}

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  if (!PUB_ID || !API_KEY) return { success: false, message: 'Server configuration error' };
  try {
    const res = await fetch(`${BASE}/publications/${PUB_ID}/subscriptions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, reactivate_existing: true, send_welcome_email: true }),
    });
    if (res.ok) return { success: true, message: 'Successfully subscribed!' };
    return { success: false, message: 'Subscription failed' };
  } catch {
    return { success: false, message: 'Network error' };
  }
}
