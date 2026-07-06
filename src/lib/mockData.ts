export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  introduction: string;
  biography: string;
  currentFocus: string;
  interests: string[];
  heroImage: string;
  backgroundImage: string;
  cvUrl: string;
  availabilityStatus: 'available' | 'busy' | 'hiring';
  socialLinks: {
    github: string;
    linkedin: string;
    twitter?: string;
    portfolio?: string;
  };
  stats: { label: string; value: string }[];
  timeline: { year: string; title: string; description: string }[];
}

export interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'cloud-devops' | 'tools';
  level: number; // 1-100
  years: number;
  featured: boolean;
  displayOrder: number;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  architecture: string;
  challenges: string;
  lessonsLearned: string;
  role: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'planned';
  githubUrl: string;
  liveUrl?: string;
  thumbnail: string;
  tags: string[];
  featured: boolean;
}

export interface Experience {
  company: string;
  position: string;
  timeline: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  timeline: string;
  cgpa: string;
  coursework: string[];
  achievements: string[];
}

export interface Certificate {
  name: string;
  organization: string;
  date: string;
  credentialId: string;
  verificationLink: string;
  skillsEarned: string[];
}

export interface Testimonial {
  name: string;
  company: string;
  position: string;
  quote: string;
  rating: number; // 1-5
  avatar: string;
}

export interface Service {
  name: string;
  description: string;
  technologies: string[];
  pricing: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  testimonials: Testimonial[];
  services: Service[];
}

