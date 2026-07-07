export interface Profile {
  name: string;
  username: string;
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
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
    kaggle?: string;
    medium?: string;
    stackoverflow?: string;
    dribbble?: string;
    behance?: string;
    whatsapp?: string;
    email?: string;
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
  logoUrl?: string; // Sourced for tech logos
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
  image?: string;
}

export interface Competition {
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeIcon: string;
}

export interface Testimonial {
  name: string;
  company: string;
  position: string;
  quote: string;
  rating: number; // 1-5
  avatar: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

export interface AppearanceSettings {
  profilePicSize: number;
  profilePicShape: 'circle' | 'rounded-square' | 'square';
  profilePicPlacement: 'left' | 'right' | 'center';
  selectedFont: string;
  customFontName?: string;
  customFontUrl?: string;
  customFontFormat?: string;
  textAnimationStyle: 'fade-in-up' | 'slide-in-left' | 'typewriter' | 'scale-up' | 'none';
  dropdownAnimationStyle: 'slide-down' | 'fade-scale' | 'skew-unroll';
  continuousAnimationStyle: 'none' | 'glowing' | 'pulsing' | 'wiggle';
  
  // Custom Color Palette Theme Settings
  colorScheme: 'purple-haze' | 'midnight-ocean' | 'sunset-rose' | 'forest-moss' | 'cyberpunk' | 'classic-mono' | 'custom';
  colorPrimary: string;
  colorAccent: string;
  colorWarm: string;

  // Background Grid options & customizations
  bgGridType: 'dots' | 'lines' | 'graph-paper' | 'isometric' | 'none';
  bgGridSize: number;
  bgGridOpacity: number;
  bgGridColor: string;
  enableParticles: boolean;
  particleCount: number;
  enableGlowRings: boolean;
  glowRingsColor: string;
  bgMeshGlowOpacity: number;

