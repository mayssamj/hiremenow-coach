
'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Clock, Tag, BookOpen, Plus, Globe, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Story {
  id: string;
  title: string;
  content: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  isPublic?: boolean;
  user?: {
    id: string;
    username: string;
  };
  tags: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
  lastUsed?: string;
  usageCount?: number;
  recentQuestions?: Array<{
    id: string;
    title: string;
  }>;
}

interface StoryBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (story: Story, customization?: string) => void;
  questionId: string;
  companyId?: string;
  questionTitle?: string;
}

export default function StoryBrowser({
  isOpen,
  onClose,
  onSelectStory,
  questionId,
  companyId,
  questionTitle
}: StoryBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [recentStories, setRecentStories] = useState<Story[]>([]);
  const [availableTags, setAvailableTags] = useState<Array<{ name: string; count: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('recent');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [customization, setCustomization] = useState('');
  const [showPublicOnly, setShowPublicOnly] = useState(false);

  // Fetch recent stories
  useEffect(() => {
    if (isOpen) {
      fetchRecentStories();
      fetchAvailableTags();
    }
  }, [isOpen]);

  // Search stories when query, tags, or privacy filter change
  useEffect(() => {
    if (isOpen && (searchQuery || selectedTags.length > 0 || showPublicOnly)) {
      searchStories();
    }
  }, [searchQuery, selectedTags, showPublicOnly, isOpen]);

  const fetchRecentStories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stories/recent?limit=10');
      if (response.ok) {
        const data = await response.json();
        setRecentStories(data);
      }
    } catch (error) {
      console.error('Error fetching recent stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableTags = async () => {
    try {
      const response = await fetch('/api/tags/suggestions');
      if (response.ok) {
        const data = await response.json();
        setAvailableTags(data.popularTags || []);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const searchStories = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));
      if (showPublicOnly) params.append('public', 'true');
      params.append('limit', '20');

      const response = await fetch(`/api/stories?${params}`);
      if (response.ok) {
        const data = await response.json();
        setStories(data);
        setActiveTab('search');
      }
    } catch (error) {
      console.error('Error searching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagToggle = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setCustomization('');
  };

  const handleConfirmSelection = () => {
    if (selectedStory) {
      onSelectStory(selectedStory, customization);
      onClose();
      setSelectedStory(null);
      setCustomization('');
    }
  };

  const handleCancel = () => {
    setSelectedStory(null);
    setCustomization('');
  };

  const StoryCard = ({ story, isSelected = false }: { story: Story; isSelected?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
          isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
        }`}
        onClick={() => handleStorySelect(story)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-sm font-medium line-clamp-2">
                {story.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {story.isPublic ? (
                  <div className="flex items-center text-xs text-green-600">
                    <Globe className="w-3 h-3 mr-1" />
                    Public
                  </div>
                ) : (
                  <div className="flex items-center text-xs text-gray-500">
                    <Lock className="w-3 h-3 mr-1" />
                    Private
                  </div>
                )}
                {story.user && (
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="w-3 h-3 mr-1" />
                    {story.user.username}
                  </div>
                )}
              </div>
            </div>
            {story.lastUsed && (
              <div className="flex items-center text-xs text-gray-500 ml-2">
                <Clock className="w-3 h-3 mr-1" />
                {story.usageCount}x
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-gray-600 line-clamp-3 mb-3">
            {story.situation || story.content}
          </p>
          
          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {story.tags.slice(0, 3).map(tag => (
                <Badge 
                  key={tag.id} 
                  variant="secondary" 
                  className="text-xs px-1.5 py-0.5"
                  style={{ backgroundColor: tag.color ? `${tag.color}20` : undefined }}
                >
                  {tag.name}
                </Badge>
              ))}
              {story.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  +{story.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {story.recentQuestions && story.recentQuestions.length > 0 && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">Recent use:</span> {story.recentQuestions[0].title.slice(0, 50)}...
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Select a Story
            {questionTitle && (
              <span className="text-sm font-normal text-gray-600">
                for "{questionTitle.slice(0, 60)}..."
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {!selectedStory ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search and Filters */}
            <div className="space-y-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search stories by title, content, or STAR method..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Privacy Filter */}
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <Label htmlFor="public-only" className="text-sm font-medium">
                    Show public stories only
                  </Label>
                </div>
                <Switch
                  id="public-only"
                  checked={showPublicOnly}
                  onCheckedChange={setShowPublicOnly}
                />
              </div>

              {/* Tag Filters */}
              {availableTags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Filter by tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.slice(0, 10).map(tag => (
                      <Badge
                        key={tag.name}
                        variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                        className="cursor-pointer text-xs"
                        onClick={() => handleTagToggle(tag.name)}
                      >
                        {tag.name} ({tag.count})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Story Lists */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent ({recentStories.length})
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Results ({stories.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="flex-1 mt-4">
                <ScrollArea className="h-full">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : recentStories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <AnimatePresence>
                        {recentStories.map(story => (
                          <StoryCard key={story.id} story={story} />
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No recent stories found.</p>
                      <p className="text-sm">Create some stories to get started!</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="search" className="flex-1 mt-4">
                <ScrollArea className="h-full">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : stories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <AnimatePresence>
                        {stories.map(story => (
                          <StoryCard key={story.id} story={story} />
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : searchQuery || selectedTags.length > 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No stories found matching your search.</p>
                      <p className="text-sm">Try different keywords or tags.</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Enter a search term or select tags to find stories.</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={() => window.open('/stories', '_blank')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Story
              </Button>
            </div>
          </div>
        ) : (
          /* Story Customization View */
          <div className="flex-1 flex flex-col min-h-0">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Selected Story: {selectedStory.title}</h3>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">Situation:</p>
                <p className="text-gray-700 mb-2">{selectedStory.situation || 'Not specified'}</p>
                <p className="font-medium mb-1">Task:</p>
                <p className="text-gray-700 mb-2">{selectedStory.task || 'Not specified'}</p>
                <p className="font-medium mb-1">Action:</p>
                <p className="text-gray-700 mb-2">{selectedStory.action || 'Not specified'}</p>
                <p className="font-medium mb-1">Result:</p>
                <p className="text-gray-700">{selectedStory.result || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Customize for this question (optional):
              </label>
              <textarea
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                placeholder="Add any specific adaptations or emphasis for this question/company..."
                className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={handleCancel}>
                Back to Stories
              </Button>
              <Button onClick={handleConfirmSelection}>
                Use This Story
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
