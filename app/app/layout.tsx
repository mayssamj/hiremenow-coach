
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Providers } from '@/components/providers';
import { StartupSeeder } from '@/components/startup-seeder';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HireMeNow.Coach - Master Your Interview Preparation',
  description: 'Professional interview preparation platform with STAR stories, company insights, and comprehensive question banks.',
  keywords: 'interview preparation, STAR method, job interview, career coaching, behavioral questions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <StartupSeeder />
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
