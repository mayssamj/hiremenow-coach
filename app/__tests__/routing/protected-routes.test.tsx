
import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Mock components
jest.mock('next-auth/react')
jest.mock('next/navigation')

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

// Mock protected page component
const ProtectedPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
    return null
  }

  return <div>Protected Content</div>
}

describe('Protected Routes', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    })
  })

  test('shows loading state when session is loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
      update: jest.fn(),
    })

    render(<ProtectedPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('redirects to signin when unauthenticated', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    })

    render(<ProtectedPage />)
    expect(mockPush).toHaveBeenCalledWith('/auth/signin')
  })

  test('shows protected content when authenticated', () => {
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

    render(<ProtectedPage />)
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