export const mockPortfolioData: PortfolioData = {
  profile: {
    name: "Alex Carter",
    title: "Full Stack Engineer & Interactive Designer",
    subtitle: "Crafting beautiful, high-performance web experiences through clean code and immersive 3D interfaces.",
    introduction: "Hi, I'm Alex. I build modern, scalable web applications and interactive 3D digital environments.",
    biography: "I am a software engineer specializing in frontend architecture, real-time interactive rendering, and robust cloud backend integrations. With over 4 years of experience, I bridge the gap between complex engineering requirements and premium visual aesthetics.",
    currentFocus: "High-performance WebGL rendering and local AI assistant toolchains.",
    interests: ["3D Web Engine Design", "Autonomous Agents", "HCI & UI Design", "Astronomy"],
    heroImage: "/images/workspace.png",
    backgroundImage: "/images/tech-sphere.png",
    cvUrl: "#",
    availabilityStatus: "available",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    stats: [
      { label: "Years of Experience", value: "4+" },
      { label: "Projects Completed", value: "25+" },
      { label: "Happy Clients", value: "15+" }
    ],
    timeline: [
      { year: "2024 - Present", title: "Senior Interactive Engineer", description: "Leading the development of real-time dashboard analytics systems using React Three Fiber." },
      { year: "2022 - 2024", title: "Full Stack Developer", description: "Built microservices-driven CMS products using Next.js and Supabase." },
      { year: "2020 - 2022", title: "Frontend Developer", description: "Developed responsive web portals and custom CSS animations for enterprise systems." }
    ]
  },
  skills: [
    { name: "TypeScript", category: "languages", level: 95, years: 4, featured: true, displayOrder: 1 },
    { name: "JavaScript", category: "languages", level: 98, years: 5, featured: true, displayOrder: 2 },
    { name: "Python", category: "languages", level: 80, years: 3, featured: false, displayOrder: 3 },
    { name: "React / Next.js", category: "frontend", level: 95, years: 4, featured: true, displayOrder: 4 },
    { name: "Three.js / React Three Fiber", category: "frontend", level: 88, years: 2, featured: true, displayOrder: 5 },
    { name: "Tailwind CSS", category: "frontend", level: 95, years: 4, featured: true, displayOrder: 6 },
    { name: "Node.js", category: "backend", level: 90, years: 4, featured: true, displayOrder: 7 },
    { name: "GraphQL / REST APIs", category: "backend", level: 88, years: 3, featured: false, displayOrder: 8 },
    { name: "PostgreSQL", category: "databases", level: 85, years: 3, featured: true, displayOrder: 9 },
    { name: "Supabase / Firebase", category: "databases", level: 92, years: 3, featured: true, displayOrder: 10 },
    { name: "Vercel / AWS", category: "cloud-devops", level: 85, years: 3, featured: true, displayOrder: 11 },
    { name: "Docker", category: "cloud-devops", level: 75, years: 2, featured: false, displayOrder: 12 },
    { name: "Git & GitHub", category: "tools", level: 95, years: 5, featured: true, displayOrder: 13 },
    { name: "Figma", category: "tools", level: 80, years: 3, featured: false, displayOrder: 14 }
  ],
  projects: [
    {
      title: "DevOrbit",
      description: "A collaborative developer workspace displaying real-time 3D interactive visualizations of Git repository commits and branching paths.",
      technologies: ["Next.js", "TypeScript", "React Three Fiber", "Three.js", "Tailwind CSS", "Zustand"],
      features: [
        "Interactive 3D commit graph representing commits as nodes",
        "Direct GitHub API integrations to sync branches and pulls in real time",
        "Custom shader systems for rendering glowing connection links between nodes",
        "Collaborative multi-user virtual workspace"
      ],
      architecture: "Decoupled Next.js client utilizing WebWorkers to parse large Git history objects in the background, rendering to an optimized canvas with custom shader materials.",
      challenges: "Rendering over 10,000 commit nodes without blocking the UI main thread or inducing frame drops in WebGL.",
      lessonsLearned: "Learned how to leverage instanced meshes in React Three Fiber to optimize rendering calls and keep GPU utilization low.",
      role: "Lead Interactive Architect",
      duration: "3 months",
      status: "completed",
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
      thumbnail: "/images/project-devorbit.png",
      tags: ["3D Graphics", "WebGL", "Next.js", "Zustand"],
      featured: true
    },
    {
      title: "EcoSphere",
      description: "An IoT-enabled environmental monitoring and reforestation analytics dashboard mapping real-time tree growth data.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Supabase Storage", "Recharts", "Framer Motion"],
      features: [
        "Live sensor feed integration for temperature, soil moisture, and carbon offset",
        "Interactive geospatial overlays showing sensor distributions",
        "Historical tree inventory analytics and forest growth forecasting using regression models",
        "Exportable carbon credit reports"
      ],
      architecture: "Monolithic Next.js application hooked into a Supabase PostgreSQL instance listening to real-time webhook updates from remote IoT sensors.",
      challenges: "Dealing with erratic high-frequency sensor payloads without overloading backend memory limits.",
      lessonsLearned: "Implemented database rate-limiting and micro-batching streams using Redis queue to process payloads safely.",
      role: "Full Stack Engineer",
      duration: "4 months",
      status: "completed",
      githubUrl: "https://github.com",
      liveUrl: "https://github.com",
      thumbnail: "/images/project-ecosphere.png",
      tags: ["IoT", "Data Visualization", "Supabase", "Analytics"],
      featured: true
    },
    {
      title: "TaskFlow",
      description: "An AI-powered Kanban workspace utilizing predictive algorithms to automatically prioritize team tasks.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase Auth", "Framer Motion"],
      features: [
        "Drag-and-drop board layouts with fluid animations using Framer Motion",
        "Rule-based workload capacity warnings",
        "Collaborative live chat and comments directly on tasks"
      ],
      architecture: "Client-first React application communicating with Supabase Realtime Channels for low-latency synchronization of kanban card placements across active users.",
      challenges: "Ensuring zero-latency drag-and-drop visuals while handling database synchronization constraints.",
      lessonsLearned: "Built optimistic UI updates in local state stores using Zustand prior to network completion.",
      role: "Frontend Engineer",
      duration: "2 months",
      status: "completed",
      githubUrl: "https://github.com",
      thumbnail: "/images/project-taskflow.png",
      tags: ["Kanban", "Zustand", "Framer Motion", "Realtime"],
      featured: true
    }
  ],
  experience: [
    {
      company: "InnovateTech Solutions",
      position: "Senior Interactive Web Developer",
      timeline: "Jan 2024 - Present",
      responsibilities: [
        "Leading a team of 3 developers to overhaul the user dashboard, utilizing Next.js Server Components to improve FCP by 40%.",
        "Pioneering WebGL-based product configuration scenes, reducing 3D load times by leveraging Draco compression on asset files."
      ],
      achievements: [
        "Successfully launched a 3D preview tool generating $120k in direct revenue.",
        "Refactored custom styling framework to Tailwind CSS v4 to shrink bundle sizes by 25%."
      ],
      technologies: ["Next.js", "Three.js", "Zustand", "Tailwind CSS", "Supabase"]
    },
    {
      company: "AppForge Studio",
      position: "Full Stack Engineer",
      timeline: "Jun 2022 - Dec 2023",
      responsibilities: [
        "Architected scalable Postgres schemas and enabled secure Row Level Security (RLS) policies for a multi-tenant client.",
        "Built responsive client portals integrated with Stripe billing and automated PDF invoice generation."
      ],
      achievements: [
        "Deployed 15 client portals with 99.9% uptime compliance.",
        "Designed reusable TypeScript UI components, boosting internal development velocity by 30%."
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Supabase Auth", "GitHub Actions"]
    }
  ],
  education: [
    {
      institution: "Tech University of Computing",
      degree: "Bachelor of Science in Software Engineering",
      timeline: "2018 - 2022",
      cgpa: "3.85 / 4.0",
      coursework: [
        "Computer Graphics",
        "Database Management Systems",
        "Data Structures & Algorithms",
        "Distributed Systems"
      ],
      achievements: [
        "Graduated with High Honors (Magna Cum Laude)",
        "Winner of the Annual Hackathon (Best Innovative Web Application)"
      ]
    }
  ],
  certificates: [
    {
      name: "AWS Certified Developer – Associate",
      organization: "Amazon Web Services",
      date: "Nov 2024",
      credentialId: "AWS-DEV-99881",
      verificationLink: "https://aws.amazon.com",
      skillsEarned: ["AWS Lambda", "DynamoDB", "S3", "CloudFront"]
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      organization: "Meta",
      date: "Aug 2023",
      credentialId: "META-FED-77561",
      verificationLink: "https://coursera.org",
      skillsEarned: ["React", "CSS Layouts", "UX Principles", "Testing in JavaScript"]
    },
    {
      name: "Associate Cloud Engineer",
      organization: "Google Cloud",
      date: "Jan 2025",
      credentialId: "GCP-ACE-55442",
      verificationLink: "https://cloud.google.com",
      skillsEarned: ["Google Kubernetes Engine", "Compute Engine", "VPC Networks", "IAM Roles"]
    },
    {
      name: "Professional Scrum Master I (PSM I)",
      organization: "Scrum.org",
      date: "Jun 2023",
      credentialId: "SCRUM-PSM1-11223",
      verificationLink: "https://scrum.org",
      skillsEarned: ["Agile Frameworks", "Scrum Events", "Sprints Planning", "Backlog Grooming"]
    }
  ],
  testimonials: [
    {
      name: "Sarah Jenkins",
      company: "DesignGrid",
      position: "VP of Product",
      quote: "Alex transformed our complex data feeds into an incredibly beautiful, intuitive 3D dashboard. Our customers are absolutely thrilled with the new interactive experience.",
      rating: 5,
      avatar: "/images/workspace.png"
    },
    {
      name: "Marcus Vance",
      company: "GreenFuture Tech",
      position: "Co-Founder",
      quote: "Working with Alex was seamless. The EcoSphere project was delivered ahead of schedule and the clean architectural design has scaled perfectly as we've onboarded new sensors.",
      rating: 5,
      avatar: "/images/tech-sphere.png"
    }
  ],
  services: [
    {
      name: "Interactive 3D Web Development",
      description: "Custom WebGL interfaces, real-time 3D model loaders, particle systems, and shader integrations inside React applications.",
      technologies: ["React Three Fiber", "Three.js", "WebGL", "GLSL shaders"],
      pricing: "$120 / hr"
    },
    {
      name: "Full Stack Web Apps",
      description: "Developing robust Next.js dashboards, secure data isolation schemas, payment gateways, and real-time synchronization components.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Stripe"],
      pricing: "Custom quote"
    }
  ]
};
