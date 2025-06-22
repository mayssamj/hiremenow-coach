
/**
 * @jest-environment node
 */

import { GET, POST } from '@/app/api/questions/[id]/route'
import { GET as GetAnswers, POST as PostAnswer } from '@/app/api/questions/[id]/answers/route'
import { NextRequest } from 'next/server'

// Mock the database
jest.mock('@/lib/db', () => ({
  prisma: {
    question: {
      findUnique: jest.fn(),
    },
    answer: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>
const mockQuestion = prisma.question as jest.Mocked<typeof prisma.question>
const mockAnswer = prisma.answer as jest.Mocked<typeof prisma.answer>

const mockUser = {
  id: '1',
  name: 'Test User',
  username: 'testuser',
  role: 'USER',
}

const mockSession = {
  user: mockUser,
  expires: '2024-12-31T23:59:59.999Z',
}

describe('/api/questions/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/questions/[id]', () => {
    test('returns question when authenticated and exists', async () => {
      mockGetServerAuthSession.mockResolvedValue(mockSession)
      
      const mockQuestionData = {
        id: 'test-id',
        text: 'Test Question',
        category: 'BEHAVIORAL',
        difficulty: 'EASY',
        isCritical: false,
        companyId: '1',
        source: 'test',
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        company: { id: '1', name: 'Test Company' },
        answers: [],
      }
      
      mockQuestion.findUnique.mockResolvedValue(mockQuestionData as any)
      
      const request = new NextRequest('http://localhost:3000/api/questions/test-id')
      const response = await GET(request, { params: { id: 'test-id' } })
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.question).toEqual(mockQuestionData)
    })

    test('returns 404 when question not found', async () => {
      mockGetServerAuthSession.mockResolvedValue(mockSession)
      mockQuestion.findUnique.mockResolvedValue(null)
      
      const request = new NextRequest('http://localhost:3000/api/questions/nonexistent')
      const response = await GET(request, { params: { id: 'nonexistent' } })
      
      expect(response.status).toBe(404)
    })
  })

  describe('POST /api/questions/[id]/answers', () => {
    test('creates answer when authenticated', async () => {
      mockGetServerAuthSession.mockResolvedValue(mockSession)
      
      const mockAnswerData = {
        id: 'answer-id',
        content: 'Test answer',
        isComplete: true,
        tags: ['test'],
        timeSpent: 300,
        questionId: 'test-id',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      mockAnswer.create.mockResolvedValue(mockAnswerData as any)
      
      const requestBody = {
        content: 'Test answer',
        isComplete: true,
        tags: ['test'],
        timeSpent: 300,
      }
      
      const request = new NextRequest('http://localhost:3000/api/questions/test-id/answers', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const response = await PostAnswer(request, { params: { id: 'test-id' } })
      
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.answer).toEqual(mockAnswerData)
      
      expect(mockAnswer.create).toHaveBeenCalledWith({
        data: {
          content: 'Test answer',
          isComplete: true,
          tags: ['test'],
          timeSpent: 300,
          questionId: 'test-id',
          userId: '1',
        },
      })
    })

    test('returns 401 when not authenticated', async () => {
      mockGetServerAuthSession.mockResolvedValue(null)
      
      const request = new NextRequest('http://localhost:3000/api/questions/test-id/answers', {
        method: 'POST',
        body: JSON.stringify({ content: 'Test' }),
      })
      
      const response = await PostAnswer(request, { params: { id: 'test-id' } })
      
      expect(response.status).toBe(401)
    })
  })
})
