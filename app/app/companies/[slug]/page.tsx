
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { CompanyDetailContent } from '@/components/company-detail-content';
import { prisma } from '@/lib/db';

interface CompanyDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const company = await prisma.company.findUnique({
    where: { slug: params.slug },
    include: {
      questions: {
        orderBy: { createdAt: 'desc' },
        include: {
          answers: {
            where: { userId: session.user.id },
            select: { id: true, isComplete: true },
          },
        },
      },
      _count: {
        select: { questions: true },
      },
    },
  });

  if (!company) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <CompanyDetailContent company={company as any} />
    </div>
  );
}
