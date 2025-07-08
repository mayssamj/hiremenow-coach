
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp, Clock, Building2, Target, Lightbulb, Database, Zap, TrendingUp, Scale } from 'lucide-react'
import { useState } from 'react'

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

interface SystemDesignQuestionCardProps {
  question: SystemDesignQuestion
  compact?: boolean
}

export function SystemDesignQuestionCard({ question, compact = false }: SystemDesignQuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(!compact)

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

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getDifficultyColor(question.difficulty)}>
                  {question.difficulty}
                </Badge>
                {question.Company && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {question.Company.name}
                  </Badge>
                )}
                {question.estimatedTime && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {question.estimatedTime}m
                  </Badge>
                )}
              </div>
              <CardTitle className="text-base leading-relaxed">
                {question.title}
              </CardTitle>
              <CardDescription className="text-sm line-clamp-2">
                {question.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty}
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                System Design
              </Badge>
              {question.Company && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {question.Company.name}
                </Badge>
              )}
              {question.estimatedTime && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {question.estimatedTime} minutes
                </Badge>
              )}
            </div>
            
            <CardTitle className="text-lg leading-relaxed">
              {question.title}
            </CardTitle>
            
            <CardDescription className="text-base">
              {question.description}
            </CardDescription>
          </div>
          
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </CardHeader>
      
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Requirements */}
            {question.requirements && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-blue-600" />
                  Requirements
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">{question.requirements}</p>
              </div>
            )}

            {/* Architecture */}
            {question.architecture && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-green-600" />
                  High-Level Architecture
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">{question.architecture}</p>
              </div>
            )}

            {/* Components */}
            {question.components && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-orange-600" />
                  Key Components
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">{question.components}</p>
              </div>
            )}

            {/* Data Model */}
            {question.dataModel && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Database className="w-4 h-4 text-purple-600" />
                  Data Model
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">{question.dataModel}</p>
              </div>
            )}

            {/* Scalability */}
            {question.scalability && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Scalability Considerations
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">{question.scalability}</p>
              </div>
            )}

            {/* Trade-offs */}
            {question.tradeoffs && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Scale className="w-4 h-4 text-red-600" />
                  Trade-offs & Considerations
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">{question.tradeoffs}</p>
              </div>
            )}

            {/* Tags */}
            {question.tags && question.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            {(question.references.length > 0 || question.videoLinks.length > 0 || question.blogPosts.length > 0) && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  Additional Resources
                </h4>
                <div className="space-y-2 text-sm">
                  {question.references.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-900">References:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {question.references.map((ref, index) => (
                          <li key={index}>{ref}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {question.videoLinks.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-900">Video Links:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {question.videoLinks.map((link, index) => (
                          <li key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {question.blogPosts.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-900">Blog Posts:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {question.blogPosts.map((post, index) => (
                          <li key={index}>
                            <a href={post} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {post}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default SystemDesignQuestionCard
