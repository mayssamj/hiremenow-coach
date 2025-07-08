
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit3, Users, Tag, Search, BookOpen, Filter, X, Sparkles } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'
import { StoryForm } from '@/components/story-form'
import { useToast } from '@/hooks/use-toast'

interface Story {
  id: string
  title: string
  content: string
  situation?: string
  task?: string
  action?: string
  result?: string
  reflection?: string
  tags: { tag: { name: string; color?: string } }[]
  questions: { question: { title: string; companyQuestions: { company: { name: string } }[] } }[]
  createdAt: string
  updatedAt: string
}

interface Tag {
  id: string
  name: string
  color?: string
  _count?: { stories: number }
}

function StoriesPageContent() {
  const searchParams = useSearchParams()
  const [stories, setStories] = useState<Story[]>([])
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [company, setCompany] = useState<string>('')
  const { toast } = useToast()

  useEffect(() => {
    // Get company from URL params
    const companyParam = searchParams.get('company')
    if (companyParam) {
      setCompany(companyParam)
    }
    fetchData()
  }, [searchParams])

  useEffect(() => {
    // Fetch stories when search or tag filters change
    fetchData()
  }, [searchQuery, selectedTags])

  const fetchData = async () => {
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (selectedTags.length > 0) params.append('tags', selectedTags.join(','))

      const [storiesRes, tagsRes] = await Promise.all([
        fetch(`/api/stories?${params.toString()}`),
        fetch('/api/tags')
      ])

      const storiesData = await storiesRes.json()
      const tagsData = await tagsRes.json()

      setStories(storiesData)
      setAllTags(tagsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStorySubmit = (savedStory: Story) => {
    if (editingStory) {
      setStories(stories.map(s => s.id === savedStory.id ? savedStory : s))
      setEditingStory(null)
    } else {
      setStories([savedStory, ...stories])
    }
    setIsCreateDialogOpen(false)
  }

  const handleEditStory = (story: Story) => {
    setEditingStory(story)
    setIsCreateDialogOpen(true)
  }

  const handleCancelEdit = () => {
    setEditingStory(null)
    setIsCreateDialogOpen(false)
  }

  const addTagFilter = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName])
    }
  }

  const removeTagFilter = (tagName: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagName))
  }

  const clearAllFilters = () => {
    setSelectedTags([])
    setSearchQuery('')
  }

  // Get popular tags (tags with most stories)
  const popularTags = allTags
    .filter(tag => tag._count && tag._count.stories > 0)
    .sort((a, b) => (b._count?.stories || 0) - (a._count?.stories || 0))
    .slice(0, 8)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Stories
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Create and organize your STAR method stories with intelligent tagging
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <StoryForm
                story={editingStory || undefined}
                onSave={handleStorySubmit}
                onCancel={handleCancelEdit}
                company={company}
              />
            </DialogContent>
          </Dialog>
        </div>
      </AnimatedSection>

      {/* Search and Filters */}
      <AnimatedSection delay={0.1}>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {(selectedTags.length > 0 || searchQuery) && (
              <Button variant="outline" onClick={clearAllFilters} className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Tag Filters */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtered by:
              </span>
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeTagFilter(tag)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Popular Tags */}
          {popularTags.length > 0 && selectedTags.length === 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                Popular tags:
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary transition-colors"
                    onClick={() => addTagFilter(tag.name)}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.name}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({tag._count?.stories})
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Stories Grid */}
      <AnimatedSection delay={0.2}>
        <div className="space-y-4">
          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {stories.length === 0 ? 'No stories' : 
               stories.length === 1 ? '1 story' : 
               `${stories.length} stories`}
              {(searchQuery || selectedTags.length > 0) && ' found'}
            </p>
          </div>

          <div className="grid gap-6">
            {stories.map((story, index) => (
              <Card key={story.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-lg">{story.title}</CardTitle>
                      
                      {/* Tags */}
                      {story.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {story.tags.map((tagRelation, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              variant="secondary" 
                              className="text-xs cursor-pointer hover:bg-secondary/80 transition-colors"
                              onClick={() => addTagFilter(tagRelation.tag.name)}
                              style={{ backgroundColor: tagRelation.tag.color ? `${tagRelation.tag.color}20` : undefined }}
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tagRelation.tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Linked Questions */}
                      {story.questions.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {story.questions.slice(0, 3).map((questionRelation, qIndex) => {
                            const companies = questionRelation.question.companyQuestions?.map(cq => cq.company.name) || []
                            return (
                              <Badge key={qIndex} variant="outline" className="text-xs">
                                <BookOpen className="w-3 h-3 mr-1" />
                                {companies.length > 0 ? companies[0] : 'Question'}
                              </Badge>
                            )
                          })}
                          {story.questions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{story.questions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditStory(story)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {story.situation && (
                    <div>
                      <h4 className="font-semibold text-sm text-blue-600 mb-1">Situation</h4>
                      <p className="text-sm text-gray-700 line-clamp-3">{story.situation}</p>
                    </div>
                  )}
                  
                  {story.task && (
                    <div>
                      <h4 className="font-semibold text-sm text-green-600 mb-1">Task</h4>
                      <p className="text-sm text-gray-700 line-clamp-3">{story.task}</p>
                    </div>
                  )}
                  
                  {story.action && (
                    <div>
                      <h4 className="font-semibold text-sm text-purple-600 mb-1">Action</h4>
                      <p className="text-sm text-gray-700 line-clamp-3">{story.action}</p>
                    </div>
                  )}
                  
                  {story.result && (
                    <div>
                      <h4 className="font-semibold text-sm text-orange-600 mb-1">Result</h4>
                      <p className="text-sm text-gray-700 line-clamp-3">{story.result}</p>
                    </div>
                  )}
                  
                  {story.reflection && (
                    <div>
                      <h4 className="font-semibold text-sm text-indigo-600 mb-1">Reflection</h4>
                      <p className="text-sm text-gray-700 line-clamp-3">{story.reflection}</p>
                    </div>
                  )}

                  {/* Story metadata */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-muted-foreground">
                      Updated {new Date(story.updatedAt).toLocaleDateString()}
                    </span>
                    {story.tags.length === 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Add tags
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {stories.length === 0 && (
              <Card className="p-8 text-center border-0 bg-white/70 backdrop-blur-sm">
                <div className="space-y-4">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">
                    {(searchQuery || selectedTags.length > 0) ? 'No stories found' : 'No stories yet'}
                  </h3>
                  <p className="text-muted-foreground">
                    {(searchQuery || selectedTags.length > 0)
                      ? 'Try adjusting your search query or filters to find relevant stories.'
                      : 'Create your first STAR method story to get started with interview preparation.'
                    }
                  </p>
                  {!(searchQuery || selectedTags.length > 0) && (
                    <Button onClick={() => setIsCreateDialogOpen(true)} className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Story
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default function StoriesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <StoriesPageContent />
    </Suspense>
  )
}
