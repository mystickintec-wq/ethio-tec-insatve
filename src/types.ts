export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI & Machine Learning' | 'AgriTech & Robotics' | 'Systems & Cloud' | 'IoT & Telematics' | 'FinTech & DevTools';
  status: 'Active Development' | 'Pilot Research' | 'Deployed';
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  lead: string;
  featured: boolean;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'AI & ML' | 'Engineering' | 'Cybersecurity' | 'Robotics' | 'Ecosystem & News' | 'Opportunities';
  summary: string;
  content: string;
  author: {
    name: string;
    role: string;
    institution: string;
  };
  readTimeMinutes: number;
  publishedAt: string;
  tags: string[];
  featured: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Hackathon' | 'Workshop' | 'Symposium' | 'Tech Talk';
  date: string;
  time: string;
  location: string;
  description: string;
  registrationOpen: boolean;
  capacity: number;
  registeredCount: number;
}

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear: string;
  track: 'AI & Machine Learning' | 'Full-Stack & Cloud Systems' | 'Robotics, IoT & Embedded' | 'Cybersecurity & Networks';
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  githubUrl?: string;
  portfolioUrl?: string;
  statement: string;
  status: 'Pending Review' | 'Shortlisted' | 'Accepted' | 'Archived';
  reviewerNotes?: string;
  submittedAt: string;
}

export interface PlatformStats {
  activeProjectsCount: number;
  publishedArticlesCount: number;
  totalApplicationsCount: number;
  acceptedMembersCount: number;
  upcomingEventsCount: number;
  totalCommunityReach: number;
  partnerUniversities: number;
}
