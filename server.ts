import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { dbStore } from './server/store.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Server-side Gemini AI Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Grounding prompt for EthioTech AI Mentor
const ETHIOTECH_SYSTEM_PROMPT = `You are the friendly, expert EthioTech AI Learning Mentor for "The EthioTech Initiative" (Tagline: "Innovation. Education. Leadership.") and its technology publication "ETHIOTECH INTEL" (Tagline: "Discover. Decode. Innovate.").

Your mission is to guide Ethiopian high school and university students, researchers, and budding software engineers. 

CRITICAL FORMATTING RULES (STRICTLY REQUIRED):
1. Make your answers very easy to understand, clear, friendly, and structured.
2. DO NOT use markdown formatting characters such as double asterisks (**), single asterisks (*), hyphens for bullet points (-), or hash signs (#).
3. Never output "**bold**" or "- list item" or "### Header". The user dislikes these raw signs.
4. Instead, write clean paragraphs with natural capitalization, clear sentence transitions, and use simple numbered lines (1. 2. 3.) or simple clean spacing.
5. Explain technical concepts in intuitive terms before diving into code or architecture, making them welcoming for beginners while informative for advanced developers.

Domain knowledge to draw upon:
1. Core Engineering: Distributed systems, web frameworks, machine learning, robotics (ROS 2, ESP32 microcontrollers), and cybersecurity.
2. EthioTech Initiative Flagships:
   - Guzo AI: Multimodal urban mobility and transit route prediction for Addis Ababa (buses, minibus taxis, LRT).
   - AgriTech Vision: Edge computer vision diagnosing teff, coffee, and maize diseases for smallholder farmers.
   - EthioLinguistic NLP Core: Low-resource tokenization and semantic NLP for Amharic, Afaan Oromo, and Tigrinya.
   - EthioTelematics LoRa Mesh: Solar-powered microclimate telemetry grids.
   - Unified FinTech SDK: Payment abstractions for Telebirr, CBE Birr, and Chapa.
3. Ethiopian Technology Ecosystem: Digital Ethiopia 2025/2030, Ethiopian Artificial Intelligence Institute (EAII), local tech communities across Addis Ababa, Adama, Hawassa, Mekelle, and Bahir Dar.
4. Membership and Tracks: Joining via the Apply tab, selecting tracks in AI and Machine Learning, Cloud and Systems, Robotics and Embedded Systems, or Cybersecurity.`;

// API Routes

// Stats
app.get('/api/stats', (_req: Request, res: Response) => {
  res.json(dbStore.getStats());
});

// Projects
app.get('/api/projects', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const status = req.query.status as string | undefined;
  res.json(dbStore.getProjects(category, status));
});

