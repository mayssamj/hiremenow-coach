
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ThemeSelector } from '@/components/admin/theme-selector';
import { DebugSimpleThemeSelector } from '@/components/debug-simple-theme-selector';
import { DatabaseManagement } from '@/components/admin/database-management';
import { useTheme } from '@/contexts/theme-context';
import { 
  Shield, 
  Database, 
  Palette, 
  BarChart3,
  Settings,
  Users,
  Activity
} from 'lucide-react';

export function AdminPanel() {
  const { currentTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground">
            Administrative controls and system management
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Shield className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Database
          </TabsTrigger>
          <TabsTrigger value="themes" className="flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Themes
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  System Status
                </CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Online</div>
                <p className="text-xs text-muted-foreground">
                  All systems operational
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Admin User
                </CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Admin User</div>
                <p className="text-xs text-muted-foreground">
                  @admin
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Access Level
                </CardTitle>
                <Shield className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ADMIN</div>
                <p className="text-xs text-muted-foreground">
                  Full administrative access
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Theme
                </CardTitle>
                <Palette className="h-4 w-4 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentTheme.displayName}</div>
                <p className="text-xs text-muted-foreground">
                  Active theme configuration
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm font-medium">Database</p>
                  <p className="text-xs text-muted-foreground">Manage data</p>
                </div>
                <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Palette className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm font-medium">Themes</p>
                  <p className="text-xs text-muted-foreground">UI styling</p>
                </div>
                <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Users className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <p className="text-sm font-medium">Users</p>
                  <p className="text-xs text-muted-foreground">User management</p>
                </div>
                <div className="text-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-sm font-medium">Settings</p>
                  <p className="text-xs text-muted-foreground">System config</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <DatabaseManagement />
        </TabsContent>

        <TabsContent value="themes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Theme Management
              </CardTitle>
              <CardDescription>
                Customize the application's visual appearance and themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSelector />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                System Settings
              </CardTitle>
              <CardDescription>
                Configure system-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Application Settings</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• Authentication: NextAuth.js with JWT</p>
                      <p>• Database: SQLite with Prisma ORM</p>
                      <p>• Theme System: Dynamic theme switching</p>
                      <p>• Environment: {process.env.NODE_ENV}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Security Settings</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• Session Strategy: JWT</p>
                      <p>• Password Hashing: bcrypt</p>
                      <p>• CSRF Protection: Enabled</p>
                      <p>• Admin Access: Role-based</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
