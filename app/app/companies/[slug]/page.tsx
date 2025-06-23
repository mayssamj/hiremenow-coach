
import { Navigation } from '@/components/navigation';
import { CompanyDetailContent } from '@/components/company-detail-content';

export default async function CompanyDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <CompanyDetailContent companySlug={params.slug} />
    </div>
  );
}
