# Manish — creator portfolio

A personal portfolio built with Next.js 16, React, TypeScript and Tailwind CSS. Dark editorial design, locally hosted Inter font, responsive layouts, subtle motion and no invented campaign results.

## Run

Requires Node.js 20.9 or newer (validated with Node 24).

```sh
cd /workspace/personal
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev
```

Production validation:

```sh
npm run build
npm run typecheck
npm test
```

The browser tests use Chromium at `/usr/bin/chromium` in this cloud environment. On another machine, install a Playwright-compatible Chromium and set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to its executable path. `npm test` starts a fresh production server on port 3100, so build first. This keeps validation separate from the development server on port 3000.

## Update the portfolio

| File                   | Editable content                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `data/profile.ts`      | Name, role, biography, hero statistics, journey, X/Telegram links, avatar and SEO origin |
| `data/services.ts`     | Service descriptions and tags                                                            |
| `data/campaigns.ts`    | Campaign names, results, detailed case studies, proof images, prediction-market metrics  |
| `data/content.ts`      | Videos, X posts, threads and UGC; links, thumbnails and optional statistics              |
| `data/network.ts`      | Network size, categories, audience criteria and process                                  |
| `data/testimonials.ts` | Approved testimonials and brands, with collaboration/coverage clearly distinguished      |

Content data uses explicit TypeScript types and can be replaced with CMS/API data later. Unknown performance metrics stay `null`; empty testimonial and brand lists produce clearly labeled placeholders. The only displayed statistics are those supplied in the original brief. Xento's display name can be changed to “Web3 Quest Platform” in `data/campaigns.ts`.

Add video/post URLs to enable Watch/Read links. Add local thumbnail images under `public/` and use paths like `/content/video-01.webp`. Remote images need an appropriate `images.remotePatterns` entry in `next.config.ts`. Use only approved public content and proof.

## Contact

X: **[@web3manish](https://x.com/web3manish)**. Telegram: **[@manishweb3](https://t.me/manishweb3)**. No email option.

The form validates a visitor's project brief, then offers **Copy brief**, **Save brief** and **Message on Telegram**. Visitors paste their brief into the Telegram conversation. It explicitly states that no message has been sent automatically. No credentials are required; the API does not retain visitor information or send email. Telegram does not support prefilled messages to a personal username, so the copy step is intentional.

## Avatar

The current avatar is a monogram, not a fabricated portrait. Retrieving the X avatar is blocked by this environment's outbound policy. Domain additions for `x.com`, `cdn.syndication.twimg.com` and `pbs.twimg.com` were saved to the environment draft. Once access is available, retrieve the actual `@web3manish` image, save it under `public/profile/`, and set `profile.avatar` to its local path. Local hosting avoids depending on X for image delivery.

## Deployment and SEO

Deploy to a Next.js-compatible host. Before production deployment, set `profile.seo.siteUrl` or `NEXT_PUBLIC_SITE_URL` to your public HTTPS origin. Vercel's production origin is detected automatically when available. Development defaults to localhost. The page includes Open Graph and X metadata, a generated social image and an SVG favicon.

The portfolio includes keyboard navigation, Escape/dismissible case-study dialogs with focus restoration, keyboard-operable content tabs, reduced-motion support, visible focus indicators and semantic form labels. Browser tests cover the desktop and mobile workflow, widths from 320 to 1440 pixels, invalid API requests, modal behavior and downloaded brief contents.
