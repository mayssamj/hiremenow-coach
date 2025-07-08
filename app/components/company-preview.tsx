
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Building2, Target, Users, Lightbulb, ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SystemDesignQuestionCard } from './system-design-question-card'

interface Company {
  id: string
  name: string
  slug: string
  description: string
  logoUrl?: string
  values: string[]
  principles: string[]
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
  category: {
    id: string
    name: string
    color: string
  }
}

interface SystemDesignQuestion {
  id: string
  title: string
  description: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  companyId?: string
  isGeneral: boolean
  requirements?: string
  architecture?: string
  components?: string
  dataModel?: string
  scalability?: string
  tradeoffs?: string
  references: string[]
  videoLinks: string[]
  blogPosts: string[]
  tags: string[]
  estimatedTime?: number
  Company?: {
    id: string
    name: string
    slug: string
    logoUrl?: string
  }
}

interface CompanyPreviewProps {
  company: Company
}

export function CompanyPreview({ company }: CompanyPreviewProps) {
  const [behavioralQuestions, setBehavioralQuestions] = useState<Question[]>([])
  const [systemDesignQuestions, setSystemDesignQuestions] = useState<SystemDesignQuestion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPreviewQuestions()
  }, [company.id])

  const fetchPreviewQuestions = async () => {
    try {
      setLoading(true)
      
      // Fetch behavioral questions
      const behavioralResponse = await fetch(`/api/questions?company=${company.slug}&limit=5`)
      const behavioralData = await behavioralResponse.json()
      
      // Fetch system design questions
      const systemDesignResponse = await fetch(`/api/system-design-questions?companyId=${company.id}&limit=5`)
      const systemDesignData = await systemDesignResponse.json()
      
      setBehavioralQuestions(behavioralData.slice(0, 5) || [])
      setSystemDesignQuestions(systemDesignData.slice(0, 5) || [])
    } catch (error) {
      console.error('Failed to fetch preview questions:', error)
    } finally {
      setLoading(false)
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

  if (loading) {
    return (
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-muted-foreground">Loading preview...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center space-x-3">
          {company.logoUrl && (
            <img 
              src={company.logoUrl} 
              alt={company.name}
              className="w-10 h-10 rounded"
            />
          )}
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {company.name} Interview Preview
            </CardTitle>
            <CardDescription>
              Quick preview of key questions for {company.name} EM interviews
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* System Design Questions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              System Design Questions
              <Badge variant="secondary">{systemDesignQuestions.length}</Badge>
            </h3>
            <Button asChild variant="outline" size="sm">
              <Link href={`/comprehensive?company=${company.slug}&type=SYSTEM_DESIGN`}>
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          {systemDesignQuestions.length > 0 ? (
            <div className="space-y-3">
              {systemDesignQuestions.map((question) => (
                <SystemDesignQuestionCard 
                  key={question.id} 
                  question={question} 
                  compact={true}
                />
              ))}
            </div>
          ) : (
            <Card className="p-4 text-center border-dashed">
              <p className="text-sm text-muted-foreground">No system design questions available</p>
            </Card>
          )}
        </div>

        <Separator />

        {/* Behavioral Questions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Behavioral Questions
              <Badge variant="secondary">{behavioralQuestions.length}</Badge>
            </h3>
            <Button asChild variant="outline" size="sm">
              <Link href={`/comprehensive?company=${company.slug}&type=BEHAVIORAL`}>
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          {behavioralQuestions.length > 0 ? (
            <div className="space-y-3">
              {behavioralQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {question.type.replace('_', ' ')}
                        </Badge>
                        {question.isCritical && (
                          <Badge variant="destructive">Critical</Badge>
                        )}
                      </div>
                      <CardTitle className="text-base leading-relaxed">
                        {question.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {question.content}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-4 text-center border-dashed">
              <p className="text-sm text-muted-foreground">No behavioral questions available</p>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button asChild className="flex-1">
            <Link href={`/comprehensive?company=${company.slug}`}>
              <BookOpen className="w-4 h-4 mr-2" />
              Full Preparation
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/critical?company=${company.slug}`}>
              <Target className="w-4 h-4 mr-2" />
              Critical Questions
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompanyPreview
