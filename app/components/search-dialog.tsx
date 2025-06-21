
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, FileText, BookOpen, Building2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { SearchResult } from '@/lib/types';
import { useDebounce } from '@/hooks/use-debounce';

interface SearchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SearchDialog({ open, setOpen }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      searchContent(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const searchContent = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'question':
        return <FileText className="h-4 w-4" />;
      case 'story':
        return <BookOpen className="h-4 w-4" />;
      case 'company':
        return <Building2 className="h-4 w-4" />;
      case 'answer':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const handleResultClick = () => {
    setOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions, stories, companies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {loading && (
            <div className="text-center py-8 text-muted-foreground">
              Searching...
            </div>
          )}

          {results.length > 0 && (
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    onClick={handleResultClick}
                    className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-sm truncate">
                            {result.title}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.content}
                        </p>
                        {result.company && (
                          <p className="text-xs text-blue-600 mt-1">
                            {result.company}
                          </p>
                        )}
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          )}

          {query.length >= 2 && !loading && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No results found for "{query}"
            </div>
          )}

          {query.length < 2 && (
            <div className="text-center py-8 text-muted-foreground">
              Type at least 2 characters to search
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
