'use client';

import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Target, BookOpen, Users, Zap, CheckCircle, Star, Building2, Heart, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnimatedSection } from '@/components/animated-section'
import { EnhancedCompanySelector } from '@/components/enhanced-company-selector'
import { CompanyPreview } from '@/components/company-preview'

interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  values: string[];
  principles: string[];
  _count: {
    companyQuestions: number;
    categories: number;
  };
}

function HomePageContent() {
  const searchParams = useSearchParams()
  const currentCompany = searchParams.get('company') || 'meta'
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companies.length > 0) {
      const company = companies.find(c => c.slug === currentCompany) || companies[0];
      setSelectedCompany(company);
    }
  }, [currentCompany, companies]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNavHref = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentCompany) {
      params.set('company', currentCompany)
    }
    return `${href}?${params.toString()}`
  }

  const getCompanySpecificContent = () => {
    if (!selectedCompany) return null;

    switch (selectedCompany.slug) {
      case 'meta':
        return {
          focus: 'Meta focuses on building the future of social connection and the metaverse, emphasizing rapid innovation and global impact.',
          keyTraits: ['Move Fast', 'Be Bold', 'Focus on Impact'],
          interviewTips: [
            'Prepare examples showing how you\'ve moved fast while maintaining quality',
            'Demonstrate bold decision-making and calculated risk-taking',
            'Show measurable impact from your leadership and technical decisions'
          ]
        };
      case 'google':
        return {
          focus: 'Google values "Googleyness" - comfort with ambiguity, humility, bias for action, and emergent leadership.',
          keyTraits: ['Googleyness', 'Technical Excellence', 'Emergent Leadership'],
          interviewTips: [
            'Show comfort navigating ambiguous situations',
            'Demonstrate humility and openness to feedback',
            'Provide examples of leading without formal authority'
          ]
        };
      case 'amazon':
        return {
          focus: 'Amazon emphasizes customer obsession and ownership, with a strong focus on delivering results and thinking big.',
          keyTraits: ['Customer Obsession', 'Ownership', 'Deliver Results'],
          interviewTips: [
            'Prepare stories that demonstrate customer-first thinking',
            'Show examples of taking ownership beyond your direct responsibilities',
            'Demonstrate bias for action and delivering measurable results'
          ]
        };
      case 'openai':
        return {
          focus: 'OpenAI prioritizes AI safety and ensuring AGI benefits all humanity, with an "intense and scrappy" culture.',
          keyTraits: ['AI Safety First', 'Mission Alignment', 'Ethical Development'],
          interviewTips: [
            'Show deep understanding of AI safety challenges',
            'Demonstrate alignment with OpenAI\'s mission',
            'Provide examples of ethical decision-making in technology'
          ]
        };
      case 'netflix':
        return {
          focus: 'Netflix emphasizes "Freedom and Responsibility" with high performance expectations and radical candor.',
          keyTraits: ['Freedom & Responsibility', 'High Performance', 'Radical Candor'],
          interviewTips: [
            'Show ability to operate with high autonomy',
            'Demonstrate experience with direct, honest feedback',
            'Provide examples of high-impact decision-making'
          ]
        };
      case 'linkedin':
        return {
          focus: 'LinkedIn focuses on creating economic opportunity for every member of the global workforce through professional networking.',
          keyTraits: ['Members First', 'Relationships Matter', 'Be Open & Constructive'],
          interviewTips: [
            'Show examples of putting user/member needs first',
            'Demonstrate ability to build and maintain professional relationships',
            'Provide examples of constructive feedback and collaboration'
          ]
        };
      case 'uber':
        return {
          focus: 'Uber reimagines the way the world moves for the better, emphasizing bold innovation and global scale.',
          keyTraits: ['We Build Globally', 'We Are Customer Obsessed', 'We Celebrate Differences'],
          interviewTips: [
            'Show experience with global or large-scale challenges',
            'Demonstrate customer-centric decision making',
            'Provide examples of working effectively with diverse teams'
          ]
        };
      case 'airbnb':
        return {
          focus: 'Airbnb creates a world where anyone can belong anywhere, focusing on community and human connection.',
          keyTraits: ['Belong Anywhere', 'Be a Host', 'Champion the Mission'],
          interviewTips: [
            'Show examples of creating inclusive environments',
            'Demonstrate hospitality and service mindset',
            'Provide examples of mission-driven decision making'
          ]
        };
      case 'startups':
        return {
          focus: 'Startups require adaptability, resourcefulness, and the ability to wear multiple hats in fast-paced environments.',
          keyTraits: ['Adaptability', 'Resourcefulness', 'Ownership'],
          interviewTips: [
            'Show examples of achieving more with less',
            'Demonstrate adaptability during rapid changes',
            'Provide examples of taking ownership beyond your role'
          ]
        };
      case 'tiktok':
        return {
          focus: 'TikTok focuses on inspiring creativity and bringing joy through short-form video content at global scale.',
          keyTraits: ['Be Creative', 'Be Courageous', 'Be Real'],
          interviewTips: [
            'Show examples of creative problem-solving',
            'Demonstrate courage in making difficult decisions',
            'Provide examples of authentic leadership and communication'
          ]
        };
      case 'reddit':
        return {
          focus: 'Reddit empowers communities and authentic conversations, focusing on user-generated content and community building.',
          keyTraits: ['Remember the Human', 'Evolve', 'Make It Right'],
          interviewTips: [
            'Show empathy and human-centered decision making',
            'Demonstrate adaptability and continuous learning',
            'Provide examples of ethical decision-making and doing the right thing'
          ]
        };
      case 'snowflake':
        return {
          focus: 'Snowflake enables organizations to mobilize data with a cloud-built data platform.',
          keyTraits: ['Put Customers First', 'Integrity', 'One Team'],
          interviewTips: [
            'Show customer-centric thinking and decision making',
            'Demonstrate ethical leadership and transparency',
            'Provide examples of collaborative team leadership'
          ]
        };
      case 'anthropic':
        return {
          focus: 'Anthropic focuses on AI safety research and developing safe, beneficial AI systems.',
          keyTraits: ['Safety First', 'Scientific Rigor', 'Collaborative Research'],
          interviewTips: [
            'Show understanding of AI safety and responsible development',
            'Demonstrate scientific thinking and evidence-based decisions',
            'Provide examples of collaborative research and development'
          ]
        };
      case 'scale-ai':
        return {
          focus: 'Scale AI accelerates the development of AI applications by providing high-quality training data.',
          keyTraits: ['Move Fast', 'Think Big', 'Customer Success'],
          interviewTips: [
            'Show ability to move quickly while maintaining quality',
            'Demonstrate ambitious thinking and scaling mindset',
            'Provide examples of customer-focused solutions'
          ]
        };
      default:
        return {
          focus: selectedCompany.description,
          keyTraits: selectedCompany.values.slice(0, 3),
          interviewTips: [
            'Research the company\'s specific values and culture',
            'Prepare examples that align with their core principles',
            'Show understanding of their business and technical challenges'
          ]
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const companyContent = getCompanySpecificContent();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <AnimatedSection className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Building2 className="w-4 h-4 mr-2" />
            {selectedCompany ? `${selectedCompany.name} EM Specialization` : 'Multi-Company EM Specialization'}
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {selectedCompany ? `${selectedCompany.name} Engineering Manager` : 'Engineering Manager'} Interview Mastery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {selectedCompany 
              ? `Specialized preparation for ${selectedCompany.name} EM interviews. Master ${selectedCompany.name}-specific questions, leadership scenarios, and company culture.`
              : `Comprehensive preparation platform with specialized tracks for ${companies.length} companies. Master company-specific questions and leadership scenarios.`
            }
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button asChild size="lg" className="px-8 py-3 text-lg">
            <Link href={getNavHref('/comprehensive')}>
              <BookOpen className="w-5 h-5 mr-2" />
              Start {selectedCompany?.name || 'Comprehensive'} Prep
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg">
            <Link href={getNavHref('/critical')}>
              <Target className="w-5 h-5 mr-2" />
              Critical Questions Only
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      {/* Company Selector Section */}
      <AnimatedSection>
        <EnhancedCompanySelector 
          currentCompany={currentCompany} 
          showDescription={true}
        />
      </AnimatedSection>

      {/* Company Preview Section */}
      {selectedCompany && (
        <AnimatedSection>
          <CompanyPreview company={selectedCompany} />
        </AnimatedSection>
      )}

      {/* Company Overview Section - Moved up as requested */}
      {selectedCompany && companyContent && (
        <AnimatedSection>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center space-x-3">
                {selectedCompany.logoUrl && (
                  <img 
                    src={selectedCompany.logoUrl} 
                    alt={selectedCompany.name}
                    className="w-10 h-10 rounded"
                  />
                )}
                <div>
                  <CardTitle className="text-xl">{selectedCompany.name} EM Specialization</CardTitle>
                  <CardDescription>{selectedCompany.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">{companyContent.focus}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Core Values */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>Core Values</span>
                    </CardTitle>
                    <CardDescription>
                      Key values that define {selectedCompany.name}'s culture
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCompany.values.map((value, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <Badge variant="secondary" className="text-sm">
                            {value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Leadership Principles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-500" />
                      <span>Leadership Principles</span>
                    </CardTitle>
                    <CardDescription>
                      Leadership expectations and evaluation criteria
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCompany.principles.map((principle, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <Badge variant="outline" className="text-sm">
                            {principle}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Interview Preparation Tips */}
      {selectedCompany && companyContent && (
        <AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span>{selectedCompany.name} Interview Preparation Tips</span>
              </CardTitle>
              <CardDescription>
                Specific guidance for {selectedCompany.name} EM interviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-3">Key Focus Areas</h4>
                  <div className="space-y-2">
                    {companyContent.keyTraits.map((trait, index) => (
                      <Badge key={index} variant="default" className="mr-2 mb-2">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-900 mb-3">Preparation Strategy</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {companyContent.interviewTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Features Grid */}
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines research-backed content with interactive tools to maximize your {selectedCompany?.name || 'interview'} success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Company-Specific Questions</CardTitle>
              <CardDescription>
                {selectedCompany 
                  ? `Specialized question bank for ${selectedCompany.name} with ${selectedCompany._count.companyQuestions} curated questions`
                  : `Specialized question banks for all ${companies.length} companies with thousands of curated questions`
                }
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>STAR Method Stories</CardTitle>
              <CardDescription>
                Create, organize, and link your personal stories to multiple questions with our intelligent tagging system
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Track your preparation status for each question and identify areas that need more work
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Critical Questions Focus</CardTitle>
              <CardDescription>
                Streamlined view of the most important questions for last-minute preparation and quick review
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Rich Text Editor</CardTitle>
              <CardDescription>
                Write detailed notes and stories with formatting, bullet points, and structured STAR responses
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle>{selectedCompany?.name || 'Company'} Values & Culture</CardTitle>
              <CardDescription>
                {selectedCompany 
                  ? `Deep dive into ${selectedCompany.name}'s ${selectedCompany.values.length} core values and ${selectedCompany.principles.length} leadership principles`
                  : 'Deep dive into each company\'s values, leadership principles, and evaluation criteria'
                }
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </AnimatedSection>

      {/* Quick Start Section */}
      <AnimatedSection>
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Begin Your {selectedCompany?.name || 'Interview'} Preparation?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <div className="space-y-4">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="text-xl font-semibold">Comprehensive Preparation</h3>
                <p className="text-muted-foreground">
                  {selectedCompany 
                    ? `Deep dive into all ${selectedCompany.name} questions, company values, and detailed preparation strategies.`
                    : 'Deep dive into company-specific questions, values, and detailed preparation strategies.'
                  }
                </p>
                <Button asChild className="w-full">
                  <Link href={getNavHref('/comprehensive')}>
                    Start {selectedCompany?.name || 'Full'} Prep
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <div className="space-y-4">
                <Target className="w-12 h-12 text-purple-600 mx-auto" />
                <h3 className="text-xl font-semibold">Critical Questions</h3>
                <p className="text-muted-foreground">
                  {selectedCompany 
                    ? `Focus on the most important ${selectedCompany.name} questions for immediate interview preparation.`
                    : 'Focus on the most important questions for immediate interview preparation.'
                  }
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={getNavHref('/critical')}>
                    Critical Prep
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}
