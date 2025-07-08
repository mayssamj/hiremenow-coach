
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Building2, 
  ChevronDown, 
  Grid3X3, 
  List, 
  Star, 
  Users, 
  Target,
  Heart,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface EnhancedCompanySelectorProps {
  currentCompany?: string;
  showDescription?: boolean;
}

type ViewMode = 'grid' | 'dropdown';

// Popular companies that will be shown as prominent cards in grid mode
const POPULAR_COMPANIES = ['meta', 'google', 'amazon', 'apple', 'microsoft', 'netflix'];

export function EnhancedCompanySelector({ 
  currentCompany, 
  showDescription = false 
}: EnhancedCompanySelectorProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('dropdown');
  const [hoveredCompany, setHoveredCompany] = useState<Company | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchCompanies();
    // Load saved preference from localStorage
    const savedMode = localStorage.getItem('companyViewMode') as ViewMode;
    if (savedMode) {
      setViewMode(savedMode);
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

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
    
    params.set('company', companySlug);
    router.push(`${currentPath}?${params.toString()}`);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('companyViewMode', mode);
  };

  const handleMouseEnter = (company: Company) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    // Set hover with a small delay to prevent flickering
    const timeout = setTimeout(() => {
      setHoveredCompany(company);
    }, 200);
    
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    // Clear hover with a delay to allow moving to the preview card
    const timeout = setTimeout(() => {
      setHoveredCompany(null);
    }, 300);
    
    setHoverTimeout(timeout);
  };

  const handlePreviewMouseEnter = () => {
    // Clear timeout when mouse enters preview card
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handlePreviewMouseLeave = () => {
    // Hide preview when mouse leaves preview card
    setHoveredCompany(null);
  };

  const selectedCompany = companies.find(c => c.slug === currentCompany) || companies[0];
  const popularCompanies = companies.filter(c => POPULAR_COMPANIES.includes(c.slug));
  const otherCompanies = companies.filter(c => !POPULAR_COMPANIES.includes(c.slug));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading companies...</p>
        </div>
      </div>
    );
  }

  const PreviewCard = ({ company }: { company: Company }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={handlePreviewMouseEnter}
      onMouseLeave={handlePreviewMouseLeave}
    >
      <Card className="w-80 shadow-lg border-2 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            {company.logoUrl && (
              <img 
                src={company.logoUrl} 
                alt={company.name}
                className="w-10 h-10 rounded-lg"
              />
            )}
            <div>
              <CardTitle className="text-lg">{company.name}</CardTitle>
              <CardDescription className="text-sm">
                {company._count.CompanyQuestion} questions • {company._count.CompanyStrategy} strategies
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {company.description}
          </p>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">Core Values</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {company.values.slice(0, 3).map((value, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {value}
                  </Badge>
                ))}
                {company.values.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{company.values.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Leadership Focus</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {company.principles.slice(0, 2).map((principle, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {principle}
                  </Badge>
                ))}
                {company.principles.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{company.principles.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const DropdownView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Choose Your Company Track</h2>
        <Badge variant="outline" className="text-sm">
          {companies.length} Companies Available
        </Badge>
      </div>
      
      <div className="relative">
        <Select 
          value={currentCompany || companies[0]?.slug} 
          onValueChange={handleCompanyChange}
        >
          <SelectTrigger className="w-full h-14 text-left">
            <div className="flex items-center space-x-3">
              <Building2 className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                {selectedCompany ? (
                  <div className="flex items-center space-x-3">
                    {selectedCompany.logoUrl && (
                      <img 
                        src={selectedCompany.logoUrl} 
                        alt={selectedCompany.name}
                        className="w-6 h-6 rounded"
                      />
                    )}
                    <div>
                      <div className="font-medium">{selectedCompany.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedCompany._count.CompanyQuestion} questions available
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Select Your Company Track</span>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </SelectTrigger>
          <SelectContent className="w-full">
            {companies.map((company) => (
              <SelectItem 
                key={company.id} 
                value={company.slug}
                onMouseEnter={() => handleMouseEnter(company)}
                onMouseLeave={handleMouseLeave}
                className="p-3 cursor-pointer"
              >
                <div className="flex items-center space-x-3 w-full">
                  {company.logoUrl && (
                    <img 
                      src={company.logoUrl} 
                      alt={company.name}
                      className="w-6 h-6 rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{company.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {company._count.CompanyQuestion} questions • {company._count.CompanyStrategy} strategies
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Live Preview Card */}
        <AnimatePresence>
          {hoveredCompany && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <PreviewCard company={hoveredCompany} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const GridView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Choose Your Company Track</h2>
        <Badge variant="outline" className="text-sm">
          {companies.length} Companies Available
        </Badge>
      </div>
      
      {/* Popular Companies Grid */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Popular Companies</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCompanies.map((company) => (
            <motion.div
              key={company.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  currentCompany === company.slug 
                    ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50/50' 
                    : 'hover:border-blue-300 hover:bg-gray-50/50'
                }`}
                onClick={() => {
                  handleCompanyChange(company.slug);
                  // Clear any hover states after selection
                  setHoveredCompany(null);
                  if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    {company.logoUrl && (
                      <img 
                        src={company.logoUrl} 
                        alt={company.name}
                        className="w-8 h-8 rounded"
                      />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-base">{company.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {company._count.CompanyQuestion} questions
                      </CardDescription>
                    </div>
                    {currentCompany === company.slug && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {company.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {company.values.slice(0, 2).map((value, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {value}
                      </Badge>
                    ))}
                    {company.values.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{company.values.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* More Companies Dropdown */}
      {otherCompanies.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">More Companies</h3>
          </div>
          
          <Select 
            value={otherCompanies.find(c => c.slug === currentCompany)?.slug || ""}
            onValueChange={handleCompanyChange}
          >
            <SelectTrigger className="w-full max-w-md h-12">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Select additional company..." />
              </div>
            </SelectTrigger>
            <SelectContent>
              {otherCompanies.map((company) => (
                <SelectItem key={company.id} value={company.slug} className="p-3">
                  <div className="flex items-center space-x-3">
                    {company.logoUrl && (
                      <img 
                        src={company.logoUrl} 
                        alt={company.name}
                        className="w-5 h-5 rounded"
                      />
                    )}
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {company._count.CompanyQuestion} questions
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Toggle Control */}
      <div className="flex items-center justify-center">
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewModeChange('grid')}
            className="flex items-center space-x-2 px-4"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Grid</span>
          </Button>
          <Button
            variant={viewMode === 'dropdown' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewModeChange('dropdown')}
            className="flex items-center space-x-2 px-4"
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </Button>
        </div>
      </div>

      {/* Content based on view mode */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'grid' ? <GridView /> : <DropdownView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
