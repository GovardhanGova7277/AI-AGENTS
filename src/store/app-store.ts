import { create } from 'zustand'

/* ─── View navigation ─── */
export type AppView =
  | 'landing'
  | 'dashboard'
  | 'domain'
  | 'workflow'
  | 'execution'

/* ─── Auth state ─── */
interface AuthState {
  isAuthenticated: boolean
  user: { id: string; name: string; email: string } | null
  login: (user: { id: string; name: string; email: string }) => void
  logout: () => void
}

/* ─── Navigation state ─── */
interface NavState {
  view: AppView
  selectedDomain: string | null
  selectedWorkflow: string | null
  navigateTo: (view: AppView, domain?: string, workflow?: string) => void
  goBack: () => void
}

/* ─── UI state ─── */
interface UIState {
  authModalOpen: boolean
  authModalTab: 'login' | 'register'
  setAuthModalOpen: (open: boolean) => void
  setAuthModalTab: (tab: 'login' | 'register') => void
}

/* ─── Execution state ─── */
interface ExecutionState {
  isRunning: boolean
  progress: number
  currentStep: string
  steps: string[]
  result: Record<string, unknown> | null
  startExecution: (steps: string[]) => void
  updateProgress: (stepIndex: number, stepName: string) => void
  completeExecution: (result: Record<string, unknown>) => void
  resetExecution: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}))

export const useNavStore = create<NavState>((set, get) => ({
  view: 'landing',
  selectedDomain: null,
  selectedWorkflow: null,
  navigateTo: (view, domain, workflow) => {
    const history = get()
    set({
      view,
      selectedDomain: domain ?? history.selectedDomain,
      selectedWorkflow: workflow ?? history.selectedWorkflow,
    })
  },
  goBack: () => {
    const { view } = get()
    if (view === 'execution') set({ view: 'workflow' })
    else if (view === 'workflow') set({ view: 'domain' })
    else if (view === 'domain') set({ view: 'dashboard' })
    else set({ view: 'dashboard' })
  },
}))

export const useUIStore = create<UIState>((set) => ({
  authModalOpen: false,
  authModalTab: 'login',
  setAuthModalOpen: (open) => set({ authModalOpen: open }),
  setAuthModalTab: (tab) => set({ authModalTab: tab }),
}))

export const useExecutionStore = create<ExecutionState>((set) => ({
  isRunning: false,
  progress: 0,
  currentStep: '',
  steps: [],
  result: null,
  startExecution: (steps) =>
    set({
      isRunning: true,
      progress: 0,
      currentStep: steps[0] || '',
      steps,
      result: null,
    }),
  updateProgress: (stepIndex, stepName) =>
    set((s) => ({
      progress: ((stepIndex + 1) / s.steps.length) * 100,
      currentStep: stepName,
    })),
  completeExecution: (result) =>
    set({ isRunning: false, progress: 100, result }),
  resetExecution: () =>
    set({ isRunning: false, progress: 0, currentStep: '', steps: [], result: null }),
}))