
import { Navigation } from '@/components/navigation';
import { StoriesContent } from '@/components/stories-content';

export default async function StoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <StoriesContent />
    </div>
  );
}
