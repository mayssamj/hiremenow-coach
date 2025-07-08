
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const companySlug = searchParams.get('company')

    const where = companySlug && companySlug !== 'all' 
      ? { Company: { slug: companySlug } }
      : {}

    const categories = await prisma.category.findMany({
      where,
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: {
        Company: true,
        _count: {
          select: {
            CompanyQuestion: true
          }
        }
      }
    })

    // Add questionCount to each category
    const categoriesWithCount = categories.map(category => ({
      ...category,
      questionCount: category._count.CompanyQuestion
    }))

    return NextResponse.json(categoriesWithCount)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, color, icon, order, companyId } = body

    const category = await prisma.category.create({
      data: {
        id: crypto.randomUUID(),
        name,
        slug,
        description,
        color,
        icon,
        order: order || 0,
        companyId,
        updatedAt: new Date()
      },
      include: {
        Company: true
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