  // Hero Section Layout settings
  heroLayout: 'split-right' | 'split-left' | 'centered' | 'split-vertical' | 'banner-overlay' | 'floating-cards';
  heroPicShape: 'circle' | 'rounded-square' | 'square' | 'hexagon' | 'blob' | 'hidden';
  heroPicBorder: 'conic-glow' | 'pulse-solid' | 'glow-ring' | 'none';
  heroTextAlignment: 'left' | 'center' | 'right';
  heroTitleWeight: 'normal' | 'semibold' | 'bold' | 'black';
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  competitions: Competition[];
  testimonials: Testimonial[];
  githubRepos: GithubRepo[];
  appearance: AppearanceSettings;
}

export const mockPortfolioData: PortfolioData = {
  profile: {
    name: "Talha Sami",
    username: "tlhasami",
    title: "Software Engineer | Flutter Developer | UI/UX Enthusiast",
    subtitle: "Passionate Flutter developer focused on clean architecture, smooth UI/UX, and solving real-world problems through code.",
    introduction: "Hi, I'm Talha Sami. I build cross-platform mobile apps, desktop systems, and interactive experiences.",
    biography: "I'm a second-year Software Engineering student at FAST Islamabad with a strong passion for coding and problem-solving. Dedicated to continuous learning, I actively explore new technologies, from algorithms to AI. I aim to grow into a top-tier software engineer by building real-world projects, enhancing my skills, and staying committed to excellence.",
    currentFocus: "Flutter Development, Competitive Programming (550+ LeetCode problems solved), and Teaching (Lab Demonstrator at FAST-NUCES).",
    interests: ["Cross-Platform Mobile Apps", "Competitive Programming", "OOP Game Engine Design (SFML)", "Teaching"],
    heroImage: "/assets/images/profilePic.jpeg",
    backgroundImage: "/images/tech-sphere.png",
    cvUrl: "/assets/resume.pdf",
    availabilityStatus: "available",
    socialLinks: {
      github: "https://github.com/tlhasami",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      facebook: "",
      instagram: "",
      youtube: "",
      twitch: "",
      kaggle: "",
      medium: "",
      stackoverflow: "",
      dribbble: "",
      behance: "",
      whatsapp: "",
      email: "hello@example.com"
    },
    stats: [
      { label: "LeetCode Problems", value: "550+" },
      { label: "Projects Completed", value: "30+" },
      { label: "Lab Demonstrations", value: "2+" }
    ],
    timeline: [
      { year: "2026 - Present", title: "Lab Demonstrator - OOP", description: "Assisting students with coding and debugging, clarifying core OOP concepts at FAST-NUCES." },
      { year: "2025 - 2026", title: "Lab Demonstrator - PF", description: "Supporting students with programming concepts and lab sessions at FAST-NUCES." },
      { year: "2024 - Present", title: "BS Software Engineering", description: "FAST-NUCES, Islamabad." }
    ]
  },
  skills: [
    { name: "C++", category: "languages", level: 95, years: 2, featured: true, displayOrder: 1, logoUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
    { name: "Dart", category: "languages", level: 90, years: 2, featured: true, displayOrder: 2, logoUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg" },
    { name: "Python", category: "languages", level: 80, years: 2, featured: false, displayOrder: 3, logoUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
    { name: "Flutter", category: "frontend", level: 95, years: 2, featured: true, displayOrder: 4, logoUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" },
    { name: "React", category: "frontend", level: 75, years: 1, featured: true, displayOrder: 5, logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Firebase", category: "databases", level: 85, years: 2, featured: true, displayOrder: 6, logoUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" },
    { name: "Git", category: "tools", level: 88, years: 2, featured: true, displayOrder: 7, logoUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" }
  ],
  projects: [
    {
      title: "ExpenseTracker",
      description: "Flutter application with offline-first personal finance management system with optional cloud synchronization, secure local storage, and analytical insights.",
      technologies: ["Flutter", "Dart", "Firebase", "SQLite"],
      features: [
        "Offline-first sync capability",
        "Secure local transactions tracking",
        "Clean chart representations of expenditures"
      ],
      architecture: "Clean Architecture split into domain, data, and presentation layers utilizing BLoC pattern for state separation.",
      challenges: "Synchronizing offline edits safely once a network connection is re-established.",
      lessonsLearned: "Learned conflict resolution protocols and queue-based batching.",
      role: "Lead Mobile Architect",
      duration: "2 months",
      status: "completed",
      githubUrl: "https://github.com/tlhasami/ExpenseTracker",
      thumbnail: "/images/project-devorbit.png",
      tags: ["Flutter", "Firebase", "Mobile"],
      featured: true
    },
    {
      title: "shoesShopApp",
      description: "A lightweight, educational Flutter shopping app built to explore UI layout, state management with Provider, and basic e-commerce flows.",
      technologies: ["Flutter", "Dart", "Provider"],
      features: [
        "Interactive catalog scrolling",
        "Stateful cart system with Provider updating totals in real time"
      ],
      architecture: "MVC structure mapped with Provider bindings.",
      challenges: "Flicker-free updates on cart quantity adjustments.",
      lessonsLearned: "Optimized listeners to prevent redundant widget rebuilds.",
      role: "Mobile Developer",
      duration: "1 month",
      status: "completed",
      githubUrl: "https://github.com/tlhasami/shoesShopApp",
      thumbnail: "/images/project-ecosphere.png",
      tags: ["Flutter", "Provider", "E-Commerce"],
      featured: true
    },
    {
      title: "weatherApp",
      description: "A small, focused Weather App built with Flutter — a practice project while learning Flutter. It demonstrates networking, JSON parsing, and responsive UI.",
      technologies: ["Flutter", "Dart", "OpenWeather API"],
      features: [
        "Real-time geographic weather fetching",
        "Caching profiles to save network request counts"
      ],
      architecture: "Simple repository pattern with async API connections.",
      challenges: "Handling network latency errors gracefully with visual fallback states.",
      lessonsLearned: "Built elegant retry mechanisms and local JSON cache policies.",
      role: "Developer",
      duration: "1 month",
      status: "completed",
      githubUrl: "https://github.com/tlhasami/weatherApp",
      thumbnail: "/images/project-taskflow.png",
      tags: ["Flutter", "API Integration", "Mobile"],
      featured: true
    }
  ],
  experience: [
    {
      company: "FAST-NUCES, Islamabad",
      position: "Lab Demonstrator - Object-Oriented Programming",
      timeline: "Jan 2026 - Present",
      responsibilities: [
        "Assisting undergraduate students with lab assignments, coding challenges, and debugging in C++.",
        "Clarifying core OOP concepts like inheritance, polymorphism, and memory management during lab hours.",
        "Evaluating lab submissions and providing constructive feedback."
      ],
      achievements: [
        "Mentored 50+ students, helping raise average lab assessment scores.",
        "Designed practice OOP exercises for student labs."
      ],
      technologies: ["C++", "OOP", "SFML"]
    },
    {
      company: "FAST-NUCES, Islamabad",
      position: "Lab Demonstrator - Programming Fundamentals",
      timeline: "Aug 2025 - Jan 2026",
      responsibilities: [
        "Supporting students in learning basic programming constructs (loops, conditionals, arrays, pointers).",
        "Guiding students through logic building and algorithm development in C++."
      ],
      achievements: [
        "Conducted review sessions for students struggling with basic programming fundamentals."
      ],
      technologies: ["C++", "Algorithms", "Programming Logic"]
    }
  ],
  education: [
    {
      institution: "FAST-NUCES, Islamabad",
      degree: "Bachelor of Science in Software Engineering",
      timeline: "2024 - 2028",
      cgpa: "3.7 / 4.0",
      coursework: [
        "Object-Oriented Programming",
        "Programming Fundamentals",
        "Calculus",
        "Digital Logic Design"
      ],
      achievements: [
        "Active member of the Competitive Programming Club",
        "Top rank in semester coursework"
      ]
    }
  ],
  certificates: [
    {
      name: "Google AI Essentials",
      organization: "Google via Coursera",
      date: "Oct 2024",
      credentialId: "VJQYQMIPUMMK",
      verificationLink: "https://www.coursera.org/account/accomplishments/verify/VJQYQMIPUMMK",
      skillsEarned: ["Generative AI", "AI Productivity", "Prompt Engineering", "LLM Workflows"],
      image: "/assets/Certificates/GoogleAiEssentials.png"
    },
    {
      name: "Google Prompting Essentials",
      organization: "Google via Coursera",
      date: "Nov 2024",
      credentialId: "TJXKDRICE7HK",
      verificationLink: "https://www.coursera.org/account/accomplishments/verify/TJXKDRICE7HK",
      skillsEarned: ["Prompt Design", "AI Integration", "Performance Tuning", "Context Windows"],
      image: "/assets/Certificates/GooglePromptingEssentials.png"
    },
    {
      name: "Crash Course on Python",
      organization: "Google via Coursera",
      date: "Dec 2024",
      credentialId: "85UBFW25EO2T",
      verificationLink: "https://www.coursera.org/account/accomplishments/verify/85UBFW25EO2T",
      skillsEarned: ["Python", "Object-Oriented Programming", "Automation Scripts", "Basic Scripting"],
      image: "/assets/Certificates/CrashCourseOnPython.png"
    },
    {
      name: "Get Started with Python",
      organization: "Google via Coursera",
      date: "Jan 2025",
      credentialId: "WHZ03GRBS7HB",
      verificationLink: "https://www.coursera.org/account/accomplishments/certificate/WHZ03GRBS7HB",
      skillsEarned: ["Python Syntax", "Data Structures", "Control Flow", "Coding Logic"],
      image: "/assets/Certificates/GetStartedWithPython.png"
    }
  ],
  competitions: [
    {
      title: "FETX Competition",
      description: "Secured 1st place in the prestigious FETX event, demonstrating advanced technical problem-solving and innovation.",
      image: "/assets/CompetitionsWinner/FETX_Winner.png",
      badge: "Winner",
      badgeIcon: "trophy"
    },
    {
      title: "Soventure Bug Buster",
      description: "Top performer in the challenge, specialized in debugging, system optimization, and efficient algorithmic solutions.",
      image: "/assets/CompetitionsWinner/BugBuster.png",
      badge: "Winner",
      badgeIcon: "medal"
    },
    {
      title: "Code Air",
      description: "Top performer in the challenge, specialized in debugging, system optimization, and efficient algorithmic solutions.",
      image: "/assets/CompetitionsWinner/CodeAir.png",
      badge: "Top Rank",
      badgeIcon: "medal"
    },
    {
      title: "Code Craft",
      description: "Top performer in the challenge, specialized in debugging, system optimization, and efficient algorithmic solutions.",
      image: "/assets/CompetitionsWinner/Nascon.png",
      badge: "Top Rank",
      badgeIcon: "medal"
    }
  ],
  testimonials: [
    {
      name: "Sarah Jenkins",
      company: "DesignGrid",
      position: "VP of Product",
      quote: "Talha transformed our complex data feeds into an incredibly beautiful, intuitive 3D dashboard. Our customers are absolutely thrilled with the new interactive experience.",
      rating: 5,
      avatar: "/images/workspace.png"
    },
    {
      name: "Marcus Vance",
      company: "GreenFuture Tech",
      position: "Co-Founder",
      quote: "Working with Talha was seamless. The ExpenseTracker project was delivered ahead of schedule and the clean architectural design has scaled perfectly as we've onboarded new sensors.",
      rating: 5,
      avatar: "/images/tech-sphere.png"
    }
  ],
  githubRepos: [],
  appearance: {
    profilePicSize: 310,
    profilePicShape: "circle",
    profilePicPlacement: "right",
    selectedFont: "Inter",
    textAnimationStyle: "fade-in-up",
    dropdownAnimationStyle: "slide-down",
    continuousAnimationStyle: "none",
    colorScheme: "purple-haze",
    colorPrimary: "#8b5cf6",
    colorAccent: "#14b8a6",
    colorWarm: "#f59e0b",
    bgGridType: "graph-paper",
    bgGridSize: 48,
    bgGridOpacity: 0.03,
    bgGridColor: "#0a0a0a",
    enableParticles: true,
    particleCount: 150,
    enableGlowRings: true,
    glowRingsColor: "#8b5cf6",
    bgMeshGlowOpacity: 0.25,
    heroLayout: "split-right",
    heroPicShape: "circle",
    heroPicBorder: "conic-glow",
    heroTextAlignment: "left",
    heroTitleWeight: "black"
  }
};
