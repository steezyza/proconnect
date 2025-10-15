
import { User, Course, Mentor, ForumPost, Badge, BadgeKey } from './types';
import { BookOpenIcon, ChatBubbleLeftRightIcon, AcademicCapIcon, SparklesIcon, TrophyIcon } from './components/Icons';

export const MOCK_USER: User = {
  id: 'user1',
  name: 'Alex Johnson',
  email: 'alex@proconnect.com',
  role: 'junior professional',
  avatar: 'https://picsum.photos/seed/alex/100/100',
  xp: 750,
  level: 7,
  badges: [BadgeKey.FIRST_COURSE, BadgeKey.FIRST_FORUM_POST],
  completedCourseIds: ['c1'],
  streak: 5,
};

export const BADGE_DEFINITIONS: Record<BadgeKey, Badge> = {
  [BadgeKey.FIRST_COURSE]: { key: BadgeKey.FIRST_COURSE, name: 'First Course', description: 'Completed your first course.', icon: BookOpenIcon },
  [BadgeKey.FIRST_FORUM_POST]: { key: BadgeKey.FIRST_FORUM_POST, name: 'Ice Breaker', description: 'Made your first forum post.', icon: ChatBubbleLeftRightIcon },
  [BadgeKey.FIRST_MENTORSHIP]: { key: BadgeKey.FIRST_MENTORSHIP, name: 'Wise Apprentice', description: 'Completed your first mentorship session.', icon: AcademicCapIcon },
  [BadgeKey.QUIZ_MASTER]: { key: BadgeKey.QUIZ_MASTER, name: 'Quiz Master', description: 'Passed 5 quizzes with a perfect score.', icon: SparklesIcon },
  [BadgeKey.COMMUNITY_LEADER]: { key: BadgeKey.COMMUNITY_LEADER, name: 'Community Leader', description: 'Received 50 upvotes in the forum.', icon: TrophyIcon },
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Advanced Auditing Techniques',
    category: 'Auditing',
    description: 'Deep dive into modern auditing practices and fraud detection.',
    thumbnail: 'https://picsum.photos/seed/audit/400/225',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Forensic Auditing',
        lessons: [{ id: 'l1', title: 'What is Forensic Auditing?', type: 'video', content: 'placeholder_video_url' }, { id: 'l2', title: 'Key Principles', type: 'text', content: 'Lorem ipsum dolor sit amet...' }],
        quiz: [{ question: 'What is the primary goal of forensic auditing?', options: ['Find errors', 'Detect fraud', 'Ensure compliance'], correctAnswer: 'Detect fraud' }],
      },
      {
        id: 'm2',
        title: 'Data Analytics in Auditing',
        lessons: [{ id: 'l3', title: 'Using AI for Anomaly Detection', type: 'video', content: 'placeholder_video_url' }],
        quiz: [{ question: 'Which tool is commonly used for data analytics in audit?', options: ['Excel', 'Tableau', 'Both'], correctAnswer: 'Both' }],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Corporate Finance Fundamentals',
    category: 'Finance',
    description: 'Master the core concepts of corporate finance and valuation.',
    thumbnail: 'https://picsum.photos/seed/finance/400/225',
    modules: [],
  },
  {
    id: 'c3',
    title: 'Taxation for Small Businesses',
    category: 'Tax',
    description: 'A comprehensive guide to navigating the complexities of SMB tax.',
    thumbnail: 'https://picsum.photos/seed/tax/400/225',
    modules: [],
  },
];

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Dr. Evelyn Reed',
    title: 'CFO, FinCorp',
    specialties: ['Corporate Finance', 'M&A'],
    avatar: 'https://picsum.photos/seed/evelyn/100/100',
    bio: '20+ years of experience in high-growth tech finance. Passionate about mentoring the next generation of financial leaders.',
  },
  {
    id: 'm2',
    name: 'James Carter',
    title: 'Senior Audit Partner, Global Auditors',
    specialties: ['Forensic Auditing', 'Risk Management'],
    avatar: 'https://picsum.photos/seed/james/100/100',
    bio: 'Expert in uncovering financial discrepancies and implementing robust internal controls. I help auditors think like detectives.',
  },
];

export const MOCK_LEADERBOARD: (Pick<User, 'id' | 'name' | 'avatar' | 'xp' | 'level'> & { rank: number })[] = [
  { rank: 1, id: 'user2', name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/priya/100/100', xp: 9800, level: 98 },
  { rank: 2, id: 'user3', name: 'Ben Carter', avatar: 'https://picsum.photos/seed/ben/100/100', xp: 9540, level: 95 },
  { rank: 3, id: 'user4', name: 'Chloe Kim', avatar: 'https://picsum.photos/seed/chloe/100/100', xp: 8900, level: 89 },
  { rank: 12, id: 'user1', name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/alex/100/100', xp: 750, level: 7 },
];


export const MOCK_FORUM_POSTS: ForumPost[] = [
    {
        id: 'p1',
        title: 'Best approach for auditing crypto assets?',
        author: { id: 'user2', name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/priya/100/100' },
        content: "With the rise of digital assets, what are some of the most effective and compliant ways you've found to audit cryptocurrency holdings for corporate clients? Looking for tools and methodologies.",
        createdAt: '2 days ago',
        upvotes: 42,
        comments: [
            { id: 'c1', author: { id: 'm2', name: 'James Carter', avatar: 'https://picsum.photos/seed/james/100/100' }, content: 'Great question. Chain analysis tools are a must. Also, focus on custody verification and internal controls around private keys.', createdAt: '1 day ago' },
            { id: 'c2', author: { id: 'user1', name: 'Alex Johnson', avatar: 'https://picsum.photos/seed/alex/100/100' }, content: "This is super helpful, thanks James!", createdAt: '2 hours ago' },
        ]
    }
];
