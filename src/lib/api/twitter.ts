// ============================================================
// TWITTER / X API SERVICE
// ============================================================
// Credentials needed:
//   X_BEARER_TOKEN — from developer.twitter.com > Your App > Keys & Tokens
//
// Setup steps:
//   1. Apply for developer access at developer.twitter.com
//   2. Create a project and app
//   3. Copy the Bearer Token from Keys & Tokens
//   4. Add to .env.local as X_BEARER_TOKEN
//
// This service fetches the latest tweets from @TheFieldOf68 and
// @JonRothstein using the X API v2 user timeline endpoint.
//
// API Docs: https://developer.twitter.com/en/docs/twitter-api
//
// Without token, falls back to /data/twitter.json.
// ============================================================

import { Tweet } from '@/types';
import fallbackTweets from '../../../data/twitter.json';

const X_API_BASE = 'https://api.twitter.com/2';

// Add or remove handles to pull from multiple accounts
const X_HANDLES = ['TheFieldOf68', 'GoodmanHoops', 'RobDauster'];

async function getUserId(handle: string, bearerToken: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${X_API_BASE}/users/by/username/${handle}`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
        next: { revalidate: 86400 }, // Cache user IDs for 24h
      }
    );
    const data = await res.json();
    return data.data?.id || null;
  } catch {
    return null;
  }
}

async function getUserTweets(userId: string, bearerToken: string, maxResults = 10): Promise<Tweet[]> {
  const tweetFields = 'created_at,public_metrics,author_id';
  const expansions = 'author_id';
  const userFields = 'name,username,profile_image_url,verified';

  const res = await fetch(
    `${X_API_BASE}/users/${userId}/tweets?max_results=${maxResults}&tweet.fields=${tweetFields}&expansions=${expansions}&user.fields=${userFields}&exclude=retweets,replies`,
    {
      headers: { Authorization: `Bearer ${bearerToken}` },
      next: { revalidate: 600 }, // Cache 10 minutes
    }
  );

  if (!res.ok) throw new Error(`X API error: ${res.status}`);

  const data = await res.json();
  const author = data.includes?.users?.[0];

  return (data.data || []).map((tweet: any): Tweet => ({
    id: tweet.id,
    text: tweet.text,
    author: {
      name: author?.name || 'Field of 68',
      handle: author?.username || 'FieldOf68',
      avatar: author?.profile_image_url || '',
      verified: author?.verified || false,
    },
    publishedAt: tweet.created_at,
    likesCount: tweet.public_metrics?.like_count || 0,
    retweetsCount: tweet.public_metrics?.retweet_count || 0,
    repliesCount: tweet.public_metrics?.reply_count || 0,
    url: `https://twitter.com/${author?.username}/status/${tweet.id}`,
  }));
}

export async function getTweets(maxPerAccount = 5): Promise<Tweet[]> {
  const bearerToken = process.env.X_BEARER_TOKEN;

  if (!bearerToken) {
    console.warn('[Twitter/X] No bearer token — using fallback data.');
    return fallbackTweets as Tweet[];
  }

  try {
    const allTweets: Tweet[] = [];

    for (const handle of X_HANDLES) {
      const userId = await getUserId(handle, bearerToken);
      if (!userId) continue;

      const tweets = await getUserTweets(userId, bearerToken, maxPerAccount);
      allTweets.push(...tweets);
    }

    // Sort all tweets by date, newest first
    return allTweets.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('[Twitter/X] API error, using fallback data:', error);
    return fallbackTweets as Tweet[];
  }
}

export function formatTweetNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
