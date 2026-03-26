import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    
    const projects = await db.project.findMany({
      where: {
        ...(featured === 'true' && { featured: true }),
        ...(category && { category })
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
    })
    
    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, category, tags, featured, order } = body

    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const project = await db.project.create({
      data: {
        title,
        description,
        imageUrl,
        category: category || 'General',
        tags: tags || '',
        featured: featured ?? false,
        order: order ?? 0
      }
    })

    return NextResponse.json({ success: true, data: project })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
