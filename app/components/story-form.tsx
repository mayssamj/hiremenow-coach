
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { TagInput } from '@/components/tag-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, Save, X, Lock, Globe } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Story {
  id?: string
  title: string
  content: string
  situation?: string
  task?: string
  action?: string
  result?: string
  reflection?: string
  isPublic?: boolean
  tags: { tag: { name: string; color?: string } }[]
}

interface StoryFormProps {
  story?: Story
  onSave: (story: any) => void
  onCancel: () => void
  company?: string
}

export function StoryForm({ story, onSave, onCancel, company }: StoryFormProps) {
  const [formData, setFormData] = useState({
    title: story?.title || '',
    content: story?.content || '',
    situation: story?.situation || '',
    task: story?.task || '',
    action: story?.action || '',
    result: story?.result || '',
    reflection: story?.reflection || ''
  })
  
  const [isPublic, setIsPublic] = useState(story?.isPublic || false)
  const [tags, setTags] = useState<string[]>(
    story?.tags?.map(t => t.tag.name) || []
  )
  
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const { toast } = useToast()

  // Auto-generate content for AI suggestions
  const getFullContent = () => {
    return [
      formData.title,
      formData.content,
      formData.situation,
      formData.task,
      formData.action,
      formData.result,
      formData.reflection
    ].filter(Boolean).join(' ')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please provide a story title.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const storyData = {
        ...formData,
        tags,
        isPublic,
        ...(story?.id && { id: story.id })
      }

      const url = story?.id ? '/api/stories' : '/api/stories'
      const method = story?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyData)
      })

      if (response.ok) {
        const savedStory = await response.json()
        onSave(savedStory)
        toast({
          title: story?.id ? "Story updated" : "Story created",
          description: "Your story has been saved successfully.",
        })
      } else {
        throw new Error('Failed to save story')
      }
    } catch (error) {
      console.error('Error saving story:', error)
      toast({
        title: "Error",
        description: "Failed to save story. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {story?.id ? 'Edit Story' : 'Create New Story'}
          </h2>
          <p className="text-muted-foreground">
            {story?.id ? 'Update your STAR method story' : 'Create a STAR method story for interview preparation'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Story'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="star">STAR Method</TabsTrigger>
          <TabsTrigger value="tags">Tags & Organization</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Story Basics</CardTitle>
              <CardDescription>
                Start with a clear title and overview of your story
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Story Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="e.g., Led team through major system redesign"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="content">Story Overview</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => updateFormData('content', e.target.value)}
                  placeholder="Brief overview of the story (optional - you can detail this in STAR format)"
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  {isPublic ? (
                    <Globe className="w-5 h-5 text-green-600" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-600" />
                  )}
                  <div>
                    <Label htmlFor="privacy-toggle" className="text-sm font-medium">
                      {isPublic ? 'Public Story' : 'Private Story'}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {isPublic 
                        ? 'Other users can view and use this story in their preparation'
                        : 'Only you can view and use this story'
                      }
                    </p>
                  </div>
                </div>
                <Switch
                  id="privacy-toggle"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="star" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>STAR Method Details</CardTitle>
              <CardDescription>
                Structure your story using the STAR method for maximum impact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="situation" className="text-blue-600 font-semibold">
                  Situation
                </Label>
                <Textarea
                  id="situation"
                  value={formData.situation}
                  onChange={(e) => updateFormData('situation', e.target.value)}
                  placeholder="Describe the context and background. What was the situation you were in?"
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="task" className="text-green-600 font-semibold">
                  Task
                </Label>
                <Textarea
                  id="task"
                  value={formData.task}
                  onChange={(e) => updateFormData('task', e.target.value)}
                  placeholder="What was your responsibility or goal? What needed to be accomplished?"
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="action" className="text-purple-600 font-semibold">
                  Action
                </Label>
                <Textarea
                  id="action"
                  value={formData.action}
                  onChange={(e) => updateFormData('action', e.target.value)}
                  placeholder="What specific steps did you take? Focus on your individual contributions."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <Label htmlFor="result" className="text-orange-600 font-semibold">
                  Result
                </Label>
                <Textarea
                  id="result"
                  value={formData.result}
                  onChange={(e) => updateFormData('result', e.target.value)}
                  placeholder="What was the outcome? Include metrics and quantifiable results if possible."
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label htmlFor="reflection" className="text-indigo-600 font-semibold">
                  Reflection
                </Label>
                <Textarea
                  id="reflection"
                  value={formData.reflection}
                  onChange={(e) => updateFormData('reflection', e.target.value)}
                  placeholder="What did you learn from this experience? How did it help you grow?"
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Smart Tags & Organization
              </CardTitle>
              <CardDescription>
                Add tags to organize your story. We'll suggest relevant tags based on your content and company focus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Story Tags</Label>
                <TagInput
                  value={tags}
                  onChange={setTags}
                  company={company}
                  content={getFullContent()}
                  placeholder="Add tags to categorize your story..."
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Tags help you organize stories and find them quickly. We suggest tags based on your story content and company values.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}
