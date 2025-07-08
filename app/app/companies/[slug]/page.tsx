
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Target, 
  MessageSquare, 
  Lightbulb, 
  Zap,
  BookOpen,
  Edit3,
  HelpCircle,
  Search,
  Filter,
  Star,
  Clock,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import SystemDesignQuestionCard from '@/components/system-design-question-card';
import EnhancedSearch from '@/components/enhanced-search';
import QuestionCard from '@/components/question-card';
import StoryBrowser from '@/components/story-browser';

interface Company {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  values: string[];
  principles: string[];
}

interface Question {
  id: string;
  title: string;
  content: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  type: 'BEHAVIORAL' | 'SYSTEM_DESIGN' | 'TECHNICAL' | 'LEADERSHIP' | 'CULTURAL_FIT';
  isCritical: boolean;
  tips: string[];
  followUps: string[];
  company: {
    id: string;
    name: string;
    slug: string;
  };
  category: {
    name: string;
    color?: string;
  };
  userNote?: {
    id?: string;
    content?: string;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'PREPARED' | 'NEEDS_WORK';
  };
}

interface SystemDesignQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  estimatedTime?: number;
  tags: string[];
  requirements?: string;
  architecture?: string;
  components?: string;
  dataModel?: string;
  scalability?: string;
  isGeneral?: boolean;
  tradeoffs?: string;
  references: string[];
  videoLinks: string[];
  blogPosts: string[];
  company?: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
  };
  userNotes?: Array<{
    id: string;
    content: string;
  }>;
  userAnswers?: Array<{
    id: string;
    content: string;
  }>;
}

interface Strategy {
  id: string;
  type: string;
  title: string;
  description: string;
  content: string;
  keyPoints: string[];
  examples: string[];
  tips: string[];
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags: string[];
}

