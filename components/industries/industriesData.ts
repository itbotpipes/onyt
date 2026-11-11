export interface IndustryGridItem {
  id: string;
  number: string;
  title: string;
  slug: string;
  shortDesc: string;
  tags?: string[];
  image?: string;
  ctaText?: string;
}

export interface IndustryStatItem {
  number: string;
  label: string;
  value?: number;
  suffix?: string;
}

export interface IndustryProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface IndustryCaseStudy {
  id: string;
  number: string;
  industryTag: string;
  title: string;
  summary: string;
  resultMetric?: string;
  image?: string;
  link: string;
  variant?: 'shard' | 'arcs';
  isPrimary?: boolean;
}

export interface IndustryFAQ {
  question: string;
  answer: string;
}

export interface IndustryTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  imageOverlayTitle?: string[];
  image?: string;
}

export interface IndustriesPageContent {
  hero: {
    eyebrow: string;
    headline: {
      line1: string;
      line2: string;
      line3: string;
      highlight: string;
    };
    headlineLines?: string[];
    body: string;
    ctaText: string;
    ctaHref: string;
    annotationLines?: string[];
    image?: string;
    kpis: {
      number: string;
      label: string;
    }[];
  };
  ticker: {
    prefix: string;
    items: string[];
  };
  grid: {
    eyebrow: string;
    heading: string;
    titleLines?: string[];
    subhead?: string;
    items: IndustryGridItem[];
  };
  process: {
    eyebrow: string;
    title: {
      prefix: string;
      highlight: string;
    };
    steps: IndustryProcessStep[];
  };
  stats: {
    eyebrow: string;
    titleLines?: string[];
    subhead?: string;
    items: IndustryStatItem[];
  };
  caseStudies: {
    eyebrow: string;
    title: string;
    highlightWord: string;
    ctaText: string;
    ctaHref: string;
    items: IndustryCaseStudy[];
  };
  faq: {
    eyebrow: string;
    title: string;
    highlightWord: string;
    titleLines?: string[];
    subhead?: string;
    ctaText: string;
    ctaHref: string;
    items: IndustryFAQ[];
    testimonial: IndustryTestimonial;
  };
  testimonial?: {
    eyebrow: string;
    item: IndustryTestimonial;
  };
  finalCta: {
    eyebrow?: string;
    title: string;
    titleLines?: string[];
    body?: string;
    ctaText: string;
    ctaHref: string;
    primaryCtaText?: string;
    primaryCtaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    annotationLines?: string[];
    image?: string;
  };
}

