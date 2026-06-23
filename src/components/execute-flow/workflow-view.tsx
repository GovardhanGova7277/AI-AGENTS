'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  CheckCircle2,
  Loader2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  BarChart3,
  Newspaper,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  getWorkflow,
  getDomain,
  type Workflow,
} from '@/data/workflows'
import { useNavStore, useExecutionStore } from '@/store/app-store'

/* ────────────────────────────────────────────
   MOCK DATA — Simulated agent outputs
   In production, these come from the real
   FastAPI multi-agent backend.
   ──────────────────────────────────────────── */
const mockResults: Record<string, Record<string, unknown>> = {
  'stock-analysis': {
    ticker: 'RELIANCE',
    exchange: 'NSE',
    company: 'Reliance Industries Ltd.',
    sector: 'Oil & Gas / Conglomerate',
    marketCap: '₹24,56,000 Cr',
    currentPrice: '₹2,894.50',
    profile: {
      founded: '1960',
      ceo: 'Mukesh D. Ambani',
      employees: '3,89,000+',
      headquarters: 'Mumbai, Maharashtra',
      segments: ['Petrochemicals', 'Retail', 'Jio', 'New Energy'],
    },
    financials: {
      revenue: '₹10,00,122 Cr',
      netProfit: '₹79,020 Cr',
      eps: '₹117.6',
      peRatio: 24.6,
      pbRatio: 2.8,
      roe: '11.4%',
      debtToEquity: 0.42,
      dividendYield: '0.28%',
      freeCashFlow: '₹1,02,300 Cr',
    },
    quarterlyTrend: {
      revenueGrowth: '+12.3% YoY',
      profitGrowth: '+8.7% YoY',
      marginExpansion: '+1.2%',
      trend: 'stable_growth',
    },
    sentiment: {
      overall: 'Positive',
      score: 72,
      highlights: [
        'Jio subscriber additions hit record 9.2M in Q4',
        'Retail revenue up 18% YoY, EBITDA margin improved',
        'New Energy business commissioning first solar giga-factory',
      ],
      concerns: [
        'Crude oil price volatility impacting refining margins',
        'Competitive pressure in telecom from Jio vs Airtel pricing war',
        'Global headwinds in petrochemical demand',
      ],
    },
    riskScore: 68,
    riskLevel: 'Moderate',
    verdict:
      'Reliance Industries shows solid fundamentals with diversified business segments. The Jio and Retail segments are growth engines, while the refining business provides stable cash flows. The New Energy pivot is long-term positive but capital-intensive. Suitable for investors with a 3-5 year horizon with moderate risk appetite.',
  },
}

function getMockResult(slug: string) {
  return mockResults[slug] || {
    ticker: 'DEMO',
    verdict: 'Workflow completed successfully. In production, this would contain real AI-generated analysis.',
  }
}

/* ────────────────────────────────────────────
   INPUT FIELD COMPONENT
   ──────────────────────────────────────────── */
