
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  LogOut, 
  Settings, 
  BookOpen, 
  Building2, 
  BarChart3,
  Search,
  FileText,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import { SearchDialog } from '@/components/search-dialog';

export function Navigation() {
  const { data: session, status } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const getUserInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (status === 'loading') {
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl">HireMeNow.Coach</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl">HireMeNow.Coach</span>
              </Link>
              
              {session && (
                <div className="hidden md:flex items-center space-x-6">
                  <Link 
                    href="/dashboard" 
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    href="/companies" 
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Companies</span>
                  </Link>
                  <Link 
                    href="/questions" 
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Questions</span>
                  </Link>
                  <Link 
                    href="/stories" 
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Stories</span>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {session && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(true)}
                  className="hidden md:flex items-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </Button>
              )}

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {getUserInitials(session.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{session.user?.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {session.user?.username}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    {session.user?.role === 'ADMIN' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {session && <SearchDialog open={searchOpen} setOpen={setSearchOpen} />}
    </>
  );
}
