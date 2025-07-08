
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Save, 
  Target, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Lightbulb,
  HelpCircle,
  Building2,
  BookOpen,
  Plus,
  X,
  Edit
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import StoryBrowser from './story-browser'
import { useRouter } from 'next/navigation'

interface Story {
  id: string
  title: string
  content: string
  situation?: string
  task?: string
  action?: string
  result?: string
  tags: Array<{
    id: string
    name: string
    color?: string
  }>
}

interface StoryQuestion {
  id: string
  story: Story
  relevance?: string
  customization?: string
  lastUsed: string
  usageCount: number
}

interface Question {
  id: string
  title: string
  content: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  type: 'BEHAVIORAL' | 'SYSTEM_DESIGN' | 'TECHNICAL' | 'LEADERSHIP' | 'CULTURAL_FIT'
  isCritical: boolean
  tips: string[]
  followUps: string[]
  company: {
    id: string
    name: string
    slug: string
  }
  category: {
    name: string
    color?: string
  }
  userNote?: {
    id?: string
    content?: string
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'PREPARED' | 'NEEDS_WORK'
  }
}

interface QuestionCardProps {
  question: Question
  delay?: number
}

export default function QuestionCard({ question, delay = 0 }: QuestionCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [noteContent, setNoteContent] = useState(question.userNote?.content || '')
  const [status, setStatus] = useState<'NOT_STARTED' | 'IN_PROGRESS' | 'PREPARED' | 'NEEDS_WORK'>(question.userNote?.status || 'NOT_STARTED')
  const [saving, setSaving] = useState(false)
  const [storyBrowserOpen, setStoryBrowserOpen] = useState(false)
  const [linkedStories, setLinkedStories] = useState<StoryQuestion[]>([])
  const [loadingStories, setLoadingStories] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Load linked stories when component mounts or question changes
  useEffect(() => {
    if (question.id) {
      loadLinkedStories()
    }
  }, [question.id])

  const loadLinkedStories = async () => {
    try {
      setLoadingStories(true)
      const response = await fetch(`/api/story-questions?questionId=${question.id}&recent=true`)
      if (response.ok) {
        const data = await response.json()
        setLinkedStories(data)
      }
    } catch (error) {
      console.error('Error loading linked stories:', error)
    } finally {
      setLoadingStories(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PREPARED':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'IN_PROGRESS':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'NEEDS_WORK':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Target className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PREPARED':
        return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'NEEDS_WORK':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-100 text-green-800'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800'
      case 'HARD':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'BEHAVIORAL':
        return 'bg-blue-100 text-blue-800'
      case 'SYSTEM_DESIGN':
        return 'bg-purple-100 text-purple-800'
      case 'LEADERSHIP':
        return 'bg-indigo-100 text-indigo-800'
      case 'CULTURAL_FIT':
        return 'bg-pink-100 text-pink-800'
      case 'TECHNICAL':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSaveNote = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/user-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: question.id,
          content: noteContent,
          status: status,
        }),
      })

      if (response.ok) {
        setIsEditing(false)
        toast({
          title: "Note saved",
          description: "Your note has been saved successfully.",
        })
      } else {
        throw new Error('Failed to save note')
      }
    } catch (error) {
      console.error('Error saving note:', error)
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleStorySelect = async (story: Story, customization?: string) => {
    try {
      const response = await fetch('/api/story-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storyId: story.id,
          questionId: question.id,
          companyId: question.company.id,
          relevance: `Selected for ${question.company.name} - ${question.title}`,
          customization: customization || undefined
        }),
      })

      if (response.ok) {
        await loadLinkedStories() // Refresh the linked stories
        toast({
          title: "Story linked",
          description: `"${story.title}" has been linked to this question.`,
        })
      } else {
        throw new Error('Failed to link story')
      }
    } catch (error) {
      console.error('Error linking story:', error)
      toast({
        title: "Error",
        description: "Failed to link story. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveStory = async (storyQuestionId: string) => {
    try {
      const storyQuestion = linkedStories.find(sq => sq.id === storyQuestionId)
      if (!storyQuestion) return

      const response = await fetch(`/api/story-questions?storyId=${storyQuestion.story.id}&questionId=${question.id}&companyId=${question.company.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await loadLinkedStories() // Refresh the linked stories
        toast({
          title: "Story removed",
          description: "Story has been removed from this question.",
        })
      } else {
        throw new Error('Failed to remove story')
      }
    } catch (error) {
      console.error('Error removing story:', error)
      toast({
        title: "Error",
        description: "Failed to remove story. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTagClick = (tagName: string) => {
    // Navigate to stories page with tag filter
    router.push(`/stories?tag=${encodeURIComponent(tagName)}`)
  }

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to comprehensive page with category filter
    router.push(`/comprehensive?category=${encodeURIComponent(categoryName)}`)
  }

  const handleCompanyClick = (companySlug: string) => {
    // Navigate to company page
    router.push(`/companies/${companySlug}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                    <Badge className={getTypeColor(question.type)}>
                      {question.type.replace('_', ' ')}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="flex items-center gap-1 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCompanyClick(question.company.slug)
                      }}
                    >
                      <Building2 className="w-3 h-3" />
                      {question.company.name}
                    </Badge>
                    {question.isCritical && (
                      <Badge variant="destructive">Critical</Badge>
                    )}
                    <Badge className={getStatusColor(status)} variant="outline">
                      {getStatusIcon(status)}
                      <span className="ml-1">{status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg leading-relaxed">
                    {question.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span 
                      className="cursor-pointer hover:text-blue-600 hover:underline transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCategoryClick(question.category.name)
                      }}
                    >
                      {question.category.name}
                    </span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="space-y-6 pt-0">
              {/* Question Content */}
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">{question.content}</p>
              </div>

              {/* Tips */}
              {question.tips.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                    Tips for Answering
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {question.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Follow-up Questions */}
              {question.followUps.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2 text-sm">
                    <HelpCircle className="w-4 h-4 text-purple-600" />
                    Common Follow-up Questions
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {question.followUps.map((followUp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{followUp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Linked Stories Section */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Linked Stories ({linkedStories.length})
                  </h4>
                  <Button 
                    onClick={() => setStoryBrowserOpen(true)}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Story
                  </Button>
                </div>

                {loadingStories ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                ) : linkedStories.length > 0 ? (
                  <div className="space-y-3">
                    {linkedStories.map((storyQuestion) => (
                      <div key={storyQuestion.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-blue-900 mb-1">
                              {storyQuestion.story.title}
                            </h5>
                            <p className="text-sm text-blue-700 mb-2 line-clamp-2">
                              {storyQuestion.story.situation || storyQuestion.story.content}
                            </p>
                            
                            {storyQuestion.story.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {storyQuestion.story.tags.slice(0, 3).map(tag => (
                                  <Badge 
                                    key={tag.id} 
                                    variant="secondary" 
                                    className="text-xs cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: tag.color ? `${tag.color}20` : undefined }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleTagClick(tag.name)
                                    }}
                                  >
                                    {tag.name}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {storyQuestion.customization && (
                              <div className="mt-2 p-2 bg-white rounded border">
                                <p className="text-xs font-medium text-gray-600 mb-1">Customization for this question:</p>
                                <p className="text-sm text-gray-700">{storyQuestion.customization}</p>
                              </div>
                            )}

                            <div className="flex items-center gap-4 mt-2 text-xs text-blue-600">
                              <span>Used {storyQuestion.usageCount} times</span>
                              <span>Last used: {new Date(storyQuestion.lastUsed).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // TODO: Open story edit modal
                                console.log('Edit story customization')
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveStory(storyQuestion.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No stories linked to this question yet.</p>
                    <p className="text-xs">Click "Add Story" to link your STAR stories!</p>
                  </div>
                )}
              </div>

              {/* User Notes Section */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Additional Notes & Practice
                  </h4>
                  <div className="flex items-center gap-2">
                    <Select value={status} onValueChange={(value) => setStatus(value as 'NOT_STARTED' | 'IN_PROGRESS' | 'PREPARED' | 'NEEDS_WORK')}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NOT_STARTED">Not Started</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="PREPARED">Prepared</SelectItem>
                        <SelectItem value="NEEDS_WORK">Needs Work</SelectItem>
                      </SelectContent>
                    </Select>
                    {isEditing ? (
                      <Button 
                        onClick={handleSaveNote} 
                        size="sm" 
                        disabled={saving}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setIsEditing(true)} 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <Textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Add additional notes, key points, or practice responses here..."
                    className="min-h-[120px]"
                  />
                ) : (
                  <div className="min-h-[60px] p-3 bg-gray-50 rounded-md">
                    {noteContent ? (
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{noteContent}</p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        Click "Edit" to add additional notes or practice responses...
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Story Browser Modal */}
      <StoryBrowser
        isOpen={storyBrowserOpen}
        onClose={() => setStoryBrowserOpen(false)}
        onSelectStory={handleStorySelect}
        questionId={question.id}
        companyId={question.company.id}
        questionTitle={question.title}
      />
    </motion.div>
  )
}
