'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useUIStore, useAuthStore } from '@/store/app-store'

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab } =
    useUIStore()
  const { login } = useAuthStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isRegister = authModalTab === 'register'

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setError('')
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    if (isRegister && !name) {
      setError('Please enter your name')
      return
    }

    setLoading(true)
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isRegister ? { name, email, password } : { email, password }
        ),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }
      login(data.user)
      setAuthModalOpen(false)
      resetForm()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const switchTab = () => {
    resetForm()
    setAuthModalTab(isRegister ? 'login' : 'register')
  }

  return (
    <Dialog open={authModalOpen} onOpenChange={(open) => { if (!open) resetForm(); setAuthModalOpen(open) }}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {isRegister
            ? 'Create your ExecuteFlow account'
            : 'Log in to your ExecuteFlow account'}
        </DialogDescription>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isRegister
              ? 'Start using AI workflows for free'
              : 'Log in to continue your work'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <AnimatePresence mode="wait">
            {isRegister && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            className="glow-primary w-full"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isRegister ? 'Create Account' : 'Log In'}
          </Button>
        </form>

        {/* Switch */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={switchTab}
            className="font-semibold text-primary hover:underline"
          >
            {isRegister ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}