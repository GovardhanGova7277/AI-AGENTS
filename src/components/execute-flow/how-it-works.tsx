'use client'

import { motion } from 'framer-motion'
import { MousePointerClick, Layers, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Browse by Domain',
    description:
      'Explore workflows organized by real-world domains — Finance, Career, Media, Healthcare, Legal, Education, Agriculture, and Business Operations. Each domain is built by people who understand that field.',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  },
  {
    icon: Layers,
    title: 'Pick a Workflow',
    description:
      'Each workflow is a structured, pre-built pipeline. No prompting needed. Just pick the one that solves your problem — whether it\'s analyzing a stock, matching a job, or creating a video.',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  },
  {
    icon: Sparkles,
    title: 'Get Results Instantly',
    description:
      'Fill in a simple form (not a prompt) and hit Run. A team of AI agents works together — fetching data, analyzing, processing — and delivers your result in seconds to minutes.',
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
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
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps. Zero AI expertise needed. Just pick, fill, and get results.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i + 1}
              className="group relative rounded-2xl border border-border/60 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Step number */}
              <span className="absolute -top-3 -left-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.color}`}
              >
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}