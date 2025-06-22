
// Business logic test for question filtering functionality
interface Question {
  id: string
  text: string
  category: string
  difficulty: string
  isCritical: boolean
  tags: string[]
  company?: { name: string }
  answers?: any[]
}

// Business logic functions to test
const filterQuestions = (
  questions: Question[],
  filters: {
    search?: string
    category?: string
    difficulty?: string
    status?: string
  }
) => {
  let filtered = [...questions]

  if (filters.search) {
    filtered = filtered.filter(q => 
      q.text.toLowerCase().includes(filters.search!.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(filters.search!.toLowerCase())) ||
      q.company?.name.toLowerCase().includes(filters.search!.toLowerCase())
    )
  }

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(q => q.category === filters.category)
  }

  if (filters.difficulty && filters.difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === filters.difficulty)
  }

  if (filters.status && filters.status !== 'all') {
    if (filters.status === 'answered') {
      filtered = filtered.filter(q => q.answers && q.answers.length > 0)
    } else if (filters.status === 'unanswered') {
      filtered = filtered.filter(q => !q.answers || q.answers.length === 0)
    } else if (filters.status === 'critical') {
      filtered = filtered.filter(q => q.isCritical)
    }
  }

  return filtered
}

const getQuestionStats = (questions: Question[]) => {
  const answered = questions.filter(q => q.answers && q.answers.length > 0).length
  const critical = questions.filter(q => q.isCritical).length
  const byCategory = questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return { answered, critical, byCategory }
}

describe('Question Filtering Business Logic', () => {
  const mockQuestions: Question[] = [
    {
      id: '1',
      text: 'Tell me about yourself',
      category: 'BEHAVIORAL',
      difficulty: 'EASY',
      isCritical: false,
      tags: ['introduction'],
      company: { name: 'Google' },
      answers: [],
    },
    {
      id: '2',
      text: 'Design a system for handling millions of requests',
      category: 'SYSTEM_DESIGN',
      difficulty: 'HARD',
      isCritical: true,
      tags: ['scalability', 'architecture'],
      company: { name: 'Amazon' },
      answers: [{ id: '1' }],
    },
    {
      id: '3',
      text: 'Implement a binary search algorithm',
      category: 'TECHNICAL',
      difficulty: 'MEDIUM',
      isCritical: false,
      tags: ['algorithms', 'search'],
      company: { name: 'Microsoft' },
      answers: [],
    },
  ]

  describe('filterQuestions', () => {
    test('filters by search query', () => {
      const result = filterQuestions(mockQuestions, { search: 'yourself' })
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('1')
    })

    test('filters by company name', () => {
      const result = filterQuestions(mockQuestions, { search: 'Google' })
      expect(result).toHaveLength(1)
      expect(result[0].company?.name).toBe('Google')
    })

    test('filters by tags', () => {
      const result = filterQuestions(mockQuestions, { search: 'algorithms' })
      expect(result).toHaveLength(1)
      expect(result[0].tags).toContain('algorithms')
    })

    test('filters by category', () => {
      const result = filterQuestions(mockQuestions, { category: 'BEHAVIORAL' })
      expect(result).toHaveLength(1)
      expect(result[0].category).toBe('BEHAVIORAL')
    })

    test('filters by difficulty', () => {
      const result = filterQuestions(mockQuestions, { difficulty: 'HARD' })
      expect(result).toHaveLength(1)
      expect(result[0].difficulty).toBe('HARD')
    })

    test('filters by answered status', () => {
      const result = filterQuestions(mockQuestions, { status: 'answered' })
      expect(result).toHaveLength(1)
      expect(result[0].answers).toHaveLength(1)
    })

    test('filters by unanswered status', () => {
      const result = filterQuestions(mockQuestions, { status: 'unanswered' })
      expect(result).toHaveLength(2)
      result.forEach(q => {
        expect(q.answers).toHaveLength(0)
      })
    })

    test('filters by critical status', () => {
      const result = filterQuestions(mockQuestions, { status: 'critical' })
      expect(result).toHaveLength(1)
      expect(result[0].isCritical).toBe(true)
    })

    test('combines multiple filters', () => {
      const result = filterQuestions(mockQuestions, { 
        category: 'SYSTEM_DESIGN',
        difficulty: 'HARD'
      })
      expect(result).toHaveLength(1)
      expect(result[0].category).toBe('SYSTEM_DESIGN')
      expect(result[0].difficulty).toBe('HARD')
    })
  })

  describe('getQuestionStats', () => {
    test('calculates correct stats', () => {
      const stats = getQuestionStats(mockQuestions)
      
      expect(stats.answered).toBe(1)
      expect(stats.critical).toBe(1)
      expect(stats.byCategory).toEqual({
        BEHAVIORAL: 1,
        SYSTEM_DESIGN: 1,
        TECHNICAL: 1,
      })
    })

    test('handles empty questions array', () => {
      const stats = getQuestionStats([])
      
      expect(stats.answered).toBe(0)
      expect(stats.critical).toBe(0)
      expect(stats.byCategory).toEqual({})
    })
  })
})
