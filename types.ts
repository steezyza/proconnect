
import React from 'react';

export type UserRole = 'student' | 'junior professional' | 'mentor';

export enum BadgeKey {
  FIRST_COURSE = 'FIRST_COURSE',
  FIRST_FORUM_POST = 'FIRST_FORUM_POST',
  FIRST_MENTORSHIP = 'FIRST_MENTORSHIP',
  QUIZ_MASTER = 'QUIZ_MASTER',
  COMMUNITY_LEADER = 'COMMUNITY_LEADER'
}

export interface Badge {
  key: BadgeKey;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}


export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  xp: number;
  level: number;
  badges: BadgeKey[];
  completedCourseIds: string[];
  streak: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text';
  content: string; // URL for video, markdown text for text
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  modules: Module[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  avatar: string;
  bio: string;
}

export interface ForumComment {
  id: string;
  author: Pick<User, 'id' | 'name' | 'avatar'>;
  content: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: Pick<User, 'id' | 'name' | 'avatar'>;
  content: string;
  createdAt: string;
  upvotes: number;
  comments: ForumComment[];
}