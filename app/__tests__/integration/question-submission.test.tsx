
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QuestionDetailContent } from '@/components/question-detail-content'

// Mock fetch
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

const mockQuestion = {
  id: '1',
  text: 'Tell me about a challenging project you worked on.',
  category: 'BEHAVIORAL',
  difficulty: 'MEDIUM',
  isCritical: false,
  companyId: '1',
  source: 'test',
  tags: ['teamwork', 'leadership'],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  company: { id: '1', name: 'Test Company' },
  answers: [],
}

describe('Question Submission Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock successful answer submission
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ 
        answer: { 
          id: '1', 
          content: 'Test answer',
          isComplete: true,
          tags: ['test'],
          timeSpent: 300
        }
      }),
    } as Response)
  })

  test('submits answer successfully', async () => {
    render(<QuestionDetailContent question={mockQuestion} />)
    
    const textarea = screen.getByPlaceholderText(/write your detailed answer/i)
    const saveButton = screen.getByRole('button', { name: /save answer/i })
    
    // Fill in the answer
    fireEvent.change(textarea, { 
      target: { value: 'This is my test answer using the STAR method.' } 
    })
    
    // Submit the answer
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/questions/1/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: 'This is my test answer using the STAR method.',
          isComplete: false,
          tags: [],
          timeSpent: expect.any(Number),
        }),
      })
    })
  })

  test('adds tags to answer', async () => {
    render(<QuestionDetailContent question={mockQuestion} />)
    
    const textarea = screen.getByPlaceholderText(/write your detailed answer/i)
    const tagInput = screen.getByPlaceholderText(/add a tag/i)
    const addTagButton = screen.getByRole('button', { name: /add/i })
    const saveButton = screen.getByRole('button', { name: /save answer/i })
    
    // Fill in the answer
    fireEvent.change(textarea, { target: { value: 'Test answer with tags.' } })
    
    // Add a tag
    fireEvent.change(tagInput, { target: { value: 'teamwork' } })
    fireEvent.click(addTagButton)
    
    // Submit the answer
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/questions/1/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: 'Test answer with tags.',
          isComplete: false,
          tags: ['teamwork'],
          timeSpent: expect.any(Number),
        }),
      })
    })
  })

  test('handles submission errors gracefully', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Server error' }),
    } as Response)
    
    render(<QuestionDetailContent question={mockQuestion} />)
    
    const textarea = screen.getByPlaceholderText(/write your detailed answer/i)
    const saveButton = screen.getByRole('button', { name: /save answer/i })
    
    fireEvent.change(textarea, { target: { value: 'Test answer' } })
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText(/error saving answer/i)).toBeInTheDocument()
    })
  })
})