function WorkflowInputField({
  input,
  value,
  onChange,
}: {
  input: Workflow['inputs'][0]
  value: string
  onChange: (val: string) => void
}) {
  if (input.type === 'select') {
    return (
      <div>
        <Label>{input.label}</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder={input.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {input.options?.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  if (input.type === 'textarea') {
    return (
      <div>
        <Label>{input.label}</Label>
        <textarea
          placeholder={input.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="mt-1.5 flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    )
  }

  if (input.type === 'file') {
    return (
      <div>
        <Label>{input.label}</Label>
        <div className="mt-1.5 flex h-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50 hover:bg-primary/5">
          <p className="text-sm text-muted-foreground">
            {input.placeholder}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Label>{input.label}</Label>
      <Input
        placeholder={input.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5"
      />
    </div>
  )
}

/* ────────────────────────────────────────────
   WORKFLOW VIEW COMPONENT
   ──────────────────────────────────────────── */
export default function WorkflowView() {
  const { selectedWorkflow, selectedDomain } = useNavStore()
  const { navigateTo } = useNavStore()
  const {
    isRunning,
    progress,
    currentStep,
    steps,
    result,
    startExecution,
    updateProgress,
    completeExecution,
    resetExecution,
  } = useExecutionStore()

  const workflow = getWorkflow(selectedWorkflow || '')
  const domain = getDomain(selectedDomain || '')

  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [hasRun, setHasRun] = useState(false)

  if (!workflow || !domain) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Workflow not found.
      </div>
    )
  }

  const Icon = workflow.icon

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleRun = async () => {
    setHasRun(true)
    resetExecution()
    startExecution(workflow.agentSteps)

    // Simulate multi-agent execution step by step
    for (let i = 0; i < workflow.agentSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800))
      updateProgress(i, workflow.agentSteps[i])
    }

    await new Promise((r) => setTimeout(r, 600))
    completeExecution(getMockResult(workflow.slug))
  }

  const handleReset = () => {
    resetExecution()
    setHasRun(false)
    setFormValues({})
  }

  // ─── RENDER: Execution progress ───
  if (isRunning) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">{workflow.name}</h2>
          <p className="mt-1 text-muted-foreground">
            Multi-agent pipeline running...
          </p>
        </motion.div>

        <div className="mt-10">
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {steps.map((step, i) => {
            const isDone = i < steps.indexOf(currentStep)
            const isActive = step === currentStep
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                  isActive
                    ? 'bg-primary/10 font-medium text-primary'
                    : isDone
                    ? 'text-foreground'
                    : 'text-muted-foreground/40'
                }`}
              >
                {isDone && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                )}
                {isActive && (
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin text-primary" />
                )}
                {!isDone && !isActive && (
                  <div className="h-5 w-5 shrink-0 rounded-full border-2 border-muted-foreground/20" />
                )}
                {step}
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  // ─── RENDER: Results ───
  if (result && hasRun) {
    return <ResultsView workflow={workflow} result={result} onReset={handleReset} />
  }

  // ─── RENDER: Form ───
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Breadcrumb */}
        <button
          onClick={() => navigateTo('domain', domain.slug)}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {domain.name} / Workflows
        </button>

        <div className="mt-6 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {workflow.name}
            </h1>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {workflow.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10 rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
      >
        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileText className="h-4 w-4" />
          Fill in the details below
        </div>

        <div className="space-y-5">
          {workflow.inputs.map((inp) => (
            <WorkflowInputField
              key={inp.key}
              input={inp}
              value={formValues[inp.key] || ''}
              onChange={(val) => handleInputChange(inp.key, val)}
            />
          ))}
        </div>

        <Button
          className="glow-primary mt-8 w-full gap-2"
          size="lg"
          onClick={handleRun}
        >
          <Play className="h-4 w-4" />
          Run Workflow
        </Button>
      </motion.div>

      {/* Pipeline preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 rounded-2xl border border-border/40 bg-muted/30 p-6"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <BarChart3 className="h-4 w-4" />
          Agent Pipeline Preview
        </div>
        <div className="mt-4 space-y-2">
          {workflow.agentSteps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm text-muted-foreground/70"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-border/80 text-xs font-medium">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/* ────────────────────────────────────────────
   RESULTS VIEW
   ──────────────────────────────────────────── */
function ResultsView({
  workflow,
  result,
  onReset,
}: {
  workflow: Workflow
  result: Record<string, unknown>
  onReset: () => void
}) {
  const r = result as Record<string, any>

  // Generic results
  if (workflow.slug !== 'stock-analysis') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border/60 bg-card p-8"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            <h2 className="text-2xl font-bold">Workflow Complete</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            {r.verdict || 'Results generated successfully. In production, this displays real AI-generated output.'}
          </p>
          <Button className="mt-8" onClick={onReset}>
            Run Again
          </Button>
        </motion.div>
      </div>
    )
  }

  // Stock Analysis specific results
  const financials = r.financials || {}
  const profile = r.profile || {}
  const sentiment = r.sentiment || {}
  const quarterlyTrend = r.quarterlyTrend || {}

  const TrendIcon =
    (quarterlyTrend.trend === 'stable_growth' || quarterlyTrend.trend?.includes('growth'))
      ? TrendingUp
      : quarterlyTrend.trend === 'decline'
      ? TrendingDown
      : Minus

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{r.company}</h1>
            <p className="mt-1 text-muted-foreground">
              {r.exchange}: {r.ticker} &middot; {r.sector}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{r.currentPrice}</div>
            <div className="text-sm text-muted-foreground">Market Cap: {r.marketCap}</div>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Risk Score */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-primary" />
                Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4">
                <span className="text-5xl font-extrabold text-primary">
                  {r.riskScore}
                </span>
                <div>
                  <Badge
                    variant={
                      r.riskLevel === 'Low'
                        ? 'default'
                        : r.riskLevel === 'Moderate'
                        ? 'secondary'
                        : 'destructive'
                    }
                    className="mb-1"
                  >
                    {r.riskLevel} Risk
                  </Badge>
                  <p className="text-xs text-muted-foreground">out of 100</p>
                </div>
              </div>
              <Progress
                value={r.riskScore}
                className="mt-4 h-2.5"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Company Profile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" />
                Company Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Founded</span>
                <span className="font-medium">{profile.founded}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CEO</span>
                <span className="font-medium">{profile.ceo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employees</span>
                <span className="font-medium">{profile.employees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">HQ</span>
                <span className="font-medium">{profile.headquarters}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {profile.segments?.map((s: string) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial Ratios */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4 text-primary" />
                Key Financial Ratios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: 'Revenue', value: financials.revenue },
                  { label: 'Net Profit', value: financials.netProfit },
                  { label: 'EPS', value: financials.eps },
                  { label: 'PE Ratio', value: financials.peRatio },
                  { label: 'PB Ratio', value: financials.pbRatio },
                  { label: 'ROE', value: financials.roe },
                  { label: 'Debt/Equity', value: financials.debtToEquity },
                  { label: 'Dividend Yield', value: financials.dividendYield },
                  { label: 'Free Cash Flow', value: financials.freeCashFlow },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-muted/40 px-3 py-2">
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="mt-0.5 font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quarterly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendIcon className="h-4 w-4 text-primary" />
                Quarterly Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-2.5 dark:bg-emerald-950/30">
                <span className="text-sm text-muted-foreground">Revenue Growth</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {quarterlyTrend.revenueGrowth}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-2.5 dark:bg-emerald-950/30">
                <span className="text-sm text-muted-foreground">Profit Growth</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {quarterlyTrend.profitGrowth}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-2.5 dark:bg-emerald-950/30">
                <span className="text-sm text-muted-foreground">Margin</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {quarterlyTrend.marginExpansion}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sentiment */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Newspaper className="h-4 w-4 text-primary" />
              News Sentiment (Last 90 Days)
              <Badge className="ml-auto">{sentiment.overall}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Positive Highlights
                </h4>
                <ul className="space-y-2">
                  {sentiment.highlights?.map((h: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-destructive">
                  Concerns
                </h4>
                <ul className="space-y-2">
                  {sentiment.concerns?.map((c: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Verdict */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-6"
      >
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Investment Verdict</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">{r.verdict}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action */}
      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={onReset} className="gap-2">
          Run Another Analysis
        </Button>
      </div>
    </div>
  )
}