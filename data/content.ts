export const contentFilters = [
  "All",
  "Videos",
  "X Posts",
  "Threads",
  "UGC",
] as const;
export type ContentCategory = Exclude<(typeof contentFilters)[number], "All">;
export type ContentItem = {
  id: string;
  category: ContentCategory;
  title: string;
  description: string;
  platform: string;
  url: string | null;
  thumbnail: string | null;
  views: string | null;
  engagement: string | null;
  visual: "markets" | "early" | "creator" | "thread";
};
// Editorial placeholders, not published work. Add a URL to enable Watch / Read.
export const content: ContentItem[] = [
  {
    id: "markets",
    category: "Videos",
    title: "Prediction markets, explained.",
    description:
      "Market analysis, trading strategies and the ideas behind them.",
    platform: "Short-form video",
    url: null,
    thumbnail: null,
    views: null,
    engagement: null,
    visual: "markets",
  },
  {
    id: "early",
    category: "X Posts",
    title: "Finding the next narrative.",
    description: "Early opportunities and emerging Web3 projects.",
    platform: "X",
    url: null,
    thumbnail: null,
    views: null,
    engagement: null,
    visual: "early",
  },
  {
    id: "creator",
    category: "UGC",
    title: "Made for the feed.",
    description: "Creator-first videos with a clear point of view.",
    platform: "Video / UGC",
    url: null,
    thumbnail: null,
    views: null,
    engagement: null,
    visual: "creator",
  },
  {
    id: "threads",
    category: "Threads",
    title: "A closer look at Web3.",
    description:
      "Longer-form thinking on projects, markets and new opportunities.",
    platform: "X",
    url: null,
    thumbnail: null,
    views: null,
    engagement: null,
    visual: "thread",
  },
];
