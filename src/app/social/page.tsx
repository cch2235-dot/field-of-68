import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Field of 68' };

// Social feed was removed — redirect home
export default function SocialPage() {
  redirect('/');
}
