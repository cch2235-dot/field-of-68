import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/api/beehiiv';
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
    const result = await subscribeToNewsletter(email);
    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch { return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 }); }
}
