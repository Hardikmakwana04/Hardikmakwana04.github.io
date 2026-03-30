export const personalInfo = {
  name: 'Hardik Makwana',
  initials: 'HM',
  email: 'work.hardikm@gmail.com',
  phone: '+91 9033008884',
  location: 'Bhavnagar, Gujarat, India',
  photo: '/assets/photo.jpg',
  resumeUrl: '/assets/Hardik_Makwana_Resume.pdf',
  bio: `I am an IT graduate with good knowledge of programming, data, and software making. I like to solve computer problems, find useful things from data, and make simple digital solutions. I always try to work well with my team and keep learning new technical and thinking skills.`,
  bioExtended: `Currently pursuing my Master of Science in Artificial Intelligence at Swami Sahajanand College, I'm focused on Cloud Computing, Data Science, and Digital Forensics. With a strong foundation in both front-end and back-end technologies, I bring ideas to life through clean and efficient code.`,
  taglines: [
    'AI & Data Science Enthusiast',
    'Full-Stack Developer',
    'Flutter Developer',
    'Problem Solver',
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/in/hardik-makwana-hm9033008884/',
    github: 'https://github.com/Hardikmakwana04',
    instagram: 'https://www.instagram.com/hardik_m_8?igsh=eGQwMmU5NGllbGtx',
  },
};

export const stats = [
  { label: 'Technical Skills', value: 11, suffix: '+' },
  { label: 'Languages Known', value: 3, suffix: '' },
  { label: 'Project Completed', value: 1, suffix: '' },
  { label: 'Tools Mastered', value: 4, suffix: '+' },
];

