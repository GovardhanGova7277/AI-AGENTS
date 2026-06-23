'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, LogOut, Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { useAuthStore, useNavStore, useUIStore } from '@/store/app-store'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { view, goBack, navigateTo } = useNavStore()
  const { setAuthModalOpen, setAuthModalTab } = useUIStore()

  const showBack = ['domain', 'workflow', 'execution'].includes(view)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Execute<span className="text-primary">Flow</span>
            </span>
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {view === 'landing' ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  document
                    .getElementById('how-it-works')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                How It Works
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  document
                    .getElementById('domains')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Domains
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  document
                    .getElementById('open-source')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Open Source
              </Button>
            </>
          ) : null}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="max-w-32 truncate text-sm font-medium">
                  {user?.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
                onClick={() => {
                  setAuthModalTab('login')
                  setAuthModalOpen(true)
                }}
              >
                Log In
              </Button>
              <Button
                size="sm"
                className="glow-primary"
                onClick={() => {
                  setAuthModalTab('register')
                  setAuthModalOpen(true)
                }}
              >
                Get Started
              </Button>
            </>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-8 flex flex-col gap-4">
                {view === 'landing' && (
                  <>
                    <button
                      onClick={() =>
                        document
                          .getElementById('how-it-works')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="text-left text-base font-medium text-foreground hover:text-primary"
                    >
                      How It Works
                    </button>
                    <button
                      onClick={() =>
                        document
                          .getElementById('domains')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="text-left text-base font-medium text-foreground hover:text-primary"
                    >
                      Domains
                    </button>
                    <button
                      onClick={() =>
                        document
                          .getElementById('open-source')
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="text-left text-base font-medium text-foreground hover:text-primary"
                    >
                      Open Source
                    </button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}