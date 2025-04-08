// Degree programs
export const mockDegreePrograms = [
  {
    id: "ba-cs",
    name: "BA Computer Science",
    description: "Bachelor of Arts in Computer Science focusing on software development fundamentals and programming.",
    duration: "4 years",
    credits: 120
  },
  {
    id: "bs-cybersec",
    name: "BS Cybersecurity & Global Policy",
    description: "Bachelor of Science in Cybersecurity with focus on global policy implications and security frameworks.",
    duration: "4 years",
    credits: 124
  },
  {
    id: "bs-ds",
    name: "BS Data Science",
    description: "Bachelor of Science in Data Science with comprehensive curriculum covering statistics, programming, and data analysis.",
    duration: "4 years",
    credits: 126
  },
  {
    id: "bs-ise",
    name: "BS Intelligent Systems Engineering",
    description: "Bachelor of Science focused on designing and building intelligent systems and robotics applications.",
    duration: "4 years",
    credits: 128
  },
  {
    id: "bs-inf",
    name: "BS Informatics",
    description: "Bachelor of Science in Informatics with focus on information systems and human-computer interaction.",
    duration: "4 years",
    credits: 120
  },
  {
    id: "ms-ise",
    name: "MS Intelligent Systems Engineering",
    description: "Master's program focusing on advanced intelligent systems, machine learning, and autonomous systems.",
    duration: "2 years",
    credits: 36
  },
  {
    id: "phd-is",
    name: "Ph.D. In Information Science",
    description: "Doctoral program for advanced research in information science and related fields.",
    duration: "4-5 years",
    credits: 90
  },
  {
    id: "ms-mls",
    name: "Master's in Library & Information Science",
    description: "Professional master's program for future library and information specialists.",
    duration: "2 years",
    credits: 36
  }
];

