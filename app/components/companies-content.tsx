
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Search, 
  ArrowRight, 
  Users, 
  MessageSquare,
  Target,
  Globe,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { CompanyWithQuestions } from '@/lib/types';
import { motion } from 'framer-motion';

export function CompaniesContent() {
  const [companies, setCompanies] = useState<CompanyWithQuestions[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyWithQuestions[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        JSON.parse(company.values || '[]').some((value: string) => 
          value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredCompanies(filtered);
    }
  }, [searchQuery, companies]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data.companies || []);
        setFilteredCompanies(data.companies || []);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
            <p className="text-gray-600 mt-2">
              Explore interview insights, values, and preparation tips for top companies
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{companies.length}</p>
                    <p className="text-sm text-gray-600">Companies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {companies.reduce((sum, company) => sum + (company._count?.questions || 0), 0)}
                    </p>
                    <p className="text-sm text-gray-600">Questions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round(companies.reduce((sum, company) => sum + (company._count?.questions || 0), 0) / companies.length)}
                    </p>
                    <p className="text-sm text-gray-600">Avg Questions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                <Link href={`/companies/${company.slug}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                          {company.name}
                        </CardTitle>
                        {company.industry && (
                          <CardDescription>{company.industry}</CardDescription>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {company._count?.questions || 0} questions
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Core Values Preview */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Core Values</h4>
                      <div className="space-y-1">
                        {JSON.parse(company.values || '[]').slice(0, 3).map((value: string, i: number) => (
                          <p key={i} className="text-sm text-gray-600 line-clamp-1">
                            • {value.split(':')[0]}
                          </p>
                        ))}
                        {company.values.length > 3 && (
                          <p className="text-xs text-blue-600">
                            +{company.values.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Success Tips Preview */}
                    {company.successTips.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Success Tips</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {company.successTips[0]}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {company.evaluationCriteria.length} criteria
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {company.successTips.length} tips
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">
              {searchQuery ? `No companies match "${searchQuery}"` : 'No companies available'}
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                className="mt-4"
              >
                Clear search
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
