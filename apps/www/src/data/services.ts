import { profile } from "./profile";
import type {
  ServiceContact,
  ServicePackage,
  ServicePolicy,
  ServiceProcessStep,
} from "./types";

export const servicesIntro = {
  title: "Freelance Software Development",
  tagline:
    "Websites and web applications for businesses, built end to end by an independent software engineer.",
  description: `I'm ${profile.name}, a software engineer based in ${profile.location}. I design, build, and deploy websites and custom web applications for small businesses, startups, and organizations — from a simple landing page to a full internal system. You work directly with me from the first call to launch.`,
};

export const servicePackages: ServicePackage[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    summary:
      "A single, fast page to introduce a product, event, or campaign and turn visitors into leads.",
    startingPrice: 2_500_000,
    billingUnit: "project",
    timeline: "1–2 weeks",
    includes: [
      "Responsive single-page design, up to 5 sections",
      "Contact form or WhatsApp call-to-action",
      "Basic SEO setup and analytics",
      "Deployment, domain, and SSL setup",
    ],
  },
  {
    id: "company-profile",
    name: "Company Profile Website",
    summary:
      "A multi-page website that presents your business, services, and portfolio professionally.",
    startingPrice: 5_000_000,
    billingUnit: "project",
    timeline: "2–4 weeks",
    includes: [
      "Up to 6 pages (e.g. Home, About, Services, Portfolio, Blog, Contact)",
      "Simple content management so you can update text and images",
      "Contact form, maps, and social media integration",
      "SEO setup, analytics, and performance optimization",
      "Deployment, domain, and SSL setup",
    ],
  },
  {
    id: "web-application",
    name: "Custom Web Application",
    summary:
      "Tailor-made systems such as dashboards, admin panels, booking, POS, or internal tools.",
    startingPrice: 15_000_000,
    billingUnit: "project",
    timeline: "4–12 weeks",
    includes: [
      "Requirements analysis and system design",
      "User authentication and role-based access",
      "Database and API design",
      "Third-party integrations (payments, email, maps, etc.)",
      "Testing, deployment, and technical documentation",
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance & Support",
    summary:
      "Ongoing care for an existing website or application, built by me or someone else.",
    startingPrice: 1_000_000,
    billingUnit: "month",
    timeline: "Monthly, cancel anytime",
    includes: [
      "Bug fixes and small content changes",
      "Security and dependency updates",
      "Uptime monitoring and backups",
      "Response within 1 business day",
    ],
  },
];

export const pricingNote =
  "Prices are starting points in Indonesian Rupiah (IDR). Every project receives a fixed quote after scope is agreed in a written proposal. Third-party costs such as domain, hosting, and paid APIs are not included unless stated.";

export const serviceProcess: ServiceProcessStep[] = [
  {
    title: "Free consultation",
    description:
      "A 30-minute call or chat to understand your goals, requirements, and budget.",
  },
  {
    title: "Proposal & quote",
    description:
      "Within 2–3 business days you receive a written proposal with scope, timeline, and a fixed price.",
  },
  {
    title: "Down payment & kickoff",
    description:
      "Once the proposal is approved and the down payment is received, development begins.",
  },
  {
    title: "Build & weekly updates",
    description:
      "You get progress updates every week and a preview link to follow the work as it happens.",
  },
  {
    title: "Review & revisions",
    description:
      "You review the result and request changes. Revision rounds are included for each milestone.",
  },
  {
    title: "Launch & handover",
    description:
      "After final payment, I deploy the project and hand over the source code, credentials, and documentation.",
  },
];

export const paymentTerms: string[] = [
  "All prices and invoices are in Indonesian Rupiah (IDR).",
  "A 50% down payment is required to start the project. The remaining 50% is due after final review, before handover.",
  "Projects above Rp 15.000.000 may be split into three milestones (30% / 40% / 30%).",
  "Payments are made through a secure payment link supporting bank transfer, virtual account, e-wallet, and QRIS.",
  "An invoice is issued for every payment and is due within 7 days.",
  "Maintenance & Support is billed monthly in advance.",
];

// Bump whenever payment terms or policies change
export const policiesLastUpdated = "2026-11-10";

export const servicePolicies: ServicePolicy[] = [
  {
    id: "terms",
    title: "Terms of Service",
    items: [
      "The scope of each project is defined in a written proposal approved by the client. Work outside that scope is quoted separately.",
      "Up to 2 rounds of revisions per milestone are included. Additional revisions may be billed separately.",
      "The client provides content (text, images, brand assets) and required access on time. Delays in providing materials extend the timeline accordingly.",
      "After full payment, the client owns the source code and deliverables. I may show the project in my portfolio unless agreed otherwise in writing.",
      "Every project includes a 30-day warranty after handover for bugs within the agreed scope.",
      "These terms are governed by the laws of the Republic of Indonesia.",
    ],
  },
  {
    id: "refund",
    title: "Refund & Cancellation Policy",
    items: [
      "If a project is cancelled before work begins, the down payment is refunded in full.",
      "Once work has begun, the down payment is non-refundable, and all work completed up to cancellation is handed over to the client.",
      "If I am unable to deliver the agreed scope, payments for undelivered milestones are refunded in full.",
      "Maintenance & Support can be cancelled at any time and stops at the end of the current billing month. The current month is not refunded.",
      `Refund requests are sent by email to ${profile.email}. Approved refunds are processed within 14 business days to the original payment method.`,
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    items: [
      "I only collect information needed to work with you: name, email, phone number, company, and project details.",
      "This information is used for communication, proposals, and invoicing, and is never sold. It is shared only with the payment gateway to process your payment.",
      "Card and bank details are processed directly by the payment gateway. I never see or store them.",
      "Data, files, and credentials shared during a project are kept confidential and are deleted or returned after handover on request.",
      `You can request access to or deletion of your data at any time by emailing ${profile.email}.`,
    ],
  },
];

export const serviceContact: ServiceContact = {
  email: profile.email,
  phone: null,
  location: profile.location,
  responseTime: "I reply within 1 business day.",
};

// Names must match entries in projects.ts
export const featuredProjectNames = [
  "Qulo",
  "SEA Catering",
  "Info Kode Enroll Bg",
];
