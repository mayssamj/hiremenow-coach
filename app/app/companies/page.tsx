
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Search, 
  ArrowRight, 
  Target, 
  MessageSquare, 
  Lightbulb, 
  Zap,
  HelpCircle,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedSearch from '@/components/enhanced-search';

interface Company {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  values: string[];
  principles: string[];
  _count: {
    companyQuestions: number;
    systemDesignQuestions: number;
    strategies: number;
    faqs: number;
  };
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else if (response.status === 401) {
        // User not authenticated, redirect to login
        window.location.href = '/login';
        return;
      } else {
        console.error('Failed to fetch companies:', response.status);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Company Interview Preparation
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive interview preparation resources tailored for each company's unique culture, 
                values, and interview process. Master behavioral questions, system design, and company-specific strategies.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-2xl mx-auto">
            <EnhancedSearch placeholder="Search across all companies..." />
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Available Companies</h2>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Filter companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/companies/${company.slug}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      {company.logoUrl && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src={company.logoUrl} 
                            alt={`${company.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {company.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {company.values.length} values, {company.principles.length} principles
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    {company.description && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {company.description}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {company._count.companyQuestions}
                          </div>
                          <div className="text-xs text-gray-500">Questions</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-purple-500" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {company._count.systemDesignQuestions}
                          </div>
                          <div className="text-xs text-gray-500">System Design</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-500" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {company._count.strategies}
                          </div>
                          <div className="text-xs text-gray-500">Strategies</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-green-500" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {company._count.faqs}
                          </div>
                          <div className="text-xs text-gray-500">FAQs</div>
                        </div>
                      </div>
                    </div>

                    {/* Core Values Preview */}
                    {company.values.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Core Values
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {company.values.slice(0, 3).map((value) => (
                            <Badge key={value} variant="secondary" className="text-xs">
                              {value}
                            </Badge>
                          ))}
                          {company.values.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{company.values.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your search terms.</p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Find for Each Company
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive preparation materials tailored to each company's unique interview process and culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Company Values & Culture</h3>
              <p className="text-gray-600">
                Deep dive into each company's core values, leadership principles, and cultural expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Behavioral Questions</h3>
              <p className="text-gray-600">
                Company-specific behavioral questions with detailed preparation guidance and example answers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">System Design</h3>
              <p className="text-gray-600">
                Real system design questions from each company with detailed solutions and trade-off analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interview Strategies</h3>
              <p className="text-gray-600">
                Proven strategies and frameworks for succeeding in each company's unique interview process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Stories</h3>
              <p className="text-gray-600">
                Organize and tailor your personal stories to align with each company's values and expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">FAQs & Tips</h3>
              <p className="text-gray-600">
                Frequently asked questions and insider tips for navigating each company's interview process.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
