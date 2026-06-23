'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useNavStore, useAuthStore } from '@/store/app-store'

import Navbar from '@/components/execute-flow/navbar'
import HeroSection from '@/components/execute-flow/hero-section'
import HowItWorksSection from '@/components/execute-flow/how-it-works'
import FeaturesSection from '@/components/execute-flow/features-section'
import OpenSourceSection from '@/components/execute-flow/open-source-section'
import Dashboard from '@/components/execute-flow/dashboard'
import DomainView from '@/components/execute-flow/domain-view'
import WorkflowView from '@/components/execute-flow/workflow-view'
import AuthModal from '@/components/execute-flow/auth-modal'
import Footer from '@/components/execute-flow/footer'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

export default function Home() {
  const { view } = useNavStore()
  const { isAuthenticated } = useAuthStore()
  const isLanding = view === 'landing'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AuthModal />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <HeroSection />
              <HowItWorksSection />
              <FeaturesSection />
              <OpenSourceSection />
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div key="dashboard" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Dashboard />
            </motion.div>
          )}

          {view === 'domain' && (
            <motion.div key="domain" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <DomainView />
            </motion.div>
          )}

          {view === 'workflow' && (
            <motion.div key="workflow" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <WorkflowView />
            </motion.div>
          )}

          {view === 'execution' && (
            <motion.div key="execution" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <WorkflowView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {isLanding && <Footer />}
    </div>
  )
}