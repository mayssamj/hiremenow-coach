
import { renderHook, act } from '@testing-library/react'
import { useToast } from '@/hooks/use-toast'

describe('useToast Hook', () => {
  test('should add and remove toasts', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'Test Description',
      })
    })
    
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
    expect(result.current.toasts[0].description).toBe('Test Description')
  })

  test('should dismiss toasts', () => {
    const { result } = renderHook(() => useToast())
    
    let toastId: string
    
    act(() => {
      const toast = result.current.toast({
        title: 'Test Toast',
      })
      toastId = toast.id
    })
    
    expect(result.current.toasts).toHaveLength(1)
    
    act(() => {
      result.current.dismiss(toastId)
    })
    
    expect(result.current.toasts).toHaveLength(0)
  })

  test('should handle multiple toasts', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({ title: 'Toast 1' })
      result.current.toast({ title: 'Toast 2' })
      result.current.toast({ title: 'Toast 3' })
    })
    
    expect(result.current.toasts).toHaveLength(3)
  })
})
