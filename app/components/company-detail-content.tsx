
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Target,
  AlertTriangle,
  Users,
  Lightbulb,
  MessageSquare,
  Filter,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { CompanyWithQuestions, QuestionWithCompany } from '@/lib/types';
import { motion } from 'framer-motion';

interface CompanyDetailContentProps {
  company: CompanyWithQuestions & {
    questions: (QuestionWithCompany & {
      answers?: { id: string; isComplete: boolean }[];
    })[];
  };
}

export function CompanyDetailContent({ company }: CompanyDetailContentProps) {
  const [filter, setFilter] = useState<'all' | 'unanswered' | 'answered' | 'critical'>('all');

  const answeredQuestions = company.questions.filter((q: any) => q.answers && q.answers.length > 0);
  const unansweredQuestions = company.questions.filter((q: any) => !q.answers || q.answers.length === 0);
  const criticalQuestions = company.questions.filter(q => q.isCritical);
  const completionPercentage = company.questions.length > 0 
    ? (answeredQuestions.length / company.questions.length) * 100 
    : 0;

  const getFilteredQuestions = () => {
    switch (filter) {
      case 'answered':
        return answeredQuestions;
      case 'unanswered':
        return unansweredQuestions;
      case 'critical':
        return criticalQuestions;
      default:
        return company.questions;
    }
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-4">
            <Link href="/companies">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Companies
              </Button>
            </Link>
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Building2 className="h-8 w-8 mr-3 text-blue-600" />
                {company.name}
              </h1>
              {company.industry && (
                <p className="text-gray-600">{company.industry}</p>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              )}
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(completionPercentage)}%
              </div>
              <p className="text-sm text-gray-600">Complete</p>
              <Progress value={completionPercentage} className="w-32 mt-2" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-lg font-bold">{company.questions.length}</p>
                    <p className="text-xs text-gray-600">Total Questions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-lg font-bold">{answeredQuestions.length}</p>
                    <p className="text-xs text-gray-600">Answered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-lg font-bold">{unansweredQuestions.length}</p>
                    <p className="text-xs text-gray-600">Remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-lg font-bold">{criticalQuestions.length}</p>
                    <p className="text-xs text-gray-600">Critical</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="values">Values & Culture</TabsTrigger>
            <TabsTrigger value="tips">Interview Tips</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Interview Format */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Interview Format
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {company.interviewFormat || 'Interview format information not available.'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Evaluation Criteria */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="mr-2 h-5 w-5" />
                      Evaluation Criteria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {company.evaluationCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Red Flags */}
            {company.redFlags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-600">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Common Red Flags to Avoid
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {company.redFlags.map((flag, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All ({company.questions.length})
                </Button>
                <Button
                  variant={filter === 'unanswered' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('unanswered')}
                >
                  Unanswered ({unansweredQuestions.length})
                </Button>
                <Button
                  variant={filter === 'answered' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('answered')}
                >
                  Answered ({answeredQuestions.length})
                </Button>
                <Button
                  variant={filter === 'critical' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('critical')}
                >
                  Critical ({criticalQuestions.length})
                </Button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-grow space-y-2">
                          <div className="flex items-center space-x-2">
                            {(question as any).answers && (question as any).answers.length > 0 ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-gray-400" />
                            )}
                            {question.isCritical && (
                              <Badge variant="destructive" className="text-xs">
                                Critical
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">
                              {question.category.toLowerCase().replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {question.difficulty.toLowerCase()}
                            </Badge>
                          </div>
                          <p className="text-gray-900 font-medium leading-relaxed">
                            {question.text}
                          </p>
                          {question.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {question.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <Link href={`/questions/${question.id}`}>
                            <Button size="sm">
                              {(question as any).answers && (question as any).answers.length > 0 ? 'Review' : 'Answer'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? 'No questions available for this company'
                    : `No ${filter} questions found`
                  }
                </p>
              </div>
            )}
          </TabsContent>

          {/* Values Tab */}
          <TabsContent value="values" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Core Values & Culture</CardTitle>
                  <CardDescription>
                    Understanding {company.name}'s values is crucial for cultural fit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {company.values.map((value, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {value.split(':')[0]}
                        </h4>
                        {value.includes(':') && (
                          <p className="text-gray-700 text-sm">
                            {value.split(':').slice(1).join(':').trim()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Success Tips
                  </CardTitle>
                  <CardDescription>
                    Insider tips to help you succeed in {company.name} interviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {company.successTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
