"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Plus,
  Play,
  MoveUpRight,
  AudioLines,
  Users,
  Target,
  TrendingUp,
  Globe2,
  Check,
  Copy,
  Download,
  Send,
  ChevronDown,
  Quote,
  Clock3,
} from "lucide-react";
import { profile } from "@/data/profile";
import { services } from "@/data/services";
import { campaigns, predictionMarkets, type Campaign } from "@/data/campaigns";
import { content, contentFilters, type ContentItem } from "@/data/content";
import { network, process as campaignSteps } from "@/data/network";
import {
  brands,
  testimonials,
  type TestimonialData,
} from "@/data/testimonials";

const navigation = [
  ["Work", "work"],
  ["Campaigns", "campaigns"],
  ["Content", "content"],
  ["KOL Network", "network"],
  ["About", "about"],
  ["Contact", "contact"],
];
const Arrow = () => (
  <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
);

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span className="section-number">{number}</span>
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 16);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a
          href="#home"
          className="wordmark"
          aria-label="Manish home"
          onClick={() => setOpen(false)}
        >
          MANISH
          <span className="brand-dot" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([name, id]) => (
            <a key={id} href={`#${id}`}>
              {name}
            </a>
          ))}
        </nav>
        <a href="#contact" className="button nav-cta">
          Work With Me <Arrow />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map(([name, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {name}
              <Arrow />
            </a>
          ))}
          <a
            href="#contact"
            className="button primary"
            onClick={() => setOpen(false)}
          >
            Work With Me <Arrow />
          </a>
        </nav>
      )}
    </header>
  );
}

