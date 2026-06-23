'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore, useNavStore, useUIStore } from '@/store/app-store'

export default function HeroSection() {
  const { navigateTo } = useNavStore()
  const { isAuthenticated } = useAuthStore()
  const { setAuthModalOpen, setAuthModalTab } = useUIStore()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigateTo('dashboard')
    } else {
      setAuthModalTab('register')
      setAuthModalOpen(true)
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              Open Source &middot; Free Forever &middot; Built for India
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            AI Workflows That{' '}
            <span className="gradient-text">Actually Work</span>
            <br />
            For Real People
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Pick a domain. Pick a workflow. Fill in a few details.
            A team of AI agents runs the entire pipeline and gives you the result.
            <strong className="text-foreground"> No prompting. No guesswork.</strong>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="glow-primary gap-2 px-8 text-base"
              onClick={handleGetStarted}
            >
              Start Using Workflows
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 text-base"
              onClick={() => {
                document
                  .getElementById('how-it-works')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Play className="h-4 w-4" />
              See How It Works
            </Button>
          </motion.div>

          {/* Mini demo preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-16 max-w-2xl"
          >
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-primary/5">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs text-muted-foreground">
                  executeflow.app
                </span>
              </div>
              {/* Demo content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Running: Stock Deep Analysis
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Fetching company profile...', done: true },
                    { label: 'Analyzing annual reports...', done: true },
                    { label: 'Computing financial ratios...', done: true },
                    { label: 'Scanning news sentiment...', active: true },
                    { label: 'Generating risk score...', pending: true },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                        step.active
                          ? 'bg-primary/10 text-primary font-medium'
                          : step.done
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground/40'
                      }`}
                    >
                      {step.done && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                          ✓
                        </div>
                      )}
                      {step.active && (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      )}
                      {step.pending && (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/20" />
                      )}
                      {step.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

