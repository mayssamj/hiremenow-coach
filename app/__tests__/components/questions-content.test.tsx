
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QuestionsContent } from '@/components/questions-content'

// Mock fetch
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

const mockQuestions = [
  {
    id: '1',
    text: 'Tell me about yourself',
    category: 'BEHAVIORAL',
    difficulty: 'EASY',
    isCritical: false,
    companyId: '1',
    source: 'test',
    tags: ['behavioral'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    company: { id: '1', name: 'Test Company' },
    answers: [],
  },
  {
    id: '2',
    text: 'Design a system',
    category: 'SYSTEM_DESIGN',
    difficulty: 'HARD',
    isCritical: true,
    companyId: '2',
    source: 'test',
    tags: ['system-design'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    company: { id: '2', name: 'Tech Corp' },
    answers: [{ id: '1', content: 'test answer' }],
  },
]

describe('QuestionsContent Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ questions: mockQuestions, companies: [] }),
    } as Response)
  })

  test('renders loading state initially', () => {
    render(<QuestionsContent />)
    expect(screen.getByTestId('loading') || screen.getByText(/loading/i)).toBeTruthy()
  })

  test('renders questions after loading', async () => {
    render(<QuestionsContent />)
    
    await waitFor(() => {
      expect(screen.getByText('Question Bank')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Tell me about yourself')).toBeInTheDocument()
    expect(screen.getByText('Design a system')).toBeInTheDocument()
  })

  test('displays correct stats', async () => {
    render(<QuestionsContent />)
    
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument() // Total questions
      expect(screen.getByText('1')).toBeInTheDocument() // Answered questions
    })
  })

  test('filters questions by search query', async () => {
    render(<QuestionsContent />)
    
    await waitFor(() => {
      expect(screen.getByText('Question Bank')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('Search questions...')
    fireEvent.change(searchInput, { target: { value: 'yourself' } })
    
    await waitFor(() => {
      expect(screen.getByText('Tell me about yourself')).toBeInTheDocument()
      expect(screen.queryByText('Design a system')).not.toBeInTheDocument()
    })
  })

  test('shows correct button text for answered vs unanswered questions', async () => {
    render(<QuestionsContent />)
    
    await waitFor(() => {
      expect(screen.getByText('Answer')).toBeInTheDocument() // For unanswered question
      expect(screen.getByText('Review')).toBeInTheDocument() // For answered question
    })
  })

  test('displays critical badge for critical questions', async () => {
    render(<QuestionsContent />)
    
    await waitFor(() => {
      expect(screen.getByText('Critical')).toBeInTheDocument()
    })
  })
})
