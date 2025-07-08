
'use client';

import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Building, User, FileText, Edit, Trash2 } from 'lucide-react';
import { InterviewForm } from '@/components/interview-form';
import { format } from 'date-fns';

interface InterviewReflection {
  id: string;
  questionAsked: string;
  myResponse?: string;
  reflection?: string;
  whatWentWell?: string;
  whatToImprove?: string;
  order: number;
}

interface Interview {
  id: string;
  title: string;
  company: string;
  date?: string;
  round?: string;
  interviewer?: string;
  outcome?: 'PENDING' | 'PASSED' | 'FAILED' | 'CANCELLED' | 'NO_RESPONSE';
  overallNotes?: string;
  reflections: InterviewReflection[];
  createdAt: string;
}

const outcomeColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PASSED: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
  NO_RESPONSE: 'bg-blue-100 text-blue-800'
};

const outcomeLabels = {
  PENDING: 'Pending',
  PASSED: 'Passed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
  NO_RESPONSE: 'No Response'
};

function RetrospectivePageContent() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [expandedInterview, setExpandedInterview] = useState<string | null>(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await fetch('/api/interviews');
      if (response.ok) {
        const data = await response.json();
        setInterviews(data);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateInterview = async (interviewData: any) => {
    try {
      const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData),
      });

      if (response.ok) {
        await fetchInterviews();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  const handleUpdateInterview = async (interviewData: any) => {
    if (!editingInterview) return;

    try {
      const response = await fetch(`/api/interviews/${editingInterview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData),
      });

      if (response.ok) {
        await fetchInterviews();
        setEditingInterview(null);
      }
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  };

  const handleDeleteInterview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this interview retrospective?')) {
      return;
    }

    try {
      const response = await fetch(`/api/interviews/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchInterviews();
      }
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading interviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Retrospectives</h1>
          <p className="text-muted-foreground mt-2">
            Track your interview experiences and reflect on your performance
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Interview
        </Button>
      </div>

      {/* Interview Form */}
      {(showForm || editingInterview) && (
        <InterviewForm
          interview={editingInterview}
          onSubmit={editingInterview ? handleUpdateInterview : handleCreateInterview}
          onCancel={() => {
            setShowForm(false);
            setEditingInterview(null);
          }}
        />
      )}

      {/* Interviews List */}
      {interviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No interviews yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start tracking your interview experiences by adding your first retrospective.
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Interview
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      {interview.title}
                      {interview.outcome && (
                        <Badge className={outcomeColors[interview.outcome]}>
                          {outcomeLabels[interview.outcome]}
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {interview.company}
                      </div>
                      {interview.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(interview.date), 'MMM d, yyyy')}
                        </div>
                      )}
                      {interview.interviewer && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {interview.interviewer}
                        </div>
                      )}
                    </div>
                    {interview.round && (
                      <CardDescription>Round: {interview.round}</CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingInterview(interview)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteInterview(interview.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {(interview.overallNotes || interview.reflections.length > 0) && (
                <CardContent>
                  {interview.overallNotes && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Overall Notes</h4>
                      <p className="text-sm text-muted-foreground">{interview.overallNotes}</p>
                    </div>
                  )}
                  
                  {interview.reflections.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">
                          Question Reflections ({interview.reflections.length})
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => 
                            setExpandedInterview(
                              expandedInterview === interview.id ? null : interview.id
                            )
                          }
                        >
                          {expandedInterview === interview.id ? 'Collapse' : 'Expand'}
                        </Button>
                      </div>
                      
                      {expandedInterview === interview.id && (
                        <div className="space-y-4">
                          {interview.reflections.map((reflection, index) => (
                            <div key={reflection.id} className="border rounded-lg p-4 bg-muted/50">
                              <h5 className="font-medium mb-2">
                                Question {index + 1}: {reflection.questionAsked}
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                {reflection.myResponse && (
                                  <div>
                                    <strong>My Response:</strong>
                                    <p className="text-muted-foreground mt-1">{reflection.myResponse}</p>
                                  </div>
                                )}
                                {reflection.reflection && (
                                  <div>
                                    <strong>Reflection:</strong>
                                    <p className="text-muted-foreground mt-1">{reflection.reflection}</p>
                                  </div>
                                )}
                                {reflection.whatWentWell && (
                                  <div>
                                    <strong>What Went Well:</strong>
                                    <p className="text-muted-foreground mt-1">{reflection.whatWentWell}</p>
                                  </div>
                                )}
                                {reflection.whatToImprove && (
                                  <div>
                                    <strong>What to Improve:</strong>
                                    <p className="text-muted-foreground mt-1">{reflection.whatToImprove}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RetrospectivePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <RetrospectivePageContent />
    </Suspense>
  );
}
