
// Form validation business logic tests
import { z } from 'zod'

// Validation schemas
const signInSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const answerSchema = z.object({
  content: z.string().min(10, 'Answer must be at least 10 characters'),
  isComplete: z.boolean(),
  tags: z.array(z.string()).max(5, 'Maximum 5 tags allowed'),
  timeSpent: z.number().min(0, 'Time spent cannot be negative'),
})

const storySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  situation: z.string().min(10, 'Situation must be at least 10 characters'),
  task: z.string().min(10, 'Task must be at least 10 characters'),
  action: z.string().min(10, 'Action must be at least 10 characters'),
  result: z.string().min(10, 'Result must be at least 10 characters'),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed'),
})

describe('Form Validation', () => {
  describe('Sign In Validation', () => {
    test('validates correct sign in data', () => {
      const validData = {
        username: 'testuser',
        password: 'password123',
      }
      
      const result = signInSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    test('rejects empty username', () => {
      const invalidData = {
        username: '',
        password: 'password123',
      }
      
      const result = signInSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Username is required')
      }
    })

    test('rejects short password', () => {
      const invalidData = {
        username: 'testuser',
        password: '123',
      }
      
      const result = signInSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 6 characters')
      }
    })
  })

  describe('Answer Validation', () => {
    test('validates correct answer data', () => {
      const validData = {
        content: 'This is a comprehensive answer using the STAR method.',
        isComplete: true,
        tags: ['behavioral', 'leadership'],
        timeSpent: 300,
      }
      
      const result = answerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    test('rejects short answer content', () => {
      const invalidData = {
        content: 'Short',
        isComplete: false,
        tags: [],
        timeSpent: 60,
      }
      
      const result = answerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Answer must be at least 10 characters')
      }
    })

    test('rejects too many tags', () => {
      const invalidData = {
        content: 'This is a valid answer content.',
        isComplete: false,
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'],
        timeSpent: 60,
      }
      
      const result = answerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Maximum 5 tags allowed')
      }
    })

    test('rejects negative time spent', () => {
      const invalidData = {
        content: 'This is a valid answer content.',
        isComplete: false,
        tags: [],
        timeSpent: -10,
      }
      
      const result = answerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Time spent cannot be negative')
      }
    })
  })

  describe('Story Validation', () => {
    test('validates correct STAR story data', () => {
      const validData = {
        title: 'Leading a difficult project',
        situation: 'I was assigned to lead a project that was behind schedule.',
        task: 'I needed to get the project back on track while maintaining team morale.',
        action: 'I reorganized the team structure and implemented daily standups.',
        result: 'We delivered the project on time and the team felt more cohesive.',
        tags: ['leadership', 'project-management'],
      }
      
      const result = storySchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    test('rejects empty title', () => {
      const invalidData = {
        title: '',
        situation: 'Valid situation description here.',
        task: 'Valid task description here.',
        action: 'Valid action description here.',
        result: 'Valid result description here.',
        tags: [],
      }
      
      const result = storySchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Title is required')
      }
    })

    test('rejects too long title', () => {
      const invalidData = {
        title: 'A'.repeat(101),
        situation: 'Valid situation description here.',
        task: 'Valid task description here.',
        action: 'Valid action description here.',
        result: 'Valid result description here.',
        tags: [],
      }
      
      const result = storySchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Title too long')
      }
    })

    test('rejects short STAR sections', () => {
      const invalidData = {
        title: 'Valid title',
        situation: 'Short',
        task: 'Valid task description here.',
        action: 'Valid action description here.',
        result: 'Valid result description here.',
        tags: [],
      }
      
      const result = storySchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Situation must be at least 10 characters')
      }
    })
  })
})
