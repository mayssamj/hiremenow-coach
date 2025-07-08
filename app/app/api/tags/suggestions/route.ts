
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Content analysis keywords for intelligent tag suggestions
const CONTENT_KEYWORDS = {
  'Leadership': ['lead', 'manage', 'team', 'direct', 'mentor', 'coach', 'delegate', 'motivate', 'inspire', 'guide'],
  'Technical Strategy': ['architecture', 'design', 'system', 'technical', 'engineering', 'scalability', 'performance', 'infrastructure'],
  'Problem Solving': ['problem', 'solve', 'challenge', 'issue', 'debug', 'troubleshoot', 'analyze', 'investigate', 'resolve'],
  'Communication': ['present', 'communicate', 'explain', 'discuss', 'meeting', 'stakeholder', 'collaborate', 'negotiate'],
  'Innovation': ['innovate', 'creative', 'new', 'improve', 'optimize', 'enhance', 'experiment', 'prototype'],
  'Project Management': ['project', 'timeline', 'deadline', 'milestone', 'coordinate', 'plan', 'organize', 'deliver'],
  'Conflict Resolution': ['conflict', 'disagree', 'resolve', 'mediate', 'compromise', 'negotiate', 'tension'],
  'Data Driven': ['data', 'metrics', 'analytics', 'measure', 'kpi', 'analysis', 'insights', 'evidence'],
  'Customer Focus': ['customer', 'user', 'client', 'feedback', 'satisfaction', 'experience', 'needs'],
  'Growth & Scale': ['scale', 'growth', 'expand', 'hire', 'build', 'grow', 'increase', 'develop'],
  'Crisis Management': ['crisis', 'urgent', 'emergency', 'pressure', 'critical', 'incident', 'outage'],
  'Cross-functional': ['cross-functional', 'collaborate', 'partner', 'coordinate', 'align', 'stakeholder']
}

// Company-specific tag priorities
const COMPANY_TAG_PRIORITIES = {
  'meta': [
    'Move Fast', 'Be Bold', 'Focus on Impact', 'Be Open', 'Build Social Value',
    'Leadership', 'Technical Strategy', 'Innovation', 'Data Driven', 'Growth & Scale'
  ],
  'google': [
    'Focus on the user', 'Think 10x', 'Launch and iterate', 'Collaboration', 'Technical Excellence',
    'Leadership', 'Innovation', 'Problem Solving', 'Data Driven', 'Customer Focus'
  ],
  'amazon': [
    'Customer Obsession', 'Ownership', 'Invent and Simplify', 'Learn and Be Curious', 'Hire and Develop',
    'Leadership', 'Customer Focus', 'Innovation', 'Problem Solving', 'Growth & Scale'
  ],
  'microsoft': [
    'Respect', 'Integrity', 'Accountability', 'Inclusive', 'Growth Mindset',
    'Leadership', 'Technical Strategy', 'Collaboration', 'Innovation', 'Customer Focus'
  ],
  'apple': [
    'Innovation', 'Quality', 'Simplicity', 'Collaboration', 'Integrity',
    'Technical Strategy', 'Innovation', 'Problem Solving', 'Customer Focus', 'Leadership'
  ]
}

function analyzeContent(content: string): string[] {
  const suggestions: string[] = []
  const lowerContent = content.toLowerCase()
  
  // Analyze content for keyword matches
  Object.entries(CONTENT_KEYWORDS).forEach(([tag, keywords]) => {
    const matchCount = keywords.filter(keyword => 
      lowerContent.includes(keyword.toLowerCase())
    ).length
    
    // If multiple keywords match or high-value keywords match, suggest the tag
    if (matchCount >= 2 || keywords.some(keyword => 
      lowerContent.includes(keyword.toLowerCase()) && keyword.length > 6
    )) {
      suggestions.push(tag)
    }
  })
  
  return suggestions
}

function getCompanySpecificTags(company?: string): string[] {
  if (!company) return []
  
  const companyKey = company.toLowerCase()
  return COMPANY_TAG_PRIORITIES[companyKey as keyof typeof COMPANY_TAG_PRIORITIES] || []
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { content, company, existingTags = [] } = body
    
    // Get content-based suggestions
    const contentSuggestions = content ? analyzeContent(content) : []
    
    // Get company-specific suggestions
    const companySuggestions = getCompanySpecificTags(company)
    
    // Get existing tags from database
    const dbTags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { Story: true }
        }
      }
    })
    
    // Get company categories for additional suggestions
    let categorySuggestions: string[] = []
    if (company) {
      const companyData = await prisma.company.findFirst({
        where: { 
          OR: [
            { slug: company.toLowerCase() },
            { name: { contains: company, mode: 'insensitive' } }
          ]
        },
        include: {
          categories: true
        }
      })
      
      if (companyData) {
        categorySuggestions = companyData.categories.map(cat => cat.name)
      }
    }
    
    // Combine all suggestions and remove duplicates
    const allSuggestions = [
      ...contentSuggestions,
      ...companySuggestions.slice(0, 5), // Limit company suggestions
      ...categorySuggestions.slice(0, 3), // Limit category suggestions
    ]
    
    const uniqueSuggestions = Array.from(new Set(allSuggestions))
      .filter(tag => !existingTags.includes(tag))
      .slice(0, 8) // Limit total suggestions
    
    // Get popular tags (frequently used)
    const popularTags = dbTags
      .filter(tag => tag._count.Story > 0)
      .sort((a, b) => b._count.Story - a._count.Story)
      .slice(0, 5)
      .map(tag => tag.name)
      .filter(tag => !existingTags.includes(tag))
    
    return NextResponse.json({
      suggestions: uniqueSuggestions,
      popularTags: popularTags,
      existingTags: dbTags.map(tag => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
        count: tag._count.Story
      }))
    })
  } catch (error) {
    console.error('Error getting tag suggestions:', error)
    return NextResponse.json({ error: 'Failed to get tag suggestions' }, { status: 500 })
  }
}
