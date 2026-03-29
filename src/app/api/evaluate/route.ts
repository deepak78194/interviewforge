import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json() as { code: string; language: string; input?: string };

    return NextResponse.json({
      output: `Code evaluation for ${language} is coming soon. Your code has been received (${code.length} characters).`,
      error: null,
      executionTime: 0,
    });
  } catch {
    return NextResponse.json(
      { output: null, error: 'Failed to evaluate code', executionTime: 0 },
      { status: 500 }
    );
  }
}