export default function CompanyPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [systemDesignQuestions, setSystemDesignQuestions] = useState<SystemDesignQuestion[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filters
  const [questionFilter, setQuestionFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCompanyData();
  }, [slug]);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      
      // Fetch company details
      const companyResponse = await fetch(`/api/companies/${slug}`);
      if (companyResponse.ok) {
        const companyData = await companyResponse.json();
        setCompany(companyData);
        
        // Fetch related data
        await Promise.all([
          fetchQuestions(companyData.id),
          fetchSystemDesignQuestions(companyData.id),
          fetchStrategies(companyData.id),
          fetchFAQs(companyData.id)
        ]);
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async (companyId: string) => {
    try {
      const response = await fetch(`/api/questions?companyId=${companyId}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchSystemDesignQuestions = async (companyId: string) => {
    try {
      const response = await fetch(`/api/system-design-questions?companyId=${companyId}`);
      if (response.ok) {
        const data = await response.json();
        setSystemDesignQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching system design questions:', error);
    }
  };

  const fetchStrategies = async (companyId: string) => {
    try {
      const response = await fetch(`/api/company-strategies?companyId=${companyId}`);
      if (response.ok) {
        const data = await response.json();
        setStrategies(data);
      }
    } catch (error) {
      console.error('Error fetching strategies:', error);
    }
  };

  const fetchFAQs = async (companyId: string) => {
    try {
      const response = await fetch(`/api/company-faqs?companyId=${companyId}`);
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleSaveSystemDesignNote = async (questionId: string, content: string) => {
    try {
      const response = await fetch(`/api/system-design-questions/${questionId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, isPrivate: true })
      });
      
      if (response.ok) {
        // Refresh the question data
        if (company) {
          await fetchSystemDesignQuestions(company.id);
        }
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleSaveSystemDesignAnswer = async (questionId: string, content: string) => {
    try {
      const response = await fetch(`/api/system-design-questions/${questionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, isPrivate: true })
      });
      
      if (response.ok) {
        // Refresh the question data
        if (company) {
          await fetchSystemDesignQuestions(company.id);
        }
      }
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  const filteredQuestions = questions.filter(question => {
    if (questionFilter !== 'all' && question.type !== questionFilter) return false;
    if (difficultyFilter !== 'all' && question.difficulty !== difficultyFilter) return false;
    if (searchQuery && !question.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !question.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredSystemDesignQuestions = systemDesignQuestions.filter(question => {
    if (difficultyFilter !== 'all' && question.difficulty !== difficultyFilter) return false;
    if (searchQuery && !question.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !question.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company information...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h1>
          <p className="text-gray-600">The company you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-6">
            {company.logoUrl && (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={company.logoUrl} 
                  alt={`${company.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              {company.description && (
                <p className="text-gray-600 text-lg">{company.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <EnhancedSearch 
            companyFilter={company.id}
            placeholder={`Search ${company.name} content...`}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="values" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Values
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="system-design" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              System Design
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Strategy
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Company Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {company.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Core Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {company.values.map((value, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Star className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="font-medium text-blue-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Behavioral Questions</span>
                      <Badge variant="secondary">{questions.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">System Design Questions</span>
                      <Badge variant="secondary">{systemDesignQuestions.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Interview Strategies</span>
                      <Badge variant="secondary">{strategies.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">FAQs</span>
                      <Badge variant="secondary">{faqs.length}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Leadership Principles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {company.principles.slice(0, 5).map((principle, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{principle}</span>
                        </div>
                      ))}
                      {company.principles.length > 5 && (
                        <p className="text-sm text-gray-500 mt-2">
                          +{company.principles.length - 5} more principles
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="values">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Core Values
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {company.values.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <h3 className="font-semibold text-blue-900">{value}</h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Leadership Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {company.principles.map((principle, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">{principle}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions">
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={questionFilter} onValueChange={setQuestionFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Question Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="BEHAVIORAL">Behavioral</SelectItem>
                        <SelectItem value="TECHNICAL">Technical</SelectItem>
                        <SelectItem value="LEADERSHIP">Leadership</SelectItem>
                        <SelectItem value="CULTURAL_FIT">Cultural Fit</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Questions List */}
              <div className="grid grid-cols-1 gap-6">
                {filteredQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>

              {filteredQuestions.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="system-design">
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Search system design questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* System Design Questions */}
              <div className="grid grid-cols-1 gap-6">
                {filteredSystemDesignQuestions.map((question) => (
                  <SystemDesignQuestionCard 
                    key={question.id} 
                    question={question}
                  />
                ))}
              </div>

              {filteredSystemDesignQuestions.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No system design questions found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="strategy">
            <div className="grid grid-cols-1 gap-6">
              {strategies.map((strategy) => (
                <Card key={strategy.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        {strategy.title}
                      </CardTitle>
                      <Badge variant="outline">
                        {strategy.type.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{strategy.description}</p>
                    
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap">{strategy.content}</div>
                    </div>

                    {strategy.keyPoints.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Key Points</h4>
                        <ul className="space-y-1">
                          {strategy.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {strategy.examples.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Examples</h4>
                        <div className="space-y-2">
                          {strategy.examples.map((example, index) => (
                            <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                              <p className="text-sm text-green-800">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {strategy.tips.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Tips</h4>
                        <div className="space-y-2">
                          {strategy.tips.map((tip, index) => (
                            <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                              <p className="text-sm text-yellow-800">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {strategies.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No strategies available</h3>
                    <p className="text-gray-600">Interview strategies for this company will be added soon.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="grid grid-cols-1 gap-4">
              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <HelpCircle className="h-5 w-5" />
                      {faq.question}
                    </CardTitle>
                    {faq.category && (
                      <Badge variant="secondary" className="w-fit">
                        {faq.category}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700">{faq.answer}</div>
                    </div>
                    
                    {faq.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-4">
                        {faq.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {faqs.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs available</h3>
                    <p className="text-gray-600">Frequently asked questions for this company will be added soon.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
