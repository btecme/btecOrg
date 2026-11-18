import { NextResponse } from 'next/server';

// Retired: the visible form sends directly to Formspree. Do not accept a Request
// argument, read its body, or log submissions here. Hosting metadata is separate.
export async function POST() {
  return NextResponse.json(
    { success: false, message: 'This endpoint is retired. Please use the Contact page.' },
    { status: 410, headers: { 'Cache-Control': 'no-store' } },
  );
}
