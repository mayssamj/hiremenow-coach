
'use client';

import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  Building2,
  Shield,
  User,
  LogIn
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleQuickLogin = async (type: 'demo' | 'admin') => {
    setIsLoading(true);
    
    const credentials = {
      demo: { username: 'demo', password: 'demodemo' },
      admin: { username: 'admin', password: 'adminadmin' }
    };

    try {
      const result = await signIn('credentials', {
        username: credentials[type].username,
        password: credentials[type].password,
        redirect: false,
      });

      if (result && !result.error) {
        router.push('/dashboard');
      } else {
        console.error(`Sign in failed for ${type}:`, result?.error);
      }
    } catch (error) {
      console.error(`Error signing in as ${type}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    setStatusMessage('Preparing data export...');
    
    try {
      const response = await fetch('/api/admin/database/export', {
        method: 'GET',
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `hiremenow-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setStatusMessage('✅ Data exported successfully! Check your downloads folder.');
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      setStatusMessage('❌ Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
      setStatusMessage('');
    } else {
      setStatusMessage('❌ Please select a valid JSON file.');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleImportData = async () => {
    if (!selectedFile) {
      setStatusMessage('❌ Please select a file first.');
      return;
    }

    setIsImporting(true);
    setStatusMessage('Reading and importing data...');

    try {
      const fileContent = await selectedFile.text();
      const data = JSON.parse(fileContent);

      const response = await fetch('/api/admin/database/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage(`✅ Import completed successfully! Stats: ${JSON.stringify(result.stats)}`);
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('import-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error(result.error || 'Import failed');
      }
    } catch (error) {
      console.error('Import error:', error);
      setStatusMessage(`❌ Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsImporting(false);
      setTimeout(() => setStatusMessage(''), 8000);
    }
  };

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setStatusMessage('Seeding database with default users and companies...');

    try {
      const response = await fetch('/api/admin/seed-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage('✅ Database seeded successfully! Default users (admin/adminadmin, demo/demodemo) and companies have been created.');
      } else {
        throw new Error(result.error || 'Seeding failed');
      }
    } catch (error) {
      console.error('Seeding error:', error);
      setStatusMessage(`❌ Database seeding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSeeding(false);
      setTimeout(() => setStatusMessage(''), 8000);
    }
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-spacing">
        <div className="container-enhanced">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="content-spacing"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 animate-fade-in-scale">
                Master Your Interview Preparation
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="hero-gradient-text">
                  Land Your Dream Job with Confidence
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional interview preparation platform with STAR++ stories, comprehensive question banks, 
                and insights from 16+ top companies. Practice, track progress, and ace your interviews.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signin">
                  <Button size="lg" className="btn-primary-enhanced w-full sm:w-auto">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In to Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">Quick Access - Try Demo Accounts</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickLogin('demo')}
                      disabled={isLoading}
                      className="btn-secondary-enhanced justify-start"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Demo User
                      <Badge variant="secondary" className="ml-2 text-xs">
                        demo/demodemo
                      </Badge>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickLogin('admin')}
                      disabled={isLoading}
                      className="btn-secondary-enhanced justify-start"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Demo
                      <Badge variant="secondary" className="ml-2 text-xs">
                        admin/adminadmin
                      </Badge>
                    </Button>
                  </div>
                  {isLoading && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Signing in...
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-accent/5">
        <div className="container-enhanced">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                className="animate-slide-in-up"
              >
                <Card className="h-full glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
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

      {/* Data Management Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Data Management
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Export your data for backup or import existing interview preparation data
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Export Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Export Data</h3>
                  <p className="text-gray-600 text-sm">
                    Download all platform data including companies, questions, and user stories as a JSON file
                  </p>
                  <Button 
                    onClick={handleExportData}
                    disabled={isExporting}
                    className="w-full"
                    variant="outline"
                  >
                    {isExporting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Database
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Import Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Import Data</h3>
                  <p className="text-gray-600 text-sm">
                    Upload a JSON data file to restore or merge interview preparation data
                  </p>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="import-file"
                    />
                    <label
                      htmlFor="import-file"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      {selectedFile ? selectedFile.name : 'Choose JSON File'}
                    </label>
                    {selectedFile && (
                      <Button 
                        onClick={handleImportData}
                        disabled={isImporting}
                        className="w-full"
                      >
                        {isImporting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                            Importing...
                          </>
                        ) : (
                          'Import Data'
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Seed Database Section */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Seed Database</h3>
                  <p className="text-gray-600 text-sm">
                    Initialize the database with default users, companies, and interview questions for immediate use
                  </p>
                  <Button 
                    onClick={handleSeedDatabase}
                    disabled={isSeeding}
                    className="w-full"
                    variant="outline"
                  >
                    {isSeeding ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Seeding...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                        Seed Database
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Status Messages */}
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg text-sm ${
                  statusMessage.includes('success') || statusMessage.includes('completed')
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : statusMessage.includes('error') || statusMessage.includes('failed')
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}
              >
                {statusMessage}
              </motion.div>
            )}
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
              <Link href="/auth/signin">
                <Button size="lg" className="w-full sm:w-auto">
                  <LogIn className="mr-2 h-4 w-4" />
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                Full access with demo accounts • No registration required
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