app.get('/api/projects/:id', (req: Request, res: Response) => {
  const project = dbStore.getProjectById(req.params.id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(project);
});

app.post('/api/projects', (req: Request, res: Response) => {
  try {
    const { title, tagline, description, category, status, technologies, githubUrl, demoUrl, lead, featured } = req.body;
    if (!title || !description || !category) {
      res.status(400).json({ error: 'Missing required project fields' });
      return;
    }
    const created = dbStore.createProject({
      title,
      tagline: tagline || '',
      description,
      category,
      status: status || 'Active Development',
      technologies: Array.isArray(technologies) ? technologies : [],
      githubUrl,
      demoUrl,
      lead: lead || 'EthioTech Engineering Guild',
      featured: Boolean(featured),
    });
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', (req: Request, res: Response) => {
  const updated = dbStore.updateProject(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  const success = dbStore.deleteProject(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json({ success: true });
});

// Articles (ETHIOTECH INTEL)
app.get('/api/articles', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const search = req.query.search as string | undefined;
  res.json(dbStore.getArticles(category, search));
});

app.get('/api/articles/:slug', (req: Request, res: Response) => {
  const article = dbStore.getArticleBySlug(req.params.slug);
  if (!article) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  res.json(article);
});

app.post('/api/articles', (req: Request, res: Response) => {
  try {
    const { title, category, summary, content, author, readTimeMinutes, tags, featured } = req.body;
    if (!title || !category || !content) {
      res.status(400).json({ error: 'Missing required article fields' });
      return;
    }
    const created = dbStore.createArticle({
      title,
      category,
      summary: summary || '',
      content,
      author: author || {
        name: 'ETHIOTECH INTEL Contributor',
        role: 'Research Fellow',
        institution: 'The EthioTech Initiative',
      },
      readTimeMinutes: Number(readTimeMinutes) || 5,
      tags: Array.isArray(tags) ? tags : ['Technology'],
      featured: Boolean(featured),
      slug: '',
    });
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/articles/:slug', (req: Request, res: Response) => {
  const updated = dbStore.updateArticle(req.params.slug, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  res.json(updated);
});

app.delete('/api/articles/:slug', (req: Request, res: Response) => {
  const success = dbStore.deleteArticle(req.params.slug);
  if (!success) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  res.json({ success: true });
});

// Events
app.get('/api/events', (_req: Request, res: Response) => {
  res.json(dbStore.getEvents());
});

app.post('/api/events', (req: Request, res: Response) => {
  try {
    const { title, type, date, time, location, description, capacity } = req.body;
    if (!title || !date || !location) {
      res.status(400).json({ error: 'Missing required event fields' });
      return;
    }
    const created = dbStore.createEvent({
      title,
      type: type || 'Workshop',
      date,
      time: time || '09:00 AM EAT',
      location,
      description: description || '',
      registrationOpen: true,
      capacity: Number(capacity) || 100,
    });
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events/:id/register', (req: Request, res: Response) => {
  const updated = dbStore.registerForEvent(req.params.id);
  if (!updated) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }
  res.json({ success: true, event: updated });
});

// Applications
app.post('/api/applications', (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, institution, fieldOfStudy, graduationYear, track, experienceLevel, githubUrl, portfolioUrl, statement } = req.body;
    
    if (!fullName || !email || !institution || !track || !statement) {
      res.status(400).json({ error: 'Please provide all required application fields' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email address format' });
      return;
    }

    const application = dbStore.createApplication({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      institution: institution.trim(),
      fieldOfStudy: fieldOfStudy?.trim() || 'Computer Science / Engineering',
      graduationYear: graduationYear || '2027',
      track,
      experienceLevel: experienceLevel || 'Intermediate',
      githubUrl: githubUrl?.trim(),
      portfolioUrl: portfolioUrl?.trim(),
      statement: statement.trim(),
    });

    res.status(201).json({
      success: true,
      applicationCode: application.id,
      application,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/applications/status', (req: Request, res: Response) => {
  const query = req.query.query as string | undefined;
  if (!query) {
    res.status(400).json({ error: 'Query parameter required (application code or email)' });
    return;
  }
  const appMatch = dbStore.getApplicationByCode(query);
  if (!appMatch) {
    res.status(404).json({ error: 'No application record found matching provided code or email' });
    return;
  }
  // Return non-sensitive status preview
  res.json({
    id: appMatch.id,
    fullName: appMatch.fullName,
    institution: appMatch.institution,
    track: appMatch.track,
    status: appMatch.status,
    submittedAt: appMatch.submittedAt,
    reviewerNotes: appMatch.reviewerNotes || null,
  });
});

// Admin Applications Management
app.get('/api/admin/applications', (_req: Request, res: Response) => {
  res.json(dbStore.getApplications());
});

app.put('/api/admin/applications/:id', (req: Request, res: Response) => {
  const { status, reviewerNotes } = req.body;
  if (!status) {
    res.status(400).json({ error: 'Status is required' });
    return;
  }
  const updated = dbStore.updateApplicationStatus(req.params.id, status, reviewerNotes);
  if (!updated) {
    res.status(404).json({ error: 'Application not found' });
    return;
  }
  res.json(updated);
});

// Contact Inquiries
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, subject, category, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' });
      return;
    }
    const created = dbStore.createContact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'General Inquiry',
      category: category || 'General Inquiry',
      message: message.trim(),
    });
    res.status(201).json({ success: true, messageId: created.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Community Introductions
app.get('/api/community/intros', (_req: Request, res: Response) => {
  res.json(dbStore.getIntros());
});

app.post('/api/community/intros', (req: Request, res: Response) => {
  try {
    const { name, skills, interests, contribution, learningGoals } = req.body;
    if (!name || !skills || !interests) {
      res.status(400).json({ error: 'Name, skills, and interests are required' });
      return;
    }
    const created = dbStore.createIntro({
      name: name.trim(),
      skills: skills.trim(),
      interests: interests.trim(),
      contribution: (contribution || '').trim(),
      learningGoals: (learningGoals || '').trim(),
    });
    res.status(201).json(created);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// AI Learning Assistant (Gemini 3.8 Flash with Multi-turn history and Google Search Grounding)
app.post('/api/ai/ask', async (req: Request, res: Response) => {
  try {
    const { prompt, conversationHistory, useSearch } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Valid prompt string is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.json({
        answer: `Hello! I am the EthioTech AI Mentor. I am currently running in local demonstration mode. I can assist you with our flagship initiatives:

1. Guzo AI: Our multimodal transit engine modeling Addis Ababa minibus networks, Anbessa buses, and Light Rail Transit.
2. AgriTech Vision: Edge computer vision models detecting crop diseases for teff and coffee smallholders.
3. EthioLinguistic NLP: Tokenization and embedding architectures for Amharic and Afaan Oromo.
4. Student Chapters and Application: Guidance on submitting your membership application and joining our technical tracks.`,
        sources: ['EthioTech Curricula 2026', 'ETHIOTECH INTEL Research Archive'],
      });
      return;
    }

    // Build multi-turn context
    let contents: any[] = [];
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        if (msg.role && msg.text) {
          contents.push({
            role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.text }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: prompt.trim() }],
    });

    try {
      const config: any = {
        systemInstruction: ETHIOTECH_SYSTEM_PROMPT,
      };

      // Enable Google Search Grounding for current external queries or when requested
      const shouldSearch = useSearch ?? (prompt.toLowerCase().includes('search') || prompt.toLowerCase().includes('news') || prompt.toLowerCase().includes('latest') || prompt.toLowerCase().includes('ethiopia 2026'));
      const tools = shouldSearch ? [{ googleSearch: {} }] : undefined;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config,
        ...(tools ? { tools } : {}),
      });

      const answer = response.text || 'I could not generate an answer at this time.';
      
      // Extract grounding sources if available
      const sources: string[] = ['The EthioTech Initiative Knowledge Base', 'ETHIOTECH INTEL Technical Papers'];
      const searchChunks = (response.candidates?.[0] as any)?.groundingMetadata?.groundingChunks;
      if (Array.isArray(searchChunks)) {
        for (const chunk of searchChunks) {
          if (chunk.web?.title && chunk.web?.uri) {
            sources.push(`${chunk.web.title} (${chunk.web.uri})`);
          }
        }
      }

      res.json({
        answer,
        sources: Array.from(new Set(sources)),
      });
    } catch (apiErr: any) {
      console.warn('Gemini upstream call fallback:', apiErr.message);
      
      const queryLower = prompt.toLowerCase();
      let contextualAnswer = '';

      if (queryLower.includes('guzo')) {
        contextualAnswer = `Guzo AI is our urban transit intelligence platform tailored specifically for Addis Ababa commuters and transport planners.

Here is how it works:

1. Multimodal Route Planning: It connects data across Anbessa City Buses, Sheger express buses, the Addis Ababa Light Rail Transit, and local minibus taxi terminals like Mexico, Megenagna, Merkato, and Bole.

2. Smart Traffic Prediction: It analyzes daily traffic patterns across major avenues to estimate accurate arrival times and avoid crowded choke points.

3. Works Even Offline: Because mobile data can fluctuate, Guzo AI caches route maps and schedules on your device, allowing you to find transit options even with low connectivity.

Project Lead: Eskinder Tilahun from Addis Ababa University and the EthioTech AI and Mobility Department.`;
      } else if (queryLower.includes('agri') || queryLower.includes('crop') || queryLower.includes('disease') || queryLower.includes('teff')) {
        contextualAnswer = `AgriTech Vision is our computer vision project built to help Ethiopian farmers protect their crops early.

Key details:

1. Targeted Crop Diseases: The system is trained on over 45,000 photos of local crops, detecting teff leaf rust, coffee berry disease, and maize streak virus directly in the field.

2. Runs on Basic Smartphones: The models are optimized and compressed so they run fast on everyday Android phones without needing internet access in rural farmland.

3. Proven in Field Trials: Student teams tested the system with farming cooperatives near Bishoftu and the Rift Valley with high diagnostic accuracy.

Project Lead: Bethlehem Haile from Adama Science and Technology University.`;
      } else if (queryLower.includes('nlp') || queryLower.includes('amharic') || queryLower.includes('token') || queryLower.includes('language')) {
        contextualAnswer = `The EthioLinguistic NLP Core is our research project solving language barriers in artificial intelligence for Ethiopian languages.

Why it matters:

1. The Script Challenge: Standard international language models were designed for the Latin alphabet, which causes them to split Amharic and Geʽez words inefficiently into small fragments, making models slower and more expensive to run.

2. The GAVE Solution: Our team engineered the Geʽez-Aware Vocabulary Extension to respect Amharic Fidel syllabics, speeding up text generation and cutting token costs significantly.

3. Open Datasets: We publish open benchmarks and training datasets for Amharic, Afaan Oromo, and Tigrinya so all student builders can create language tools.

Project Lead: Yared Mengistu from Addis Ababa Science and Technology University.`;
      } else if (queryLower.includes('join') || queryLower.includes('apply') || queryLower.includes('track') || queryLower.includes('membership')) {
        contextualAnswer = `Joining The EthioTech Initiative is straightforward and open to enthusiastic learners.

How to get started:

1. Submit Your Application: Click on the Apply tab in the top navigation bar. Fill in your name, school or university, and your interests. You can also sign in with Google to prefill your information.

2. Choose Your Focus Track:
Track 1: Artificial Intelligence and Machine Learning (Computer vision, speech recognition, and natural language processing)
Track 2: Full-Stack and Cloud Systems (Web applications, offline databases, and distributed software)
Track 3: Robotics and Embedded Systems (Microcontrollers, hardware sensors, and smart automation)
Track 4: Cybersecurity and Networks (System defense, ethical hacking, and network resilience)

3. Track Your Status: After submitting, you get a unique tracking code such as ET-2026-XXXX to monitor your admission review anytime.`;
      } else {
        contextualAnswer = `Welcome! As the EthioTech AI Mentor, I am here to help you learn, explore engineering concepts, and discover practical tech projects in Ethiopia.

Our core learning principles:

1. Building For Real Impact: We turn classroom theory into working software, from transit tools like Guzo AI to agricultural vision apps and language models.

2. Offline-First Engineering: We build technology designed to withstand power outages and spotty network conditions.

3. Student Collaboration: We connect learners across Holy Trinity Cathedral School, Addis Ababa University, Adama Science and Technology University, and other schools nationwide.

Feel free to ask any question about programming, algorithms, machine learning, or how to get involved in our technical teams!`;
      }

      res.json({
        answer: contextualAnswer,
        sources: ['The EthioTech Initiative Knowledge Base', 'ETHIOTECH INTEL Technical Papers'],
      });
    }
  } catch (err: any) {
    console.error('Fatal AI route error:', err);
    res.status(500).json({ error: 'Internal server error in AI mentor route' });
  }
});

// Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`The EthioTech Initiative full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
