
import { User, Company, Question, Story, Answer, Note, Tag, UserProgress } from '@prisma/client';

export type { User, Company, Question, Story, Answer, Note, Tag, UserProgress };

export interface UserWithProgress extends User {
  progress?: UserProgress[];
}

export interface QuestionWithCompany extends Question {
  company?: Company;
  answers?: Answer[];
  notes?: Note[];
}

export interface StoryWithUser extends Story {
  user: User;
  notes?: Note[];
}

export interface AnswerWithRelations extends Answer {
  question: Question;
  user: User;
  company?: Company;
  notes?: Note[];
}

export interface CompanyWithQuestions extends Company {
  questions?: Question[];
  _count?: {
    questions: number;
  };
}

export interface SearchResult {
  id: string;
  type: 'question' | 'story' | 'answer' | 'company';
  title: string;
  content: string;
  url: string;
  company?: string;
  tags?: string[];
}

export interface ProgressStats {
  totalQuestions: number;
  answeredQuestions: number;
  criticalAnswered: number;
  completionPercentage: number;
  averageTimePerAnswer: number;
}

export interface DashboardStats {
  totalStories: number;
  totalAnswers: number;
  completionRate: number;
  recentActivity: {
    type: 'answer' | 'story' | 'note';
    id: string;
    title: string;
    createdAt: Date;
  }[];
  progressByCompany: {
    company: Company;
    progress: ProgressStats;
  }[];
}
