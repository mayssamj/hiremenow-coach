
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Target, 
  BarChart3, 
  Search, 
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Star,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

export function LandingPage() {
  const handleDemoLogin = async (username: string, password: string) => {
    await signIn('credentials', {
      username,
      password,
      callbackUrl: '/dashboard'
    });
  };

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'STAR++ Stories',
      description: 'Create compelling stories using the proven STAR method with reflections and learnings',
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Company Insights',
      description: 'Deep insights into 16+ top companies with values, interview formats, and success tips',
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Question Bank',
      description: '270+ behavioral, technical, and system design questions from real interviews',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Progress Tracking',
      description: 'Visual progress indicators and completion tracking for each company',
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: 'Global Search',
      description: 'Find content instantly across stories, answers, questions, and companies',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics',
      description: 'Track your preparation progress with detailed analytics and insights',
    },
  ];

  const companies = [
    'Google', 'Amazon', 'Meta', 'Microsoft', 'Apple', 'Netflix',
    'Uber', 'Airbnb', 'LinkedIn', 'OpenAI', 'Anthropic', 'Scale AI'
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Master Your Interview Preparation
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Land Your Dream Job with{' '}
                <span className="text-blue-600">Confidence</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Professional interview preparation platform with STAR++ stories, comprehensive question banks, 
                and insights from 16+ top companies. Practice, track progress, and ace your interviews.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Try with demo accounts</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDemoLogin('demo', 'demodemo')}
                    >
                      Demo User
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDemoLogin('admin', 'adminadmin')}
                    >
                      Admin Demo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights to help you prepare for interviews at top companies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prepare for Top Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get insights, interview formats, and success tips for leading tech companies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="font-medium text-gray-900">{company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white"
          >
            <div className="space-y-2">
              <div className="text-4xl font-bold">270+</div>
              <p className="text-blue-100">Interview Questions</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">16+</div>
              <p className="text-blue-100">Top Companies</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">100%</div>
              <p className="text-blue-100">Success Focused</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully prepared for interviews using our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                No credit card required • Start immediately
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
