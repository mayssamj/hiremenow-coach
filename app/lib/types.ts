
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
      themePreference?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    role: string;
    themePreference?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    role: string;
    themePreference?: string | null;
  }
}

export interface User {
  id: string;
  username: string;
  name?: string | null;
  email?: string | null;
  role: 'USER' | 'ADMIN';
  themePreference?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  industry?: string;
  description?: string;
  website?: string;
  logo?: string;
  values: string; // JSON string of array
  evaluationCriteria: string; // JSON string of array
  interviewFormat?: string;
  successTips: string; // JSON string of array
  redFlags: string; // JSON string of array
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  text: string;
  category: 'BEHAVIORAL' | 'TECHNICAL' | 'SYSTEM_DESIGN' | 'CASE_STUDY' | 'CULTURE_FIT';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  isCritical: boolean;
  companyId?: string;
  source?: string;
  tags: string; // JSON string of array
  createdAt: Date;
  updatedAt: Date;
  company?: Company;
}

export interface Story {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  reflection?: string;
  learnings?: string;
  tags: string; // JSON string of array
  userId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: string;
  content: string;
  questionId: string;
  userId: string;
  companyId?: string;
  storyIds: string; // JSON string of array
  tags: string; // JSON string of array
  isComplete: boolean;
  timeSpent: number;
  createdAt: Date;
  updatedAt: Date;
  question?: Question;
  company?: Company;
}

export interface Note {
  id: string;
  content: string;
  entityType: 'QUESTION' | 'STORY' | 'ANSWER' | 'COMPANY';
  userId: string;
  questionId?: string;
  storyId?: string;
  answerId?: string;
  tags: string; // JSON string of array
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  description?: string;
  color: string;
  userId?: string;
  isGlobal: boolean;
  usage_count: number;
  createdAt: Date;
  updatedAt: Date;
}

export type QuestionType = 'BEHAVIORAL' | 'TECHNICAL' | 'SYSTEM_DESIGN' | 'CASE_STUDY' | 'CULTURE_FIT';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
export type Role = 'USER' | 'ADMIN';
export type EntityType = 'QUESTION' | 'STORY' | 'ANSWER' | 'COMPANY';

// Extended types for components
export interface QuestionWithCompany extends Question {
  company?: Company;
  answers?: Answer[];
}

export interface CompanyWithQuestions extends Company {
  questions?: Question[];
  _count?: {
    questions: number;
  };
}

export interface StoryWithUser extends Story {
  user?: User;
}

export interface DashboardStats {
  totalQuestions: number;
  answeredQuestions: number;
  totalAnswers: number;
  totalStories: number;
  completionRate: number;
  companiesProgress: Array<{
    id: string;
    name: string;
    totalQuestions: number;
    answeredQuestions: number;
    progress: number;
  }>;
  progressByCompany: Array<{
    company: {
      id: string;
      name: string;
      slug: string;
    };
    totalQuestions: number;
    answeredQuestions: number;
    progress: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'question' | 'story' | 'answer' | 'note';
    title: string;
    createdAt: Date;
  }>;
}

export interface SearchResult {
  id: string;
  type: EntityType;
  title: string;
  content: string;
  url: string;
  company?: string;
  tags?: string[];
}
