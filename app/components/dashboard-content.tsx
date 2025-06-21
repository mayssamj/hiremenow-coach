
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Building2, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Target,
  Users,
  ArrowRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { DashboardStats } from '@/lib/types';
import { motion } from 'framer-motion';

export function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
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
        >
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track your interview preparation progress and continue your journey to success
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stories Created</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalStories || 0}</div>
                <p className="text-xs text-muted-foreground">
                  STAR method stories ready
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalAnswers || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Practice responses completed
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((stats?.completionRate || 0) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Overall progress
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Companies</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.progressByCompany?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Companies to prepare for
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Company Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Company Progress
                <Link href="/companies">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardTitle>
              <CardDescription>
                Track your preparation progress for each company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats?.progressByCompany?.slice(0, 5).map((item, index) => (
                <motion.div
                  key={item.company.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.company.name}</h4>
                      <span className="text-sm text-gray-600">
                        {item.progress.answeredQuestions}/{item.progress.totalQuestions} questions
                      </span>
                    </div>
                    <Progress 
                      value={item.progress.completionPercentage} 
                      className="w-full"
                    />
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{Math.round(item.progress.completionPercentage)}% complete</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.progress.criticalAnswered} critical
                      </Badge>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Link href={`/companies/${item.company.slug}`}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  <Building2 className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                  <p>No company progress tracked yet</p>
                  <Link href="/companies" className="mt-2 inline-block">
                    <Button size="sm">
                      Explore Companies
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats?.recentActivity?.slice(0, 5).map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0">
                      {activity.type === 'story' && <BookOpen className="h-4 w-4 text-blue-500" />}
                      {activity.type === 'answer' && <MessageSquare className="h-4 w-4 text-green-500" />}
                      {activity.type === 'note' && <Target className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                )) || (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="mx-auto h-8 w-8 mb-2 text-gray-300" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/stories/new" className="block">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Story
                  </Button>
                </Link>
                <Link href="/questions" className="block">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Practice Questions
                  </Button>
                </Link>
                <Link href="/companies" className="block">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Building2 className="mr-2 h-4 w-4" />
                    Explore Companies
                  </Button>
                </Link>
                <Link href="/progress" className="block">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Target className="mr-2 h-4 w-4" />
                    View Progress
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
