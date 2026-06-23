'use client'

import { motion } from 'framer-motion'
import { Heart, Star, GitFork, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function OpenSourceSection() {
  return (
    <section id="open-source" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Left — content */}
            <div className="p-8 sm:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <Heart className="h-3.5 w-3.5" />
                  100% Open Source
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  Built in the Open.
                  <br />
                  <span className="gradient-text">By the Community.</span>
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  ExecuteFlow is not a VC-funded startup trying to lock you in.
                  It&apos;s an open-source project built to solve real problems for
                  real people — especially in India. Every line of code is visible,
                  every workflow is editable, and anyone can contribute.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">No profit motive.</strong> We&apos;re
                  building this because we see problems that AI can solve today — from a
                  chai shop owner checking supplier credibility to a student preparing for
                  their UPSC interview. If you have domain expertise, you can add a workflow.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Star className="h-4 w-4" />
                    Star on GitHub
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <GitFork className="h-4 w-4" />
                    Contribute
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Join Discord
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right — contribution stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col justify-center bg-muted/50 p-8 sm:p-12 lg:p-16"
            >
              <div className="space-y-8">
                <div>
                  <div className="text-4xl font-extrabold text-primary">8+</div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    Domain Categories
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground/70">
                    Finance, Career, Media, Healthcare, Legal, Education, Agriculture, Business Ops
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-primary">20+</div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    Planned Workflows
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground/70">
                    Stock analysis, job matching, video creation, insurance support, supplier verification, and more
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-primary">10</div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    Indian MSME Problems Targeted
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground/70">
                    Invoice automation, escrow compliance, demand aggregation, logistics accountability
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold gradient-text">∞</div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground">
                    Community Contributions
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground/70">
                    Anyone can add a workflow in their domain expertise
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}