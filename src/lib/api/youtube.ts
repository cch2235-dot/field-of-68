import { YouTubeVideo } from '@/types';
import fallbackVideos from '../../../data/youtube.json';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export function formatISODuration(d: string): string {
  if (!d || !d.startsWith('PT')) return d || '';
  const m = d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = m[1] ? `${m[1]}:` : '';
  const mn = m[2] ? m[2].padStart(h ? 2 : 1, '0') : '0';
  const s = (m[3] || '0').padStart(2, '0');
  return `${h}${mn}:${s}`;
}

export async function getYouTubeVideos(maxResults = 12): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    console.warn('[YouTube] No credentials found — using fallback data.');
    return fallbackVideos as YouTubeVideo[];
  }

  try {
    let uploadsPlaylistId: string | null = null;

    const r1 = await fetch(
      `${YOUTUBE_API_BASE}/channels?part=contentDetails&forHandle=TheFieldOf68&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const d1 = await r1.json();
    uploadsPlaylistId = d1.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || null;

    if (!uploadsPlaylistId) {
      const r2 = await fetch(
        `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
        { next: { revalidate: 3600 } }
      );
      const d2 = await r2.json();
      uploadsPlaylistId = d2.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || null;
    }

    if (!uploadsPlaylistId) {
      console.warn('[YouTube] Could not find uploads playlist — using fallback data.');
      return fallbackVideos as YouTubeVideo[];
    }

    const pr = await fetch(
      `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const pd = await pr.json();
    const videoIds = pd.items?.map((i: any) => i.snippet.resourceId.videoId).join(',');

    if (!videoIds) {
      console.warn('[YouTube] No video IDs found — using fallback data.');
      return fallbackVideos as YouTubeVideo[];
    }

    const vr = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const vd = await vr.json();

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
      duration: formatISODuration(item.contentDetails.duration),
      viewCount: item.statistics?.viewCount || '0',
      category:
        item.snippet.title.startsWith('EXCLUSIVE:') ? 'Exclusive Interviews'
        : item.snippet.title.includes('AFTER DARK') || item.snippet.title.includes('After Dark') ? 'After Dark'
        : item.snippet.title.includes('Transfer Portal') ? 'Transfer Portal'
        : item.snippet.title.includes('NBA Draft') || item.snippet.title.includes('Ground Floor') ? 'NBA Draft'
        : item.snippet.title.includes('Carousel') ? 'Coaching Carousel'
        : item.snippet.title.includes('Insider') || item.snippet.title.includes('Mid-Major') || item.snippet.title.includes('WCC') ? 'Conference Shows'
        : 'After Dark',
      url: `https://www.youtube.com/watch?v=${item.id}`,
    }));
  } catch (error) {
    console.error('[YouTube] API error, using fallback data:', error);
    return fallbackVideos as YouTubeVideo[];
  }
}
