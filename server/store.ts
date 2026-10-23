import fs from 'fs';
import path from 'path';

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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: 'Partnership' | 'University Chapter' | 'Press & Media' | 'General Inquiry';
  message: string;
  receivedAt: string;
}

export interface CommunityIntro {
  id: string;
  name: string;
  skills: string;
  interests: string;
  contribution: string;
  learningGoals: string;
  createdAt: string;
}

export interface DatabaseState {
  projects: Project[];
  articles: Article[];
  events: EventItem[];
  applications: Application[];
  contacts: ContactMessage[];
  intros: CommunityIntro[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'ethiotech_db.json');

const INITIAL_DATA: DatabaseState = {
  projects: [
    {
      id: 'guzo-ai',
      title: 'Guzo AI — Urban Transit & Mobility Engine',
      tagline: 'Multimodal AI route optimization and crowd-telemetry for Addis Ababa transit networks.',
      description: 'Guzo AI is an intelligent routing and public transit platform specifically architected for the unique mobility dynamics of Addis Ababa. It combines real-time bus telemetry, minibus taxi route indexing, and Light Rail Transit (LRT) scheduling into a unified low-bandwidth offline-first mobile and web application. Incorporates graph neural networks to predict congestion bottlenecks along major arteries such as Bole Road, Mexico Square, and Megenagna interchange.',
      category: 'AI & Machine Learning',
      status: 'Active Development',
      technologies: ['Python', 'PyTorch', 'FastAPI', 'React', 'OpenStreetMap', 'WebSockets'],
      githubUrl: 'https://github.com/ethiotech-initiative/guzo-ai',
      demoUrl: 'https://guzo-ai-preview.ethiotech.org',
      lead: 'Eskinder Tilahun (AI/ML Lead, AAU)',
      featured: true,
      createdAt: '2026-02-10T08:00:00Z',
    },
    {
      id: 'agritech-vision',
      title: 'AgriTech Vision — Edge Disease Diagnostic System',
      tagline: 'Offline-capable computer vision models identifying crop pathology for Ethiopian smallholders.',
      description: 'An edge-deployed computer vision model trained on over 45,000 field images of Ethiopian staple crops, with specific high-accuracy detection for teff leaf rust, coffee berry disease, and maize streak virus. Operates on quantized ONNX runtimes on budget Android devices and solar-powered edge cameras without requiring an active cellular connection.',
      category: 'AgriTech & Robotics',
      status: 'Pilot Research',
      technologies: ['TensorFlow Lite', 'YOLOv11-Nano', 'Flutter', 'Python', 'ONNX Runtime'],
      githubUrl: 'https://github.com/ethiotech-initiative/agritech-vision',
      lead: 'Bethlehem Haile (Robotics & Vision Fellow, ASTU)',
      featured: true,
      createdAt: '2026-01-18T10:30:00Z',
    },
    {
      id: 'amharic-nlp-core',
      title: 'EthioLinguistic NLP Core',
      tagline: 'High-performance tokenizers and semantic embedding spaces for Amharic and Afaan Oromo.',
      description: 'A dedicated low-resource natural language initiative developing domain-specific foundational tokenizers, morphological stemmers, and multilingual semantic search models for Ethiopian legal documents, technical literature, and healthcare advisory systems.',
      category: 'AI & Machine Learning',
      status: 'Active Development',
      technologies: ['Hugging Face Transformers', 'PyTorch', 'Rust Tokenizers', 'FastAPI'],
      githubUrl: 'https://github.com/ethiotech-initiative/ethio-nlp-core',
      lead: 'Yared Mengistu (NLP Lead, AASTU)',
      featured: true,
      createdAt: '2026-03-05T14:15:00Z',
    },
    {
      id: 'ethio-telematics-grid',
      title: 'EthioTelematics LoRa Mesh',
      tagline: 'Long-range decentralized sensor networks monitoring microclimate and agricultural zones.',
      description: 'Custom hardware PCB designs and firmware for low-power LoRa mesh nodes deployed across agricultural test fields in Bishoftu and university campuses. Provides real-time soil moisture, temperature, and ambient humidity telemetry over multi-kilometer ranges using solar scavenging.',
      category: 'IoT & Telematics',
      status: 'Deployed',
      technologies: ['ESP32', 'LoRaWAN', 'FreeRTOS', 'C++', 'Grafana', 'MQTT'],
      githubUrl: 'https://github.com/ethiotech-initiative/telematics-mesh',
      lead: 'Dawit Bekele (Hardware & Embedded Systems)',
      featured: false,
      createdAt: '2025-11-20T09:00:00Z',
    },
    {
      id: 'chapa-telebirr-sdk',
      title: 'Unified Ethiopian FinTech SDK',
      tagline: 'Type-safe multi-gateway developer kit integrating Telebirr, CBE Birr, and Chapa APIs.',
      description: 'An open-source developer toolsuite reducing Ethiopian payment gateway integration times from weeks to hours. Provides full idempotency checks, automated webhook verification, and mock sandbox testing environments for software teams.',
      category: 'FinTech & DevTools',
      status: 'Deployed',
      technologies: ['TypeScript', 'Node.js', 'Go', 'Docker', 'Jest'],
      githubUrl: 'https://github.com/ethiotech-initiative/ethio-fintech-sdk',
      lead: 'Nahom Alemayehu (Cloud Infrastructure Lead)',
      featured: false,
      createdAt: '2026-02-28T16:45:00Z',
    },
  ],
  articles: [
    {
      id: 'low-resource-nlp-frontier',
      title: 'Decoding Large Language Models for Low-Resource Languages: The Ethiopian Linguistic Frontier',
      slug: 'low-resource-nlp-frontier',
      category: 'AI & ML',
      summary: 'An architectural exploration of Geʽez script tokenization bottlenecks, sub-word boundary fragmentation, and cross-lingual transfer learning for Amharic and Afaan Oromo.',
      content: `## The Tokenization Bottleneck in Ethiopic Scripts

Natural language processing models have achieved staggering general capabilities, yet their performance on Ethiopian languages often suffers from severe **token inflation**. Because standard byte-pair encoding (BPE) vocabularies are heavily biased toward Latin-script corpora, an Amharic or Tigrinya sentence routinely fragments into 3x to 5x more sub-word tokens than its English equivalent.

### Architectural Implications
1. **Context Window Shrinkage:** A 4,096-token context window that comfortably holds 3,000 English words can only process ~800 Amharic words before truncation.
2. **Computational Cost Multiplier:** Training and inference latency scales quadratically with sequence length in standard attention mechanisms.
3. **Loss of Semantic Integrity:** Splitting complex Fidel syllables across arbitrary byte boundaries damages morphological coherence.

### The EthioTech Linguistic Strategy
The EthioTech Initiative NLP team implemented a specialized **Geʽez-Aware Vocabulary Extension (GAVE)**. By training morphological tokenizers tailored to Fidel phonetics and root-and-pattern Semitic morphology, our team reduced the average tokens-per-word ratio from 4.12 down to 1.34 on the standard Ethiopian legal corpus.

We are actively open-sourcing our benchmark datasets and tokenizer weights through the **ETHIOTECH INTEL** repository.`,
      author: {
        name: 'Yared Mengistu',
        role: 'Research Lead, EthioNLP Division',
        institution: 'AASTU & The EthioTech Initiative',
      },
      readTimeMinutes: 6,
      publishedAt: '2026-03-12T09:00:00Z',
      tags: ['Natural Language Processing', 'Amharic', 'Tokenization', 'Machine Learning'],
      featured: true,
    },
    {
      id: 'resilient-microservices-infrastructure',
      title: 'Building Resilient Distributed Systems Under Bandwidth Constrained Networks',
      slug: 'resilient-microservices-infrastructure',
      category: 'Engineering',
      summary: 'Engineering patterns for intermittent connectivity: local-first state, delta synchronization, and offline-resilient RPC layers for Ethiopian software engineering.',
      content: `## Designing for Real-World African Network Topology

Building software systems that assume 99.999% persistent fiber connectivity is a guaranteed recipe for user frustration in developing markets. Between fiber cuts, electrical outages, and fluctuating cellular throughput, engineering teams must adopt **Local-First Resilient Architecture**.

### Fundamental Principles
- **State on the Device First:** Every critical mutation is persisted to SQLite or IndexedDB before network dispatch.
- **Conflict-Free Replicated Data Types (CRDTs):** Merging offline concurrent edits without server lock-ins.
- **Binary Delta Payloads:** Replacing bloated JSON envelopes with Protocol Buffers or MessagePack to cut mobile data expenses for users by over 70%.

### Case Study: Guzo AI Sync Engine
In Guzo AI, transit tracking nodes transmit compressed 16-byte telemetry pulses via UDP/CoAP rather than heavy HTTP handshakes. When passing through network dead zones, nodes queue updates and execute monotonic vector-clock merges once back in cell range.`,
      author: {
        name: 'Nahom Alemayehu',
        role: 'Systems Architecture Lead',
        institution: 'The EthioTech Initiative',
      },
      readTimeMinutes: 5,
      publishedAt: '2026-03-01T11:30:00Z',
      tags: ['Distributed Systems', 'Offline-First', 'Performance', 'Network Engineering'],
      featured: true,
    },
    {
      id: 'autonomous-robotics-in-agriculture',
      title: 'Autonomous Robotics in Precision Agriculture: Field Testing in the Ethiopian Rift Valley',
      slug: 'autonomous-robotics-in-agriculture',
      category: 'Robotics',
      summary: 'Deploying edge computer vision and low-cost solar robotics for targeted weeding and crop pathology diagnostics across Ethiopian agricultural cooperatives.',
      content: `## From University Lab to Rift Valley Farmland

While advanced agricultural automation often costs tens of thousands of dollars per unit, our Robotics & IoT Department set out to prove that functional agricultural robotics can be manufactured from locally accessible components, 3D printed housings, and low-cost microcontrollers.

### Field Deployment Results
During our 3-week pilot near Bishoftu, our autonomous crawler prototype achieved:
- **91.4% Accuracy** in real-time distinguishing between weed varieties and early-stage teff sprouts.
- **6.5 Hours** continuous field endurance powered by dual monocrystalline solar panels and LiFePO4 cells.
- Zero reliance on cloud connectivity for real-time motor actuation and nozzle targeting.`,
      author: {
        name: 'Bethlehem Haile',
        role: 'Lead Robotics Engineer',
        institution: 'ASTU & EthioTech Initiative',
      },
      readTimeMinutes: 7,
      publishedAt: '2026-02-18T14:00:00Z',
      tags: ['Robotics', 'AgriTech', 'Computer Vision', 'Embedded Systems'],
      featured: true,
    },
    {
      id: 'defensive-cyber-critical-infra',
      title: 'Defensive Cyber Operations in 2026: Securing Critical Infrastructure in the Horn of Africa',
      slug: 'defensive-cyber-critical-infra',
      category: 'Cybersecurity',
      summary: 'A deep-dive into zero-trust access controls, ICS/SCADA security posture, and sovereign threat intelligence modeling for emerging digital economies.',
      content: `## The Modern Threat Landscape for Developing Nations

As financial transactions, energy grids, and government services rapidly digitize across Ethiopia, cybersecurity shifts from an IT afterthought to an essential pillar of national sovereignty.

### Critical Focus Areas
1. **SCADA and Energy Telemetry Protection:** Hardening substation protocols against unauthorized command injection.
2. **FinTech Fraud Detection:** Behavioral anomaly modeling across mobile money ecosystems like Telebirr and CBE Birr.
3. **Talent Pipeline Growth:** Why university CTF competitions and open-source security toolkits are vital to bridging Ethiopia's security specialist gap.`,
      author: {
        name: 'Kidus Solomon',
        role: 'Security Research Fellow',
        institution: 'EthioTech Cybersecurity Guild',
      },
      readTimeMinutes: 8,
      publishedAt: '2026-01-25T16:00:00Z',
      tags: ['Cybersecurity', 'Zero Trust', 'Threat Intelligence', 'FinTech Security'],
      featured: false,
    },
    {
      id: 'ethiopian-tech-startups-2026',
      title: 'The State of Ethiopian Tech Startups 2026: Developer Density, Capital, and Policy Shifts',
      slug: 'ethiopian-tech-startups-2026',
      category: 'Ecosystem & News',
      summary: 'An in-depth analysis of Ethiopia’s startup proclamation, capital growth, and the rising density of engineering graduates building global solutions.',
      content: `## A Historic Inflection Point

Ethiopia is experiencing unprecedented growth in software developer density. With nationwide investments in fiber infrastructure, the expansion of tech hubs in Addis Ababa, Hawassa, and Adama, and progressive reforms in startup regulations, the foundation for sustainable tech entrepreneurship is solidifying.

Key trends observed:
- Over 140,000 university students actively enrolled in STEM tracks nationwide.
- Rapid emergence of local developer communities driving open-source tooling.
- Deepening collaboration between university research labs and commercial enterprises.`,
      author: {
        name: 'ETHIOTECH INTEL Editorial Board',
        role: 'Editorial & Research Committee',
        institution: 'The EthioTech Initiative',
      },
      readTimeMinutes: 4,
      publishedAt: '2026-03-10T10:00:00Z',
      tags: ['Startups', 'Ecosystem', 'Policy', 'Tech Growth'],
      featured: false,
    },
  ],
  events: [
    {
      id: 'ethio-ai-hackathon-2026',
      title: 'EthioTech National AI Hackathon 2026',
      type: 'Hackathon',
      date: 'May 15–17, 2026',
      time: '09:00 AM EAT (48 Hours)',
      location: 'Addis Ababa University, 4-Kilo Campus (ICT Hall) & Hybrid',
      description: 'Join over 300 student engineers and researchers building innovative AI solutions for Ethiopian transit, agriculture, health diagnostics, and education. Mentorship by senior engineers and seed project grants for top finalists.',
      registrationOpen: true,
      capacity: 350,
      registeredCount: 218,
    },
    {
      id: 'robotics-embedded-bootcamp',
      title: 'Hands-on Embedded Systems & ROS 2 Workshop',
      type: 'Workshop',
      date: 'April 26, 2026',
      time: '02:00 PM – 06:00 PM EAT',
      location: 'Adama Science & Technology University (ASTU) MakerLab',
      description: 'Intensive hardware workshop covering ESP32 microcontrollers, motor drive kinematics, sensor fusion, and ROS 2 middleware basics. Hardware kits provided for all attendees.',
      registrationOpen: true,
      capacity: 60,
      registeredCount: 54,
    },
    {
      id: 'intel-future-compute-symposium',
      title: 'ETHIOTECH INTEL Symposium: The Future of Compute',
      type: 'Symposium',
      date: 'June 05, 2026',
      time: '10:00 AM – 04:30 PM EAT',
      location: 'Science Museum Auditorium, Addis Ababa & YouTube Live',
      description: 'Annual gathering of faculty, researchers, industry pioneers, and student innovators discussing foundational AI models, sovereign compute clusters, and tech entrepreneurship in the Horn of Africa.',
      registrationOpen: true,
      capacity: 500,
      registeredCount: 312,
    },
    {
      id: 'university-ctf-championship',
      title: 'All-Ethiopia Inter-University CTF Tournament',
      type: 'Tech Talk',
      date: 'June 20, 2026',
      time: '01:00 PM – 08:00 PM EAT',
      location: 'Virtual Platform (EthioTech Cyber Arena)',
      description: 'Capture-the-flag cybersecurity competition testing cryptography, reverse engineering, web application security, and forensics across 24 university teams.',
      registrationOpen: true,
      capacity: 200,
      registeredCount: 145,
    },
  ],
  applications: [
    {
      id: 'ET-2026-9104',
      fullName: 'Amanuel Girma',
      email: 'amanuel.girma@example.edu.et',
      phone: '+251 91 123 4567',
      institution: 'Addis Ababa University',
      fieldOfStudy: 'Electrical & Computer Engineering',
      graduationYear: '2027',
      track: 'AI & Machine Learning',
      experienceLevel: 'Intermediate',
      githubUrl: 'https://github.com/amanuel-girma',
      portfolioUrl: 'https://amanuel.dev',
      statement: 'I am deeply passionate about applying reinforcement learning to optimize public transit scheduling in Addis Ababa. I have built several computer vision projects in Python and PyTorch and want to collaborate with the Guzo AI team.',
      status: 'Shortlisted',
      reviewerNotes: 'Strong portfolio in PyTorch. Scheduled for technical interview with Eskinder.',
      submittedAt: '2026-03-14T11:20:00Z',
    },
    {
      id: 'ET-2026-8841',
      fullName: 'Selamawit Kebede',
      email: 'selam.kebede@example.edu.et',
      phone: '+251 92 888 9911',
      institution: 'Adama Science & Technology University',
      fieldOfStudy: 'Software Engineering',
      graduationYear: '2026',
      track: 'Full-Stack & Cloud Systems',
      experienceLevel: 'Advanced',
      githubUrl: 'https://github.com/selam-k',
      statement: 'Active contributor to open-source developer tooling and distributed database engines. Want to lead backend microservices infrastructure for EthioTech initiatives.',
      status: 'Accepted',
      reviewerNotes: 'Accepted to Systems & Cloud Department. Assigned onboarding mentor.',
      submittedAt: '2026-03-08T09:45:00Z',
    },
  ],
  contacts: [
    {
      id: 'MSG-001',
      name: 'Dr. Tesfaye Desta',
      email: 'tdesta@tech-faculty.aau.edu.et',
      subject: 'University Lab Partnership with EthioTech',
      category: 'University Chapter',
      message: 'We are keen to establish an official EthioTech Initiative student research chapter within our department at AAU 4-Kilo campus. Let us schedule a coordination call.',
      receivedAt: '2026-03-15T15:00:00Z',
    },
  ],
  intros: [
    {
      id: 'intro-001',
      name: 'Amen Daod',
      skills: 'Systems Architecture, Distributed Algorithms, Hardware',
      interests: 'Autonomous Robotics, Open-Source Infrastructure, Ethiopian Tech',
      contribution: 'Guiding student fellows and architecting community engineering roadmaps.',
      learningGoals: 'Advancing multi-robot swarm communication in the Rift Valley.',
      createdAt: '2026-03-01T08:00:00Z',
    },
    {
      id: 'intro-002',
      name: 'Selamawit Tadesse',
      skills: 'Python, PyTorch, React, Computer Vision',
      interests: 'AgriTech Vision, Teff disease diagnosis, Deep Learning',
      contribution: 'Contributing field dataset annotations and edge quantization tests.',
      learningGoals: 'Optimizing INT8 quantized ONNX models for mobile browsers.',
      createdAt: '2026-03-10T12:00:00Z',
    },
  ],
};

class Store {
  private data: DatabaseState;

