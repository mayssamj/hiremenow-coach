
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X,
  BookOpen,
  Target,
  Zap,
  Trophy,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function CreateStoryForm() {
  const [formData, setFormData] = useState({
    title: '',
    situation: '',
    task: '',
    action: '',
    result: '',
    reflection: '',
    learnings: '',
    tags: [] as string[],
    isPublic: false,
  });
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.situation.trim()) {
      setError('Situation is required');
      return false;
    }
    if (!formData.task.trim()) {
      setError('Task is required');
      return false;
    }
    if (!formData.action.trim()) {
      setError('Action is required');
      return false;
    }
    if (!formData.result.trim()) {
      setError('Result is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Story created successfully!',
          description: 'Your STAR story has been saved and is ready to use.',
        });
        router.push('/stories');
      } else {
        setError(data.error || 'Failed to create story');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const suggestedTags = [
    'leadership', 'teamwork', 'problem-solving', 'communication', 'innovation',
    'conflict-resolution', 'project-management', 'customer-service', 'mentoring',
    'time-management', 'decision-making', 'adaptability', 'collaboration'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create STAR++ Story</h1>
          <p className="text-gray-600 mt-2">
            Create a compelling story using the STAR method with reflections and learnings
          </p>
        </div>
        <Link href="/stories">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </Link>
      </div>

      {/* STAR Method Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            STAR++ Method Guide
          </CardTitle>
          <CardDescription>
            Structure your story for maximum impact in interviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Situation</p>
                <p className="text-xs text-gray-600">Set the context</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-sm">Task</p>
                <p className="text-xs text-gray-600">Your responsibility</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-sm">Action</p>
                <p className="text-xs text-gray-600">What you did</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-sm">Result</p>
                <p className="text-xs text-gray-600">The outcome</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-sm">Reflection</p>
                <p className="text-xs text-gray-600">What you learned</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="font-medium text-sm">Learning</p>
                <p className="text-xs text-gray-600">How you grew</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Title */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Story Title</CardTitle>
            <CardDescription>
              Give your story a memorable title that captures the essence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g., Leading a Critical System Migration Under Tight Deadline"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              disabled={loading}
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/200 characters
            </p>
          </CardContent>
        </Card>

        {/* STAR Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Situation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Target className="mr-2 h-5 w-5 text-blue-600" />
                Situation
              </CardTitle>
              <CardDescription>
                Describe the context and background of the story
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Set the scene. What was the context? What company/team? What was happening?"
                value={formData.situation}
                onChange={(e) => handleInputChange('situation', e.target.value)}
                disabled={loading}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Task */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Zap className="mr-2 h-5 w-5 text-orange-600" />
                Task
              </CardTitle>
              <CardDescription>
                What was your responsibility or goal?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What was your role? What were you asked to do? What was the challenge or goal?"
                value={formData.task}
                onChange={(e) => handleInputChange('task', e.target.value)}
                disabled={loading}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Action */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                Action
              </CardTitle>
              <CardDescription>
                What specific actions did you take?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Be specific about what YOU did. Use 'I' statements. What steps did you take? How did you approach the problem?"
                value={formData.action}
                onChange={(e) => handleInputChange('action', e.target.value)}
                disabled={loading}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Result */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Trophy className="mr-2 h-5 w-5 text-purple-600" />
                Result
              </CardTitle>
              <CardDescription>
                What was the outcome? Include metrics if possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What happened as a result of your actions? Include specific metrics, impact on the team/company, recognition received, etc."
                value={formData.result}
                onChange={(e) => handleInputChange('result', e.target.value)}
                disabled={loading}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        {/* Reflection & Learning (Optional) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
                Reflection
                <Badge variant="secondary" className="ml-2 text-xs">Optional</Badge>
              </CardTitle>
              <CardDescription>
                What would you do differently? What insights did you gain?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Looking back, what would you do differently? What insights did you gain about yourself, the situation, or leadership?"
                value={formData.reflection}
                onChange={(e) => handleInputChange('reflection', e.target.value)}
                disabled={loading}
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="mr-2 h-5 w-5 text-indigo-600" />
                Learnings
                <Badge variant="secondary" className="ml-2 text-xs">Optional</Badge>
              </CardTitle>
              <CardDescription>
                How did this experience help you grow?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What did you learn? How did this experience change your approach to similar situations? What skills did you develop?"
                value={formData.learnings}
                onChange={(e) => handleInputChange('learnings', e.target.value)}
                disabled={loading}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Tags & Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Tags & Settings</CardTitle>
            <CardDescription>
              Add tags to categorize your story and set visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tags Input */}
            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="tags"
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
                <Button type="button" onClick={addTag} size="sm" disabled={!newTag.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Current Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Suggested Tags */}
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedTags.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs h-6"
                      onClick={() => setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Public Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleInputChange('isPublic', checked.toString())}
                disabled={loading}
              />
              <Label htmlFor="public">Make this story public</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/stories">
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? (
              'Creating...'
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Story
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
