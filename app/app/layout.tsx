
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { NavigationWrapper } from '@/components/navigation-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EM Interview Prep - Meta & FAANG Engineering Manager Interview Preparation',
  description: 'Comprehensive interview preparation for Engineering Manager roles at Meta, Google, Amazon, Apple, Netflix, and Microsoft. Practice behavioral questions, system design, and track your progress.',
  keywords: 'engineering manager, interview preparation, Meta, FAANG, behavioral questions, system design, leadership',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <NavigationWrapper />
            <main className="container mx-auto px-4 py-8 max-w-7xl">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
