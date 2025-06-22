
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { signIn } from 'next-auth/react'
import SignInPage from '@/app/auth/signin/page'

jest.mock('next-auth/react')
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const mockSignIn = signIn as jest.MockedFunction<typeof signIn>

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('handles successful login', async () => {
    mockSignIn.mockResolvedValue({ ok: true, error: null, url: null, status: 200 })
    
    render(<SignInPage />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        username: 'testuser',
        password: 'password123',
        redirect: false,
      })
    })
  })

  test('handles demo login', async () => {
    mockSignIn.mockResolvedValue({ ok: true, error: null, url: null, status: 200 })
    
    render(<SignInPage />)
    
    const demoButton = screen.getByRole('button', { name: /demo user/i })
    fireEvent.click(demoButton)
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        username: 'demo',
        password: 'demodemo',
        redirect: false,
      })
    })
  })

  test('handles admin demo login', async () => {
    mockSignIn.mockResolvedValue({ ok: true, error: null, url: null, status: 200 })
    
    render(<SignInPage />)
    
    const adminDemoButton = screen.getByRole('button', { name: /admin demo/i })
    fireEvent.click(adminDemoButton)
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        username: 'admin',
        password: 'adminadmin',
        redirect: false,
      })
    })
  })

  test('displays error on failed login', async () => {
    mockSignIn.mockResolvedValue({ ok: false, error: 'Invalid credentials', url: null, status: 401 })
    
    render(<SignInPage />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    fireEvent.change(usernameInput, { target: { value: 'baduser' } })
    fireEvent.change(passwordInput, { target: { value: 'badpass' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument()
    })
  })
})
