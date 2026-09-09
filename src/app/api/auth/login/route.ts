import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Use /api/parent/login or /api/child/login.' },
    { status: 410 }
  );
}