  constructor() {
    this.data = this.loadData();
    if (!this.data.intros) {
      this.data.intros = INITIAL_DATA.intros;
    }
  }

  private loadData(): DatabaseState {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (!parsed.intros) parsed.intros = INITIAL_DATA.intros;
        return parsed;
      }
    } catch (err) {
      console.error('Failed to load database from disk, using initial seed:', err);
    }
    // Write initial seed
    this.saveData(INITIAL_DATA);
    return INITIAL_DATA;
  }

  private saveData(data: DatabaseState): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database to disk:', err);
    }
  }

  // Projects
  getProjects(category?: string, status?: string): Project[] {
    return this.data.projects.filter((p) => {
      if (category && p.category !== category) return false;
      if (status && p.status !== status) return false;
      return true;
    });
  }

  getProjectById(id: string): Project | undefined {
    return this.data.projects.find((p) => p.id === id);
  }

  createProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
    const newProject: Project = {
      ...project,
      id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: new Date().toISOString(),
    };
    this.data.projects.unshift(newProject);
    this.saveData(this.data);
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.data.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.data.projects[index] = { ...this.data.projects[index], ...updates };
    this.saveData(this.data);
    return this.data.projects[index];
  }

  deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    if (this.data.projects.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Articles (ETHIOTECH INTEL)
  getArticles(category?: string, search?: string): Article[] {
    return this.data.articles.filter((a) => {
      if (category && a.category !== category) return false;
      if (search) {
        const query = search.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(query);
        const matchesSummary = a.summary.toLowerCase().includes(query);
        const matchesTags = a.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSummary && !matchesTags) return false;
      }
      return true;
    });
  }

  getArticleBySlug(slug: string): Article | undefined {
    return this.data.articles.find((a) => a.slug === slug || a.id === slug);
  }

  createArticle(article: Omit<Article, 'id' | 'publishedAt'>): Article {
    const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newArticle: Article = {
      ...article,
      id: slug,
      slug: slug,
      publishedAt: new Date().toISOString(),
    };
    this.data.articles.unshift(newArticle);
    this.saveData(this.data);
    return newArticle;
  }

  updateArticle(slug: string, updates: Partial<Article>): Article | null {
    const index = this.data.articles.findIndex((a) => a.slug === slug || a.id === slug);
    if (index === -1) return null;
    this.data.articles[index] = { ...this.data.articles[index], ...updates };
    this.saveData(this.data);
    return this.data.articles[index];
  }

  deleteArticle(slug: string): boolean {
    const initialLen = this.data.articles.length;
    this.data.articles = this.data.articles.filter((a) => a.slug !== slug && a.id !== slug);
    if (this.data.articles.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // Events
  getEvents(): EventItem[] {
    return this.data.events;
  }

  createEvent(event: Omit<EventItem, 'id' | 'registeredCount'>): EventItem {
    const newEvent: EventItem = {
      ...event,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
    };
    this.data.events.push(newEvent);
    this.saveData(this.data);
    return newEvent;
  }

  registerForEvent(id: string): EventItem | null {
    const evt = this.data.events.find((e) => e.id === id);
    if (!evt) return null;
    if (evt.registeredCount < evt.capacity) {
      evt.registeredCount += 1;
      this.saveData(this.data);
    }
    return evt;
  }

  // Applications
  getApplications(): Application[] {
    return this.data.applications;
  }

  getApplicationByCode(codeOrEmail: string): Application | undefined {
    const query = codeOrEmail.trim().toLowerCase();
    return this.data.applications.find(
      (a) => a.id.toLowerCase() === query || a.email.toLowerCase() === query
    );
  }

  createApplication(app: Omit<Application, 'id' | 'status' | 'submittedAt'>): Application {
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const newApp: Application = {
      ...app,
      id: `ET-2026-${randCode}`,
      status: 'Pending Review',
      submittedAt: new Date().toISOString(),
    };
    this.data.applications.unshift(newApp);
    this.saveData(this.data);
    return newApp;
  }

  updateApplicationStatus(id: string, status: Application['status'], reviewerNotes?: string): Application | null {
    const index = this.data.applications.findIndex((a) => a.id === id);
    if (index === -1) return null;
    this.data.applications[index].status = status;
    if (reviewerNotes !== undefined) {
      this.data.applications[index].reviewerNotes = reviewerNotes;
    }
    this.saveData(this.data);
    return this.data.applications[index];
  }

  // Contacts
  createContact(contact: Omit<ContactMessage, 'id' | 'receivedAt'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...contact,
      id: `MSG-${Date.now().toString().slice(-4)}`,
      receivedAt: new Date().toISOString(),
    };
    this.data.contacts.unshift(newMsg);
    this.saveData(this.data);
    return newMsg;
  }

  getContacts(): ContactMessage[] {
    return this.data.contacts;
  }

  // Community Introductions
  getIntros(): CommunityIntro[] {
    return this.data.intros || [];
  }

  createIntro(intro: Omit<CommunityIntro, 'id' | 'createdAt'>): CommunityIntro {
    const newIntro: CommunityIntro = {
      ...intro,
      id: `intro-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    if (!this.data.intros) this.data.intros = [];
    this.data.intros.unshift(newIntro);
    this.saveData(this.data);
    return newIntro;
  }

  // High level platform statistics
  getStats() {
    return {
      activeProjectsCount: this.data.projects.length,
      publishedArticlesCount: this.data.articles.length,
      totalApplicationsCount: this.data.applications.length,
      acceptedMembersCount: this.data.applications.filter((a) => a.status === 'Accepted').length + 140, // Base active membership
      upcomingEventsCount: this.data.events.filter((e) => e.registrationOpen).length,
      totalCommunityReach: 4850,
      partnerUniversities: 8,
    };
  }
}

export const dbStore = new Store();
