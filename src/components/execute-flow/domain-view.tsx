'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { getDomain, getWorkflowsForDomain, type Workflow } from '@/data/workflows'
import { useNavStore } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'

export default function DomainView() {
  const { selectedDomain, navigateTo } = useNavStore()
  const domain = getDomain(selectedDomain || '')
  const domainWorkflows = getWorkflowsForDomain(selectedDomain || '')

  if (!domain) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Domain not found.
      </div>
    )
  }

  const Icon = domain.icon

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Domain header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
      >
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${domain.color}`}
        >
          <Icon className={`h-8 w-8 ${domain.iconColor}`} />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {domain.name}
            </h1>
            <Badge variant="secondary" className="shrink-0">
              {domain.workflowCount} workflows
            </Badge>
          </div>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
            {domain.description}
          </p>
        </div>
      </motion.div>

      {/* Workflow list */}
      <div className="mt-12 space-y-4">
        {domainWorkflows.map((wf, i) => (
          <WorkflowCard
            key={wf.slug}
            workflow={wf}
            index={i}
            onClick={() => navigateTo('workflow', domain.slug, wf.slug)}
          />
        ))}
      </div>

      {domainWorkflows.length === 0 && (
        <div className="mt-16 rounded-2xl border border-dashed border-border/80 p-12 text-center">
          <Users className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Workflows coming soon
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            This domain is planned. Star the repo to get notified when workflows are added.
          </p>
        </div>
      )}
    </div>
  )
}

function WorkflowCard({
  workflow,
  index,
  onClick,
}: {
  workflow: Workflow
  index: number
  onClick: () => void
}) {
  const Icon = workflow.icon

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * index }}
      onClick={onClick}
      className="group w-full rounded-2xl border border-border/60 bg-card p-6 text-left transition-all hover:border-primary/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30 sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {workflow.name}
            </h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {workflow.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {workflow.inputs.map((inp) => (
                <Badge key={inp.key} variant="outline" className="text-xs">
                  {inp.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-primary sm:mt-2" />
      </div>
    </motion.button>
  )
}