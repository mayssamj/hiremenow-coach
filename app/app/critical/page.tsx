
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Target, CheckCircle, Clock, AlertCircle, Star, Zap, Building2 } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'
import QuestionCard from '@/components/question-card'

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

interface Company {
  id: string
  name: string
  slug: string
}

function CriticalPageContent() {
  const searchParams = useSearchParams()
  const currentCompany = searchParams.get('company') || 'meta'
  
  const [questions, setQuestions] = useState<Question[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    prepared: 0,
    inProgress: 0,
    needsWork: 0,
    notStarted: 0
  })

  useEffect(() => {
    fetchData()
  }, [currentCompany])

  useEffect(() => {
    calculateStats()
  }, [questions])

  const fetchData = async () => {
    try {
      const [questionsRes, companiesRes] = await Promise.all([
        fetch(`/api/questions?critical=true&company=${currentCompany}`),
        fetch('/api/companies')
      ])
      
      if (questionsRes.ok && companiesRes.ok) {
        const questionsData = await questionsRes.json()
        const companiesData = await companiesRes.json()
        setQuestions(questionsData)
        setCompanies(companiesData)
      } else if (questionsRes.status === 401 || companiesRes.status === 401) {
        // User not authenticated, redirect to login
        window.location.href = '/login';
        return;
      } else {
        console.error('Failed to fetch data:', questionsRes.status, companiesRes.status)
      }
    } catch (error) {
      console.error('Error fetching critical questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = () => {
    const total = questions.length
    const prepared = questions.filter(q => q.userNote?.status === 'PREPARED').length
    const inProgress = questions.filter(q => q.userNote?.status === 'IN_PROGRESS').length
    const needsWork = questions.filter(q => q.userNote?.status === 'NEEDS_WORK').length
    const notStarted = questions.filter(q => !q.userNote || q.userNote.status === 'NOT_STARTED').length

    setStats({ total, prepared, inProgress, needsWork, notStarted })
  }

  const getProgressPercentage = () => {
    if (stats.total === 0) return 0
    return Math.round((stats.prepared / stats.total) * 100)
  }

  const currentCompanyData = companies.find(c => c.slug === currentCompany)
  const companyDisplayName = currentCompanyData?.name || 'Meta'

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
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <Badge variant="destructive" className="px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Critical Questions
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Building2 className="w-4 h-4 mr-2" />
              {companyDisplayName}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            {companyDisplayName} Critical Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Focus on the most important {stats.total} questions for your {companyDisplayName} interview preparation. 
            These are the high-priority questions that frequently appear in {companyDisplayName} EM interviews.
          </p>
        </div>
      </AnimatedSection>

      {/* Progress Overview */}
      <AnimatedSection delay={0.1}>
        <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Your Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Preparation Progress</span>
                    <span>{getProgressPercentage()}%</span>
                  </div>
                  <Progress value={getProgressPercentage()} className="bg-white/20" />
                </div>
                <p className="text-blue-100 text-sm">
                  {stats.prepared} of {stats.total} critical questions prepared
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span className="text-2xl font-bold">{stats.prepared}</span>
                  </div>
                  <p className="text-xs text-blue-100">Prepared</p>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-yellow-300" />
                    <span className="text-2xl font-bold">{stats.inProgress}</span>
                  </div>
                  <p className="text-xs text-blue-100">In Progress</p>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-red-300" />
                    <span className="text-2xl font-bold">{stats.needsWork}</span>
                  </div>
                  <p className="text-xs text-blue-100">Needs Work</p>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-gray-300" />
                    <span className="text-2xl font-bold">{stats.notStarted}</span>
                  </div>
                  <p className="text-xs text-blue-100">Not Started</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Quick Tips */}
      <AnimatedSection delay={0.2}>
        <Card className="border-0 bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Zap className="w-5 h-5" />
              Quick Preparation Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-orange-700">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Focus on 2-3 strong STAR stories that can be adapted to multiple questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Practice your stories out loud and time them (aim for 2-3 minutes each)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Prepare specific examples that demonstrate {companyDisplayName}'s core values</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Review system design fundamentals and practice trade-off discussions</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Critical Questions */}
      <AnimatedSection delay={0.3}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Critical Questions ({questions.length})</h2>
            <Badge variant="outline" className="px-3 py-1">
              High Priority
            </Badge>
          </div>
          
          <div className="grid gap-6">
            {questions.map((question, index) => (
              <QuestionCard key={question.id} question={question} delay={index * 0.1} />
            ))}
          </div>

          {questions.length === 0 && (
            <Card className="p-8 text-center border-0 bg-white/70 backdrop-blur-sm">
              <div className="space-y-4">
                <Target className="w-12 h-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">No critical questions found</h3>
                <p className="text-muted-foreground">
                  Critical questions will appear here once they are added to the database.
                </p>
              </div>
            </Card>
          )}
        </div>
      </AnimatedSection>
    </div>
  )
}

export default function CriticalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CriticalPageContent />
    </Suspense>
  )
}
