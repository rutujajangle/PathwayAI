export const careerToSkills: { [key: string]: CareerSkillInfo } = {
  "Software Engineer": {
    requiredSkills: [
      "Programming Fundamentals",
      "Data Structures",
      "OOP",
      "Algorithms",
      "JavaScript",
      "System Design",
      "Problem Solving",
    ],
    description: "Develop and maintain software applications using various programming languages and frameworks.",
    salary: "$70,000 - $150,000",
    growth: "22% (Much faster than average)",
  },
  "UX Designer": {
    requiredSkills: [
      "Design Thinking",
      "User Research",
      "Prototyping",
      "UI/UX Design",
      "Web Development",
    ],
    description: "Design user interfaces and experiences for digital products.",
    salary: "$65,000 - $130,000",
    growth: "13% (Faster than average)",
  },
  "Data Scientist": {
    requiredSkills: [
      "Python",
      "Machine Learning",
      "Data Analysis",
      "Information Visualization",
      "Algorithm Design",
      "Problem Solving",
    ],
    description: "Analyze complex data sets to help guide business decisions.",
    salary: "$85,000 - $170,000",
    growth: "36% (Much faster than average)",
  },
  "Cybersecurity Analyst": {
    requiredSkills: [
      "Network Security",
      "Cryptography",
      "Security Analysis",
      "Problem Solving",
      "System Design",
    ],
    description: "Protect organizations' computer networks and systems.",
    salary: "$75,000 - $160,000",
    growth: "35% (Much faster than average)",
  },
  "Mobile Developer": {
    requiredSkills: [
      "Mobile Development",
      "React Native",
      "UI/UX Design",
      "JavaScript",
      "OOP",
      "Problem Solving",
    ],
    description: "Create applications for mobile devices and tablets.",
    salary: "$70,000 - $140,000",
    growth: "22% (Much faster than average)",
  },
  "VR/AR Developer": {
    requiredSkills: [
      "Virtual Reality",
      "Unity",
      "3D Modeling",
      "UI/UX Design",
      "Problem Solving",
    ],
    description: "Develop virtual and augmented reality experiences.",
    salary: "$75,000 - $150,000",
    growth: "28% (Much faster than average)",
  },
};

interface CareerSkillInfo {
  requiredSkills: string[];
  description: string;
  salary: string;
  growth: string;
}

export const skillDescriptions: { [key: string]: string } = {
  "Programming Fundamentals": "Core concepts of programming including variables, control flow, and functions",
  "Data Structures": "Organization and management of data for efficient access and modification",
  "OOP": "Object-oriented programming principles and patterns",
  "Algorithms": "Problem-solving methods and computational procedures",
  "JavaScript": "Web programming language for interactive front-end development",
  "System Design": "Architecture and design of software systems",
  "Problem Solving": "Analytical thinking and solution development",
  "Python": "Versatile programming language popular in data science",
  "Machine Learning": "Algorithms and statistical models for pattern recognition",
  "Data Analysis": "Techniques for examining and interpreting data",
  "Network Security": "Protection of computer networks and data",
  "Cryptography": "Techniques for secure communication and data protection",
  "Mobile Development": "Creation of applications for mobile devices",
  "React Native": "Framework for building native mobile applications",
  "UI/UX Design": "Design of user interfaces and experiences",
  "Virtual Reality": "Development of immersive virtual environments",
  "Unity": "Game and VR development platform",
  "3D Modeling": "Creation of three-dimensional digital objects",
  "Web Development": "Building and maintaining websites",
  "DOM Manipulation": "Dynamic modification of web page content",
  "Design Thinking": "User-centered approach to problem solving",
  "User Research": "Understanding user needs and behaviors",
  "Prototyping": "Creating preliminary versions of designs",
  "Information Visualization": "Visual representation of data and information",
  "Database Design": "Structure and organization of databases",
  "SQL": "Language for managing and querying databases",
  "Project Management": "Planning and execution of projects",
}; 