
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { QuestionsContent } from '@/components/questions-content';

export default async function QuestionsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <QuestionsContent />
    </div>
  );
}