function SocialLink({
  platform,
  variant = "",
}: {
  platform: keyof typeof profile.contact;
  variant?: string;
}) {
  const url = profile.contact[platform];
  const label = platform === "x" ? "X" : "Telegram";
  if (!url)
    return (
      <span
        className={`social-link unavailable ${variant}`}
        title={`${label} contact details will be added soon`}
      >
        {label}
        <span className="soon">Soon</span>
      </span>
    );
  return (
    <a
      className={`social-link ${variant}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <Arrow />
    </a>
  );
}

export function Hero() {
  return (
    <section className="hero container" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            WEB3 CREATOR <span className="eyebrow-separator">/</span> KOL
            MANAGER
          </p>
          <h1>
            {profile.tagline.map((line, i) => (
              <span key={line} className={i === 2 ? "accent" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-description">{profile.description}</p>
          <div className="hero-actions">
            <a href="#contact" className="button primary">
              Work With Me <Arrow />
            </a>
            <a href="#campaigns" className="button secondary">
              View Campaigns <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-follow">
            {profile.contact.x ? (
              <a
                href={profile.contact.x}
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow me on X <Arrow />
              </a>
            ) : (
              <span>Content. Creators. A little curiosity.</span>
            )}
            <span className="tiny-line" />
          </div>
        </div>
        <div
          className="identity-card"
          aria-label="Manish's creator identity card"
        >
          <div className="identity-top">
            <span className="identity-label">THE PERSON BEHIND THE POSTS</span>
            <Arrow />
          </div>
          <div className="identity-art">
            <div className="identity-ring ring-one" aria-hidden="true" />
            <div className="identity-ring ring-two" aria-hidden="true" />
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt="Manish's X profile photo"
                width={220}
                height={220}
                priority
                className="profile-photo"
              />
            ) : (
              <span className="giant-m" aria-hidden="true">
                m.
              </span>
            )}
            <span className="art-cross cross-one" aria-hidden="true">
              +
            </span>
            <span className="art-cross cross-two" aria-hidden="true">
              +
            </span>
            <span className="art-coordinate" aria-hidden="true">
              CREATOR / INDIA
            </span>
          </div>
          <div className="identity-bottom">
            <div>
              <h2>
                Manish
                <span>
                  <ArrowUpRight size={16} strokeWidth={1.3} />
                </span>
              </h2>
              <p>Creator. Connector. Always early.</p>
            </div>
            <div className="avatar-mark" aria-hidden="true">
              M
            </div>
          </div>
          {profile.available && (
            <div className="availability">
              <span className="status-dot" />
              Open for collaborations
              <span className="availability-line" />
            </div>
          )}
        </div>
      </div>
      <div className="hero-bottom">
        <span>INDEPENDENT MIND. CONNECTED NETWORK.</span>
        <a href="#work" aria-label="Explore my work">
          SCROLL TO EXPLORE <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <div className="stats-strip container reveal">
      {profile.stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          <p>{stat.note}</p>
        </div>
      ))}
    </div>
  );
}

export function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const Icon = {
    content: AudioLines,
    campaign: Target,
    network: Users,
    growth: TrendingUp,
  }[service.icon];
  return (
    <article className="service-card">
      <div className="service-top">
        <span className="service-icon">
          <Icon size={23} strokeWidth={1.4} />
        </span>
        <span>{service.number}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="tags">
        {service.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={title}
      onCancel={onClose}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <p className="eyebrow">A CLOSER LOOK</p>
          <button
            className="icon-button"
            autoFocus
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

export function CaseStudyModal({
  campaign,
  onClose,
}: {
  campaign: Campaign | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={!!campaign}
      onClose={onClose}
      title={`${campaign?.project ?? ""} campaign case study`}
    >
      {campaign && (
        <>
          <span className="pill">{campaign.category}</span>
          <h2>
            {campaign.project}
            <span className="accent"> / Case study</span>
          </h2>
          <div className="modal-metrics">
            {campaign.metrics.map((m) => (
              <div key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
          {campaign.sections.map((s, i) => (
            <section className="case-section" key={s.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </section>
          ))}
          <div className="proof-area">
            <h3>Campaign proof</h3>
            {campaign.proof.length ? (
              <div className="proof-images">
                {campaign.proof.map((p) => (
                  <Image
                    key={p.src}
                    src={p.src}
                    alt={p.alt}
                    width={800}
                    height={500}
                  />
                ))}
              </div>
            ) : (
              <p>
                Campaign screenshots and supporting reports will be added here.
              </p>
            )}
          </div>
          <a href="#contact" className="button primary" onClick={onClose}>
            Plan a campaign together <Arrow />
          </a>
        </>
      )}
    </Modal>
  );
}

export function CaseStudyCard({
  campaign,
  onOpen,
}: {
  campaign: Campaign;
  onOpen: () => void;
}) {
  return (
    <article className="campaign-card">
      <div className="campaign-visual">
        <div className="campaign-visual-top">
          <span className="pill">FEATURED CAMPAIGN</span>
          <Arrow />
        </div>
        <div className="xento-symbol" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="campaign-project-name">
          {campaign.project.toLowerCase()}
          <span>CREATOR-LED. COMMUNITY-FOCUSED.</span>
        </div>
        <span className="visual-index">CASE STUDY / 001</span>
      </div>
      <div className="campaign-info">
        <div className="campaign-title-row">
          <p className="eyebrow">{campaign.category}</p>
          <span className="small-muted">01 / Selected work</span>
        </div>
        <h3>
          Turning attention
          <br />
          into action.
        </h3>
        <p className="campaign-description">{campaign.description}</p>
        <div className="campaign-metrics">
          {campaign.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
        <div className="campaign-bottom">
          <div>
            {campaign.metrics.slice(3).map((m) => (
              <span key={m.label}>
                <strong>{m.value}</strong> {m.label}
              </span>
            ))}
          </div>
          <button className="text-button" onClick={onOpen}>
            View Case Study <Arrow />
          </button>
        </div>
      </div>
    </article>
  );
}

function PredictionMarkets() {
  return (
    <section
      className="prediction-section section container reveal"
      id="prediction-markets"
    >
      <div className="prediction-copy">
        <p className="eyebrow">
          <span className="section-number">03</span>A SPACE I'M WATCHING
        </p>
        <h2>
          Prediction
          <br />
          markets<span className="accent">.</span>
        </h2>
        <p className="section-description">
          One of the core areas I create around.
        </p>
        <p>{predictionMarkets.description}</p>
        <div className="prediction-links">
          {profile.contact.x ? (
            <a
              href={profile.contact.x}
              className="text-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              View X <Arrow />
            </a>
          ) : (
            <span className="small-muted">X profile coming soon</span>
          )}
          <a href="#content" className="text-button">
            View Content <Arrow />
          </a>
        </div>
      </div>
      <div className="market-card">
        <div className="market-card-header">
          <span>
            <span className="status-dot" />
            PREDICTION MARKETS
          </span>
          <span className="market-label">CONTENT / ACTIVITY</span>
        </div>
        <div className="market-card-title">
          <span>Beyond the timeline.</span>
          <TrendingUp size={25} strokeWidth={1.2} />
        </div>
        <div className="market-metrics">
          {predictionMarkets.metrics.map((m) => (
            <div key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
        <div className="market-illustration" aria-hidden="true">
          <svg viewBox="0 0 540 120" fill="none">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#a894e8" stopOpacity=".19" />
                <stop offset="1" stopColor="#a894e8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 106L40 100L65 104L103 76L138 84L172 69L204 74L244 42L282 53L316 40L352 46L388 23L420 31L464 17L500 26L540 7V120H0Z"
              fill="url(#chartFill)"
            />
            <path
              d="M0 106L40 100L65 104L103 76L138 84L172 69L204 74L244 42L282 53L316 40L352 46L388 23L420 31L464 17L500 26L540 7"
              stroke="#a894e8"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="market-footer">
          <span>Markets. Narratives. Opportunities.</span>
          <span>ILLUSTRATIVE VISUAL</span>
        </div>
      </div>
    </section>
  );
}

export function ContentCard({ item }: { item: ContentItem }) {
  return (
    <article className="content-card">
      <div className={`content-thumbnail thumbnail-${item.visual}`}>
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 25vw"
          />
        ) : (
          <div className="thumbnail-art" aria-hidden="true">
            {item.visual === "markets" ? (
              <>
                <span className="thumbnail-kicker">THE WORLD IS A MARKET.</span>
                <span className="thumbnail-big">
                  What's
                  <br />
                  your bet<span>?</span>
                </span>
                <div className="bet-row">
                  <span>
                    YES <ArrowUpRight size={8} />
                  </span>
                  <span>
                    NO <ArrowDownRight size={8} />
                  </span>
                </div>
              </>
            ) : item.visual === "early" ? (
              <>
                <span className="thumbnail-kicker">AHEAD OF THE TIMELINE</span>
                <span className="thumbnail-big">
                  Stay
                  <br />
                  <em>curious.</em>
                </span>
                <ArrowUpRight
                  className="thumbnail-arrow"
                  size={86}
                  strokeWidth={1}
                />
              </>
            ) : item.visual === "creator" ? (
              <>
                <span className="thumbnail-kicker">
                  CONTENT WITH A POINT OF VIEW
                </span>
                <AudioLines
                  className="wave-icon"
                  size={100}
                  strokeWidth={0.8}
                />
                <span className="thumbnail-small">
                  made for
                  <br />
                  <em>the feed.</em>
                </span>
              </>
            ) : (
              <>
                <span className="thumbnail-kicker">MORE THAN A HOT TAKE</span>
                <span className="thumbnail-big">
                  Connect
                  <br />
                  the dots.
                </span>
                <span className="thread-dots">● — ● — ●</span>
              </>
            )}
          </div>
        )}
        <span className="content-category">{item.category}</span>
        {!item.url && <span className="placeholder-label">COMING SOON</span>}
        {item.url && item.category === "Videos" && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="play-button"
            aria-label={`Watch ${item.title}`}
          >
            <Play fill="currentColor" size={18} />
          </a>
        )}
      </div>
      <div className="content-card-body">
        <span className="small-muted">{item.platform}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="content-card-footer">
          {item.views ? (
            <span>{item.views} views</span>
          ) : (
            <span className="small-muted">
              {item.url ? "Selected work" : "Portfolio preview"}
            </span>
          )}
          {item.engagement && <span>{item.engagement} engagement</span>}
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-button"
            >
              {item.category === "Videos" || item.category === "UGC"
                ? "Watch"
                : "Read"}
              <Arrow />
            </a>
          ) : (
            <span className="content-pending">
              <Clock3 size={13} />
              Link pending
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ContentPortfolio() {
  const [filter, setFilter] = useState<(typeof contentFilters)[number]>("All");
  const items = content.filter(
    (item) => filter === "All" || item.category === filter,
  );
  return (
    <section className="section container reveal" id="content">
      <SectionHeading
        number="04"
        eyebrow="FROM MY SIDE OF THE INTERNET"
        title="Content with a point of view."
        description="A selection of videos, posts and campaigns."
      />
      <div
        className="content-tabs"
        role="tablist"
        aria-label="Content categories"
      >
        {contentFilters.map((f) => (
          <button
            key={f}
            id={`tab-${f.replaceAll(" ", "-")}`}
            role="tab"
            aria-selected={f === filter}
            aria-controls="content-panel"
            tabIndex={f === filter ? 0 : -1}
            onClick={() => setFilter(f)}
            onKeyDown={(e) => {
              const index = contentFilters.indexOf(f);
              let next = index;
              if (e.key === "ArrowRight")
                next = (index + 1) % contentFilters.length;
              else if (e.key === "ArrowLeft")
                next =
                  (index - 1 + contentFilters.length) % contentFilters.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = contentFilters.length - 1;
              else return;
              e.preventDefault();
              setFilter(contentFilters[next]);
              document
                .getElementById(
                  `tab-${contentFilters[next].replaceAll(" ", "-")}`,
                )
                ?.focus();
            }}
          >
            {f}
            {f === "All" && (
              <span>{content.length.toString().padStart(2, "0")}</span>
            )}
          </button>
        ))}
        <span className="content-tab-note">GOOD IDEAS, DIFFERENT FORMATS.</span>
      </div>
      <div
        className="content-grid"
        id="content-panel"
        role="tabpanel"
        aria-labelledby={`tab-${filter.replaceAll(" ", "-")}`}
        tabIndex={0}
      >
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
      <p className="placeholder-note">
        An early look at the portfolio. Published content and links are being
        added.
      </p>
    </section>
  );
}

export function CreatorNetwork() {
  return (
    <section className="section container reveal" id="network">
      <div className="network-panel">
        <div className="network-copy">
          <p className="eyebrow">
            <span className="section-number">05</span>THE RIGHT PEOPLE. THE
            RIGHT REACH.
          </p>
          <h2>
            A network built
            <br />
            on connection<span className="accent">.</span>
          </h2>
          <p className="section-description">
            300+ Web3 creators ready for campaigns.
          </p>
          <div className="network-count">
            <strong>{network.size}</strong>
            <span>
              Creators
              <br />
              interested
            </span>
          </div>
          <div className="network-categories">
            {network.categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>
        <div className="network-right">
          <div className="network-map" aria-hidden="true">
            <div className="map-orbit orbit-one" />
            <div className="map-orbit orbit-two" />
            <div className="map-orbit orbit-three" />
            <div className="network-center">
              <Users size={27} strokeWidth={1.3} />
            </div>
            {["TRADING", "DEFI", "CREATORS", "AI", "GAMING", "MARKETS"].map(
              (n, i) => (
                <span key={n} className={`network-node node-${i}`}>
                  <span />
                  {n}
                </span>
              ),
            )}
          </div>
          <p className="audience-label">A SHORTLIST SHAPED AROUND YOUR BRIEF</p>
          <div className="audience-filters">
            {network.filters.map((filter) => (
              <span key={filter}>
                {filter}
                <Check size={12} />
              </span>
            ))}
          </div>
        </div>
        <div className="network-bottom">
          <div>
            <h3>Need creators for a campaign?</h3>
            <p>{network.privacy}</p>
          </div>
          <a href="#contact" className="button primary">
            Request a KOL Campaign <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  return (
    <section className="section container reveal">
      <SectionHeading
        number="06"
        eyebrow="CLEAR PROCESS. LESS BACK-AND-FORTH."
        title="From brief to impact."
        description="How campaigns work, without the complexity."
      />
      <div className="process-grid">
        {campaignSteps.map((step) => (
          <article key={step.number}>
            <div className="step-top">
              <span>{step.number}</span>
              <ArrowRight size={18} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Testimonial({ item }: { item: TestimonialData }) {
  return (
    <article className="testimonial-card">
      <Quote size={22} />
      <blockquote>{item.quote}</blockquote>
      <div>
        <strong>{item.name}</strong>
        <span>
          {item.role} · {item.project}
        </span>
        {item.xUrl && (
          <a href={item.xUrl} target="_blank" rel="noopener noreferrer">
            View on X <Arrow />
          </a>
        )}
      </div>
    </article>
  );
}

function TrustSections() {
  return (
    <div className="trust-wrap">
      <section className="container brands-section reveal">
        <p className="eyebrow">WORKED WITH / COVERED</p>
        {brands.length ? (
          <div className="brands-grid">
            {brands.map((b) => (
              <div className="brand-item" key={b.name}>
                {b.logo ? (
                  <Image src={b.logo} alt={b.name} width={140} height={50} />
                ) : (
                  <span>{b.name}</span>
                )}
                <small>{b.relationship}</small>
                {b.url && (
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${b.name}`}
                  >
                    <Arrow />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="brand-placeholders">
            {[1, 2, 3, 4].map((n) => (
              <div key={n}>
                <Plus size={17} />
                <span>Project {n.toString().padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        )}
        <p className="placeholder-note">
          {!brands.length &&
            "Approved project names and logos will be added here."}
        </p>
      </section>
      <section className="section container testimonials-section reveal">
        <SectionHeading
          number="07"
          eyebrow="BETTER WORK STARTS WITH GOOD PEOPLE"
          title="What people say."
        >
          <a className="text-button" href="#contact">
            Want to work together? <Arrow />
          </a>
        </SectionHeading>
        <div className="testimonials-grid">
          {testimonials.length
            ? testimonials.map((t) => (
                <Testimonial key={t.name + t.project} item={t} />
              ))
            : [1, 2, 3].map((n) => (
                <article
                  className="testimonial-card testimonial-placeholder"
                  key={n}
                >
                  <Quote size={24} />
                  <p>
                    A little space for
                    <br />a real perspective.
                  </p>
                  <div>
                    <span>Testimonial to be added</span>
                    <small>Published with permission.</small>
                  </div>
                </article>
              ))}
        </div>
      </section>
    </div>
  );
}

function About() {
  return (
    <section className="section container about-section reveal" id="about">
      <div className="about-left">
        <p className="eyebrow">
          <span className="section-number">08</span>A LITTLE ABOUT ME
        </p>
        <h2>
          Curiosity is
          <br />
          the starting point<span className="accent">.</span>
        </h2>
        <div className="about-signature">
          Manish
          <span>
            <ArrowUpRight size={25} strokeWidth={1.3} />
          </span>
        </div>
        <div className="location">
          <Globe2 size={14} />
          Based in {profile.location}
        </div>
      </div>
      <div className="about-right">
        {profile.about.map((p, i) => (
          <p key={p} className={i === 0 ? "about-intro" : ""}>
            {p}
          </p>
        ))}
        <div className="tags about-tags">
          {["Web3", "Content", "KOLs", "Creator Campaigns"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="journey">
          {profile.journey.map((item) => (
            <div key={item.year}>
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactForm() {
  const [state, setState] = useState<"idle" | "pending" | "brief" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("pending");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const values = Object.fromEntries(form.entries());
    const text = `CAMPAIGN BRIEF — MANISH\n\n${Object.entries(values)
      .filter(([k]) => k !== "website")
      .map(([k, v]) => `${k}: ${v || "Not specified"}`)
      .join("\n\n")}`;
    setBrief(text);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(
          result.error || "Something went wrong. Please try again.",
        );
      if (result.mode !== "brief")
        throw new Error("Unable to prepare your brief. Please try again.");
      setState("brief");
      setMessage(
        "Your brief is ready. No message has been sent yet. Copy or save your brief, then message me on Telegram to start the conversation.",
      );
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send. Please try again.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "manish-campaign-brief.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setMessage(
        "Copy is unavailable in this browser. Download your brief instead.",
      );
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-header">
        <span>YOUR NEXT GOOD IDEA STARTS HERE</span>
        <Arrow />
      </div>
      <div className="form-grid">
        <label>
          Your name <span>*</span>
          <input
            name="Name"
            autoComplete="name"
            placeholder="What should I call you?"
            required
            maxLength={100}
          />
        </label>
        <label>
          Your Telegram / X <span>*</span>
          <input
            name="Handle"
            autoComplete="off"
            placeholder="@yourhandle"
            required
            maxLength={100}
          />
        </label>
        <label>
          Project / Company
          <input
            name="Project"
            autoComplete="organization"
            placeholder="Your project name"
            maxLength={150}
          />
        </label>
        <label>
          Campaign type
          <div className="select-wrap">
            <select name="Campaign Type" defaultValue="KOL Campaign">
              {[
                "KOL Campaign",
                "Content",
                "Video / UGC",
                "Creator Partnership",
                "Other",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={15} />
          </div>
        </label>
        <label>
          Budget
          <input
            name="Budget"
            placeholder="e.g. $1,000 – $5,000"
            maxLength={100}
          />
        </label>
        <label>
          Number of creators
          <input
            name="Creators"
            type="number"
            min="1"
            max="10000"
            placeholder="An estimate is great"
          />
        </label>
        <label className="full-width">
          Timeline
          <input
            name="Timeline"
            placeholder="When are you looking to launch?"
            maxLength={150}
          />
        </label>
        <label className="full-width">
          Tell me a little about it <span>*</span>
          <textarea
            name="Message"
            placeholder="The idea, the goal, and where I can help..."
            rows={4}
            required
            minLength={10}
            maxLength={5000}
          />
        </label>
        <label className="honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        type="submit"
        className="button primary submit-button"
        disabled={state === "pending"}
      >
        {state === "pending"
          ? "Preparing your conversation…"
          : "Start a Conversation"}
        <Arrow />
      </button>
      <p className="form-note">No pressure. Just a good conversation.</p>
      {message && (
        <div
          ref={resultRef}
          tabIndex={-1}
          className={`form-result ${state}`}
          role={state === "error" ? "alert" : "status"}
        >
          <strong>
            {state === "brief"
              ? "Your next step is ready."
              : "Please try again."}
          </strong>
          <p>{message}</p>
          {state === "brief" && (
            <div className="brief-actions">
              <button
                type="button"
                className="button secondary"
                onClick={download}
              >
                <Download size={15} />
                Save brief
              </button>
              <button type="button" className="button secondary" onClick={copy}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy brief"}
              </button>
              <a
                className="button primary"
                href={profile.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={15} />
                Message on Telegram
              </a>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

function Contact() {
  return (
    <section className="section container contact-section reveal" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">
          <span className="section-number">09</span>LET'S MAKE IT HAPPEN
        </p>
        <h2>
          Let's build
          <br />
          <span className="accent">something.</span>
          <ArrowUpRight
            className="contact-arrow"
            aria-hidden="true"
            size={36}
            strokeWidth={1.2}
          />
        </h2>
        <p className="section-description">
          Have a project, campaign or creator opportunity?
        </p>
        <p>
          I'd love to hear what you're working on.
          <br />
          Let's find the right way to build together.
        </p>
        <div className="contact-socials">
          <SocialLink platform="x" />
          <SocialLink platform="telegram" />
        </div>
        {profile.available && (
          <div className="contact-availability">
            <span className="status-dot" />
            Available for the right opportunities
          </div>
        )}
      </div>
      <ContactForm />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <a href="#home" className="wordmark">
            MANISH
            <span className="brand-dot" />
          </a>
          <p>
            Web3 Creator <span>•</span> KOL Manager
          </p>
        </div>
        <p className="footer-tagline">
          Finding what's early.
          <br />
          Creating around it. Building with it.
        </p>
        <a href="#home" className="back-top" aria-label="Back to top">
          <MoveUpRight size={20} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {profile.name}. Made with intention.
        </span>
        <div>
          <SocialLink platform="x" />
          <SocialLink platform="telegram" />
        </div>
        <span>
          BASED IN INDIA <span className="footer-dot">●</span> BUILDING
          EVERYWHERE
        </span>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <section className="section container reveal" id="work">
          <SectionHeading
            number="01"
            eyebrow="A FEW THINGS I DO WELL"
            title="Content. Creators. Campaigns."
            description="Content, creators and campaigns — all under one roof."
          >
            <span className="section-side-note">
              FROM IDEA
              <br />
              TO THE INTERNET <Arrow />
            </span>
          </SectionHeading>
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </div>
        </section>
        <section className="section container reveal" id="campaigns">
          <SectionHeading
            number="02"
            eyebrow="LESS TALK. MORE PROOF."
            title="Real campaigns. Real impact."
            description="Real campaigns. Real creators. Measurable outcomes."
          >
            <span className="section-side-note">
              SELECTED WORK / {campaigns.length.toString().padStart(2, "0")}
            </span>
          </SectionHeading>
          {campaigns.map((campaign) => (
            <CaseStudyCard
              key={campaign.id}
              campaign={campaign}
              onOpen={() => setActiveCampaign(campaign)}
            />
          ))}
          <div className="campaign-note">
            <span>
              <span className="status-dot" />
              Built around the brief. Measured by the outcome.
            </span>
            <a href="#contact" className="text-button">
              Your project could be next <Arrow />
            </a>
          </div>
        </section>
        <PredictionMarkets />
        <ContentPortfolio />
        <CreatorNetwork />
        <Timeline />
        <TrustSections />
        <About />
        <Contact />
      </main>
      <Footer />
      <CaseStudyModal
        campaign={activeCampaign}
        onClose={() => setActiveCampaign(null)}
      />
    </>
  );
}
