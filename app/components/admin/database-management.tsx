
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  RefreshCw, 
  Sprout, 
  Download, 
  Upload, 
  BarChart3, 
  Trash2,
  FileText,
  Users,
  Building2,
  MessageSquare,
  BookOpen
} from 'lucide-react';

interface DatabaseStats {
  counts: {
    users: number;
    companies: number;
    questions: number;
    stories: number;
    answers: number;
  };
  recent: {
    users: any[];
    stories: any[];
  };
  timestamp: string;
}

export function DatabaseManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const { toast } = useToast();

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch('/api/admin/database/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        toast({
          title: 'Stats Updated',
          description: 'Database statistics refreshed successfully.',
        });
      } else {
        throw new Error(data.error || 'Failed to fetch stats');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch database statistics.',
        variant: 'destructive',
      });
    } finally {
      setLoadingStats(false);
    }
  };

  const handleRefreshDatabase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/database/refresh', {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Database Refreshed',
          description: data.message,
        });
        // Refresh stats after operation
        await fetchStats();
      } else {
        throw new Error(data.error || 'Refresh failed');
      }
    } catch (error) {
      console.error('Error refreshing database:', error);
      toast({
        title: 'Refresh Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReseedDatabase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/database/reseed', {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Database Reseeded',
          description: `${data.message} Companies: ${data.seededCounts.companies}, Questions: ${data.seededCounts.questions}`,
        });
        // Refresh stats after operation
        await fetchStats();
      } else {
        throw new Error(data.error || 'Reseed failed');
      }
    } catch (error) {
      console.error('Error reseeding database:', error);
      toast({
        title: 'Reseed Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportDatabase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/database/export');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `hiremenow-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: 'Export Complete',
          description: 'Database exported successfully.',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Export failed');
      }
    } catch (error) {
      console.error('Error exporting database:', error);
      toast({
        title: 'Export Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportDatabase = async (file: File, replaceExisting: boolean = false) => {
    setIsLoading(true);
    try {
      const fileContent = await file.text();
      const importData = JSON.parse(fileContent);
      
      const response = await fetch('/api/admin/database/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: importData.data || importData,
          options: { replaceExisting }
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Import Complete',
          description: `${data.message} Companies: ${data.importCounts.companies}, Questions: ${data.importCounts.questions}`,
        });
        // Refresh stats after operation
        await fetchStats();
      } else {
        throw new Error(data.error || 'Import failed');
      }
    } catch (error) {
      console.error('Error importing database:', error);
      toast({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Database Management</h2>
          <p className="text-muted-foreground">
            Manage database operations, import/export data, and view statistics.
          </p>
        </div>
        <Button
          onClick={fetchStats}
          disabled={loadingStats}
          variant="outline"
          size="sm"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          {loadingStats ? 'Loading...' : 'Refresh Stats'}
        </Button>
      </div>

      {/* Database Statistics */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Database Statistics
            </CardTitle>
            <CardDescription>
              Current database statistics as of {new Date(stats.timestamp).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Users</p>
                  <p className="text-2xl font-bold">{stats.counts.users}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Companies</p>
                  <p className="text-2xl font-bold">{stats.counts.companies}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Questions</p>
                  <p className="text-2xl font-bold">{stats.counts.questions}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Stories</p>
                  <p className="text-2xl font-bold">{stats.counts.stories}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Answers</p>
                  <p className="text-2xl font-bold">{stats.counts.answers}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Database Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maintenance Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCw className="h-5 w-5 mr-2" />
              Maintenance Operations
            </CardTitle>
            <CardDescription>
              Database cleanup and maintenance operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  disabled={isLoading}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Refresh Database
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Database Refresh</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all data except users. This action cannot be undone.
                    Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRefreshDatabase}>
                    Refresh Database
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="default" 
                  disabled={isLoading}
                  className="w-full"
                >
                  <Sprout className="h-4 w-4 mr-2" />
                  Reseed with Sample Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Database Reseed</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will add sample companies and questions to the database.
                    Existing data will be preserved unless there are conflicts.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReseedDatabase}>
                    Reseed Database
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Import/Export Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Import/Export Operations
            </CardTitle>
            <CardDescription>
              Backup and restore database content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleExportDatabase}
              disabled={isLoading}
              className="w-full"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Database
            </Button>

            <div className="space-y-2">
              <label htmlFor="import-file" className="text-sm font-medium">
                Import Database
              </label>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImportDatabase(file, false);
                  }
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Upload a JSON file to import data. Existing data will be preserved.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Processing database operation...</span>
        </div>
      )}
    </div>
  );
}
