
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, ChevronDown } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  values: string[];
  principles: string[];
  _count: {
    CompanyQuestion: number;
    SystemDesignQuestion: number;
    CompanyStrategy: number;
    CompanyFAQ: number;
  };
}

interface CompanySelectorProps {
  currentCompany?: string;
  showDescription?: boolean;
  variant?: 'default' | 'compact';
}

export function CompanySelector({ 
  currentCompany, 
  showDescription = false,
  variant = 'default' 
}: CompanySelectorProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchCompanies();
  }, []);

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

  const handleCompanyChange = (companySlug: string) => {
    const currentPath = window.location.pathname;
    const params = new URLSearchParams(searchParams.toString());
    
    // Update company parameter
    params.set('company', companySlug);
    
    // Navigate to the same page with new company parameter
    router.push(`${currentPath}?${params.toString()}`);
  };

  const selectedCompany = companies.find(c => c.slug === currentCompany) || companies[0];

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Select value={currentCompany || companies[0]?.slug} onValueChange={handleCompanyChange}>
        <SelectTrigger className="w-[200px]">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <SelectValue placeholder="Select company" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.slug}>
              <div className="flex items-center space-x-2">
                {company.logoUrl && (
                  <img 
                    src={company.logoUrl} 
                    alt={company.name}
                    className="w-4 h-4 rounded"
                  />
                )}
                <span>{company.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Choose Your Company Track</h2>
        <Badge variant="outline" className="text-xs">
          {companies.length} Companies Available
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {companies.map((company) => (
          <Button
            key={company.id}
            variant={currentCompany === company.slug ? "default" : "outline"}
            className={`h-auto p-4 flex flex-col items-start space-y-2 ${
              currentCompany === company.slug 
                ? 'ring-2 ring-blue-500 ring-offset-2' 
                : 'hover:border-blue-300'
            }`}
            onClick={() => handleCompanyChange(company.slug)}
          >
            <div className="flex items-center space-x-2 w-full">
              {company.logoUrl && (
                <img 
                  src={company.logoUrl} 
                  alt={company.name}
                  className="w-6 h-6 rounded"
                />
              )}
              <span className="font-medium text-sm">{company.name}</span>
            </div>
            
            {showDescription && (
              <p className="text-xs text-gray-600 text-left line-clamp-2">
                {company.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-1 w-full">
              {company.values.slice(0, 2).map((value, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs px-1 py-0"
                >
                  {value}
                </Badge>
              ))}
              {company.values.length > 2 && (
                <Badge variant="outline" className="text-xs px-1 py-0">
                  +{company.values.length - 2}
                </Badge>
              )}
            </div>
          </Button>
        ))}
      </div>

      {selectedCompany && showDescription && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            {selectedCompany.logoUrl && (
              <img 
                src={selectedCompany.logoUrl} 
                alt={selectedCompany.name}
                className="w-8 h-8 rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{selectedCompany.name}</h3>
          </div>
          
          <p className="text-gray-700 mb-4">{selectedCompany.description}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-2">Core Values</h4>
              <div className="flex flex-wrap gap-1">
                {selectedCompany.values.map((value, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-2">Leadership Principles</h4>
              <div className="flex flex-wrap gap-1">
                {selectedCompany.principles.slice(0, 3).map((principle, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {principle}
                  </Badge>
                ))}
                {selectedCompany.principles.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{selectedCompany.principles.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
