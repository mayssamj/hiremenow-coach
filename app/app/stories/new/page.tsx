
import { Navigation } from '@/components/navigation';
import { CreateStoryForm } from '@/components/create-story-form';

export default async function NewStoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateStoryForm />
      </div>
    </div>
  );
}
