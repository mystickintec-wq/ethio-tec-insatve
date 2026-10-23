import { Project, Article, EventItem, Application, PlatformStats } from '../types.ts';

export async function fetchStats(): Promise<PlatformStats> {
  try {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  } catch (err) {
    console.warn('API error, using cached stats:', err);
    return {
      activeProjectsCount: 5,
      publishedArticlesCount: 5,
      totalApplicationsCount: 142,
      acceptedMembersCount: 140,
      upcomingEventsCount: 4,
      totalCommunityReach: 4850,
      partnerUniversities: 8,
    };
  }
}

export async function fetchProjects(category?: string): Promise<Project[]> {
  try {
    const url = category ? `/api/projects?category=${encodeURIComponent(category)}` : '/api/projects';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching projects:', err);
    return [];
  }
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create project');
  }
  return await res.json();
}

export async function fetchArticles(category?: string, search?: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`/api/articles${query}`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching articles:', err);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`/api/articles/${slug}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function createArticle(data: Partial<Article>): Promise<Article> {
  const res = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create article');
  }
  return await res.json();
}

export async function fetchEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch('/api/events');
    if (!res.ok) throw new Error('Failed to fetch events');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching events:', err);
    return [];
  }
}

export async function registerForEvent(id: string): Promise<{ success: boolean; event: EventItem }> {
  const res = await fetch(`/api/events/${id}/register`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to register for event');
  return await res.json();
}

export async function submitApplication(data: Omit<Application, 'id' | 'status' | 'submittedAt'>): Promise<{ success: boolean; applicationCode: string; application: Application }> {
  const res = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Application submission failed');
  }
  return await res.json();
}

export async function checkApplicationStatus(query: string): Promise<{
  id: string;
  fullName: string;
  institution: string;
  track: string;
  status: string;
  submittedAt: string;
  reviewerNotes: string | null;
}> {
  const res = await fetch(`/api/applications/status?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Application not found');
  }
  return await res.json();
}

export async function fetchAdminApplications(): Promise<Application[]> {
  const res = await fetch('/api/admin/applications');
  if (!res.ok) throw new Error('Failed to load applications');
  return await res.json();
}

export async function updateApplicationStatus(id: string, status: string, reviewerNotes?: string): Promise<Application> {
  const res = await fetch(`/api/admin/applications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, reviewerNotes }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return await res.json();
}

export async function askAIMentor(prompt: string): Promise<{ answer: string; sources?: string[] }> {
  const res = await fetch('/api/ai/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'AI Mentor query failed');
  }
  return await res.json();
}

export async function submitContact(data: { name: string; email: string; subject: string; category: string; message: string }): Promise<{ success: boolean; messageId: string }> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Message sending failed');
  }
  return await res.json();
}
