import {
  TrendingUp,
  Briefcase,
  Video,
  HeartPulse,
  Scale,
  GraduationCap,
  Sprout,
  Building2,
  type LucideIcon,
} from 'lucide-react'

export interface Domain {
  slug: string
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  bg: string               // solid bg color (tailwind)
  text: string             // text on that bg
  workflowCount: number
}

export interface Workflow {
  slug: string
  domainSlug: string
  name: string
  description: string
  inputs: WorkflowInput[]
  agentSteps: string[]
  icon: LucideIcon
}

export interface WorkflowInput {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'file'
  placeholder: string
  required?: boolean
  options?: string[]
}

/* ──────────────────────────────────────────────
   DOMAINS — bold flat colors (reference style)
   ────────────────────────────────────────────── */
export const domains: Domain[] = [
  {
    slug: 'finance',
    name: 'Finance',
    tagline: 'Stocks, invoices, cash flow',
    description:
      'From deep stock analysis with annual report breakdowns to automated invoice processing and payment negotiation — everything a small business or investor needs.',
    icon: TrendingUp,
    bg: 'bg-emerald-500',
    text: 'text-white',
    workflowCount: 2,
  },
  {
    slug: 'career',
    name: 'Career',
    tagline: 'Jobs, resumes, interviews',
    description:
      'Upload your resume once. Get matched with the best jobs, receive tailored resume suggestions for each application, and prepare with role-specific interview coaching.',
    icon: Briefcase,
    bg: 'bg-amber-500',
    text: 'text-white',
    workflowCount: 2,
  },
  {
    slug: 'media',
    name: 'Media',
    tagline: 'Script, voice, edit, publish',
    description:
      'Describe your video idea in plain language. The pipeline handles scripting, voiceover, visual editing, and direct YouTube upload — all in one seamless workflow.',
    icon: Video,
    bg: 'bg-violet-500',
    text: 'text-white',
    workflowCount: 1,
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tagline: 'Insurance, symptoms, guidance',
    description:
      'From insurance claim support calls to preliminary symptom assessment and medication reminders. Making healthcare accessible to every Indian.',
    icon: HeartPulse,
    bg: 'bg-rose-500',
    text: 'text-white',
    workflowCount: 1,
  },
  {
    slug: 'legal',
    name: 'Legal',
    tagline: 'Contracts, compliance, guidance',
    description:
      'Simplify legal processes for MSMEs and individuals. Review contracts for red flags, check GST compliance, and get plain-language explanations of legal documents.',
    icon: Scale,
    bg: 'bg-sky-500',
    text: 'text-white',
    workflowCount: 1,
  },
  {
    slug: 'education',
    name: 'Education',
    tagline: 'Tutoring, exam prep, skills',
    description:
      'Adaptive learning workflows that understand where a student struggles and create personalized study plans. From CBSE prep to competitive exam strategy.',
    icon: GraduationCap,
    bg: 'bg-orange-500',
    text: 'text-white',
    workflowCount: 1,
  },
  {
    slug: 'agriculture',
    name: 'Agriculture',
    tagline: 'Crops, prices, weather',
    description:
      'Crop advisory, real-time mandi prices, and weather-based planting schedules. Every farmer deserves data-driven decisions.',
    icon: Sprout,
    bg: 'bg-lime-500',
    text: 'text-white',
    workflowCount: 1,
  },
  {
    slug: 'business',
    name: 'Business',
    tagline: 'Procurement, logistics, verification',
    description:
      'Automate the operational backbone of Indian MSMEs — from supplier due diligence and demand aggregation to repair service matching and inventory tracking.',
    icon: Building2,
    bg: 'bg-teal-500',
    text: 'text-white',
    workflowCount: 2,
  },
]

/* ──────────────────────────────────────────────
   WORKFLOWS
   ────────────────────────────────────────────── */
