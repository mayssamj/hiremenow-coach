
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const companySlug = searchParams.get('company')
    const categorySlug = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const type = searchParams.get('type')
    const critical = searchParams.get('critical')
    const search = searchParams.get('search')

    // Build where clause for CompanyQuestion junction table
    let companyQuestionWhere: any = {}
    
    if (companySlug && companySlug !== 'all') {
      companyQuestionWhere.company = { slug: companySlug }
    }

    if (categorySlug && categorySlug !== 'all') {
      companyQuestionWhere.category = { slug: categorySlug }
    }

    if (critical === 'true') {
      companyQuestionWhere.isCritical = true
    }

    // Build where clause for base Question
    let questionWhere: any = {}

    if (difficulty && difficulty !== 'all') {
      questionWhere.difficulty = difficulty
    }

    if (type && type !== 'all') {
      questionWhere.type = type
    }

    if (search) {
      questionWhere.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Query through CompanyQuestion junction table
    const companyQuestions = await prisma.companyQuestion.findMany({
      where: companyQuestionWhere,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: {
        question: {
          include: {
            userNotes: {
              take: 1,
              orderBy: { updatedAt: 'desc' }
            }
          }
        },
        company: true,
        category: true
      }
    })

    // Filter questions based on questionWhere criteria
    let filteredCompanyQuestions = companyQuestions;
    if (Object.keys(questionWhere).length > 0) {
      filteredCompanyQuestions = companyQuestions.filter(cq => {
        const question = cq.question;
        if (!question) return false;
        
        // Apply filters
        if (questionWhere.difficulty && question.difficulty !== questionWhere.difficulty) return false;
        if (questionWhere.type && question.type !== questionWhere.type) return false;
        if (questionWhere.OR) {
          const searchMatch = questionWhere.OR.some((condition: any) => {
            if (condition.title?.contains) {
              return question.title.toLowerCase().includes(condition.title.contains.toLowerCase());
            }
            if (condition.content?.contains) {
              return question.content.toLowerCase().includes(condition.content.contains.toLowerCase());
            }
            return false;
          });
          if (!searchMatch) return false;
        }
        
        return true;
      });
    }

    // Transform the data to match the expected format
    const transformedQuestions = filteredCompanyQuestions
      .filter(cq => cq.question) // Filter out null questions
      .map(companyQuestion => ({
        ...companyQuestion.question,
        company: companyQuestion.company,
        category: companyQuestion.category,
        isCritical: companyQuestion.isCritical,
        order: companyQuestion.order,
        userNote: companyQuestion.question.userNotes && companyQuestion.question.userNotes.length > 0 
          ? companyQuestion.question.userNotes[0] 
          : null
      }))

    return NextResponse.json(transformedQuestions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      title, 
      content, 
      difficulty, 
      type, 
      tips, 
      followUps, 
      isCritical, 
      order, 
      companyId, 
      categoryId 
    } = body

    // First create or find the base question
    let question = await prisma.question.findUnique({
      where: { title }
    })

    if (!question) {
      question = await prisma.question.create({
        data: {
          title,
          content,
          difficulty: difficulty || 'MEDIUM',
          type: type || 'BEHAVIORAL',
          tips: tips || [],
          followUps: followUps || []
        }
      })
    }

    // Create the company-specific mapping
    const companyQuestion = await prisma.companyQuestion.create({
      data: {
        questionId: question.id,
        companyId,
        categoryId,
        isCritical: isCritical || false,
        order: order || 0
      },
      include: {
        question: true,
        company: true,
        category: true
      }
    })

    // Return in the expected format
    const result = {
      ...companyQuestion.question,
      company: companyQuestion.company,
      category: companyQuestion.category,
      isCritical: companyQuestion.isCritical,
      order: companyQuestion.order
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}
