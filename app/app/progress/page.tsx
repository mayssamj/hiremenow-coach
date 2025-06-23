
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award,
  Building2,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function ProgressPage() {
  // Mock progress data - in a real app this would come from the database
  const progressData = {
    overallProgress: 68,
    companiesStudied: 12,
    questionsAnswered: 145,
    storiesWritten: 8,
    totalQuestions: 250,
    recentActivity: [
      { type: 'question', company: 'Google', count: 5, date: '2 hours ago' },
      { type: 'story', company: 'Amazon', count: 1, date: '1 day ago' },
      { type: 'question', company: 'Microsoft', count: 3, date: '2 days ago' },
    ],
    companyProgress: [
      { name: 'Google', answered: 15, total: 20, percentage: 75 },
      { name: 'Amazon', answered: 12, total: 18, percentage: 67 },
      { name: 'Microsoft', answered: 8, total: 15, percentage: 53 },
      { name: 'Apple', answered: 5, total: 12, percentage: 42 },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Progress Dashboard</h1>
            <p className="text-muted-foreground">
              Track your interview preparation journey and achievements
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.overallProgress}%</div>
                <Progress value={progressData.overallProgress} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Companies Studied</CardTitle>
                <Building2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.companiesStudied}</div>
                <p className="text-xs text-muted-foreground">
                  Out of 16+ available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
                <CheckCircle className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.questionsAnswered}</div>
                <p className="text-xs text-muted-foreground">
                  {progressData.totalQuestions - progressData.questionsAnswered} remaining
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">STAR Stories</CardTitle>
                <Award className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.storiesWritten}</div>
                <p className="text-xs text-muted-foreground">
                  Stories crafted
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Company Progress
                </CardTitle>
                <CardDescription>
                  Your preparation progress for each company
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {progressData.companyProgress.map((company, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{company.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {company.answered}/{company.total} questions
                      </span>
                    </div>
                    <Progress value={company.percentage} className="h-2" />
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{Math.round(company.percentage)}% complete</span>
                      <Badge variant="outline" className="text-xs">
                        {company.total - company.answered} remaining
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest preparation activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {progressData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {activity.type === 'question' ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Award className="h-6 w-6 text-orange-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {activity.type === 'question' ? 'Answered' : 'Created'} {activity.count} {activity.type}{activity.count > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.company} • {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Continue Your Journey
              </CardTitle>
              <CardDescription>
                Take the next step in your interview preparation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/questions">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-semibold">Practice Questions</div>
                      <div className="text-sm text-muted-foreground">
                        Continue answering interview questions
                      </div>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/stories">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-semibold">Write STAR Stories</div>
                      <div className="text-sm text-muted-foreground">
                        Create compelling behavioral examples
                      </div>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/companies">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-semibold">Explore Companies</div>
                      <div className="text-sm text-muted-foreground">
                        Research new companies and roles
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