export const mockCourseData = [
  // BA Computer Science Courses
  {
    id: "CS101",
    name: "Introduction to Programming",
    description: "A beginner-friendly introduction to programming concepts using Python. Learn variables, control structures, functions, and basic algorithms.",
    credits: 4,
    prerequisites: [],
    timeSlot: "Mon/Wed 9-11 AM",
    availability: "Open" as const,
    fillingRate: 30,
    courseCode: "CSCI-C 200",
    major: "BA Computer Science",
    skills: ["Programming Fundamentals", "Problem Solving", "Python"]
  },
  {
    id: "CS102",
    name: "Data Structures and Algorithms",
    description: "Study of fundamental data structures and algorithms. Topics include arrays, linked lists, trees, sorting, and searching algorithms.",
    credits: 4,
    prerequisites: ["Introduction to Programming"],
    timeSlot: "Tue/Thu 1-3 PM",
    availability: "Open" as const,
    fillingRate: 45,
    courseCode: "CSCI-C 343",
    major: "BA Computer Science",
    skills: ["Data Structures", "Algorithms", "Java"]
  },
  {
    id: "CS103",
    name: "Computer Organization",
    description: "Introduction to computer architecture and organization. Topics include digital logic, assembly language, and processor design.",
    credits: 3,
    prerequisites: ["Introduction to Programming"],
    timeSlot: "Mon/Wed 2-3:30 PM",
    availability: "Open" as const,
    fillingRate: 25,
    courseCode: "CSCI-C 335",
    major: "BA Computer Science",
    skills: ["Computer Architecture", "Assembly Language"]
  },

  // BS Data Science Courses
  {
    id: "DS101",
    name: "Data Science Fundamentals",
    description: "Introduction to data science principles including data cleaning, visualization, statistical analysis, and machine learning basics.",
    credits: 4,
    prerequisites: ["Introduction to Programming"],
    timeSlot: "Mon/Wed/Fri 2-3 PM",
    availability: "Limited Seats" as const,
    fillingRate: 85,
    courseCode: "INFO-I 123",
    major: "BS Data Science",
    skills: ["Data Analysis", "Statistics", "Python"]
  },
  {
    id: "DS102",
    name: "Statistical Methods for Data Science",
    description: "Advanced statistical techniques for data analysis. Topics include regression, hypothesis testing, and experimental design.",
    credits: 3,
    prerequisites: ["Data Science Fundamentals"],
    timeSlot: "Tue/Thu 10-11:30 AM",
    availability: "Open" as const,
    fillingRate: 40,
    courseCode: "STAT-S 520",
    major: "BS Data Science",
    skills: ["Statistical Analysis", "Data Modeling", "R"]
  },
  {
    id: "DS103",
    name: "Machine Learning for Data Science",
    description: "Practical applications of machine learning in data science. Covers supervised and unsupervised learning techniques.",
    credits: 4,
    prerequisites: ["Data Science Fundamentals", "Statistical Methods for Data Science"],
    timeSlot: "Mon/Wed 3-5 PM",
    availability: "Full" as const,
    fillingRate: 100,
    courseCode: "CSCI-B 555",
    major: "BS Data Science",
    skills: ["Machine Learning", "Data Science", "Python"]
  },

  // MS Data Science Courses
  {
    id: "MSDS101",
    name: "Advanced Machine Learning",
    description: "Deep dive into machine learning algorithms and their applications. Topics include neural networks, deep learning, and reinforcement learning.",
    credits: 3,
    prerequisites: ["Machine Learning for Data Science"],
    timeSlot: "Tue/Thu 1-2:30 PM",
    availability: "Limited Seats" as const,
    fillingRate: 75,
    courseCode: "CSCI-B 555",
    major: "MS Data Science",
    skills: ["Deep Learning", "Neural Networks", "TensorFlow"]
  },
  {
    id: "MSDS102",
    name: "Big Data Analytics",
    description: "Techniques for processing and analyzing large-scale datasets. Topics include distributed computing, MapReduce, and Spark.",
    credits: 3,
    prerequisites: ["Data Science Fundamentals"],
    timeSlot: "Mon/Wed 10-11:30 AM",
    availability: "Open" as const,
    fillingRate: 50,
    courseCode: "INFO-I 535",
    major: "MS Data Science",
    skills: ["Big Data", "Distributed Computing", "Spark"]
  },
  {
    id: "MSDS103",
    name: "Data Visualization",
    description: "Principles and techniques for effective data visualization. Topics include visual perception, design principles, and interactive visualization.",
    credits: 3,
    prerequisites: ["Data Science Fundamentals"],
    timeSlot: "Fri 9 AM-12 PM",
    availability: "Open" as const,
    fillingRate: 35,
    courseCode: "ENGR-E 583",
    major: "MS Data Science",
    skills: ["Data Visualization", "UI/UX", "D3.js"]
  },

  // MS Computer Science Courses
  {
    id: "MSCS101",
    name: "Advanced Algorithms",
    description: "Advanced topics in algorithm design and analysis. Topics include NP-completeness, approximation algorithms, and randomized algorithms.",
    credits: 3,
    prerequisites: ["Data Structures and Algorithms"],
    timeSlot: "Mon/Wed 1-2:30 PM",
    availability: "Open" as const,
    fillingRate: 40,
    courseCode: "CSCI-B 503",
    major: "MS Computer Science",
    skills: ["Advanced Algorithms", "Complexity Analysis"]
  },
  {
    id: "MSCS102",
    name: "Cloud Computing",
    description: "Principles and practices of cloud computing. Topics include virtualization, containerization, and cloud service models.",
    credits: 3,
    prerequisites: ["Computer Organization"],
    timeSlot: "Tue/Thu 3-4:30 PM",
    availability: "Limited Seats" as const,
    fillingRate: 65,
    courseCode: "ENGR-E 516",
    major: "MS Computer Science",
    skills: ["Cloud Computing", "DevOps", "AWS"]
  },
  {
    id: "MSCS103",
    name: "Software Engineering",
    description: "Advanced software engineering principles and practices. Topics include software architecture, design patterns, and agile methodologies.",
    credits: 3,
    prerequisites: ["Data Structures and Algorithms"],
    timeSlot: "Mon/Wed 3-4:30 PM",
    availability: "Open" as const,
    fillingRate: 45,
    courseCode: "CSCI-B 561",
    major: "MS Computer Science",
    skills: ["Software Engineering", "Design Patterns"]
  },

  // MS Software Engineering Courses
  {
    id: "MSSE101",
    name: "Software Architecture",
    description: "Design and implementation of software architectures. Topics include architectural patterns, quality attributes, and design decisions.",
    credits: 3,
    prerequisites: ["Software Engineering"],
    timeSlot: "Tue/Thu 9-10:30 AM",
    availability: "Open" as const,
    fillingRate: 30,
    courseCode: "CSCI-B 561",
    major: "MS Software Engineering",
    skills: ["Software Architecture", "System Design"]
  },
  {
    id: "MSSE102",
    name: "DevOps Practices",
    description: "Modern DevOps practices and tools. Topics include continuous integration, deployment automation, and infrastructure as code.",
    credits: 3,
    prerequisites: ["Cloud Computing"],
    timeSlot: "Mon/Wed 2-3:30 PM",
    availability: "Limited Seats" as const,
    fillingRate: 70,
    courseCode: "ENGR-E 516",
    major: "MS Software Engineering",
    skills: ["DevOps", "CI/CD", "Docker"]
  },
  {
    id: "MSSE103",
    name: "Software Testing",
    description: "Advanced software testing techniques and methodologies. Topics include test-driven development, automated testing, and quality assurance.",
    credits: 3,
    prerequisites: ["Software Engineering"],
    timeSlot: "Fri 1-4 PM",
    availability: "Open" as const,
    fillingRate: 40,
    courseCode: "CSCI-B 561",
    major: "MS Software Engineering",
    skills: ["Software Testing", "Quality Assurance"]
  },

  // MS Artificial Intelligence Courses
  {
    id: "MSAI101",
    name: "Deep Learning",
    description: "Advanced topics in deep learning. Topics include neural networks, convolutional networks, and recurrent networks.",
    credits: 3,
    prerequisites: ["Machine Learning for Data Science"],
    timeSlot: "Mon/Wed 10-11:30 AM",
    availability: "Full" as const,
    fillingRate: 100,
    courseCode: "CSCI-B 555",
    major: "MS Artificial Intelligence",
    skills: ["Deep Learning", "Neural Networks", "PyTorch"]
  },
  {
    id: "MSAI102",
    name: "Natural Language Processing",
    description: "Techniques for processing and understanding human language. Topics include text classification, sentiment analysis, and machine translation.",
    credits: 3,
    prerequisites: ["Machine Learning for Data Science"],
    timeSlot: "Tue/Thu 2-3:30 PM",
    availability: "Limited Seats" as const,
    fillingRate: 80,
    courseCode: "CSCI-B 555",
    major: "MS Artificial Intelligence",
    skills: ["NLP", "Text Processing", "Python"]
  },
  {
    id: "MSAI103",
    name: "Computer Vision",
    description: "Techniques for processing and understanding visual data. Topics include image classification, object detection, and image segmentation.",
    credits: 3,
    prerequisites: ["Machine Learning for Data Science"],
    timeSlot: "Mon/Wed 3-4:30 PM",
    availability: "Open" as const,
    fillingRate: 60,
    courseCode: "CSCI-B 657",
    major: "MS Artificial Intelligence",
    skills: ["Computer Vision", "Image Processing", "OpenCV"]
  },

  // MS Cybersecurity Courses
  {
    id: "MSCY101",
    name: "Network Security",
    description: "Principles and practices of network security. Topics include cryptography, authentication, and secure protocols.",
    credits: 3,
    prerequisites: ["Computer Organization"],
    timeSlot: "Tue/Thu 9-10:30 AM",
    availability: "Open" as const,
    fillingRate: 45,
    courseCode: "INFO-I 520",
    major: "MS Cybersecurity",
    skills: ["Network Security", "Cybersecurity", "Wireshark"]
  },
  {
    id: "MSCY102",
    name: "Cryptography",
    description: "Mathematical foundations of cryptography. Topics include symmetric and asymmetric encryption, hash functions, and digital signatures.",
    credits: 3,
    prerequisites: ["Network Security"],
    timeSlot: "Mon/Wed 1-2:30 PM",
    availability: "Limited Seats" as const,
    fillingRate: 70,
    courseCode: "INFO-I 538",
    major: "MS Cybersecurity",
    skills: ["Cryptography", "Security", "Python"]
  },
  {
    id: "MSCY103",
    name: "Security Management",
    description: "Principles of security management and risk assessment. Topics include security policies, incident response, and compliance.",
    credits: 3,
    prerequisites: ["Network Security"],
    timeSlot: "Fri 9 AM-12 PM",
    availability: "Open" as const,
    fillingRate: 35,
    courseCode: "INFO-I 525",
    major: "MS Cybersecurity",
    skills: ["Security Management", "Risk Assessment"]
  }
];

