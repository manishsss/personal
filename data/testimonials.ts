export type TestimonialData = {
  quote: string;
  name: string;
  role: string;
  project: string;
  xUrl?: string;
};
export const testimonials: TestimonialData[] = [];
// Populate only with publicly approved collaborations or coverage.
export const brands: {
  name: string;
  logo: string | null;
  url: string | null;
  relationship: "collaboration" | "covered";
}[] = [];
