
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  X, 
  Building2, 
  MessageSquare, 
  BookOpen, 
  Lightbulb,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  questions: Array<{
    id: string;
    title: string;
    content: string;
    difficulty?: string;
    companyQuestions: Array<{
      company: {
        id: string;
        name: string;
        slug: string;
        logoUrl?: string;
      };
      category: {
        id: string;
        name: string;
        color?: string;
      };
    }>;
  }>;
  stories: Array<{
    id: string;
    title: string;
    content: string;
    isPublic: boolean;
    user: {
      id: string;
      username: string;
    };
    tags: Array<{
      tag: {
        id: string;
        name: string;
        color?: string;
      };
    }>;
  }>;
  systemDesignQuestions: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: string;
    tags: string[];
    company?: {
      id: string;
      name: string;
      slug: string;
      logoUrl?: string;
    };
  }>;
  strategies: Array<{
    id: string;
    title: string;
    description: string;
    type: string;
    company: {
      id: string;
      name: string;
      slug: string;
      logoUrl?: string;
    };
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    category?: string;
    company: {
      id: string;
      name: string;
      slug: string;
      logoUrl?: string;
    };
  }>;
}

interface EnhancedSearchProps {
  onResultClick?: (type: string, id: string) => void;
  companyFilter?: string;
  placeholder?: string;
}

export default function EnhancedSearch({ 
  onResultClick, 
  companyFilter,
  placeholder = "Search questions, stories, strategies, and more..." 
}: EnhancedSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // Add a small delay to prevent immediate closing when moving between elements
        setTimeout(() => {
          setIsOpen(false);
        }, 150);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch();
      } else {
        setResults(null);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, companyFilter]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        q: query.trim(),
        type: 'all'
      });
      
      if (companyFilter) {
        params.append('companyId', companyFilter);
      }

      const response = await fetch(`/api/search?${params}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setIsOpen(true);
      } else if (response.status === 401) {
        // User not authenticated, don't show search results
        setResults(null);
        setIsOpen(false);
      } else {
        console.error('Search failed:', response.status);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalResults = () => {
    if (!results) return 0;
    return (
      results.questions.length +
      results.stories.length +
      results.systemDesignQuestions.length +
      results.strategies.length +
      results.faqs.length
    );
  };

  const handleResultClick = (type: string, id: string) => {
    if (onResultClick) {
      onResultClick(type, id);
    }
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 text-base"
          onFocus={() => {
            if (results && getTotalResults() > 0) {
              setIsOpen(true);
            }
          }}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
        )}
      </div>

      <AnimatePresence>
        {isOpen && results && getTotalResults() > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden"
          >
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {getTotalResults()} results for "{query}"
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 h-8 m-2">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="questions" className="text-xs">Questions</TabsTrigger>
                  <TabsTrigger value="stories" className="text-xs">Stories</TabsTrigger>
                  <TabsTrigger value="system-design" className="text-xs">System Design</TabsTrigger>
                  <TabsTrigger value="other" className="text-xs">Other</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="space-y-1">
                    {/* Behavioral Questions */}
                    {results.questions.slice(0, 3).map((question) => (
                      <div
                        key={question.id}
                        onClick={() => handleResultClick('question', question.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">
                              {question.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {question.content.substring(0, 100)}...
                            </p>
                            {question.companyQuestions.length > 0 && (
                              <div className="flex items-center gap-1 mt-2">
                                <Building2 className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {question.companyQuestions[0].company.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* System Design Questions */}
                    {results.systemDesignQuestions.slice(0, 2).map((question) => (
                      <div
                        key={question.id}
                        onClick={() => handleResultClick('system-design', question.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">
                              {question.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {question.description.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              {question.company && (
                                <div className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">
                                    {question.company.name}
                                  </span>
                                </div>
                              )}
                              <Badge variant="secondary" className="text-xs">
                                {question.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Stories */}
                    {results.stories.slice(0, 2).map((story) => (
                      <div
                        key={story.id}
                        onClick={() => handleResultClick('story', story.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <BookOpen className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">
                              {story.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {story.content.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">
                                by {story.user.username}
                              </span>
                              {story.isPublic && (
                                <Badge variant="outline" className="text-xs">
                                  Public
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="questions" className="mt-0">
                  <div className="space-y-1">
                    {results.questions.map((question) => (
                      <div
                        key={question.id}
                        onClick={() => handleResultClick('question', question.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900">
                              {question.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                              {question.content}
                            </p>
                            {question.companyQuestions.length > 0 && (
                              <div className="flex items-center gap-2 mt-2">
                                <Building2 className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {question.companyQuestions[0].company.name}
                                </span>
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs"
                                  style={{ 
                                    backgroundColor: question.companyQuestions[0].category.color + '20',
                                    color: question.companyQuestions[0].category.color 
                                  }}
                                >
                                  {question.companyQuestions[0].category.name}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="stories" className="mt-0">
                  <div className="space-y-1">
                    {results.stories.map((story) => (
                      <div
                        key={story.id}
                        onClick={() => handleResultClick('story', story.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <BookOpen className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900">
                              {story.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                              {story.content}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">
                                by {story.user.username}
                              </span>
                              {story.isPublic && (
                                <Badge variant="outline" className="text-xs">
                                  Public
                                </Badge>
                              )}
                              {story.tags.slice(0, 2).map((tagRel) => (
                                <Badge 
                                  key={tagRel.tag.id}
                                  variant="secondary" 
                                  className="text-xs"
                                  style={{ 
                                    backgroundColor: tagRel.tag.color + '20',
                                    color: tagRel.tag.color 
                                  }}
                                >
                                  {tagRel.tag.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="system-design" className="mt-0">
                  <div className="space-y-1">
                    {results.systemDesignQuestions.map((question) => (
                      <div
                        key={question.id}
                        onClick={() => handleResultClick('system-design', question.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900">
                              {question.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                              {question.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              {question.company && (
                                <div className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">
                                    {question.company.name}
                                  </span>
                                </div>
                              )}
                              <Badge variant="secondary" className="text-xs">
                                {question.difficulty}
                              </Badge>
                              {question.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="other" className="mt-0">
                  <div className="space-y-1">
                    {/* Strategies */}
                    {results.strategies.map((strategy) => (
                      <div
                        key={strategy.id}
                        onClick={() => handleResultClick('strategy', strategy.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <Filter className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900">
                              {strategy.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {strategy.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Building2 className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {strategy.company.name}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {strategy.type.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* FAQs */}
                    {results.faqs.map((faq) => (
                      <div
                        key={faq.id}
                        onClick={() => handleResultClick('faq', faq.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <HelpCircle className="h-4 w-4 text-indigo-500 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900">
                              {faq.question}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {faq.answer.substring(0, 100)}...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Building2 className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {faq.company.name}
                              </span>
                              {faq.category && (
                                <Badge variant="outline" className="text-xs">
                                  {faq.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
