
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  Save, 
  CheckCircle, 
  Clock, 
  Building2, 
  Target,
  AlertTriangle,
  Timer,
  Tag,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: string;
  isCritical: boolean;
  tags: string[];
  company?: {
    id: string;
    name: string;
    slug: string;
    industry?: string;
    description?: string;
  };
  answers?: {
    id: string;
    content: string;
    isComplete: boolean;
    timeSpent: number;
    storyIds: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }[];
}

interface QuestionDetailContentProps {
  questionId: string;
}

export function QuestionDetailContent({ questionId }: QuestionDetailContentProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuestion();
  }, [questionId]);

  useEffect(() => {
    // Start timer when component mounts
    const now = Date.now();
    setStartTime(now);

    return () => {
      // Save time spent when component unmounts
      if (startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimeSpent(prev => prev + elapsed);
      }
    };
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`/api/questions/${questionId}`);
      if (response.ok) {
        const data = await response.json();
        setQuestion(data.question);
        
        // If there's an existing answer, populate the form
        if (data.question.answers && data.question.answers.length > 0) {
          const answer = data.question.answers[0];
          setContent(answer.content);
          setIsComplete(answer.isComplete);
          setTags(answer.tags || []);
          setTimeSpent(answer.timeSpent || 0);
        }
      } else if (response.status === 404) {
        toast({
          title: "Question not found",
          description: "This question doesn't exist or has been removed.",
          variant: "destructive",
        });
      } else {
        throw new Error('Failed to fetch question');
      }
    } catch (error) {
      console.error('Failed to fetch question:', error);
      toast({
        title: "Error",
        description: "Failed to load question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter your answer before saving.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // Calculate total time spent
      const currentTimeSpent = startTime ? timeSpent + Math.floor((Date.now() - startTime) / 1000) : timeSpent;

      const response = await fetch(`/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          isComplete,
          tags,
          timeSpent: currentTimeSpent,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your answer has been saved successfully.",
        });
        
        // Refresh the question data
        await fetchQuestion();
        
        // Reset start time
        setStartTime(Date.now());
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save answer');
      }
    } catch (error) {
      console.error('Failed to save answer:', error);
      toast({
        title: "Error",
        description: "Failed to save your answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAnswer = async () => {
    if (!question?.answers?.[0]) return;

    if (!confirm('Are you sure you want to delete your answer? This action cannot be undone.')) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/questions/${questionId}/answers`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContent('');
        setIsComplete(false);
        setTags([]);
        setTimeSpent(0);
        toast({
          title: "Success",
          description: "Your answer has been deleted.",
        });
        await fetchQuestion();
      } else {
        throw new Error('Failed to delete answer');
      }
    } catch (error) {
      console.error('Failed to delete answer:', error);
      toast({
        title: "Error",
        description: "Failed to delete your answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64"></div>
          <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-60 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Question Not Found</h1>
          <p className="text-gray-600 mb-6">The question you're looking for doesn't exist.</p>
          <Link href="/questions">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasAnswer = question.answers && question.answers.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/questions">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Button>
          </Link>
        </motion.div>

        {/* Question Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {hasAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400" />
                    )}
                    {question.isCritical && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Critical
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {question.category.toLowerCase().replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {question.difficulty.toLowerCase()}
                    </Badge>
                    {question.company && (
                      <Badge variant="outline" className="text-xs">
                        <Building2 className="h-3 w-3 mr-1" />
                        {question.company.name}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl leading-relaxed">
                    {question.text}
                  </CardTitle>
                </div>
              </div>

              {/* Tags */}
              {question.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Company Info */}
              {question.company && (
                <CardDescription className="pt-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{question.company.name}</span>
                    {question.company.industry && (
                      <>
                        <span>•</span>
                        <span>{question.company.industry}</span>
                      </>
                    )}
                  </div>
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        </motion.div>

        {/* Answer Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Your Answer
              </CardTitle>
              {hasAnswer && (
                <CardDescription>
                  Last updated: {new Date(question.answers![0].updatedAt).toLocaleDateString()}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Answer Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Answer Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your detailed answer here using the STAR++ method (Situation, Task, Action, Result, Plus learnings and future applications)..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="min-h-[300px]"
                />
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center space-x-1"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-xs hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1"
                  />
                  <Button onClick={addTag} variant="outline" size="sm">
                    Add
                  </Button>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="complete"
                      checked={isComplete}
                      onCheckedChange={setIsComplete}
                    />
                    <Label htmlFor="complete">Mark as complete</Label>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Timer className="h-4 w-4" />
                    <span>Time spent: {formatTime(timeSpent)}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {hasAnswer && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteAnswer}
                      disabled={saving}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  )}
                  <Button
                    onClick={handleSave}
                    disabled={saving || !content.trim()}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Answer'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