export const mockProfessions = [
  {
    name: "Data Scientist",
    coreCourses: ["DS300", "MATH201", "STAT310"],
    recommendedCourses: ["AI400", "CS350"],
    relatedDegrees: ["bs-ds", "ms-ise", "phd-is"]
  },
  {
    name: "Software Engineer",
    coreCourses: ["CS101", "CS350"],
    recommendedCourses: ["DS300", "AI400"],
    relatedDegrees: ["ba-cs", "bs-inf", "ms-ise"]
  },
  {
    name: "UX Designer",
    coreCourses: ["DESIGN101", "UI205"],
    recommendedCourses: ["CS101", "PSYCH220"],
    relatedDegrees: ["bs-inf", "ms-mls"]
  },
  {
    name: "Cybersecurity Analyst",
    coreCourses: ["SEC101", "CS350"],
    recommendedCourses: ["CS101", "NET202"],
    relatedDegrees: ["bs-cybersec", "ba-cs"]
  },
  {
    name: "AI Engineer",
    coreCourses: ["AI400", "MATH201"],
    recommendedCourses: ["DS300", "CS101"],
    relatedDegrees: ["bs-ise", "ms-ise", "phd-is"]
  },
  {
    name: "Database Administrator",
    coreCourses: ["CS350", "DB402"],
    recommendedCourses: ["CS101", "SEC101"],
    relatedDegrees: ["ba-cs", "bs-inf"]
  },
  {
    name: "Information Scientist",
    coreCourses: ["INFO301", "STAT310"],
    recommendedCourses: ["DS300", "CS350"],
    relatedDegrees: ["ms-mls", "bs-inf", "phd-is"]
  }
];

