
import { render, screen } from '@testing-library/react'
import { LandingPage } from '@/components/landing-page'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react')
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>

describe('LandingPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders main headline and call-to-action', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    })

    render(<LandingPage />)
    
    expect(screen.getByText(/Land Your Dream Job with/)).toBeInTheDocument()
    expect(screen.getByText(/Confidence/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
  })

  test('shows different content for authenticated users', () => {
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

    render(<LandingPage />)
    
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue practicing/i })).toBeInTheDocument()
  })

  test('displays feature highlights', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    })

    render(<LandingPage />)
    
    expect(screen.getByText(/Behavioral Questions/)).toBeInTheDocument()
    expect(screen.getByText(/System Design/)).toBeInTheDocument()
    expect(screen.getByText(/STAR Stories/)).toBeInTheDocument()
  })

  test('shows company logos section', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    })

    render(<LandingPage />)
    
    expect(screen.getByText(/Companies we help you prepare for/i)).toBeInTheDocument()
  })
})
