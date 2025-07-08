
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Filter, Building2, Users, Target, Lightbulb, CheckCircle, Clock, AlertCircle, HelpCircle } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'
import QuestionCard from '@/components/question-card'
import { CompanyValues } from '@/components/company-values'
import { SystemDesignQuestionCard } from '@/components/system-design-question-card'

interface Company {
  id: string
  name: string
  slug: string
  description: string
  values: string[]
  principles: string[]
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
  questionCount: number
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
  company: Company
  category: Category
  userNote?: {
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'PREPARED' | 'NEEDS_WORK'
  }
}

function ComprehensivePageContent() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [systemDesignQuestions, setSystemDesignQuestions] = useState<any[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [filteredSystemDesignQuestions, setFilteredSystemDesignQuestions] = useState<any[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // Get URL parameters and fetch data
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const company = urlParams.get('company') || 'all'
    const category = urlParams.get('category') || 'all'
    const difficulty = urlParams.get('difficulty') || 'all'
    const type = urlParams.get('type') || 'all'
    const search = urlParams.get('search') || ''

    // Set state first
    setSelectedCompany(company)
    setSelectedCategory(category)
    setSelectedDifficulty(difficulty)
    setSelectedType(type)
    setSearchQuery(search)

    // Then fetch data with the URL parameters
    fetchDataWithParams({
      company,
      category,
      difficulty,
      type,
      search
    })
  }, [])

  // Handle filter changes after initial load
  useEffect(() => {
    if (!loading) {
      fetchData()
    }
  }, [selectedCompany, selectedCategory, selectedDifficulty, selectedType, searchQuery])

  const fetchDataWithParams = async (filters: {
    company: string
    category: string
    difficulty: string
    type: string
    search: string
  }) => {
    try {
      setError(null)
      
      // Build query parameters for questions API
      const params = new URLSearchParams()
      if (filters.company !== 'all') params.set('company', filters.company)
      if (filters.category !== 'all') params.set('category', filters.category)
      if (filters.difficulty !== 'all') params.set('difficulty', filters.difficulty)
      if (filters.type !== 'all') params.set('type', filters.type)
      if (filters.search) params.set('search', filters.search)

      // Build query parameters for system design questions API
      const sdParams = new URLSearchParams()
      if (filters.company !== 'all') {
        // Find company ID from slug
        const companySlug = filters.company
        const companiesRes = await fetch('/api/companies')
        if (companiesRes.ok) {
          const companiesData = await companiesRes.json()
          const company = companiesData.find((c: any) => c.slug === companySlug)
          if (company) {
            sdParams.set('companyId', company.id)
          }
        }
      }
      if (filters.difficulty !== 'all') sdParams.set('difficulty', filters.difficulty)
      if (filters.search) sdParams.set('search', filters.search)

      const [companiesRes, categoriesRes, questionsRes, systemDesignRes] = await Promise.all([
        fetch('/api/companies'),
        fetch('/api/categories'),
        fetch(`/api/questions?${params.toString()}`),
        fetch(`/api/system-design-questions?${sdParams.toString()}`)
      ])

      if (companiesRes.status === 401 || categoriesRes.status === 401 || questionsRes.status === 401 || systemDesignRes.status === 401) {
        // User not authenticated, redirect to login
        window.location.href = '/login';
        return;
      }

      if (!companiesRes.ok || !categoriesRes.ok || !questionsRes.ok || !systemDesignRes.ok) {
        throw new Error('One or more API calls failed')
      }

      const companiesData = await companiesRes.json()
      const categoriesData = await categoriesRes.json()
      const questionsData = await questionsRes.json()
      const systemDesignData = await systemDesignRes.json()

      setCompanies(companiesData || [])
      setCategories(categoriesData || [])
      setQuestions(questionsData || [])
      setSystemDesignQuestions(systemDesignData || [])
      
      // Filter questions based on type
      let filteredBehavioral = questionsData || []
      let filteredSystemDesign = systemDesignData || []
      
      if (filters.type === 'SYSTEM_DESIGN') {
        filteredBehavioral = []
      } else if (filters.type !== 'all' && filters.type !== 'SYSTEM_DESIGN') {
        filteredSystemDesign = []
      }
      
      setFilteredQuestions(filteredBehavioral)
      setFilteredSystemDesignQuestions(filteredSystemDesign)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    await fetchDataWithParams({
      company: selectedCompany,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      type: selectedType,
      search: searchQuery
    })
  }





  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p>Loading comprehensive interview preparation...</p>
          <p className="text-sm text-gray-500">Questions: {questions.length + systemDesignQuestions.length}, Companies: {companies.length}, Categories: {categories.length}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnimatedSection>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Comprehensive Interview Preparation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Master every aspect of Engineering Manager interviews with our complete question bank, 
            company insights, and interactive preparation tools.
          </p>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection>
        <Card className="border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger>
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.slug}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="BEHAVIORAL">Behavioral</SelectItem>
                  <SelectItem value="SYSTEM_DESIGN">System Design</SelectItem>
                  <SelectItem value="LEADERSHIP">Leadership</SelectItem>
                  <SelectItem value="CULTURAL_FIT">Cultural Fit</SelectItem>
                  <SelectItem value="TECHNICAL">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Main Content */}
      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Questions ({filteredQuestions.length + filteredSystemDesignQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Companies
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-6">
          <AnimatedSection>
            {/* Categorized Questions View */}
            {(() => {
              // Combine behavioral and system design questions
              const allQuestions = [
                ...filteredQuestions,
                ...filteredSystemDesignQuestions.map(q => ({
                  ...q,
                  type: 'SYSTEM_DESIGN' as const,
                  category: { name: 'System Design', color: '#8B5CF6' }
                }))
              ]

              // Group questions by category
              const questionsByCategory = allQuestions.reduce((acc, question) => {
                const categoryName = question.category?.name || 'Uncategorized'
                if (!acc[categoryName]) {
                  acc[categoryName] = {
                    category: question.category,
                    questions: []
                  }
                }
                acc[categoryName].questions.push(question)
                return acc
              }, {} as Record<string, { category: any, questions: any[] }>)

              const categoryEntries = Object.entries(questionsByCategory)

              if (categoryEntries.length === 0) {
                return (
                  <Card className="p-8 text-center border-0 bg-white/70 backdrop-blur-sm">
                    <div className="space-y-4">
                      <Target className="w-12 h-12 text-muted-foreground mx-auto" />
                      <h3 className="text-lg font-semibold">No questions found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or search query to find relevant questions.
                      </p>
                    </div>
                  </Card>
                )
              }

              return (
                <div className="space-y-8">
                  {categoryEntries.map(([categoryName, categoryData]: [string, any], categoryIndex: number) => {
                    const { category, questions } = categoryData;
                    return (
                    <div key={categoryName} className="space-y-4">
                      {/* Category Header */}
                      <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category?.color || '#6B7280' }}
                        />
                        <h2 className="text-xl font-semibold text-gray-900">{categoryName}</h2>
                        <Badge variant="secondary" className="ml-auto">
                          {questions.length} question{questions.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      
                      {category?.description && (
                        <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                      )}

                      {/* Questions in this category */}
                      <div className="grid gap-4">
                        {questions.map((question: any, questionIndex: number) => {
                          // Check if this is a system design question
                          if (question.type === 'SYSTEM_DESIGN' && question.description) {
                            return (
                              <SystemDesignQuestionCard 
                                key={question.id} 
                                question={question}
                                compact={false}
                              />
                            )
                          }
                          
                          // Regular behavioral/leadership question
                          return (
                            <Card key={question.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <Badge className={getDifficultyColor(question.difficulty)}>
                                        {question.difficulty}
                                      </Badge>
                                      <Badge className={getTypeColor(question.type)}>
                                        {question.type.replace('_', ' ')}
                                      </Badge>
                                      <Badge variant="outline" className="flex items-center gap-1">
                                        <Building2 className="w-3 h-3" />
                                        {question.company?.name || question.Company?.name || 'Unknown'}
                                      </Badge>
                                      {question.isCritical && (
                                        <Badge variant="destructive">Critical</Badge>
                                      )}
                                    </div>
                                    
                                    <CardTitle className="text-lg leading-relaxed">
                                      {question.title}
                                    </CardTitle>
                                  </div>
                                </div>
                              </CardHeader>
                              
                              <CardContent className="space-y-4">
                                <div className="prose prose-sm max-w-none">
                                  <p className="text-gray-700 leading-relaxed">{question.content || question.description}</p>
                                </div>

                                {question.tips && question.tips.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold flex items-center gap-2 text-sm">
                                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                                      Tips for Answering
                                    </h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                      {question.tips.map((tip: string, tipIndex: number) => (
                                        <li key={tipIndex} className="flex items-start gap-2">
                                          <span className="text-blue-600 mt-1">•</span>
                                          <span>{tip}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {question.followUps && question.followUps.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold flex items-center gap-2 text-sm">
                                      <HelpCircle className="w-4 h-4 text-purple-600" />
                                      Common Follow-up Questions
                                    </h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                      {question.followUps.map((followUp: string, followUpIndex: number) => (
                                        <li key={followUpIndex} className="flex items-start gap-2">
                                          <span className="text-purple-600 mt-1">•</span>
                                          <span>{followUp}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                    );
                  })}
                </div>
              )
            })()}
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <AnimatedSection>
            <div className="grid gap-6">
              {companies.map((company, index) => (
                <CompanyValues key={company.id} companySlug={company.slug} />
              ))}
            </div>
          </AnimatedSection>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Card key={category.id} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color || 'bg-blue-100'}`}>
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>{category.questionCount || 0} questions</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  {category.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function ComprehensivePage() {
  return <ComprehensivePageContent />
}