// Historical data for course availability trends
export const mockHistoricalData = [
  {
    courseId: "CS101",
    pastSemesters: [
      { term: "Fall 2023", filledPercentage: 85, closedInWeeks: 8 },
      { term: "Spring 2024", filledPercentage: 92, closedInWeeks: 6 },
      { term: "Fall 2024", filledPercentage: 78, closedInWeeks: 10 }
    ],
    prediction: "Medium demand - typically fills by mid-semester"
  },
  {
    courseId: "MATH201",
    pastSemesters: [
      { term: "Fall 2023", filledPercentage: 95, closedInWeeks: 4 },
      { term: "Spring 2024", filledPercentage: 98, closedInWeeks: 3 },
      { term: "Fall 2024", filledPercentage: 100, closedInWeeks: 2 }
    ],
    prediction: "High demand - fills very quickly, register early"
  },
  {
    courseId: "DS300",
    pastSemesters: [
      { term: "Fall 2023", filledPercentage: 97, closedInWeeks: 3 },
      { term: "Spring 2024", filledPercentage: 100, closedInWeeks: 1 },
      { term: "Fall 2024", filledPercentage: 100, closedInWeeks: 1 }
    ],
    prediction: "Very high demand - fills immediately, waitlist common"
  },
  {
    courseId: "CS350",
    pastSemesters: [
      { term: "Fall 2023", filledPercentage: 80, closedInWeeks: 9 },
      { term: "Spring 2024", filledPercentage: 75, closedInWeeks: null },
      { term: "Fall 2024", filledPercentage: 85, closedInWeeks: 10 }
    ],
    prediction: "Moderate demand - usually available throughout enrollment"
  },
  {
    courseId: "AI400",
    pastSemesters: [
      { term: "Fall 2023", filledPercentage: 100, closedInWeeks: 1 },
      { term: "Spring 2024", filledPercentage: 100, closedInWeeks: 1 },
      { term: "Fall 2024", filledPercentage: 100, closedInWeeks: 1 }
    ],
    prediction: "Extremely high demand - register immediately when available"
  },
  {
    courseId: "STAT310",
    pastSemesters: [
      { term: "Fall 2023", filledPercentage: 88, closedInWeeks: 7 },
      { term: "Spring 2024", filledPercentage: 92, closedInWeeks: 5 },
      { term: "Fall 2024", filledPercentage: 90, closedInWeeks: 6 }
    ],
    prediction: "High demand - typically fills within first half of enrollment period"
  }
];

