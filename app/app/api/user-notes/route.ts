
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const questionId = searchParams.get('questionId')

    const where = questionId ? { questionId } : {}

    const userNotes = await prisma.userNote.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        Question: true
      }
    })

    return NextResponse.json(userNotes)
  } catch (error) {
    console.error('Error fetching user notes:', error)
    return NextResponse.json({ error: 'Failed to fetch user notes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { questionId, content } = body

    // Get current user (for now, we'll use a default user ID)
    // In a real app, this would come from authentication
    const userId = 'default-user-id'

    // Check if a note already exists for this question
    const existingNote = await prisma.userNote.findFirst({
      where: { questionId }
    })

    let userNote

    if (existingNote) {
      // Update existing note
      userNote = await prisma.userNote.update({
        where: { id: existingNote.id },
        data: {
          content: content || ''
        },
        include: {
          Question: true
        }
      })
    } else {
      // Create new note
      userNote = await prisma.userNote.create({
        data: {
          id: crypto.randomUUID(),
          userId: userId,
          questionId,
          content: content || '',
          updatedAt: new Date()
        },
        include: {
          Question: true
        }
      })
    }

    return NextResponse.json(userNote, { status: existingNote ? 200 : 201 })
  } catch (error) {
    console.error('Error saving user note:', error)
    return NextResponse.json({ error: 'Failed to save user note' }, { status: 500 })
  }
}
