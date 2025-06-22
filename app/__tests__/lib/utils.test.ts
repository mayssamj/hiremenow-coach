
import { cn } from '@/lib/utils'

describe('Utils Functions', () => {
  describe('cn function (className utility)', () => {
    test('combines multiple class names', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    test('handles conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden')
      expect(result).toBe('base conditional')
    })

    test('handles undefined and null values', () => {
      const result = cn('base', undefined, null, 'end')
      expect(result).toBe('base end')
    })

    test('merges duplicate Tailwind classes correctly', () => {
      const result = cn('px-4 py-2', 'px-6') // px-6 should override px-4
      expect(result).toContain('px-6')
      expect(result).toContain('py-2')
    })
  })
})