export const fullCourseList = [
  { courseCode: "STAT-S 520", name: "Introduction to Statistics", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-B 551", name: "Elements of Artificial Intelligence", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-B 555", name: "Machine Learning", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-B 565", name: "Data Mining", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-P 556", name: "Applied Machine Learning", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 511", name: "Machine Learning for Signal Processing", major: "MS DS", credits: 3 },
  { courseCode: "ILS-Z 534", name: "Search", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 606", name: "Network Science", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-B 561", name: "Advanced Database Concepts", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 516", name: "Engineering Cloud Computing", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 535", name: "Management, Access, and Use of Big and Complex Data", major: "MS DS", credits: 3 },
  { courseCode: "DSCI-D 532", name: "Applied Database Technologies", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 583", name: "Information Visualization", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 584", name: "Scientific Visualization", major: "MS DS", credits: 3 },
  { courseCode: "STAT-S 670", name: "Exploratory Data Analysis", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 520", name: "Security for Networked Systems", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 525", name: "Organizational Informatics and Economics of Security", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 533", name: "Systems and Protocol Security and Information Assurance", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 538", name: "Introduction to Cryptography", major: "MS DS", credits: 3 },
  { courseCode: "ECON-M 501", name: "Microeconomic Theory I", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 507", name: "Introduction to Health Informatics", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 519", name: "Introduction to Bioinformatics", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 529", name: "Machine Learning in Bioinformatics", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-B 657", name: "Computer Vision", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 513", name: "Usable Artificial Intelligence", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 527", name: "Mobile and Pervasive Design", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 540", name: "Human Robot Interaction", major: "MS DS", credits: 3 },
  { courseCode: "INFO-I 542", name: "Foundations of HCI", major: "MS DS", credits: 3 },
  { courseCode: "ILS-Z 639", name: "Social Media Mining", major: "MS DS", credits: 3 },
  { courseCode: "DSCI-D 592", name: "Data Science in Practice", major: "MS DS", credits: 3 },
  { courseCode: "ILS-Z 690", name: "Capstone in Information Architecture", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 533", name: "Deep Learning Systems", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 536", name: "High Performance Graph Analytics", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 522", name: "HPC and Cloud Computing for Large Scale Image Applications", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 534", name: "Big Data Applications", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 616", name: "Advanced Cloud Computing", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 503", name: "Introduction to Intelligent Systems", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 517", name: "High Performance Computing", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 535", name: "Image Processing for Medical Applications", major: "MS DS", credits: 3 },
  { courseCode: "ENGR-E 551", name: "Simulating Nanoscale Systems", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-B 503", name: "Algorithms Design and Analysis", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-B 505", name: "Applied Algorithms", major: "MS DS", credits: 3 },
  { courseCode: "CSCI-C 200", name: "Introduction to Computers and Programming", major: "BA Computer Science", credits: 4 },
  { courseCode: "CSCI-C 211", name: "Introduction to Computer Science", major: "BA Computer Science", credits: 4 },
  { courseCode: "CSCI-H 211", name: "Introduction to Computer Science-Honors", major: "BA Computer Science", credits: 4 },
  { courseCode: "CSCI-C 212", name: "Introduction to Software Systems", major: "BA Computer Science", credits: 4 },
  { courseCode: "CSCI-H 212", name: "Introduction to Software Systems, Honors", major: "BA Computer Science", credits: 4 },
  { courseCode: "CSCI-C 241", name: "Discrete Structures for Computer Science", major: "BA Computer Science", credits: 3 },
  { courseCode: "CSCI-H 241", name: "Discrete Structures for Computer Science, Honors", major: "BA Computer Science", credits: 3 },
  { courseCode: "CSCI-C 343", name: "Data Structures", major: "BA Computer Science", credits: 4 },
  { courseCode: "CSCI-H 343", name: "Data Structures, Honors", major: "BA Computer Science", credits: 4 }
];

const mapCoursesToSkills = (courses) => {
  // Example mapping logic
  return courses.map(course => ({
    id: course.id + '-skill',
    name: course.name + ' Skill'
  }));
};

const mapCoursesToCareerGoals = (courses) => {
  // Example mapping logic
  return courses.map(course => ({
    id: course.id + '-career',
    name: course.name + ' Career'
  }));
};