export const workflows: Workflow[] = [
  {
    slug: 'stock-analysis',
    domainSlug: 'finance',
    name: 'Stock Deep Analysis',
    description:
      'Enter a stock ticker. The pipeline fetches annual reports, quarterly results, financial ratios, news sentiment, and delivers a comprehensive risk-scored analysis.',
    inputs: [
      { key: 'ticker', label: 'Stock Ticker', type: 'text', placeholder: 'e.g. RELIANCE, TCS, INFY', required: true },
      { key: 'exchange', label: 'Exchange', type: 'select', placeholder: 'Select exchange', required: true, options: ['NSE', 'BSE'] },
      { key: 'focus', label: 'Analysis Focus', type: 'select', placeholder: 'What matters most to you?', options: ['Overall Health', 'Dividend Yield', 'Growth Potential', 'Risk Assessment'] },
    ],
    agentSteps: [
      'Fetching company profile & basic data...',
      'Analyzing annual reports (last 3 years)...',
      'Processing quarterly results & trends...',
      'Computing financial ratios (PE, PB, ROE, D/E)...',
      'Scanning news sentiment (last 90 days)...',
      'Generating risk score & investment summary...',
    ],
    icon: TrendingUp,
  },
  {
    slug: 'invoice-automation',
    domainSlug: 'finance',
    name: 'Invoice Automation',
    description:
      'Upload invoices. Data gets extracted, validated against PO, auto-coded to GL accounts, and exported to your accounting software.',
    inputs: [
      { key: 'invoiceFile', label: 'Upload Invoice', type: 'file', placeholder: 'PDF, JPG, or PNG', required: true },
      { key: 'format', label: 'Output Format', type: 'select', placeholder: 'Select format', options: ['Tally', 'Zoho Books', 'Excel CSV', 'JSON'] },
    ],
    agentSteps: [
      'Extracting data from invoice...',
      'Validating line items and totals...',
      'Matching against purchase order...',
      'Auto-coding to GL accounts...',
      'Generating export file...',
    ],
    icon: TrendingUp,
  },
  {
    slug: 'job-match',
    domainSlug: 'career',
    name: 'Smart Job Matcher',
    description:
      'Upload your resume. Skills and experience get parsed, matched against Indian job portals, and you get a tailored resume for each top match.',
    inputs: [
      { key: 'resume', label: 'Upload Resume', type: 'file', placeholder: 'PDF format', required: true },
      { key: 'location', label: 'Preferred Location', type: 'text', placeholder: 'e.g. Bangalore, Remote, Hyderabad' },
      { key: 'experience', label: 'Years of Experience', type: 'select', placeholder: 'Select range', options: ['0-1 (Fresher)', '1-3', '3-5', '5-10', '10+'] },
    ],
    agentSteps: [
      'Parsing resume & extracting skills...',
      'Building candidate profile...',
      'Searching job portals...',
      'Scoring job-fit for each match...',
      'Generating tailored resume per top match...',
    ],
    icon: Briefcase,
  },
  {
    slug: 'interview-prep',
    domainSlug: 'career',
    name: 'Interview Prep Coach',
    description:
      'Tell us the role and company. Get a personalized prep plan with likely questions, model answers, and tips specific to that position.',
    inputs: [
      { key: 'role', label: 'Job Role', type: 'text', placeholder: 'e.g. Senior Backend Developer', required: true },
      { key: 'company', label: 'Company', type: 'text', placeholder: 'e.g. Razorpay, Swiggy' },
      { key: 'experience', label: 'Experience Level', type: 'select', placeholder: 'Select', options: ['Fresher', 'Mid-level (2-5 yrs)', 'Senior (5-10 yrs)', 'Staff/Lead (10+)'] },
    ],
    agentSteps: [
      'Researching company culture & process...',
      'Generating role-specific questions...',
      'Creating behavioral question bank...',
      'Drafting model answers...',
      'Building day-by-day prep schedule...',
    ],
    icon: Briefcase,
  },
  {
    slug: 'video-gen',
    domainSlug: 'media',
    name: 'End-to-End Video Creator',
    description:
      'Describe your video idea. The pipeline scripts it, generates voiceover, creates visuals, edits everything together, and uploads directly to YouTube.',
    inputs: [
      { key: 'idea', label: 'Video Idea', type: 'textarea', placeholder: 'Describe your video — topic, tone, audience, duration...', required: true },
      { key: 'language', label: 'Language', type: 'select', placeholder: 'Video language', options: ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi'] },
      { key: 'duration', label: 'Target Duration', type: 'select', placeholder: 'Approximate length', options: ['Short (1-3 min)', 'Medium (5-10 min)', 'Long (15-30 min)'] },
    ],
    agentSteps: [
      'Generating script from idea...',
      'Creating scene-by-scene breakdown...',
      'Generating voiceover audio...',
      'Creating visual assets...',
      'Assembling & editing video...',
      'Uploading to YouTube...',
    ],
    icon: Video,
  },
  {
    slug: 'insurance-support',
    domainSlug: 'healthcare',
    name: 'Insurance Claim Support',
    description:
      'A voice agent that understands your insurance query, checks policy details, and guides you through the entire claim process step by step.',
    inputs: [
      { key: 'query', label: 'Your Query', type: 'textarea', placeholder: 'Describe your insurance issue...', required: true },
      { key: 'provider', label: 'Insurance Provider', type: 'select', placeholder: 'Select provider', options: ['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'New India Assurance', 'Other'] },
    ],
    agentSteps: [
      'Understanding your query...',
      'Checking policy database...',
      'Identifying required documents...',
      'Generating step-by-step guidance...',
      'Preparing support call script...',
    ],
    icon: HeartPulse,
  },
  {
    slug: 'supplier-verify',
    domainSlug: 'business',
    name: 'Supplier Due Diligence',
    description:
      'Enter a GST number or company name. Data gets aggregated from GSTN, credit registries, and trade reviews for instant trust verification.',
    inputs: [
      { key: 'identifier', label: 'GST Number or Company Name', type: 'text', placeholder: 'e.g. 27AABCU9603R1ZM or Reliance Industries', required: true },
      { key: 'checkType', label: 'Verification Type', type: 'select', placeholder: 'What to verify?', options: ['Full Due Diligence', 'GST Only', 'Credit Check', 'Trade Reputation'] },
    ],
    agentSteps: [
      'Querying GSTN database...',
      'Fetching credit registry records...',
      'Scanning trade reviews...',
      'Checking for legal disputes...',
      'Generating trust score & report...',
    ],
    icon: Building2,
  },
  {
    slug: 'demand-aggregation',
    domainSlug: 'business',
    name: 'Group Buying Engine',
    description:
      'Small retailers pool orders to meet brand MOQs. Demand gets aggregated from nearby shops and bulk pricing gets negotiated directly with brands.',
    inputs: [
      { key: 'product', label: 'Product Category', type: 'text', placeholder: 'e.g. FMCG staples, electronics, textiles', required: true },
      { key: 'location', label: 'Your City/Region', type: 'text', placeholder: 'e.g. Surat, Ludhiana, Coimbatore', required: true },
      { key: 'quantity', label: 'Monthly Volume', type: 'select', placeholder: "Your shop's monthly need", options: ['Small (<100 units)', 'Medium (100-500)', 'Large (500+)'] },
    ],
    agentSteps: [
      'Identifying nearby retailers...',
      'Calculating aggregate volume...',
      'Matching with brand-direct options...',
      'Negotiating bulk pricing...',
      'Generating consolidation report...',
    ],
    icon: Building2,
  },
]

export function getDomain(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug)
}

export function getWorkflowsForDomain(domainSlug: string): Workflow[] {
  return workflows.filter((w) => w.domainSlug === domainSlug)
}

export function getWorkflow(slug: string): Workflow | undefined {
  return workflows.find((w) => w.slug === slug)
}