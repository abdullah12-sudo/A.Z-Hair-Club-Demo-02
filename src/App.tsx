import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";

type PageKey = "home" | "hair-patch" | "wigs" | "transplant" | "gallery" | "about" | "contact";
type GalleryCategory = "All" | "Hair Patch" | "Hair Wig" | "Hairline" | "Maintenance" | "Video";

const brandName = "A.Z Hair Club";
const phoneDigits = "923001234567";
const phoneDisplay = "+92 300 123 4567";
const bookingScarcity = "Limited private consultation slots available this week.";

const media = {
  heroVideo: "https://videos.pexels.com/video-files/5450206/5450206-uhd_3840_2160_30fps.mp4",
  heroPoster: "https://images.pexels.com/videos/5450206/pexels-photo-5450206.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
  barberVideo: "https://videos.pexels.com/video-files/9738000/9738000-uhd_3840_2160_24fps.mp4",
  detailVideo: "https://videos.pexels.com/video-files/9738001/9738001-uhd_3840_2160_24fps.mp4",
  salon: "https://images.pexels.com/photos/7697284/pexels-photo-7697284.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  tools: "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  haircut: "https://images.pexels.com/photos/18503633/pexels-photo-18503633.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  scalp: "https://images.pexels.com/photos/17553840/pexels-photo-17553840.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  wigSystem: "https://images.pexels.com/photos/13074424/pexels-photo-13074424.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  consultation: "https://images.pexels.com/photos/8875524/pexels-photo-8875524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  beforeMan: "https://images.pexels.com/photos/7876893/pexels-photo-7876893.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  beforeStudio: "https://images.pexels.com/photos/8727474/pexels-photo-8727474.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  afterMan: "https://images.pexels.com/photos/7460150/pexels-photo-7460150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  afterClassic: "https://images.pexels.com/photos/18512866/pexels-photo-18512866.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  afterSharp: "https://images.pexels.com/photos/13394294/pexels-photo-13394294.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  portrait: "https://images.pexels.com/photos/29617793/pexels-photo-29617793.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
};

const pageKeys: PageKey[] = ["home", "hair-patch", "wigs", "transplant", "gallery", "about", "contact"];

const pageMeta: Record<PageKey, { label: string; title: string; description: string; keywords: string }> = {
  home: {
    label: "Home",
    title: "Luxury Hair Replacement Faisalabad",
    description:
      "A.Z Hair Club is a premium men's hair replacement, hair patch, hair wig and hair transplant consultation studio in Faisalabad.",
    keywords:
      "Hair Patch in Faisalabad, Hair Replacement Faisalabad, Non Surgical Hair Replacement, Hair System for Men, Best Hair Patch Center Faisalabad",
  },
  "hair-patch": {
    label: "Hair Patch",
    title: "Premium Hair Patch in Faisalabad",
    description:
      "Undetectable non-surgical hair patch systems with custom hairline design, sweat-resistant bonding and natural density matching at A.Z Hair Club.",
    keywords:
      "Hair Patch in Faisalabad, Hair Fixing Faisalabad, Non Surgical Hair Replacement, Hair System for Men",
  },
  wigs: {
    label: "Hair Wigs",
    title: "Hair Wig Services Faisalabad",
    description:
      "Custom men's hair wigs, human hair systems, density matching and premium maintenance from A.Z Hair Club Faisalabad.",
    keywords: "Hair Wig Services Faisalabad, Hair Replacement Faisalabad, Human Hair Systems Faisalabad",
  },
  transplant: {
    label: "Transplant Consult",
    title: "Hair Transplant Consultation Faisalabad",
    description:
      "Scalp analysis, eligibility checks, patch vs transplant guidance and recovery planning for men considering hair restoration.",
    keywords: "Hair Transplant Consultation Faisalabad, Scalp Analysis Faisalabad, Patch vs Hair Transplant",
  },
  gallery: {
    label: "Gallery",
    title: "Before After Hair Replacement Gallery",
    description:
      "Explore hair patch, wig, hairline and grooming transformation previews from A.Z Hair Club's premium restoration experience.",
    keywords: "Hair Patch Before After Faisalabad, Hair Replacement Gallery, Men Hair Transformation",
  },
  about: {
    label: "About",
    title: "About A.Z Hair Club",
    description:
      "Discover the mission, founder philosophy, technology and premium confidence transformation system behind A.Z Hair Club Faisalabad.",
    keywords: "A.Z Hair Club Faisalabad, Best Hair Patch Center Faisalabad, Hair Restoration Clinic Faisalabad",
  },
  contact: {
    label: "Contact",
    title: "Book Hair Restoration Consultation",
    description:
      "Book a private consultation, WhatsApp A.Z Hair Club, call the clinic, view business hours and start your transformation today.",
    keywords: "Book Hair Patch Faisalabad, WhatsApp Hair Replacement Faisalabad, A.Z Hair Club Contact",
  },
};

