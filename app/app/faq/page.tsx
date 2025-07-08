
'use client'

import { useState, useEffect, Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, ChevronUp, Search, HelpCircle, Lightbulb, Target, Users } from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'

interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order: number
}

function FAQPageContent() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faqs')
      const data = await response.json()
      setFaqs(data)
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (faq.category && faq.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const groupedFAQs = filteredFAQs.reduce((groups, faq) => {
    const category = faq.category || 'General'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(faq)
    return groups
  }, {} as Record<string, FAQ[]>)

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'preparation':
        return <Target className="w-5 h-5 text-blue-600" />
      case 'interview process':
        return <Users className="w-5 h-5 text-green-600" />
      case 'behavioral questions':
        return <HelpCircle className="w-5 h-5 text-purple-600" />
      case 'system design':
        return <Lightbulb className="w-5 h-5 text-orange-600" />
      default:
        return <HelpCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'preparation':
        return 'bg-blue-100 text-blue-800'
      case 'interview process':
        return 'bg-green-100 text-green-800'
      case 'behavioral questions':
        return 'bg-purple-100 text-purple-800'
      case 'system design':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about Engineering Manager interviews, preparation strategies, 
            and how to use this platform effectively.
          </p>
        </div>
      </AnimatedSection>

      {/* Search */}
      <AnimatedSection delay={0.1}>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Categories */}
      <AnimatedSection delay={0.2}>
        <div className="space-y-8">
          {Object.entries(groupedFAQs).map(([category, categoryFAQs], categoryIndex) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                {getCategoryIcon(category)}
                <h2 className="text-2xl font-bold">{category}</h2>
                <Badge className={getCategoryColor(category)}>
                  {categoryFAQs.length} questions
                </Badge>
              </div>
              
              <div className="space-y-3">
                {categoryFAQs
                  .sort((a, b) => a.order - b.order)
                  .map((faq, index) => (
                    <Card key={faq.id} className="border-0 bg-white/70 backdrop-blur-sm">
                      <Collapsible 
                        open={openItems.has(faq.id)} 
                        onOpenChange={() => toggleItem(faq.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-left text-lg font-medium">
                                {faq.question}
                              </CardTitle>
                              {openItems.has(faq.id) ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <div className="prose prose-sm max-w-none text-gray-700">
                              <p className="whitespace-pre-wrap leading-relaxed">{faq.answer}</p>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
          
          {Object.keys(groupedFAQs).length === 0 && (
            <Card className="p-8 text-center border-0 bg-white/70 backdrop-blur-sm">
              <div className="space-y-4">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">
                  {searchQuery ? 'No FAQs found' : 'No FAQs available'}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? 'Try adjusting your search query to find relevant questions.'
                    : 'FAQs will appear here once they are added to the database.'
                  }
                </p>
              </div>
            </Card>
          )}
        </div>
      </AnimatedSection>
    </div>
  )
}

export default function FAQPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FAQPageContent />
    </Suspense>
  )
}
