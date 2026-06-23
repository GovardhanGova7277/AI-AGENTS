'use client'

import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { domains, type Domain } from '@/data/workflows'
import { useNavStore } from '@/store/app-store'
import { useState } from 'react'

function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  const { navigateTo } = useNavStore()
  const Icon = domain.icon

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      onClick={() => navigateTo('domain', domain.slug)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-left transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${domain.color}`}
      >
        <Icon className={`h-6 w-6 ${domain.iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold">{domain.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{domain.tagline}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground/70">
          {domain.workflowCount} workflow{domain.workflowCount > 1 ? 's' : ''}
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-all group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </motion.button>
  )
}

export default function Dashboard() {
  const [search, setSearch] = useState('')

  const filtered = domains.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.tagline.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Choose a Domain
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          What problem do you want to solve today?
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mt-8 max-w-md"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search domains..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </motion.div>

      {/* Domain grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((domain, i) => (
          <DomainCard key={domain.slug} domain={domain} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          No domains match &quot;{search}&quot;
        </div>
      )}
    </div>
  )
}