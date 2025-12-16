// types/content.ts
export type ContentType =
  | "article"
  | "infographic"
  | "video"
  | "story"
  | "campaign";

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  type: ContentType;
  images: string[];
  author: string;
  publishedAt: string;
  tags: string[];
}