export const skills = {
  programming: [
    { name: 'C', icon: 'devicon-c-plain colored' },
    { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
    { name: 'Java', icon: 'devicon-java-plain colored' },
    { name: 'PHP', icon: 'devicon-php-plain colored' },
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'SQL (Adv.)', icon: 'devicon-mysql-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'HTML', icon: 'devicon-html5-plain colored' },
    { name: 'CSS', icon: 'devicon-css3-plain colored' },
    { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
    { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
  ],
  tools: [
    { name: 'Visual Studio Code', icon: 'devicon-vscode-plain colored' },
    { name: 'Android Studio', icon: 'devicon-androidstudio-plain colored' },
    { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
    { name: 'Firebase Console', icon: 'devicon-firebase-plain colored' },
  ],
  soft: [
    'Problem-solving', 'Analytical Thinking', 'Attention to Detail',
    'Quick Learner', 'Accountability', 'Strong Work Ethic',
    'Growth Mindset', 'Team Collaboration', 'Communication', 'Time Management',
  ],
};

export const education = [
  {
    id: 'msc',
    degree: 'Master of Science in Artificial Intelligence (M.Sc. A.I.)',
    institution: 'Swami Sahajanand College of Commerce & Management (Autonomous)',
    location: 'Bhavnagar, Gujarat',
    period: 'May 2025 – Expected May 2027',
    status: 'pursuing' as const,
    icon: 'fa-graduation-cap',
    highlights: [
      'Pursuing postgraduate studies focused on Cloud Computing, Data Science, and Digital Forensics.',
      'Skilled in Python (Django), Node.js, Cloud Platforms, and Data Analysis tools.',
      'Applied theoretical knowledge through research projects and industry-based training.',
      'Gained expertise in network security, system design, and data management.',
      'Strengthened leadership, communication, and teamwork skills through professional coursework.',
    ],
    tags: ['Cloud Computing', 'Data Science', 'Digital Forensics', 'AI/ML'],
    semester1: {
      sgpa: 8.15,
      grade: 'A',
      totalCredits: 20,
      creditsObtained: 20,
      totalMarks: 409,
      marksheetImage: '/assets/sem1_marksheet.png',
      subjects: [
        { name: 'Digital Forensics-I', type: 'Theory', credits: 4, marks: 68, percent: '68.00%', grade: 'B+' },
        { name: 'Cloud Computing-I', type: 'Theory', credits: 3, marks: 53, percent: '75.71%', grade: 'B+' },
        { name: 'Cloud Computing-I', type: 'Practical', credits: 1, marks: 26, percent: '86.67%', grade: 'A+' },
        { name: 'Data Science-I', type: 'Theory', credits: 3, marks: 54, percent: '77.14%', grade: 'A' },
        { name: 'Data Science-I', type: 'Practical', credits: 1, marks: 26, percent: '86.67%', grade: 'A+' },
        { name: 'Minor Research Project-I', type: 'Project', credits: 4, marks: 91, percent: '91.00%', grade: 'A+' },
        { name: 'On-The-Job Training-I', type: 'Project', credits: 4, marks: 91, percent: '91.00%', grade: 'A+' },
      ],
    },
  },
  {
    id: 'bsc',
    degree: 'Bachelor of Science in Information Technology (B.Sc. I.T.)',
    institution: 'Shree Swaminarayan College of Computer Science (M. K. Bhavnagar University)',
    location: 'Bhavnagar, Gujarat',
    period: 'Graduated May 2025',
    status: 'completed' as const,
    icon: 'fa-user-graduate',
    highlights: [
      'B.Sc. in Information Technology from MKBU with a strong focus on core Computer Science subjects.',
      'Skilled in programming (C, C++, Java, PHP), databases, operating systems, and networking.',
      'Applied logical and analytical thinking through data structures and algorithms.',
      'Enhanced communication and soft skills through Business Communication & Personality Development.',
      'Completed project work with hands-on experience in software development and IT project management.',
    ],
    tags: ['Programming', 'Databases', 'Networking', 'Software Dev'],
  },
];

export const experience = [
  {
    role: 'Machine Learning Intern',
    company: 'Cognifyz Technologies',
    icon: 'fa-brain',
    period: 'Feb 2026 – Mar 2026',
    highlights: [
      'Completed a month-long internship focusing on Machine Learning technologies.',
      'Developed and trained predictive models for various datasets.',
      'Gained hands-on experience in data preprocessing, feature engineering, and model validation.',
    ],
    certificateImage: '/assets/ml_internship_certificate.png',
    certificateTitle: 'Machine Learning Intern — Cognifyz Technologies',
  },
  {
    role: 'Cashier (Part Time)',
    company: 'Reliance Retail',
    icon: 'fa-building',
    period: 'July 2024 – Present',
    highlights: [
      'Manage customer transactions and ensure accurate cash handling at Reliance Retail.',
      'Deliver prompt and courteous service in a fast-paced retail environment.',
      'Strengthened communication, customer relations, and time management skills while studying.',
    ],
  },
];

export const projects = [
  {
    title: 'FitFlex',
    subtitle: 'Android Fitness Application',
    date: 'Feb 2025',
    teamSize: 2,
    duration: '3 Months',
    techStack: ['Flutter', 'Dart', 'API', 'Firebase Auth', 'Firebase'],
    features: [
      'Developed an Android fitness app using Flutter for a seamless and responsive user interface.',
      'Integrated Firebase for real-time data storage, authentication, and cloud synchronization.',
      'Implemented core features like workout tracking, BMI calculator, and goal setting.',
      'Collaborated in a 2-member team following Agile practices with version control on GitHub.',
      'Focused on scalability, UI/UX design, and efficient backend integration for smooth performance.',
    ],
    githubUrl: 'https://github.com/Hardikmakwana04',
    documentationUrl: '/assets/FITFLEX_DOCUMENTATION.pdf',
  },
];

export const certificates = [
  {
    title: 'Generative AI Mastermind',
    issuer: 'Outskill — Vaibhav Sisinty',
    description: 'Certificate of Completion',
    icon: 'fa-robot',
    image: '/assets/genai_certificate.jpg',
  },
  {
    title: 'Social Media Influencer',
    issuer: 'Media & Entertainment Skills Council — PMKVY | Skill India',
    description: 'Certificate No: ADGJA002606909-031124 • Duration: 510 Hrs • Grade: B',
    icon: 'fa-certificate',
    image: '/assets/social_media_certificate.jpg',
  },
  {
    title: 'Machine Learning Internship',
    issuer: 'Cognifyz Technologies',
    description: 'Internship Completion Certificate',
    icon: 'fa-brain',
    image: '/assets/ml_internship_certificate.png',
  },
];

export const languages = [
  { name: 'English', level: 'Reading & Writing' },
  { name: 'Hindi', level: 'Reading & Writing' },
  { name: 'Gujarati', level: 'Reading & Writing' },
];

export const emailjsConfig = {
  publicKey: 'mgQcOPPQ60gbla8xg',
  serviceId: 'service_giyrex4',
  templateId: 'template_m71jkxb',
};

export const firebaseConfig = {
  apiKey: "AIzaSyCznSsuyWuQppCnT9dln4peFfWkoqwu5gI",
  authDomain: "portfolio-visitor-tracke-c2a0c.firebaseapp.com",
  databaseURL: "https://portfolio-visitor-tracke-c2a0c-default-rtdb.firebaseio.com",
  projectId: "portfolio-visitor-tracke-c2a0c",
  storageBucket: "portfolio-visitor-tracke-c2a0c.firebasestorage.app",
  messagingSenderId: "578184485197",
  appId: "1:578184485197:web:055a44c6fe3bb03dcc3f04",
};
