'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Users, Globe, Shield, Workflow, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUIStore, useAuthStore, useNavStore } from '@/store/app-store'

const features = [
  {
    icon: Workflow,
    title: 'Pre-Built Pipelines',
    description:
      'Every workflow is a complete, tested pipeline. You don\'t write prompts — you fill a form. The multi-agent system handles the rest, from data fetching to final analysis.',
  },
  {
    icon: Users,
    title: 'Built for India',
    description:
      'Designed specifically for Indian users — NSE/BSE stock analysis, GST verification, Indian job portals, Hindi and regional language support, and solutions for MSME pain points.',
  },
  {
    icon: Cpu,
    title: 'Multi-Agent Intelligence',
    description:
      'Not one AI — a team. Each workflow orchestrates multiple specialized agents that collaborate: one fetches data, another analyzes, a third validates. Like having an expert team at your desk.',
  },
  {
    icon: Shield,
    title: 'Trust-But-Verify',
    description:
      'Every financial and legal output goes through dual-loop verification. A second independent agent audits the primary agent\'s output. No hallucinations in your reports.',
  },
  {
    icon: Globe,
    title: 'Open Source & Free',
    description:
      '100% open source. No subscriptions, no paywalls, no data lock-in. Run it yourself, contribute workflows, and help every Indian access AI-powered tools.',
  },
  {
    icon: Github,
    title: 'Easy to Contribute',
    description:
      'Each workflow is a YAML spec + Python agent classes. Domain experts can add new workflows without touching the platform core. If you know a domain, you can add a workflow.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
}

export default function FeaturesSection() {
  const { setAuthModalOpen, setAuthModalTab } = useUIStore()
  const { isAuthenticated } = useAuthStore()
  const { navigateTo } = useNavStore()

  return (
    <section id="domains" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why ExecuteFlow?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;re not building another AI chatbot. We&apos;re building the operating system for AI workflows — starting with India&apos;s biggest problems.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              custom={i + 1}
              className="rounded-2xl border border-border/60 bg-card p-7 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={7}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="glow-primary gap-2"
            onClick={() => {
              if (isAuthenticated) navigateTo('dashboard')
              else {
                setAuthModalTab('register')
                setAuthModalOpen(true)
              }
            }}
          >
            Explore All Domains
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}