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

export async function getBeehiivPosts(limit = 60): Promise<BeehiivPost[]> {
  if (!PUB_ID || !API_KEY) {
    console.warn('[Beehiiv] Missing env vars — returning empty');
    return [];
  }

  try {
    const res = await fetch(
      `${BASE}/publications/${PUB_ID}/posts?limit=${limit}&status=confirmed&order_by=publish_date&direction=desc`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 },
      }
    );

    if (!res.ok) {
      console.error('[Beehiiv] API error:', res.status, await res.text());
      return [];
    }

    const data = await res.json();
    return (data.data || []) as BeehiivPost[];
  } catch (err) {
    console.error('[Beehiiv] Fetch failed:', err);
    return [];
  }
}
