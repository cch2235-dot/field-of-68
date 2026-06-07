export interface YouTubeVideo {
  id: string; videoId: string; title: string; description: string;
  thumbnail: string; publishedAt: string; duration: string;
  viewCount: string; category: string; url: string;
}
export interface Article {
  id: string; title: string; excerpt: string; content: string;
  author: string; publishedAt: string; thumbnail: string;
  category: string; tags: string[]; url: string; readTime: string;
}
export interface Tweet {
  id: string; text: string;
  author: { name: string; handle: string; avatar: string; verified: boolean };
  publishedAt: string; likesCount: number; retweetsCount: number;
  repliesCount: number; url: string;
}
export interface ShowEpisode { title: string; date: string; url: string; thumbnail: string; }
export interface Show {
  id: string; name: string; slug: string; tagline: string; description: string;
  hosts: string[]; thumbnail: string; youtubePlaylistUrl: string;
  podcastUrl: string; appleUrl: string; latestEpisode: ShowEpisode;
  episodeCount: number; color: string; accentColor: string;
}
export type Platform = 'all' | 'youtube' | 'twitter' | 'articles';
export type VideoCategory = 'all' | 'After Dark' | 'Exclusive Interviews' | 'Transfer Portal' | 'NBA Draft' | 'Coaching Carousel' | 'Conference Shows';
