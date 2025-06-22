
import '@testing-library/jest-dom'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession() {
    return {
      data: null,
      status: 'loading',
    }
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
}))

// Mock next-auth server functions
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
  NextAuthOptions: {},
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    button: 'button',
    a: 'a',
    img: 'img',
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Search: () => 'Search',
  User: () => 'User',
  LogOut: () => 'LogOut',
  Settings: () => 'Settings',
  BookOpen: () => 'BookOpen',
  Building2: () => 'Building2',
  BarChart3: () => 'BarChart3',
  FileText: () => 'FileText',
  MessageSquare: () => 'MessageSquare',
  Filter: () => 'Filter',
  CheckCircle: () => 'CheckCircle',
  Clock: () => 'Clock',
  AlertTriangle: () => 'AlertTriangle',
  Target: () => 'Target',
  ArrowRight: () => 'ArrowRight',
  Eye: () => 'Eye',
  EyeOff: () => 'EyeOff',
  Shield: () => 'Shield',
}))

// Mock environment variables for tests
process.env.DATABASE_URL = 'file::memory:?cache=shared'
process.env.NODE_ENV = 'test'

// Suppress console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is deprecated') ||
       args[0].includes('Warning: React.createRef is deprecated'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
