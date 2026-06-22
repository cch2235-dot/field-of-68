import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/api/beehiiv';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 });
    }
    const result = await subscribeToNewsletter(email);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
