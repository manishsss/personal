export type Metric = { value: string; label: string };
export type Campaign = {
  id: string;
  project: string;
  category: string;
  description: string;
  metrics: Metric[];
  sections: { title: string; text: string }[];
  proof: { src: string; alt: string }[];
  // Unavailable metrics stay null and are never shown as results.
  additionalMetrics: Record<string, string | null>;
};
export const campaigns: Campaign[] = [
  {
    id: "xento",
    project: "Xento",
    category: "KOL Campaign",
    description:
      "Managed the campaign end-to-end — creator sourcing, rate negotiation, creator coordination, posting schedules and campaign execution.",
    metrics: [
      { value: "38", label: "Creators" },
      { value: "60K+", label: "Views" },
      { value: "150+", label: "Users onboarded" },
      { value: "$1,250", label: "Campaign spend" },
      { value: "~$20.8", label: "CPM" },
    ],
    sections: [
      {
        title: "Campaign Overview",
        text: "An end-to-end creator campaign for Xento. The supplied campaign results include creator participation, views, users onboarded, spend and CPM.",
      },
      {
        title: "Creator Strategy",
        text: "Sourced creators and negotiated rates. Detailed audience selection criteria and the campaign objective will be added alongside the campaign brief.",
      },
      {
        title: "Execution",
        text: "Coordinated creators, managed posting schedules and handled campaign execution from the first outreach through publication.",
      },
      {
        title: "Results",
        text: "38 creators, 60K+ views and 150+ users onboarded on a $1,250 campaign spend. Reported CPM: approximately $20.8. Results are supplied by Manish; supporting screenshots are pending.",
      },
      {
        title: "Key Learnings",
        text: "Campaign retrospective to be added. No unsupported conclusions or additional performance metrics are published.",
      },
    ],
    proof: [],
    additionalMetrics: {
      objective: null,
      engagement: null,
      referrals: null,
      tradingVolume: null,
      conversionRate: null,
      CPC: null,
      CPA: null,
    },
  },
];
export const predictionMarkets = {
  metrics: [
    { value: "13+", label: "Referral signups" },
    { value: "$800+", label: "Trading volume" },
  ],
  posts: null,
  views: null,
  description:
    "Content focused on prediction markets, trading strategies, market analysis and new opportunities.",
};
