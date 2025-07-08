
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface InterviewReflection {
  questionAsked: string;
  myResponse?: string;
  reflection?: string;
  whatWentWell?: string;
  whatToImprove?: string;
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
}

interface InterviewFormProps {
  interview?: Interview | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const companies = [
  'Meta', 'Amazon', 'Google', 'OpenAI', 'Snowflake', 'Anthropic', 'Scale AI', 
  'Netflix', 'LinkedIn', 'Uber', 'AirBnB', 'TikTok', 'Reddit', 'Startup', 'Other'
];

const outcomes = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'PASSED', label: 'Passed' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NO_RESPONSE', label: 'No Response' }
];

export function InterviewForm({ interview, onSubmit, onCancel }: InterviewFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    date: '',
    round: '',
    interviewer: '',
    outcome: '',
    overallNotes: ''
  });

  const [reflections, setReflections] = useState<InterviewReflection[]>([]);

  useEffect(() => {
    if (interview) {
      setFormData({
        title: interview.title,
        company: interview.company,
        date: interview.date ? interview.date.split('T')[0] : '',
        round: interview.round || '',
        interviewer: interview.interviewer || '',
        outcome: interview.outcome || '',
        overallNotes: interview.overallNotes || ''
      });
      setReflections(interview.reflections || []);
    }
  }, [interview]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      reflections
    });
  };

  const addReflection = () => {
    setReflections([...reflections, {
      questionAsked: '',
      myResponse: '',
      reflection: '',
      whatWentWell: '',
      whatToImprove: ''
    }]);
  };

  const updateReflection = (index: number, field: keyof InterviewReflection, value: string) => {
    const updated = [...reflections];
    updated[index] = { ...updated[index], [field]: value };
    setReflections(updated);
  };

  const removeReflection = (index: number) => {
    setReflections(reflections.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {interview ? 'Edit Interview Retrospective' : 'Add Interview Retrospective'}
        </CardTitle>
        <CardDescription>
          Record your interview experience and reflect on your performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Interview Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Behavioral Stage 1, System Design with Director"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Select value={formData.company} onValueChange={(value) => setFormData({ ...formData, company: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Interview Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="round">Round/Stage</Label>
              <Input
                id="round"
                placeholder="e.g., Phone Screen, Onsite Round 2"
                value={formData.round}
                onChange={(e) => setFormData({ ...formData, round: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interviewer">Interviewer</Label>
              <Input
                id="interviewer"
                placeholder="e.g., John Smith, Senior EM"
                value={formData.interviewer}
                onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="outcome">Outcome</Label>
              <Select value={formData.outcome} onValueChange={(value) => setFormData({ ...formData, outcome: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select outcome" />
                </SelectTrigger>
                <SelectContent>
                  {outcomes.map((outcome) => (
                    <SelectItem key={outcome.value} value={outcome.value}>
                      {outcome.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overallNotes">Overall Notes</Label>
            <Textarea
              id="overallNotes"
              placeholder="General thoughts about the interview, preparation notes, etc."
              value={formData.overallNotes}
              onChange={(e) => setFormData({ ...formData, overallNotes: e.target.value })}
              rows={3}
            />
          </div>

          {/* Question Reflections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Question Reflections</h3>
              <Button type="button" variant="outline" onClick={addReflection}>
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            {reflections.map((reflection, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Question {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReflection(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question Asked *</Label>
                    <Input
                      placeholder="What question was asked?"
                      value={reflection.questionAsked}
                      onChange={(e) => updateReflection(index, 'questionAsked', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>My Response</Label>
                      <Textarea
                        placeholder="How did you respond?"
                        value={reflection.myResponse}
                        onChange={(e) => updateReflection(index, 'myResponse', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reflection</Label>
                      <Textarea
                        placeholder="How do you think you performed?"
                        value={reflection.reflection}
                        onChange={(e) => updateReflection(index, 'reflection', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>What Went Well</Label>
                      <Textarea
                        placeholder="What did you do well?"
                        value={reflection.whatWentWell}
                        onChange={(e) => updateReflection(index, 'whatWentWell', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>What to Improve</Label>
                      <Textarea
                        placeholder="What could you improve next time?"
                        value={reflection.whatToImprove}
                        onChange={(e) => updateReflection(index, 'whatToImprove', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-2 pt-4">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {interview ? 'Update' : 'Save'} Interview
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
