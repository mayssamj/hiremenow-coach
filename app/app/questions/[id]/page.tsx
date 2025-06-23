
import { Navigation } from '@/components/navigation';
import { QuestionDetailContent } from '@/components/question-detail-content';

export default async function QuestionDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <QuestionDetailContent questionId={params.id} />
    </div>
  );
}
