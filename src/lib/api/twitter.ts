import { Tweet } from '@/types';
import fallbackTweets from '../../../data/twitter.json';
const X_API_BASE = 'https://api.twitter.com/2';
const X_HANDLES = ['TheFieldOf68', 'GoodmanHoops', 'RobDauster'];
async function getUserId(handle: string, token: string): Promise<string | null> {
  try {
    const res = await fetch(`${X_API_BASE}/users/by/username/${handle}`, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 86400 } });
    const data = await res.json();
    return data.data?.id || null;
  } catch { return null; }
}
async function getUserTweets(userId: string, token: string, max = 10): Promise<Tweet[]> {
  const res = await fetch(`${X_API_BASE}/users/${userId}/tweets?max_results=${max}&tweet.fields=created_at,public_metrics,author_id&expansions=author_id&user.fields=name,username,profile_image_url,verified&exclude=retweets,replies`, {
    headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`X API error: ${res.status}`);
  const data = await res.json();
  const author = data.includes?.users?.[0];
  return (data.data || []).map((tweet: any): Tweet => ({
    id: tweet.id, text: tweet.text,
    author: { name: author?.name || 'Field of 68', handle: author?.username || 'TheFieldOf68', avatar: author?.profile_image_url || '', verified: author?.verified || false },
    publishedAt: tweet.created_at,
    likesCount: tweet.public_metrics?.like_count || 0,
    retweetsCount: tweet.public_metrics?.retweet_count || 0,
    repliesCount: tweet.public_metrics?.reply_count || 0,
    url: `https://twitter.com/${author?.username}/status/${tweet.id}`,
  }));
}
export async function getTweets(maxPerAccount = 5): Promise<Tweet[]> {
  const bearerToken = process.env.X_BEARER_TOKEN;
  if (!bearerToken) { console.warn('[Twitter/X] No bearer token — using fallback data.'); return fallbackTweets as Tweet[]; }
  try {
    const allTweets: Tweet[] = [];
    for (const handle of X_HANDLES) {
      const userId = await getUserId(handle, bearerToken);
      if (!userId) continue;
      const tweets = await getUserTweets(userId, bearerToken, maxPerAccount);
      allTweets.push(...tweets);
    }
    return allTweets.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) { console.error('[Twitter/X] API error, using fallback data:', error); return fallbackTweets as Tweet[]; }
}
