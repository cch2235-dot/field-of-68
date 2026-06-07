import { YouTubeVideo } from '@/types';
import fallbackVideos from '../../../data/youtube.json';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// The uploads playlist ID is always UU + channel_id (without the UC prefix)
// For UC9by2xjmM_ldmvIwYrARCDg → UU9by2xjmM_ldmvIwYrARCDg
const UPLOADS_PLAYLIST_ID = 'UU9by2xjmM_ldmvIwYrARCDg';

export function formatISODuration(d: string): string {
  if (!d || !d.startsWith('PT')) return d || '';
  const m = d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = m[1] ? `${m[1]}:` : '';
  const mn = m[2] ? m[2].padStart(h ? 2 : 1, '0') : '0';
  const s = (m[3] || '0').padStart(2, '0');
  return `${h}${mn}:${s}`;
}

export async function getYouTubeVideos(maxResults = 24): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('[YouTube] No API key — using fallback data.');
    return fallbackVideos as YouTubeVideo[];
  }

  try {
    // Fetch directly from the uploads playlist — no channel lookup needed
    const pr = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 1800 } }
    );
    const pd = await pr.json();

    if (pd.error) {
      console.error('[YouTube] Playlist fetch error:', pd.error.message);
      return fallbackVideos as YouTubeVideo[];
    }

    const videoIds = pd.items?.map((i: any) => i.snippet.resourceId.videoId).join(',');
    if (!videoIds) {
      console.warn('[YouTube] No video IDs found — using fallback data.');
      return fallbackVideos as YouTubeVideo[];
    }

    const vr = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 1800 } }
    );
    const vd = await vr.json();

    if (vd.error) {
      console.error('[YouTube] Video fetch error:', vd.error.message);
      return fallbackVideos as YouTubeVideo[];
    }

    return vd.items.map((item: any): YouTubeVideo => ({
      id: item.id,
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url,
      publishedAt: item.snippet.publishedAt,
      duration: formatISODuration(item.contentDetails?.duration || ''),
      viewCount: item.statistics?.viewCount || '0',
      category:
        item.snippet.title.startsWith('EXCLUSIVE:') ? 'Exclusive Interviews'
        : item.snippet.title.toUpperCase().includes('AFTER DARK') ? 'After Dark'
        : item.snippet.title.includes('Transfer Portal') || item.snippet.title.toUpperCase().includes('TRANSFER PORTAL') ? 'Transfer Portal'
        : item.snippet.title.includes('NBA Draft') || item.snippet.title.includes('Ground Floor') ? 'NBA Draft'
        : item.snippet.title.includes('Carousel') || item.snippet.title.toUpperCase().includes('CAROUSEL') ? 'Coaching Carousel'
        : item.snippet.title.includes('Insider') || item.snippet.title.includes('Mid-Major') || item.snippet.title.includes('WCC') ? 'Conference Shows'
        : 'After Dark',
      url: `https://www.youtube.com/watch?v=${item.id}`,
    }));
  } catch (error) {
    console.error('[YouTube] API error, using fallback data:', error);
    return fallbackVideos as YouTubeVideo[];
  }
}
