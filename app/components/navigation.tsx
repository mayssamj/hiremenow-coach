'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CompanySelector } from '@/components/company-selector'
import EnhancedSearch from '@/components/enhanced-search'
import { Menu, Target, BookOpen, Users, HelpCircle, MessageSquare, LogIn, LogOut, User, Moon, Sun, FileText, Shield, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

const navigation = [
  { name: 'Home', href: '/', icon: Target },
  { name: 'Companies', href: '/companies', icon: Users },
  { name: 'Comprehensive Prep', href: '/comprehensive', icon: BookOpen },
  { name: 'Critical Questions', href: '/critical', icon: Target },
  { name: 'My Stories', href: '/stories', icon: MessageSquare },
  { name: 'Retrospective', href: '/retrospective', icon: FileText },
  { name: 'FAQ', href: '/faq', icon: HelpCircle },
]

interface AuthUser {
  id: string;
  username: string;
  role: string;
  preferredCompany?: string;
}

export function Navigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  
  const currentCompany = searchParams.get('company') || user?.preferredCompany || 'meta'

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const getNavHref = (href: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentCompany) {
      params.set('company', currentCompany)
    }
    return `${href}?${params.toString()}`
  }

  const handleSearchResult = (type: string, id: string) => {
    // Navigate to appropriate page based on search result type
    switch (type) {
      case 'question':
        router.push(getNavHref('/comprehensive'))
        break
      case 'story':
        router.push(getNavHref('/stories'))
        break
      case 'system-design':
        router.push(getNavHref('/comprehensive'))
        break
      case 'strategy':
      case 'faq':
        router.push(getNavHref('/companies'))
        break
      default:
        router.push(getNavHref('/'))
    }
    setShowSearch(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              EM Interview Prep
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <CompanySelector currentCompany={currentCompany} variant="compact" />
            
            {/* Prominent Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <EnhancedSearch 
                onResultClick={handleSearchResult}
                companyFilter={currentCompany}
                placeholder="Search questions, stories, strategies..."
              />
            </div>
            
            <nav className="flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Button
                    key={item.name}
                    asChild
                    variant={isActive ? 'default' : 'ghost'}
                    className={cn(
                      'px-3 py-2',
                      isActive && 'bg-blue-600 text-white hover:bg-blue-700'
                    )}
                  >
                    <Link href={getNavHref(item.href)}>
                      <Icon className="w-4 h-4 mr-1" />
                      <span className="hidden xl:inline">{item.name}</span>
                    </Link>
                  </Button>
                )
              })}
              
              {/* Admin Navigation */}
              {user?.role === 'ADMIN' && (
                <Button
                  asChild
                  variant={pathname === '/admin' ? 'default' : 'ghost'}
                  className={cn(
                    'px-3 py-2',
                    pathname === '/admin' && 'bg-red-600 text-white hover:bg-red-700'
                  )}
                >
                  <Link href="/admin">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="hidden xl:inline">Admin</span>
                  </Link>
                </Button>
              )}
            </nav>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Authentication */}
            {!isLoading && (
              <div className="flex items-center space-x-2">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground hidden xl:inline">
                      Welcome, {user.username}
                    </span>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-1" />
                      <span className="hidden xl:inline">Logout</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/login">
                        <LogIn className="w-4 h-4 mr-1" />
                        <span className="hidden xl:inline">Login</span>
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/signup">
                        <User className="w-4 h-4 mr-1" />
                        <span className="hidden xl:inline">Sign Up</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Medium screens - show company selector, search and menu button */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            <CompanySelector currentCompany={currentCompany} variant="compact" />
            
            {/* Search Toggle for Medium Screens */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Toggle search</span>
            </Button>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Button
                        key={item.name}
                        asChild
                        variant={isActive ? 'default' : 'ghost'}
                        className="justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={getNavHref(item.href)}>
                          <Icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </Link>
                      </Button>
                    )
                  })}

                  {/* Admin Navigation for medium screens */}
                  {user?.role === 'ADMIN' && (
                    <Button
                      asChild
                      variant={pathname === '/admin' ? 'default' : 'ghost'}
                      className="justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/admin">
                        <Shield className="w-4 h-4 mr-2" />
                        Admin
                      </Link>
                    </Button>
                  )}

                  {/* Authentication for medium screens */}
                  <div className="pt-4 border-t space-y-2">
                    {!isLoading && (
                      <>
                        {user ? (
                          <>
                            <div className="text-sm text-muted-foreground px-4">
                              Welcome, {user.username}
                            </div>
                            <Button 
                              variant="ghost" 
                              className="justify-start w-full" 
                              onClick={() => {
                                handleLogout()
                                setIsOpen(false)
                              }}
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              Logout
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              asChild 
                              variant="ghost" 
                              className="justify-start w-full"
                              onClick={() => setIsOpen(false)}
                            >
                              <Link href="/login">
                                <LogIn className="w-4 h-4 mr-2" />
                                Login
                              </Link>
                            </Button>
                            <Button 
                              asChild 
                              className="justify-start w-full"
                              onClick={() => setIsOpen(false)}
                            >
                              <Link href="/signup">
                                <User className="w-4 h-4 mr-2" />
                                Sign Up
                              </Link>
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Search Toggle for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Toggle search</span>
            </Button>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Company Selector for mobile */}
                  <div className="pb-4 border-b">
                    <CompanySelector currentCompany={currentCompany} variant="compact" />
                  </div>
                  
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Button
                        key={item.name}
                        asChild
                        variant={isActive ? 'default' : 'ghost'}
                        className="justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={getNavHref(item.href)}>
                          <Icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </Link>
                      </Button>
                    )
                  })}

                  {/* Admin Navigation for mobile */}
                  {user?.role === 'ADMIN' && (
                    <Button
                      asChild
                      variant={pathname === '/admin' ? 'default' : 'ghost'}
                      className="justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/admin">
                        <Shield className="w-4 h-4 mr-2" />
                        Admin
                      </Link>
                    </Button>
                  )}

                  {/* Authentication for mobile */}
                  <div className="pt-4 border-t space-y-2">
                    {!isLoading && (
                      <>
                        {user ? (
                          <>
                            <div className="text-sm text-muted-foreground px-4">
                              Welcome, {user.username}
                            </div>
                            <Button 
                              variant="ghost" 
                              className="justify-start w-full" 
                              onClick={() => {
                                handleLogout()
                                setIsOpen(false)
                              }}
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              Logout
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              asChild 
                              variant="ghost" 
                              className="justify-start w-full"
                              onClick={() => setIsOpen(false)}
                            >
                              <Link href="/login">
                                <LogIn className="w-4 h-4 mr-2" />
                                Login
                              </Link>
                            </Button>
                            <Button 
                              asChild 
                              className="justify-start w-full"
                              onClick={() => setIsOpen(false)}
                            >
                              <Link href="/signup">
                                <User className="w-4 h-4 mr-2" />
                                Sign Up
                              </Link>
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile/Tablet Search Overlay */}
        {showSearch && (
          <div className="lg:hidden border-t bg-white/95 backdrop-blur-sm p-4">
            <EnhancedSearch 
              onResultClick={handleSearchResult}
              companyFilter={currentCompany}
              placeholder="Search questions, stories, strategies..."
            />
          </div>
        )}
      </div>
    </header>
  )
}
