
import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/navigation'
import { useSession } from 'next-auth/react'

// Mock next-auth
jest.mock('next-auth/react')
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders loading state', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
      update: jest.fn(),
    })

    render(<Navigation />)
    
    expect(screen.getByText('HireMeNow.Coach')).toBeInTheDocument()
  })

  test('renders unauthenticated state', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    })

    render(<Navigation />)
    
    expect(screen.getByText('HireMeNow.Coach')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  test('renders authenticated state with navigation links', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: '1',
          name: 'Test User',
          username: 'testuser',
          role: 'USER',
        },
      },
      status: 'authenticated',
      update: jest.fn(),
    })

    render(<Navigation />)
    
    expect(screen.getByText('HireMeNow.Coach')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Companies')).toBeInTheDocument()
    expect(screen.getByText('Questions')).toBeInTheDocument()
    expect(screen.getByText('Stories')).toBeInTheDocument()
  })

  test('renders admin navigation for admin users', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: '1',
          name: 'Admin User',
          username: 'admin',
          role: 'ADMIN',
        },
      },
      status: 'authenticated',
      update: jest.fn(),
    })

    render(<Navigation />)
    
    expect(screen.getByText('HireMeNow.Coach')).toBeInTheDocument()
    // Admin-specific content would be in dropdown, so we test the presence of user menu
    expect(screen.getByText('AU')).toBeInTheDocument() // User initials
  })
})
