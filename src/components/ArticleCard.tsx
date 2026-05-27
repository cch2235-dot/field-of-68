import Image from 'next/image';
import { Article } from '@/types';
import { formatRelativeDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block relative overflow-hidden rounded-lg bg-[#383838] card-lift"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#383838] via-[#383838]/40 to-transparent" />
          <span className="absolute top-3 left-3 bg-[#F5A623] text-white font-condensed text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded">
            {article.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-condensed font-bold text-white text-xl md:text-2xl leading-tight mb-2 group-hover:text-[#F5A623] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[#8A8A8A] text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs font-condensed text-[#8A8A8A]">
            <div className="flex items-center gap-2">
              <span className="text-[#C4C4C4] font-semibold">{article.author}</span>
              <span>·</span>
              <span>{formatRelativeDate(article.publishedAt)}</span>
            </div>
            <span className="text-[#F5A623]">{article.readTime}</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 items-start p-3 rounded-lg hover:bg-[#444444] transition-colors"
    >
      {article.thumbnail && (
        <div className="relative flex-shrink-0 w-24 md:w-28 aspect-[4/3] rounded overflow-hidden bg-[#444444]">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="112px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] text-[10px] font-condensed font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-1.5">
          {article.category}
        </span>
        <h4 className="font-condensed font-bold text-white text-sm md:text-[15px] leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors mb-1">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 text-[#8A8A8A] text-xs font-condensed">
          <span className="text-[#C4C4C4] font-medium">{article.author}</span>
          <span>·</span>
          <span>{formatRelativeDate(article.publishedAt)}</span>
          <span>·</span>
          <span className="text-[#F5A623]">{article.readTime}</span>
        </div>
      </div>
    </a>
  );
}
