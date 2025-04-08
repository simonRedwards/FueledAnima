import { NextResponse } from 'next/server';
import { appendEmailToSheet } from '@/utils/google-sheets';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const result = await appendEmailToSheet(email);
    
    if (!result.success) {
      console.error('Failed to save email:', result.error);
      return NextResponse.json(
        { error: 'Failed to save email', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in subscribe route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
} 