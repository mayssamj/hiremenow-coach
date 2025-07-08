
'use client'

import { useState, useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { X, Plus, Tag, Sparkles, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  suggestions?: string[]
  popularTags?: string[]
  existingTags?: { id: string; name: string; color?: string; count: number }[]
  placeholder?: string
  company?: string
  content?: string
  className?: string
}

export function TagInput({
  value = [],
  onChange,
  suggestions = [],
  popularTags = [],
  existingTags = [],
  placeholder = "Add tags...",
  company,
  content,
  className
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [intelligentSuggestions, setIntelligentSuggestions] = useState<{
    suggestions: string[]
    popularTags: string[]
    existingTags: { id: string; name: string; color?: string; count: number }[]
  }>({ suggestions: [], popularTags: [], existingTags: [] })
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch intelligent suggestions when content or company changes
  useEffect(() => {
    if (content || company) {
      fetchIntelligentSuggestions()
    }
  }, [content, company])

  const fetchIntelligentSuggestions = async () => {
    if (!content && !company) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/tags/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          company,
          existingTags: value
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setIntelligentSuggestions(data)
      }
    } catch (error) {
      console.error('Error fetching tag suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag])
    }
    setInputValue('')
    setIsOpen(false)
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  }

  const filteredSuggestions = [
    ...intelligentSuggestions.suggestions,
    ...suggestions,
    ...intelligentSuggestions.popularTags,
    ...popularTags,
    ...intelligentSuggestions.existingTags.map(tag => tag.name),
    ...existingTags.map(tag => tag.name)
  ].filter((tag, index, arr) => 
    arr.indexOf(tag) === index && 
    !value.includes(tag) && 
    tag.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className={cn("space-y-2", className)}>
      {/* Selected Tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
              <Tag className="w-3 h-3" />
              {tag}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeTag(tag)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input with Suggestions */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="pr-10"
              onFocus={() => setIsOpen(true)}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => {
                if (inputValue.trim()) {
                  addTag(inputValue)
                } else {
                  setIsOpen(!isOpen)
                }
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </PopoverTrigger>
        
        <PopoverContent className="w-80 p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search or create tags..." 
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              {loading && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 animate-spin mx-auto mb-2" />
                  Getting intelligent suggestions...
                </div>
              )}
              
              {inputValue && !filteredSuggestions.includes(inputValue) && (
                <CommandGroup heading="Create New">
                  <CommandItem onSelect={() => addTag(inputValue)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create "{inputValue}"
                  </CommandItem>
                </CommandGroup>
              )}

              {intelligentSuggestions.suggestions.length > 0 && (
                <CommandGroup heading="AI Suggestions">
                  {intelligentSuggestions.suggestions
                    .filter(tag => !value.includes(tag) && tag.toLowerCase().includes(inputValue.toLowerCase()))
                    .slice(0, 5)
                    .map((tag) => (
                      <CommandItem key={tag} onSelect={() => addTag(tag)}>
                        <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                        {tag}
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}

              {intelligentSuggestions.popularTags.length > 0 && (
                <CommandGroup heading="Popular Tags">
                  {intelligentSuggestions.popularTags
                    .filter(tag => !value.includes(tag) && tag.toLowerCase().includes(inputValue.toLowerCase()))
                    .slice(0, 3)
                    .map((tag) => (
                      <CommandItem key={tag} onSelect={() => addTag(tag)}>
                        <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                        {tag}
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}

              {intelligentSuggestions.existingTags.length > 0 && (
                <CommandGroup heading="Existing Tags">
                  {intelligentSuggestions.existingTags
                    .filter(tag => !value.includes(tag.name) && tag.name.toLowerCase().includes(inputValue.toLowerCase()))
                    .slice(0, 8)
                    .map((tag) => (
                      <CommandItem key={tag.id} onSelect={() => addTag(tag.name)}>
                        <Tag className="w-4 h-4 mr-2" style={{ color: tag.color || '#6B7280' }} />
                        {tag.name}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {tag.count} {tag.count === 1 ? 'story' : 'stories'}
                        </span>
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}

              {filteredSuggestions.length === 0 && !inputValue && !loading && (
                <CommandEmpty>No tags found. Start typing to create a new tag.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
