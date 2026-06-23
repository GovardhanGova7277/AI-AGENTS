'use client'

import { Zap, Github, MessageCircle, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">
                Execute<span className="text-primary">Flow</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Making AI workflows accessible to every Indian. Open source, free
              forever, built by the community.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#domains" className="hover:text-primary transition-colors">Domains</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#open-source" className="hover:text-primary transition-colors">Open Source</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Contribute</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="mt-3 flex gap-3">
              <li>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                  <Github className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-border/40 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ExecuteFlow. Open source under MIT License.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Built with <Heart className="h-3 w-3 text-rose-500" /> for India
          </p>
        </div>
      </div>
    </footer>
  )
}