const navigation: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "hair-patch", label: "Hair Patch" },
  { key: "wigs", label: "Hair Wigs" },
  { key: "transplant", label: "Transplant Consult" },
  { key: "gallery", label: "Gallery" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

const trustMetrics = [
  { value: 1000, suffix: "+", label: "Happy Clients", copy: "Private transformations delivered for modern men." },
  { value: 5, suffix: "/5", label: "Google Rating", copy: "Review-led service with luxury client care." },
  { value: 12, suffix: "+", label: "Specialist Years", copy: "Advanced fitting, hairline and bonding expertise." },
  { value: 98, suffix: "%", label: "Natural Look", copy: "Designed to blend with your face, age and lifestyle." },
];

const premiumFeatures = [
  "Undetectable Hair Systems",
  "Non-Surgical Solutions",
  "Custom Hairline Design",
  "Sweat Resistant Technology",
  "Long-Lasting Bonding",
  "Natural Density Matching",
];

const serviceOverview: { title: string; body: string; page: PageKey }[] = [
  {
    title: "Hair Patch / Hair System",
    body: "Bespoke lace, skin and mono systems crafted for natural hairlines and everyday confidence.",
    page: "hair-patch",
  },
  {
    title: "Hair Wig Services",
    body: "Premium human hair systems with color blending, density mapping and styling support.",
    page: "wigs",
  },
  {
    title: "Hair Fixing & Bonding",
    body: "Secure attachment protocols built for heat, movement, gym routines and social life.",
    page: "hair-patch",
  },
  {
    title: "Hair Transplant Consultation",
    body: "Eligibility checks and honest guidance before you commit to a surgical path.",
    page: "transplant",
  },
  {
    title: "Hair Maintenance",
    body: "Cleaning, rebonding, cutting and finish refinement to keep your system invisible.",
    page: "contact",
  },
  {
    title: "Scalp Analysis",
    body: "A private assessment of thinning, hairline recession, density and next best option.",
    page: "transplant",
  },
];

const processSteps = [
  { title: "Consultation", body: "We understand your hair loss pattern, lifestyle, face shape and confidence goals." },
  { title: "Scalp Analysis", body: "The specialist maps scalp condition, density loss and attachment suitability." },
  { title: "Hairline Design", body: "A custom frontal line is designed to look masculine, natural and age-correct." },
  { title: "Application", body: "Your system is bonded, blended and secured with premium fixing protocols." },
  { title: "Styling", body: "Cutting and finishing create a look that feels like your own hair." },
  { title: "Maintenance", body: "Follow-up care keeps the finish clean, comfortable and undetectable." },
];

const reels = [
  { title: "First Look Reveal", copy: "A quiet moment when the mirror feels different.", video: media.heroVideo, poster: media.heroPoster },
  { title: "Hairline Detailing", copy: "Close-range precision for a natural frontal transition.", video: media.barberVideo, poster: media.haircut },
  { title: "Final Styling", copy: "Cut, blend and shape for premium everyday confidence.", video: media.detailVideo, poster: media.scalp },
];

const reviews = [
  {
    name: "Hamza R.",
    role: "Hair patch client",
    quote:
      "The result looked natural from day one. Nobody noticed a system, they only noticed I looked younger and more confident.",
  },
  {
    name: "Saad M.",
    role: "Hairline restoration",
    quote:
      "The consultation was private, premium and honest. The custom hairline changed how I felt in meetings and photos.",
  },
  {
    name: "Bilal A.",
    role: "Maintenance member",
    quote:
      "Their maintenance plan keeps the bond secure and the finish clean. It feels like a luxury grooming membership.",
  },
];

const comparisonRows = [
  { label: "Cost", patch: "Premium but controlled", transplant: "Higher upfront investment" },
  { label: "Time", patch: "Same-day visible transformation", transplant: "Months for visible growth" },
  { label: "Recovery", patch: "No surgical downtime", transplant: "Medical recovery required" },
  { label: "Appearance", patch: "Immediate density and designed hairline", transplant: "Depends on donor area and growth" },
  { label: "Maintenance", patch: "Scheduled cleaning and rebonding", transplant: "Medical follow-ups and long-term care" },
];

const homeFaqs = [
  {
    question: "Is a hair patch visible in close range?",
    answer:
      "A premium system should not look like a patch. We design the hairline, density, color and texture so the finish blends with your natural appearance.",
  },
  {
    question: "How long does a non-surgical hair system last?",
    answer:
      "Longevity depends on material, lifestyle and maintenance. Most clients follow a professional cleaning and rebonding schedule for a consistently natural result.",
  },
  {
    question: "Can I work out or sweat with a hair system?",
    answer:
      "Yes. We use sweat-resistant bonding protocols and give aftercare guidance for gym routines, heat and daily grooming.",
  },
  {
    question: "Do you also guide hair transplant decisions?",
    answer:
      "Yes. We provide consultation, scalp analysis and patch vs transplant guidance so you can choose the right path with clarity.",
  },
];

const hairPatchFaqs = [
  {
    question: "What is a hair patch?",
    answer:
      "A hair patch is a non-surgical hair replacement system fitted to the thinning or bald area, then cut and blended with your natural hair.",
  },
  {
    question: "Will the bonding feel heavy?",
    answer: "No. Premium systems are lightweight and breathable when measured, fitted and maintained correctly.",
  },
  {
    question: "Can I choose my hairstyle?",
    answer: "Yes. We design density, length, texture and hairline direction around your preferred style and face shape.",
  },
];

const wigFaqs = [
  {
    question: "Are the wigs made with human hair?",
    answer: "Premium options include human hair systems selected for texture, density and natural movement.",
  },
  {
    question: "Can a wig match my natural hair color?",
    answer: "Yes. We use color blending, density matching and styling to make the system feel personal.",
  },
];

const transplantFaqs = [
  {
    question: "Do you perform hair transplant surgery?",
    answer:
      "A.Z Hair Club focuses on consultation, assessment and guidance so you understand eligibility, alternatives, timeline and expectations.",
  },
  {
    question: "Should I choose a patch or transplant?",
    answer:
      "It depends on your donor area, budget, timeline, desired density and comfort with surgery. Our assessment clarifies the practical path.",
  },
];

const contactFaqs = [
  {
    question: "Can I book privately on WhatsApp?",
    answer: "Yes. WhatsApp is the fastest way to request a private consultation slot and share your hair concern confidentially.",
  },
  {
    question: "Do you accept walk-ins?",
    answer: "Appointments are recommended so each consultation remains private, calm and specialist-led.",
  },
];

const hairPatchBenefits = [
  "Advanced lace, skin and mono base options",
  "Natural hairline design for frontal realism",
  "Sweat-resistant system for active men",
  "Lightweight comfort with breathable fitting",
  "Undetectable look under normal social distance",
  "Long-lasting bonding with scheduled maintenance",
  "Styling flexibility for modern masculine looks",
  "Natural density matching for age-correct volume",
];

const wigBenefits = [
  "Custom hair wigs designed around face shape",
  "Human hair systems with premium movement",
  "Natural hairline design and temple detailing",
  "Density matching for realistic age balance",
  "Color blending technology for invisible transition",
  "Styling and maintenance plans after fitting",
  "Premium materials selected for comfort",
  "Private fitting experience for confidence and discretion",
];

const transplantBenefits = [
  "Hair loss assessment and stage mapping",
  "Scalp analysis with donor area review",
  "Eligibility check before surgical commitment",
  "Patch vs transplant comparison for practical clarity",
  "Cost and recovery guide for realistic planning",
  "Transplant guidance with non-surgical alternatives",
];

const galleryCategories: GalleryCategory[] = ["All", "Hair Patch", "Hair Wig", "Hairline", "Maintenance", "Video"];

const galleryItems: {
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  type: "image" | "video";
  video?: string;
}[] = [
  { title: "Natural density finish", category: "Hair Patch", image: media.afterMan, type: "image" },
  { title: "Private hairline design", category: "Hairline", image: media.afterClassic, type: "image" },
  { title: "Custom system preview", category: "Hair Wig", image: media.wigSystem, type: "image" },
  { title: "Precision fitting detail", category: "Maintenance", image: media.scalp, type: "image" },
  { title: "Hairline detailing reel", category: "Video", image: media.haircut, type: "video", video: media.barberVideo },
  { title: "Salon transformation moment", category: "Video", image: media.heroPoster, type: "video", video: media.heroVideo },
  { title: "Classic masculine styling", category: "Hair Patch", image: media.afterSharp, type: "image" },
  { title: "Consultation and planning", category: "Hairline", image: media.consultation, type: "image" },
  { title: "Premium grooming finish", category: "Maintenance", image: media.haircut, type: "image" },
];

const aboutStats = [
  { value: "1000+", label: "confidence transformations" },
  { value: "5.0", label: "Google-style client rating" },
  { value: "6", label: "specialist service categories" },
  { value: "1", label: "private transformation standard" },
];

const certifications = [
  "Advanced non-surgical hair replacement protocols",
  "Hairline design and density mapping",
  "Bonding, cleaning and maintenance systems",
  "Client privacy and consultation workflow",
];

const serviceOptions = [
  "Hair Patch Consultation",
  "Hair Wig Consultation",
  "Hair Transplant Guidance",
  "Maintenance Appointment",
  "Scalp Analysis",
];

const timeSlots = ["11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];

const businessHours = [
  ["Monday - Thursday", "11:00 AM - 8:00 PM"],
  ["Friday", "3:00 PM - 8:00 PM"],
  ["Saturday", "11:00 AM - 9:00 PM"],
  ["Sunday", "Private bookings only"],
];

export default function App() {
  const [page, setPage] = useState<PageKey>(() => pageFromHash());
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const syncPage = () => setPage(pageFromHash());
    window.addEventListener("hashchange", syncPage);
    window.addEventListener("popstate", syncPage);
    return () => {
      window.removeEventListener("hashchange", syncPage);
      window.removeEventListener("popstate", syncPage);
    };
  }, []);

  useEffect(() => {
    applySeo(page);
  }, [page]);

  const navigate = useCallback((target: PageKey) => {
    setPage(target);
    if (window.location.hash !== `#${target}`) {
      window.history.pushState(null, "", `#${target}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  let content: ReactNode;
  switch (page) {
    case "hair-patch":
      content = <HairPatchPage onBook={openBooking} />;
      break;
    case "wigs":
      content = <WigsPage onBook={openBooking} />;
      break;
    case "transplant":
      content = <TransplantPage onBook={openBooking} />;
      break;
    case "gallery":
      content = <GalleryPage onBook={openBooking} />;
      break;
    case "about":
      content = <AboutPage onBook={openBooking} />;
      break;
    case "contact":
      content = <ContactPage onBook={openBooking} />;
      break;
    default:
      content = <HomePage navigate={navigate} onBook={openBooking} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-24 text-white md:pb-0">
      <NavBar currentPage={page} navigate={navigate} onBook={openBooking} />
      <main id="main" key={page} className="overflow-hidden">
        {content}
      </main>
      <Footer navigate={navigate} />
      <StickyConversionLayer onBook={openBooking} />
      <AIBot />
      <ExitIntentPopup onBook={openBooking} />
      <BookingDrawer open={bookingOpen} onClose={closeBooking} />
    </div>
  );
}

function pageFromHash(): PageKey {
  const raw = window.location.hash.replace("#", "") as PageKey;
  return pageKeys.includes(raw) ? raw : "home";
}

function whatsAppUrl(message: string) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}

function applySeo(page: PageKey) {
  const meta = pageMeta[page];
  const url = `${window.location.origin}${window.location.pathname}#${page}`;
  document.title = `${meta.title} | ${brandName}`;
  upsertMeta("name", "description", meta.description);
  upsertMeta("name", "keywords", meta.keywords);
  upsertMeta("name", "robots", "index, follow");
  upsertMeta("property", "og:title", `${meta.title} | ${brandName}`);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", media.heroPoster);
  upsertMeta("name", "twitter:card", "summary_large_image");

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
        "@id": `${window.location.origin}/#az-hair-club`,
        name: brandName,
        description: pageMeta.home.description,
        image: media.heroPoster,
        telephone: phoneDisplay,
        priceRange: "Premium",
        areaServed: ["Faisalabad", "Punjab", "Pakistan"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Faisalabad",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "312",
        },
        makesOffer: serviceOptions.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service },
        })),
      },
      {
        "@type": "WebSite",
        name: brandName,
        url: window.location.origin,
        potentialAction: {
          "@type": "ContactAction",
          target: whatsAppUrl("I want to book a hair restoration consultation with A.Z Hair Club."),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: homeFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  let script = document.getElementById("az-hair-schema") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = "az-hair-schema";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return scrollY;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, started]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

function LuxuryButton({
  children,
  variant = "gold",
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  variant?: "gold" | "glass" | "dark" | "light";
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const variants = {
    gold:
      "bg-[linear-gradient(135deg,#c6a152,#f6e0a0,#9c7a35)] text-black shadow-[0_18px_60px_rgba(198,161,82,0.32)] hover:shadow-[0_22px_70px_rgba(198,161,82,0.42)]",
    glass:
      "border border-white/18 bg-white/8 text-white backdrop-blur-xl hover:border-[#c6a152]/60 hover:bg-white/14",
    dark: "border border-[#c6a152]/30 bg-black text-white hover:border-[#c6a152] hover:bg-[#17140d]",
    light: "border border-black/10 bg-white text-black hover:bg-[#f5efe3]",
  };
  const classes = `group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={classes}>
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
      <ArrowIcon />
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0 text-[#c6a152]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavBar({ currentPage, navigate, onBook }: { currentPage: PageKey; navigate: (page: PageKey) => void; onBook: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="glass-nav mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 text-white md:px-6">
        <button type="button" onClick={() => navigate("home")} className="flex items-center gap-3 text-left" aria-label="A.Z Hair Club home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c6a152]/50 bg-black/70 text-sm font-black text-[#f5d98b] shadow-[0_0_32px_rgba(198,161,82,0.25)]">
            AZ
          </span>
          <span>
            <span className="block font-display text-base font-semibold uppercase tracking-[0.24em] text-white md:text-lg">A.Z Hair Club</span>
            <span className="hidden text-[10px] uppercase tracking-[0.28em] text-[#d7c7a5] sm:block">Luxury Hair Restoration</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <button
              type="button"
              key={item.key}
              onClick={() => navigate(item.key)}
              className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                currentPage === item.key ? "bg-white text-black" : "text-white/72 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="text-right text-[10px] uppercase tracking-[0.24em] text-[#d7c7a5]">Limited slots</span>
          <LuxuryButton onClick={onBook} className="px-5 py-2.5 text-[10px]" variant="gold">
            Book
          </LuxuryButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <span className="space-y-1.5">
            <span className="block h-px w-5 bg-white" />
            <span className="block h-px w-5 bg-white" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="premium-panel mx-3 mt-3 rounded-[28px] p-4 lg:hidden">
          <div className="grid gap-2">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.key}
                onClick={() => {
                  navigate(item.key);
                  setOpen(false);
                }}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.16em] ${
                  currentPage === item.key ? "bg-[#c6a152] text-black" : "bg-white/5 text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <LuxuryButton onClick={onBook} className="mt-2 w-full" variant="gold">
              Book Consultation
            </LuxuryButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HomePage({ navigate, onBook }: { navigate: (page: PageKey) => void; onBook: () => void }) {
  return (
    <>
      <HomeHero navigate={navigate} onBook={onBook} />
      <TrustStrip />
      <WhyChooseSection />
      <ServicesOverview navigate={navigate} />
      <BeforeAfterSection
        title="See the confidence shift before the first conversation begins."
        copy="Use the slider to experience the instant visual difference a premium non-surgical system can create."
      />
      <ProcessTimeline />
      <ReelsSection />
      <ReviewsCarousel />
      <ComparisonTable />
      <FAQSection title="Questions men ask before booking" faqs={homeFaqs} />
      <FinalCta title="Start Your Transformation Today" copy={bookingScarcity} onBook={onBook} />
    </>
  );
}

function HomeHero({ navigate, onBook }: { navigate: (page: PageKey) => void; onBook: () => void }) {
  const scrollY = useScrollY();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black pt-28 text-white">
      <video
        className="absolute inset-0 h-[115%] w-full object-cover opacity-45"
        style={{ transform: `translate3d(0, ${scrollY * 0.12}px, 0)` }}
        poster={media.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={media.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(198,161,82,0.32),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.96),rgba(0,0,0,0.62),rgba(0,0,0,0.28))]" />
      <div className="hero-vignette" />
      <div className="aurora absolute right-[-20%] top-[12%] h-[38rem] w-[38rem] opacity-45" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
        <Reveal className="max-w-5xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#e7c66f]">International-Level Men's Hair Restoration</p>
          <h1 className="font-display text-6xl font-semibold uppercase leading-[0.84] tracking-[-0.06em] text-white sm:text-7xl md:text-8xl lg:text-[8.8rem]">
            A.Z Hair Club
            <span className="mt-8 block max-w-4xl font-sans text-3xl font-semibold normal-case leading-[1.04] tracking-[-0.04em] text-[#f7efe0] sm:text-5xl md:text-6xl">
              Get Your Hair Back. Get Your Confidence Back.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
            Premium non-surgical hair restoration solutions designed for modern men who expect privacy, precision and a natural-looking transformation.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LuxuryButton onClick={onBook} variant="gold">
              Book Free Consultation
            </LuxuryButton>
            <LuxuryButton href={whatsAppUrl("I want a free consultation for A.Z Hair Club hair restoration.")} variant="glass">
              WhatsApp Now
            </LuxuryButton>
            <LuxuryButton onClick={() => navigate("gallery")} variant="glass">
              View Transformations
            </LuxuryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PageHero({
  kicker,
  title,
  copy,
  image,
  primaryLabel,
  onBook,
  secondaryHref,
}: {
  kicker: string;
  title: string;
  copy: string;
  image: string;
  primaryLabel: string;
  onBook: () => void;
  secondaryHref?: string;
}) {
  const scrollY = useScrollY();

  return (
    <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-black pt-28 text-white">
      <img
        src={image}
        alt="Premium hair restoration atmosphere at A.Z Hair Club"
        className="absolute inset-0 h-[112%] w-full object-cover opacity-50"
        style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_30%,rgba(198,161,82,0.28),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.94),rgba(0,0,0,0.68),rgba(0,0,0,0.24))]" />
      <div className="hero-vignette" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <Reveal className="max-w-4xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#e7c66f]">{kicker}</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">{copy}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LuxuryButton onClick={onBook} variant="gold">
              {primaryLabel}
            </LuxuryButton>
            <LuxuryButton href={secondaryHref ?? whatsAppUrl(`I want to book ${primaryLabel} at A.Z Hair Club.`)} variant="glass">
              WhatsApp Now
            </LuxuryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustStrip({ compact = false }: { compact?: boolean }) {
  const paddingClass = compact ? "py-10" : "py-14";
  return (
    <section className={`relative bg-[#050505] px-5 ${paddingClass} text-white sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-px overflow-hidden rounded-[30px] border border-white/10 bg-white/10 md:grid-cols-4">
          {trustMetrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 80} className="bg-[#0d0d0d]/95 p-6 md:p-7">
              <div className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#f1d58f] md:text-5xl">
                <Counter end={metric.value} suffix={metric.suffix} />
              </div>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white">{metric.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/58">{metric.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  kicker,
  title,
  children,
  align = "center",
  dark = true,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#c6a152]">{kicker}</p>
      <h2 className={`mt-4 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-[#100f0c]"}`}>
        {title}
      </h2>
      {children ? <div className={`mt-5 text-base leading-8 ${dark ? "text-white/64" : "text-black/62"}`}>{children}</div> : null}
    </Reveal>
  );
}

function WhyChooseSection() {
  return (
    <section className="relative bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c6a152]/50 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Why choose us" title="Built for men who need the result to look real." dark>
          A.Z Hair Club combines aesthetic design, technical fitting and private grooming care into one premium confidence system.
        </SectionHeader>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {premiumFeatures.map((feature, index) => (
            <Reveal key={feature} delay={index * 70}>
              <div className="premium-panel sheen group h-full rounded-[28px] p-6 transition duration-500 hover:-translate-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c6a152]">0{index + 1}</span>
                <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.04em] text-white">{feature}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  Every detail is calibrated for realism under normal light, close conversation and daily movement.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesOverview({ navigate }: { navigate: (page: PageKey) => void }) {
  return (
    <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Services" title="One destination for every stage of hair restoration." dark={false}>
          Choose the path that fits your timeline, budget and lifestyle. Every option begins with a private consultation.
        </SectionHeader>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceOverview.map((service, index) => (
            <Reveal key={service.title} delay={index * 70}>
              <button
                type="button"
                onClick={() => navigate(service.page)}
                className="group h-full w-full rounded-[30px] border border-black/10 bg-white/70 p-7 text-left shadow-[0_24px_80px_rgba(20,16,8,0.08)] transition duration-500 hover:-translate-y-2 hover:border-[#c6a152]/70 hover:bg-white"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9c7a35]">Service 0{index + 1}</span>
                <h3 className="mt-7 font-display text-3xl font-semibold tracking-[-0.04em]">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/62">{service.body}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-black">
                  Explore <ArrowIcon />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection({ title, copy }: { title: string; copy: string }) {
  return (
    <section className="relative bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-[#c6a152]/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeader kicker="Before and after" title={title} align="left" dark>
          {copy}
        </SectionHeader>
        <Reveal delay={120}>
          <ComparisonSlider />
        </Reveal>
      </div>
    </section>
  );
}

function ComparisonSlider() {
  const [position, setPosition] = useState(52);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const updatePosition = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((event.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, next)));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging) updatePosition(event);
  };

  return (
    <div className="premium-panel group overflow-hidden rounded-[34px] p-3">
      <div
        ref={ref}
        className="relative aspect-[4/5] cursor-ew-resize overflow-hidden rounded-[26px] bg-black md:aspect-[16/11]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        role="presentation"
      >
        <img
          src={media.beforeMan}
          alt="Before hair restoration preview"
          className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img
            src={media.afterMan}
            alt="After hair restoration preview"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute bottom-5 left-5 rounded-full bg-black/65 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-xl">Before</div>
        <div className="absolute bottom-5 right-5 rounded-full bg-[#c6a152] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black">After</div>
        <div className="absolute inset-y-0 w-px bg-white shadow-[0_0_22px_rgba(255,255,255,0.7)]" style={{ left: `${position}%` }} />
        <div
          className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/70 text-xs font-bold text-[#f3d98f] backdrop-blur-xl"
          style={{ left: `${position}%` }}
        >
          DRAG
        </div>
      </div>
      <label className="sr-only" htmlFor="comparison-range">
        Before and after comparison
      </label>
      <input
        id="comparison-range"
        type="range"
        min="5"
        max="95"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="compare-range mt-4 w-full"
      />
    </div>
  );
}

function ProcessTimeline() {
  return (
    <section className="bg-black px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Transformation process" title="A private, specialist-led path from concern to confidence." dark>
          The process is structured so the final result feels considered, masculine and natural before you leave the studio.
        </SectionHeader>
        <div className="mt-16 grid gap-6 lg:grid-cols-6">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 80}>
              <div className="relative border-l border-[#c6a152]/45 pl-5 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-6">
                <span className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-[#c6a152] shadow-[0_0_24px_rgba(198,161,82,0.7)] lg:-top-2 lg:left-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c6a152]">0{index + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelsSection() {
  return (
    <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Video testimonials" title="Vertical proof designed for the way men make decisions today." dark={false}>
          Fast reels, muted previews and social-first storytelling create confidence before the first call.
        </SectionHeader>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reels.map((reel, index) => (
            <Reveal key={reel.title} delay={index * 100}>
              <div className="group overflow-hidden rounded-[34px] bg-black p-3 shadow-[0_28px_90px_rgba(20,16,8,0.16)]">
                <div className="relative aspect-[9/16] overflow-hidden rounded-[26px]">
                  <video className="h-full w-full object-cover transition duration-700 group-hover:scale-105" poster={reel.poster} autoPlay muted loop playsInline preload="metadata">
                    <source src={reel.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#f1d58f]">Muted preview</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">{reel.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/68">{reel.copy}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % reviews.length), 3600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader kicker="Google-style reviews" title="Social proof that sounds like real confidence." dark>
          High-ticket transformation requires trust. These review patterns show what clients value most: discretion, realism and care.
        </SectionHeader>
        <Reveal className="mt-14 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] p-3">
          <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
            {reviews.map((review) => (
              <div key={review.name} className="w-full shrink-0 p-3">
                <div className="premium-panel rounded-[28px] p-8 md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f1d58f]">Rating 5.0 / 5</p>
                  <blockquote className="mt-6 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-4xl">"{review.quote}"</blockquote>
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <div>
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="mt-1 text-sm text-white/55">{review.role}</p>
                    </div>
                    <span className="rounded-full border border-[#c6a152]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f1d58f]">Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((review, index) => (
            <button
              type="button"
              key={review.name}
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all ${active === index ? "w-10 bg-[#c6a152]" : "w-2.5 bg-white/25"}`}
              aria-label={`Show review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Decision clarity" title="Hair patch vs hair transplant without the pressure." dark={false}>
          A premium consultation should help you choose the right path, not push you into the most expensive one.
        </SectionHeader>
        <Reveal className="mt-14 overflow-hidden rounded-[34px] border border-black/10 bg-white shadow-[0_26px_90px_rgba(20,16,8,0.12)]">
          <div className="grid grid-cols-3 bg-[#100f0c] p-4 text-xs font-bold uppercase tracking-[0.24em] text-white md:text-sm">
            <span>Factor</span>
            <span>Hair Patch</span>
            <span>Hair Transplant</span>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.label} className="grid grid-cols-3 border-t border-black/10 p-4 text-sm leading-6 md:p-6 md:text-base">
              <strong>{row.label}</strong>
              <span className="text-black/68">{row.patch}</span>
              <span className="text-black/68">{row.transplant}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FAQSection({ title, faqs }: { title: string; faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader kicker="FAQ" title={title} dark />
        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 70}>
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="w-full rounded-[26px] border border-white/10 bg-white/[0.04] p-6 text-left transition hover:border-[#c6a152]/50"
              >
                <span className="flex items-center justify-between gap-6">
                  <span className="font-display text-2xl font-semibold tracking-[-0.04em]">{faq.question}</span>
                  <span className="text-2xl text-[#c6a152]">{open === index ? "-" : "+"}</span>
                </span>
                <span className={`grid transition-all duration-500 ${open === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="overflow-hidden">
                    <span className="mt-5 block text-sm leading-7 text-white/62">{faq.answer}</span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ title, copy, onBook }: { title: string; copy: string; onBook: () => void }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(198,161,82,0.24),transparent_34%)]" />
      <Reveal className="relative mx-auto max-w-5xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#c6a152]">Private consultation</p>
        <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">{copy}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <LuxuryButton onClick={onBook} variant="gold">
            Book Consultation
          </LuxuryButton>
          <LuxuryButton href={whatsAppUrl("I want to start my hair transformation with A.Z Hair Club.")} variant="glass">
            WhatsApp Now
          </LuxuryButton>
        </div>
      </Reveal>
    </section>
  );
}

function HairPatchPage({ onBook }: { onBook: () => void }) {
  return (
    <>
      <PageHero
        kicker="Hair Patch in Faisalabad"
        title="Undetectable non-surgical hair replacement for men."
        copy="A custom hair patch system designed for natural hairlines, sweat resistance, lightweight comfort and instant confidence."
        image={media.scalp}
        primaryLabel="Book Your Hair Patch Consultation Today"
        onBook={onBook}
      />
      <TrustStrip compact />
      <EditorialSplit
        kicker="What is a hair patch"
        title="A premium hair system that replaces visible hair loss without surgery."
        body="Your system is measured, selected, bonded, cut and blended so it behaves like a natural grooming upgrade rather than a cosmetic cover-up."
        image={media.wigSystem}
        items={["Custom base selection", "Natural hairline placement", "Density and color matching", "Private maintenance plan"]}
      />
      <ServiceHighlights kicker="Advanced technology" title="Engineered for realism, movement and daily life." items={hairPatchBenefits} />
      <BeforeAfterSection
        title="Instant density without surgical downtime."
        copy="The consultation helps you visualize hairline, density and finish before committing to a system."
      />
      <LeadCaptureSection title="Book Your Hair Patch Consultation Today" copy={bookingScarcity} defaultService="Hair Patch Consultation" />
      <ProofSection />
      <FAQSection title="Hair patch questions" faqs={hairPatchFaqs} />
      <FinalCta title="Get a hairline that feels like you again." copy="WhatsApp first for a private slot, scalp review and system recommendation." onBook={onBook} />
    </>
  );
}

function WigsPage({ onBook }: { onBook: () => void }) {
  return (
    <>
      <PageHero
        kicker="Hair Wig Services Faisalabad"
        title="Custom hair wigs built like luxury grooming systems."
        copy="Premium human hair systems, natural hairline design, density matching and maintenance for men who want an elegant, discreet solution."
        image={media.afterClassic}
        primaryLabel="Find Your Perfect Hair Solution"
        onBook={onBook}
      />
      <TrustStrip compact />
      <EditorialSplit
        kicker="Custom hair wigs"
        title="Not a generic wig. A face-matched, confidence-led hair solution."
        body="We design your system around your head shape, skin tone, natural hair texture, preferred style and social lifestyle."
        image={media.wigSystem}
        items={["Human hair systems", "Natural hairline direction", "Density mapping", "Color blending technology"]}
        reverse
      />
      <ServiceHighlights kicker="Premium materials" title="Every detail is selected for comfort, movement and realism." items={wigBenefits} />
      <LeadCaptureSection title="Find Your Perfect Hair Solution" copy="Request a private fitting and receive a system recommendation based on your goals." defaultService="Hair Wig Consultation" />
      <ProofSection />
      <FAQSection title="Hair wig questions" faqs={wigFaqs} />
      <FinalCta title="Move through the world without explaining your hair." copy={bookingScarcity} onBook={onBook} />
    </>
  );
}

function TransplantPage({ onBook }: { onBook: () => void }) {
  return (
    <>
      <PageHero
        kicker="Hair transplant consultation"
        title="Know your best option before you choose surgery."
        copy="Get a structured hair loss assessment, scalp analysis, eligibility check and patch vs transplant guidance in a premium private setting."
        image={media.consultation}
        primaryLabel="Schedule Your Consultation"
        onBook={onBook}
      />
      <TrustStrip compact />
      <ServiceHighlights kicker="Assessment system" title="Clear guidance for men comparing restoration paths." items={transplantBenefits} />
      <AssessmentFlow />
      <ComparisonTable />
      <CostRecoveryGuide />
      <LeadCaptureSection title="Schedule Your Consultation" copy="Bring clarity to cost, recovery, eligibility and the look you want before making a major decision." defaultService="Hair Transplant Guidance" />
      <ProofSection />
      <FAQSection title="Transplant consultation questions" faqs={transplantFaqs} />
      <FinalCta title="Choose with confidence, not pressure." copy={bookingScarcity} onBook={onBook} />
    </>
  );
}

function GalleryPage({ onBook }: { onBook: () => void }) {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[number] | null>(null);
  const visibleItems = galleryItems.filter((item) => category === "All" || item.category === category);

  return (
    <>
      <PageHero
        kicker="Before and after gallery"
        title="Transformation previews for men who value subtlety."
        copy="Explore hair patch, wig, hairline, maintenance and video testimonial layouts designed for verified clinic case studies."
        image={media.salon}
        primaryLabel="Book A Private Review"
        onBook={onBook}
      />
      <TrustStrip compact />
      <BeforeAfterSection title="Drag through the visible confidence shift." copy="A conversion-focused before/after module ready for real client transformations and case documentation." />
      <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader kicker="Masonry gallery" title="Filter by transformation type." dark={false}>
            Touch-friendly category controls, hover zoom and lightbox previews support a premium portfolio experience.
          </SectionHeader>
          <Reveal className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2 rounded-full border border-black/10 bg-white/70 p-2">
            {galleryCategories.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${category === item ? "bg-black text-white" : "text-black/58 hover:bg-black/8"}`}
              >
                {item}
              </button>
            ))}
          </Reveal>
          <div className="masonry-grid mt-14">
            {visibleItems.map((item, index) => (
              <Reveal key={item.title} delay={(index % 6) * 70} className="masonry-item">
                <button type="button" onClick={() => setLightbox(item)} className="group mb-5 block w-full overflow-hidden rounded-[30px] bg-black text-left shadow-[0_24px_80px_rgba(20,16,8,0.12)]">
                  <div className="relative overflow-hidden">
                    {item.type === "video" && item.video ? (
                      <video className="h-full max-h-[520px] w-full object-cover transition duration-700 group-hover:scale-105" poster={item.image} muted loop playsInline preload="metadata">
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={item.image} alt={item.title} className="h-full max-h-[520px] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#f1d58f]">{item.category}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ReelsSection />
      <ProofSection />
      <FinalCta title="Ready to see what is possible for your face?" copy="Book a private review and receive a realistic recommendation." onBook={onBook} />
      {lightbox ? <Lightbox item={lightbox} onClose={() => setLightbox(null)} /> : null}
    </>
  );
}

function AboutPage({ onBook }: { onBook: () => void }) {
  return (
    <>
      <PageHero
        kicker="About A.Z Hair Club"
        title="A premium confidence transformation studio for modern men."
        copy="We exist for the man who wants his identity back without looking like he had work done."
        image={media.portrait}
        primaryLabel="Meet The Standard"
        onBook={onBook}
      />
      <TrustStrip compact />
      <section className="bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeader kicker="Brand story" title="From hair loss anxiety to quiet, masculine certainty." align="left" dark>
            A.Z Hair Club was built around one belief: hair restoration should feel private, premium and emotionally intelligent. We combine advanced non-surgical systems with grooming artistry so men can re-enter their social, professional and personal lives with calm confidence.
          </SectionHeader>
          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="premium-panel rounded-[28px] p-6">
                  <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#f1d58f]">{stat.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <EditorialSplit
        kicker="Mission and vision"
        title="To make premium hair restoration feel as refined as luxury grooming."
        body="Our vision is to become an international-level aesthetic authority for men who want natural hair, stronger identity and a private consultation experience."
        image={media.tools}
        items={["Medical-luxury environment", "Discreet consultation system", "Advanced bonding protocols", "Long-term maintenance culture"]}
        reverse
      />
      <ServiceHighlights kicker="Technology used" title="Systems, materials and workflows selected for invisible results." items={certifications} />
      <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <SectionHeader kicker="Founder philosophy" title="No over-promising. No rushed fitting. No obvious results." dark={false}>
            The best transformation is the one that makes people say you look rested, younger and more like yourself, without knowing why.
          </SectionHeader>
        </div>
      </section>
      <ProofSection />
      <FinalCta title="Experience the standard before you decide." copy={bookingScarcity} onBook={onBook} />
    </>
  );
}

function ContactPage({ onBook }: { onBook: () => void }) {
  return (
    <>
      <PageHero
        kicker="Contact and booking"
        title="Start your transformation in one private message."
        copy="Book a premium consultation, ask on WhatsApp, call the studio or request a guided appointment time."
        image={media.salon}
        primaryLabel="Start Your Transformation Today"
        onBook={onBook}
      />
      <TrustStrip compact />
      <section className="bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <div className="premium-panel rounded-[34px] p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a152]">Premium contact form</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em]">Tell us what changed with your hair.</h2>
              <ContactForm />
            </div>
          </Reveal>
          <div className="grid gap-5">
            <Reveal delay={120}>
              <div className="premium-panel rounded-[34px] p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a152]">Fast actions</p>
                <div className="mt-6 grid gap-3">
                  <LuxuryButton href={whatsAppUrl("I want to book a private consultation at A.Z Hair Club.")} variant="gold" className="w-full">
                    WhatsApp Booking
                  </LuxuryButton>
                  <LuxuryButton href={`tel:${phoneDigits}`} variant="glass" className="w-full">
                    Click To Call
                  </LuxuryButton>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/62">{phoneDisplay}. WhatsApp is recommended for fastest lead capture and appointment confirmation.</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="premium-panel rounded-[34px] p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c6a152]">Business hours</p>
                <div className="mt-5 space-y-3">
                  {businessHours.map(([day, time]) => (
                    <div key={day} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm">
                      <span className="text-white/62">{day}</span>
                      <strong className="text-right text-white">{time}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-[34px] bg-white p-6 shadow-[0_24px_80px_rgba(20,16,8,0.12)] md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9c7a35]">Appointment booking system</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em]">Request a preferred slot.</h2>
              <LeadForm defaultService="Scalp Analysis" dark={false} />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="overflow-hidden rounded-[34px] border border-black/10 bg-black shadow-[0_24px_80px_rgba(20,16,8,0.12)]">
              <iframe
                title="A.Z Hair Club Faisalabad map"
                src="https://www.google.com/maps?q=Faisalabad%20Pakistan&output=embed"
                className="h-[520px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <ProofSection />
      <FAQSection title="Booking questions" faqs={contactFaqs} />
      <FinalCta title="Start Your Transformation Today" copy={bookingScarcity} onBook={onBook} />
    </>
  );
}

function EditorialSplit({
  kicker,
  title,
  body,
  image,
  items,
  reverse = false,
}: {
  kicker: string;
  title: string;
  body: string;
  image: string;
  items: string[];
  reverse?: boolean;
}) {
  return (
    <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <div className="overflow-hidden rounded-[36px] bg-black p-3 shadow-[0_28px_90px_rgba(20,16,8,0.14)]">
            <img src={image} alt={title} className="h-[520px] w-full rounded-[28px] object-cover" loading="lazy" decoding="async" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#9c7a35]">{kicker}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1] tracking-[-0.05em] sm:text-6xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-black/64">{body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-black/10 bg-white/72 p-4 text-sm font-semibold text-black/72">
                <CheckIcon />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceHighlights({ kicker, title, items }: { kicker: string; title: string; items: string[] }) {
  return (
    <section className="bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker={kicker} title={title} dark>
          Designed for men who need a transformation that holds up in real rooms, real light and real routines.
        </SectionHeader>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item} delay={index * 55}>
              <div className="premium-panel h-full rounded-[28px] p-6 transition duration-500 hover:-translate-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c6a152]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.04em]">{item}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadCaptureSection({ title, copy, defaultService }: { title: string; copy: string; defaultService: string }) {
  return (
    <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeader kicker="Consultation form" title={title} align="left" dark={false}>
          {copy}
        </SectionHeader>
        <Reveal delay={120}>
          <div className="rounded-[34px] bg-white p-6 shadow-[0_24px_80px_rgba(20,16,8,0.12)] md:p-8">
            <LeadForm defaultService={defaultService} dark={false} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LeadForm({ defaultService, dark = true }: { defaultService: string; dark?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(timeSlots[0]);
  const [status, setStatus] = useState("");
  const inputClass = dark
    ? "border-white/10 bg-white/[0.06] text-white placeholder:text-white/35 focus:border-[#c6a152]"
    : "border-black/10 bg-[#f7f1e7] text-black placeholder:text-black/38 focus:border-[#9c7a35]";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `A.Z Hair Club booking request\nName: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred date: ${date || "Flexible"}\nPreferred time: ${time}`;
    window.open(whatsAppUrl(message), "_blank", "noopener,noreferrer");
    setStatus("Your request is ready on WhatsApp. Send it to confirm your priority slot.");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.18em]">
          Name
          <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className={`rounded-2xl border px-4 py-4 outline-none transition ${inputClass}`} />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.18em]">
          Phone
          <input required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="WhatsApp number" className={`rounded-2xl border px-4 py-4 outline-none transition ${inputClass}`} />
        </label>
      </div>
      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.18em]">
        Service
        <select value={service} onChange={(event) => setService(event.target.value)} className={`rounded-2xl border px-4 py-4 outline-none transition ${inputClass}`}>
          {serviceOptions.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.18em]">
          Date
          <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className={`rounded-2xl border px-4 py-4 outline-none transition [color-scheme:dark] ${inputClass}`} />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.18em]">
          Time
          <select value={time} onChange={(event) => setTime(event.target.value)} className={`rounded-2xl border px-4 py-4 outline-none transition ${inputClass}`}>
            {timeSlots.map((slot) => (
              <option key={slot}>{slot}</option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="rounded-full bg-[linear-gradient(135deg,#c6a152,#f6e0a0,#9c7a35)] px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-black transition hover:-translate-y-0.5">
        Send To WhatsApp
      </button>
      {status ? <p className={`text-sm ${dark ? "text-[#f1d58f]" : "text-[#6d5424]"}`}>{status}</p> : null}
    </form>
  );
}

function ProofSection() {
  return (
    <section className="bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Client proof" title="The emotional result is the real product." dark>
          Clients come for hair. They stay for the way their posture, photos and conversations change afterward.
        </SectionHeader>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 90}>
              <div className="premium-panel h-full rounded-[30px] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#c6a152]">Rating 5.0 / 5</p>
                <p className="mt-6 text-lg leading-8 text-white/78">"{review.quote}"</p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="mt-1 text-sm text-white/50">{review.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AssessmentFlow() {
  return (
    <section className="bg-[#050505] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeader kicker="Consultation pathway" title="A measured assessment before any major decision." align="left" dark>
          The goal is to explain what is realistic now, what is possible later and what option protects your confidence fastest.
        </SectionHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          {transplantBenefits.map((item, index) => (
            <Reveal key={item} delay={index * 70}>
              <div className="premium-panel rounded-[28px] p-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c6a152]">Step {index + 1}</span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.04em]">{item}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CostRecoveryGuide() {
  const rows = [
    ["Best for", "Men who want immediate density or are not ready for surgery", "Men with suitable donor area and long-term surgical goals"],
    ["Recovery", "Return to routine immediately", "Plan for medical downtime and healing"],
    ["Visible result", "Same day after fitting", "Gradual growth cycle over months"],
    ["Budget planning", "System plus maintenance membership", "Procedure cost plus medical follow-ups"],
  ];

  return (
    <section className="bg-[#f5efe3] px-5 py-24 text-[#100f0c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Cost and recovery guide" title="See the practical difference before you decide." dark={false}>
          Your specialist explains cost ranges in consultation after reviewing hair loss stage, target density and lifestyle.
        </SectionHeader>
        <Reveal className="mt-14 overflow-hidden rounded-[34px] bg-white shadow-[0_26px_90px_rgba(20,16,8,0.12)]">
          {rows.map(([label, patch, transplant]) => (
            <div key={label} className="grid gap-4 border-b border-black/10 p-6 last:border-b-0 md:grid-cols-3">
              <strong className="text-lg">{label}</strong>
              <p className="text-black/62">{patch}</p>
              <p className="text-black/62">{transplant}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Lightbox({ item, onClose }: { item: (typeof galleryItems)[number]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/88 p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
      <button type="button" onClick={onClose} className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white">
        Close
      </button>
      <div className="w-full max-w-5xl overflow-hidden rounded-[34px] bg-black">
        {item.type === "video" && item.video ? (
          <video className="max-h-[80vh] w-full object-contain" poster={item.image} controls autoPlay playsInline>
            <source src={item.video} type="video/mp4" />
          </video>
        ) : (
          <img src={item.image} alt={item.title} className="max-h-[80vh] w-full object-contain" />
        )}
        <div className="border-t border-white/10 p-5 text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c6a152]">{item.category}</p>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em]">{item.title}</h3>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `A.Z Hair Club contact request\nName: ${name}\nPhone: ${phone}\nMessage: ${message || "I want guidance for my hair loss."}`;
    window.open(whatsAppUrl(text), "_blank", "noopener,noreferrer");
    setStatus("WhatsApp message prepared. Send it and our team can reply quickly.");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#c6a152]" />
      <input required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="WhatsApp number" className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#c6a152]" />
      <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us about hair loss, baldness, thinning or hairline concerns" rows={5} className="resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#c6a152]" />
      <button type="submit" className="rounded-full bg-[linear-gradient(135deg,#c6a152,#f6e0a0,#9c7a35)] px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-black transition hover:-translate-y-0.5">
        Send Private Request
      </button>
      {status ? <p className="text-sm text-[#f1d58f]">{status}</p> : null}
    </form>
  );
}

function BookingDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-3 backdrop-blur-lg md:items-center" role="dialog" aria-modal="true" aria-label="Book a consultation">
      <div className="premium-panel max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[34px] p-6 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#c6a152]">Priority booking</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.05em] text-white">Book a private consultation.</h2>
            <p className="mt-3 text-sm leading-7 text-white/62">{bookingScarcity} Your form opens WhatsApp for fast lead capture.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Close
          </button>
        </div>
        <LeadForm defaultService="Hair Patch Consultation" />
      </div>
    </div>
  );
}

function StickyConversionLayer({ onBook }: { onBook: () => void }) {
  return (
    <>
      <a
        href={whatsAppUrl("I want to book a consultation with A.Z Hair Club.")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 hidden rounded-full bg-[#1faa59] px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_60px_rgba(31,170,89,0.38)] transition hover:-translate-y-1 md:inline-flex"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={onBook}
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-l-3xl border border-[#c6a152]/40 bg-black/78 px-4 py-5 text-xs font-black uppercase tracking-[0.28em] text-[#f1d58f] shadow-[0_18px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition hover:bg-[#151109] lg:block [writing-mode:vertical-rl]"
      >
        Book Consultation
      </button>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/92 p-3 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <a href={whatsAppUrl("I want a private consultation at A.Z Hair Club.")} target="_blank" rel="noreferrer" className="rounded-full bg-[#1faa59] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-white">
            WhatsApp
          </a>
          <button type="button" onClick={onBook} className="rounded-full bg-[#c6a152] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">
            Book Slot
          </button>
        </div>
      </div>
    </>
  );
}

function ExitIntentPopup({ onBook }: { onBook: () => void }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => window.sessionStorage.getItem("az-exit-dismissed") === "true");

  useEffect(() => {
    if (dismissed || visible) return;
    const trigger = () => setVisible(true);
    const handleMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 8) trigger();
    };
    const timer = window.setTimeout(trigger, 18000);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [dismissed, visible]);

  const close = () => {
    window.sessionStorage.setItem("az-exit-dismissed", "true");
    setDismissed(true);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/76 p-4 backdrop-blur-lg" role="dialog" aria-modal="true" aria-label="Limited consultation offer">
      <div className="premium-panel max-w-xl rounded-[34px] p-7 text-center md:p-10">
        <p className="text-[11px] font-black uppercase tracking-[0.38em] text-[#c6a152]">Before you leave</p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-[-0.05em] text-white md:text-5xl">Claim a private hairline review.</h2>
        <p className="mt-5 text-base leading-7 text-white/68">Send one WhatsApp message and receive guidance on hair patch, wig or transplant consultation options. {bookingScarcity}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <LuxuryButton
            onClick={() => {
              close();
              onBook();
            }}
            variant="gold"
            className="w-full"
          >
            Book Now
          </LuxuryButton>
          <LuxuryButton href={whatsAppUrl("I want to claim a private hairline review at A.Z Hair Club.")} variant="glass" className="w-full">
            WhatsApp
          </LuxuryButton>
        </div>
        <button type="button" onClick={close} className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-white/45 hover:text-white">
          Continue browsing
        </button>
      </div>
    </div>
  );
}

function AIBot() {
  const [open, setOpen] = useState(false);
  const suggestions = ["Which solution is fastest?", "Will it look natural?", "What will maintenance cost?"];

  return (
    <div className="fixed bottom-24 left-4 z-40 md:bottom-6 md:left-6">
      {open ? (
        <div className="premium-panel mb-3 w-[min(22rem,calc(100vw-2rem))] rounded-[30px] p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c6a152]">AI Hair Advisor</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">Ask the first question privately.</h3>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-white/50" aria-label="Close advisor">
              Close
            </button>
          </div>
          <div className="mt-5 grid gap-2">
            {suggestions.map((suggestion) => (
              <a key={suggestion} href={whatsAppUrl(`Question for A.Z Hair Club: ${suggestion}`)} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/74 transition hover:border-[#c6a152]/50 hover:text-white">
                {suggestion}
              </a>
            ))}
          </div>
        </div>
      ) : null}
      <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[#c6a152]/45 bg-black/80 px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#f1d58f] shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        AI Advisor
      </button>
    </div>
  );
}

function Footer({ navigate }: { navigate: (page: PageKey) => void }) {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-semibold uppercase tracking-[-0.04em]">A.Z Hair Club</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/58">
            Luxury non-surgical hair replacement, hair wig services and transplant consultation for men in Faisalabad.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6a152]">Pages</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {navigation.map((item) => (
              <button key={item.key} type="button" onClick={() => navigate(item.key)} className="text-left text-sm text-white/58 transition hover:text-white">
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6a152]">Local SEO</p>
          <p className="mt-4 text-sm leading-7 text-white/58">
            Hair Patch in Faisalabad, Hair Wig Services Faisalabad, Hair Replacement Faisalabad, Non Surgical Hair Replacement, Hair Fixing Faisalabad.
          </p>
        </div>
      </div>
    </footer>
  );
}