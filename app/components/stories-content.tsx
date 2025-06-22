
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit,
  Eye,
  Star,
  Calendar,
  Tag,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { StoryWithUser } from '@/lib/types';
import { motion } from 'framer-motion';

export function StoriesContent() {
  const [stories, setStories] = useState<StoryWithUser[]>([]);
  const [filteredStories, setFilteredStories] = useState<StoryWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStories(stories);
    } else {
      const filtered = stories.filter(story =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.situation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        JSON.parse(story.tags || '[]').some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredStories(filtered);
    }
  }, [searchQuery, stories]);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories');
      if (response.ok) {
        const data = await response.json();
        setStories(data.stories || []);
        setFilteredStories(data.stories || []);
      }
    } catch (error) {
      console.error('Failed to fetch stories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">STAR++ Stories</h1>
            <p className="text-gray-600 mt-2">
              Create compelling stories using the STAR method with reflections and learnings
            </p>
          </div>
          <Link href="/stories/new">
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Story
            </Button>
          </Link>
        </motion.div>

        {/* Stats & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{stories.length}</p>
                    <p className="text-sm text-gray-600">Total Stories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {stories.filter(s => s.isPublic).length}
                    </p>
                    <p className="text-sm text-gray-600">Public Stories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {Array.from(new Set(stories.flatMap(s => s.tags))).length}
                    </p>
                    <p className="text-sm text-gray-600">Unique Tags</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Stories Grid */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-grow">
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                          {story.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                          {story.isPublic && (
                            <Badge variant="secondary" className="text-xs">
                              Public
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* STAR Preview */}
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Situation</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {story.situation}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Result</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {story.result}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    {JSON.parse(story.tags || '[]').length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {JSON.parse(story.tags || '[]').slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {story.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{story.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex space-x-2">
                        <Link href={`/stories/${story.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/stories/${story.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'No stories found' : 'No stories yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? `No stories match "${searchQuery}"`
                : 'Create your first STAR story to get started with interview preparation'
              }
            </p>
            {searchQuery ? (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear search
              </Button>
            ) : (
              <Link href="/stories/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Story
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