export const INDUSTRIES_PAGE_DATA: IndustriesPageContent = {
  hero: {
    eyebrow: "INDUSTRIES",
    headline: {
      line1: "Industry",
      line2: "expertise",
      line3: "that scales",
      highlight: "brands."
    },
    headlineLines: [
      "Industry expertise",
      "that scales brands."
    ],
    body: "We combine industry understanding with creative, performance and technology to solve real business challenges and drive measurable growth.",
    ctaText: "Explore Industries ↘",
    ctaHref: "#explorer",
    kpis: [
      { number: "06", label: "Industries" },
      { number: "250+", label: "Projects" },
      { number: "3.5×", label: "Avg. growth" }
    ]
  },
  ticker: {
    prefix: "ONYT WORKS WITH —",
    items: [
      "E-COMMERCE",
      "HEALTHCARE",
      "REAL ESTATE",
      "MANUFACTURING",
      "SAAS & TECHNOLOGY",
      "EDUCATION"
    ]
  },
  grid: {
    eyebrow: "///",
    heading: "Sectors we drive forward.",
    titleLines: [
      "Sectors we drive",
      "forward."
    ],
    subhead: "Deep domain execution across specialized verticals where digital velocity delivers outsized market share.",
    items: [
      {
        id: "e-commerce",
        number: "01",
        title: "E-Commerce",
        slug: "e-commerce",
        shortDesc: "End-to-end growth for D2C and consumer brands — from acquisition to retention and beyond.",
        tags: ["Performance", "Brand", "Engineering"],
        image: "/svc-dev.jpg"
      },
      {
        id: "healthcare",
        number: "02",
        title: "Healthcare",
        slug: "healthcare",
        shortDesc: "Clear, trustworthy digital experiences designed around patient confidence, accessibility and clinical rigor.",
        tags: ["UX Strategy", "Identity", "Accessibility"],
        image: "/svc-seo.jpg"
      },
      {
        id: "real-estate",
        number: "03",
        title: "Real Estate",
        slug: "real-estate",
        shortDesc: "A performance-first digital ecosystem that drove higher quality inquiries and faster conversions.",
        tags: ["Lead Engines", "Visual Flagships", "Brand Architecture"],
        image: "/svc-web.jpg"
      },
      {
        id: "manufacturing",
        number: "04",
        title: "Manufacturing",
        slug: "manufacturing",
        shortDesc: "Digital platforms for complex industrial catalogs, distributor portals and international B2B buyer journeys.",
        tags: ["B2B Architecture", "Catalog Systems", "Lead Capture"],
        image: "/hero-workspace.jpg"
      },
      {
        id: "saas-technology",
        number: "05",
        title: "SaaS & Technology",
        slug: "saas-technology",
        shortDesc: "Category-defining brand flagships, product positioning and conversion pipelines for enterprise software.",
        tags: ["Product Motion", "Design Systems", "Funnel Scale"],
        image: "/hero-device.jpg"
      },
      {
        id: "education",
        number: "06",
        title: "Education",
        slug: "education",
        shortDesc: "Engaging learning portals, institutional credibility systems and student acquisition funnels that scale global enrollment.",
        tags: ["Student Portals", "Enrollment UX", "Brand Media"],
        image: "/cs-photo.jpg"
      }
    ]
  },
  process: {
    eyebrow: "THE ONYT APPROACH",
    title: {
      prefix: "A cross-industry engine for",
      highlight: "measurable growth."
    },
    steps: [
      {
        number: "01",
        title: "Understand the industry",
        description: "Deep dive into sector regulations, buyer psychology, and competitive whitespace before writing code."
      },
      {
        number: "02",
        title: "Build a tailored strategy",
        description: "Architecting a unified digital flagship and customer acquisition engine engineered for your exact business model."
      },
      {
        number: "03",
        title: "Execute & scale",
        description: "High-velocity launch, measurement pipelines, and continuous optimization cycles that guarantee measurable ROI."
      }
    ]
  },
  stats: {
    eyebrow: "INDUSTRIES IN NUMBERS",
    titleLines: [
      "Real Businesses.",
      "Real Growth."
    ],
    subhead: "From emerging brands to established enterprises, we turn market complexity into measurable revenue growth.",
    items: [
      { number: "250+", label: "Projects delivered", value: 250, suffix: "+" },
      { number: "6+", label: "Industries served", value: 6, suffix: "+" },
      { number: "3.5×", label: "Avg. growth in leads", value: 3.5, suffix: "×" },
      { number: "95%", label: "Client satisfaction", value: 95, suffix: "%" }
    ]
  },
  caseStudies: {
    eyebrow: "FEATURED WORK",
    title: "Real results across",
    highlightWord: "industries.",
    ctaText: "Explore all work",
    ctaHref: "/work",
    items: [
      {
        id: "cs-real-estate",
        number: "01",
        industryTag: "Real Estate",
        title: "Real Estate",
        summary: "A performance-first digital ecosystem that drove higher quality inquiries and faster conversions.",
        resultMetric: "4× Enquiries",
        link: "/industries/real-estate",
        variant: "shard"
      },
      {
        id: "cs-hospitality",
        number: "02",
        industryTag: "Hospitality",
        title: "Hospitality",
        summary: "A complete growth strategy to boost bookings, brand visibility and direct engagement.",
        resultMetric: "+140% Direct Bookings",
        link: "/industries/hospitality",
        variant: "arcs"
      }
    ]
  },
  faq: {
    eyebrow: "FAQS",
    title: "Common questions about",
    highlightWord: "industries.",
    titleLines: [
      "Common questions about",
      "industries."
    ],
    subhead: "Quick answers to help you understand how we work across different industries.",
    ctaText: "Talk to our team",
    ctaHref: "/contact",
    items: [
      {
        question: "Which industries does ONYT work with?",
        answer: "We specialize in high-growth, high-stakes verticals including E-Commerce, Healthcare, Real Estate, Manufacturing, SaaS & Technology, and Education."
      },
      {
        question: "Do you have experience in my specific industry?",
        answer: "Yes. Across 250+ delivered projects, our senior cross-functional team has executed flagships, growth marketing, and custom web applications for both regulated enterprise sectors and agile D2C brands."
      },
      {
        question: "How do you tailor your approach for different industries?",
        answer: "We conduct deep industry discovery into your sales cycles, buyer friction points, and customer lifetime value before proposing technology stacks or design directions."
      },
      {
        question: "Can you share relevant case studies for my industry?",
        answer: "Absolutely. We provide private walkthroughs and in-depth performance breakdowns for prospective partners during our initial discovery call."
      }
    ],
    testimonial: {
      quote: "A partner who truly understands our industry and growth goals.",
      author: "Marketing Head",
      role: "Marketing Head",
      company: "Real Estate Brand",
      avatar: "/founder.jpg",
      imageOverlayTitle: ["GREAT", "BUSINESSES", "GROW WITH", "GREAT", "PARTNERS."],
      image: "/hero-workspace.jpg"
    }
  },
  testimonial: {
    eyebrow: "06 — WHAT OUR CLIENTS SAY",
    item: {
      quote: "A partner who truly understands our industry and growth goals.",
      author: "Marketing Head",
      role: "Marketing Head",
      company: "Real Estate Brand",
      avatar: "/founder.jpg",
      imageOverlayTitle: ["GREAT", "BUSINESSES", "GROW WITH", "GREAT", "PARTNERS."],
      image: "/hero-workspace.jpg"
    }
  },
  finalCta: {
    title: "Let’s build industry-specific growth for your brand.",
    ctaText: "Let's Talk",
    ctaHref: "/contact",
    primaryCtaText: "Let's Talk",
    primaryCtaHref: "/contact"
  }
};
