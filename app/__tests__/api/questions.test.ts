
/**
 * @jest-environment node
 */

import { GET } from '@/app/api/questions/route'
import { NextRequest } from 'next/server'

// Mock the database
jest.mock('@/lib/db', () => ({
  prisma: {
    question: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}))

import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>
const mockQuestion = prisma.question as jest.Mocked<typeof prisma.question>

describe('/api/questions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns 401 when not authenticated', async () => {
    mockGetServerSession.mockResolvedValue(null)
    
    const request = new NextRequest('http://localhost:3000/api/questions')
    const response = await GET(request)
    
    expect(response.status).toBe(401)
  })

  test('returns questions when authenticated', async () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      username: 'testuser',
      role: 'USER',
    }
    
    mockGetServerSession.mockResolvedValue({
      user: mockUser,
      expires: '2024-12-31T23:59:59.999Z',
    })

    const mockQuestions = [
      {
        id: '1',
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
      },
    ]
    
    mockQuestion.findMany.mockResolvedValue(mockQuestions as any)
    
    const request = new NextRequest('http://localhost:3000/api/questions')
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.questions).toEqual(mockQuestions)
  })

  test('handles database errors gracefully', async () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      username: 'testuser', 
      role: 'USER',
    }
    
    mockGetServerSession.mockResolvedValue({
      user: mockUser,
      expires: '2024-12-31T23:59:59.999Z',
    })
    
    mockQuestion.findMany.mockRejectedValue(new Error('Database error'))
    
    const request = new NextRequest('http://localhost:3000/api/questions')
    const response = await GET(request)
    
    expect(response.status).toBe(500)
  })
})
