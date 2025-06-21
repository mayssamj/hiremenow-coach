
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { QuestionDetailContent } from '@/components/question-detail-content';

interface QuestionPageProps {
  params: {
    id: string;
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <QuestionDetailContent questionId={params.id} />
    </div>
  );
}
