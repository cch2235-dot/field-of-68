import { YouTubeVideo } from '@/types';
import fallbackData from '../../../data/youtube.json';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
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

function mapFallback(): YouTubeVideo[] {
  return (fallbackData as any).videos.map((v: any): YouTubeVideo => ({
    id: v.id,
    videoId: v.id,
    title: v.title,
    description: '',
    thumbnail: v.thumbnail || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    publishedAt: v.publishedAt || '2025-01-01T00:00:00Z',
    duration: v.duration || '',
    viewCount: v.viewCount || '0',
    category: v.category || 'After Dark',
    url: v.url || `https://www.youtube.com/watch?v=${v.id}`,
  }));
}

export async function getYouTubeVideos(maxResults = 24): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('[YouTube] No API key — using fallback data.');
    return mapFallback();
  }

  try {
    const pr = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 1800 } }
    );
    const pd = await pr.json();

    if (pd.error) {
      console.error('[YouTube] Playlist fetch error:', pd.error.message);
      return mapFallback();
    }

    const videoIds = pd.items?.map((i: any) => i.snippet.resourceId.videoId).join(',');
    if (!videoIds) {
      console.warn('[YouTube] No video IDs found — using fallback data.');
      return mapFallback();
    }

    const vr = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 1800 } }
    );
    const vd = await vr.json();

    if (vd.error) {
      console.error('[YouTube] Video fetch error:', vd.error.message);
      return mapFallback();
    }

    return vd.items.map((item: any): YouTubeVideo => ({
      id: item.id,
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
      publishedAt: item.snippet.publishedAt,
      duration: formatISODuration(item.contentDetails?.duration || ''),
      viewCount: item.statistics?.viewCount || '0',
      category:
        item.snippet.title.startsWith('EXCLUSIVE:') ? 'Exclusive Interviews'
        : item.snippet.title.toUpperCase().includes('AFTER DARK') ? 'After Dark'
        : item.snippet.title.toUpperCase().includes('TRANSFER PORTAL') ? 'Transfer Portal'
        : item.snippet.title.toUpperCase().includes('NBA DRAFT') ? 'NBA Draft'
        : item.snippet.title.toUpperCase().includes('CAROUSEL') ? 'Coaching Carousel'
        : item.snippet.title.toUpperCase().includes('INSIDER') ? 'Conference Shows'
        : 'After Dark',
      url: `https://www.youtube.com/watch?v=${item.id}`,
    }));
  } catch (error) {
    console.error('[YouTube] API error, using fallback data:', error);
    return mapFallback();
  }
}
