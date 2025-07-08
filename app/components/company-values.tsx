
'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Heart, Target, Users, Lightbulb } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  values: string[];
  principles: string[];
}

interface CompanyValuesProps {
  companySlug: string;
}

export function CompanyValues({ companySlug }: CompanyValuesProps) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [companySlug]);

  const fetchCompany = async () => {
    try {
      const response = await fetch(`/api/companies?slug=${companySlug}`);
      if (response.ok) {
        const data = await response.json();
        setCompany(data[0] || null);
      }
    } catch (error) {
      console.error('Failed to fetch company:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Company information not found.</p>
        </CardContent>
      </Card>
    );
  }

  const getCompanySpecificContent = () => {
    switch (company.slug) {
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
      default:
        return {
          focus: company.description,
          keyTraits: company.values.slice(0, 3),
          interviewTips: [
            'Research the company\'s specific values and culture',
            'Prepare examples that align with their core principles',
            'Show understanding of their business and technical challenges'
          ]
        };
    }
  };

  const content = getCompanySpecificContent();

  return (
    <div className="space-y-6">
      {/* Company Overview */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center space-x-3">
            {company.logoUrl && (
              <img 
                src={company.logoUrl} 
                alt={company.name}
                className="w-10 h-10 rounded"
              />
            )}
            <div>
              <CardTitle className="text-xl">{company.name} EM Specialization</CardTitle>
              <CardDescription>{company.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{content.focus}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Core Values */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Core Values</span>
            </CardTitle>
            <CardDescription>
              Key values that define {company.name}'s culture and decision-making
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {company.values.map((value, index) => (
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
              {company.principles.map((principle, index) => (
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

      {/* Interview Preparation Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>Interview Preparation Tips</span>
          </CardTitle>
          <CardDescription>
            Specific guidance for {company.name} EM interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-3">Key Focus Areas</h4>
              <div className="space-y-2">
                {content.keyTraits.map((trait, index) => (
                  <Badge key={index} variant="default" className="mr-2 mb-2">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-3">Preparation Strategy</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {content.interviewTips.map((tip, index) => (
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
    </div>
  );
}
