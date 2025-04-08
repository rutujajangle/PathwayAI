export interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
  prerequisites?: string[];
  corequisites?: string[];
  skills?: string[];
}

export interface Semester {
  courses: Course[];
}

export interface Specialization {
  [key: string]: Semester;
}

export interface DegreeProgram {
  degree: string;
  description: string;
  totalCredits: number;
  duration: string;
  specializations: {
    [key: string]: Specialization;
  };
}

export const degreePrograms: DegreeProgram[] = [
  {
    degree: "BA Computer Science",
    description: "A comprehensive program focusing on computer science fundamentals with a liberal arts perspective.",
    totalCredits: 120,
    duration: "4 years",
    specializations: {
      "General Track": {
        "semester_1": {
          courses: [
            {"id": "CSCI-C 200", "name": "Introduction to Computers and Programming", "description": "Introductory course in computer programming and problem-solving techniques.", "credits": 3},
            {"id": "CSCI-C 211", "name": "Introduction to Computer Science", "description": "Fundamentals of computer science and programming.", "credits": 3},
            {"id": "MATH-M 211", "name": "Calculus I", "description": "Introduction to calculus and its applications.", "credits": 3}
          ]
        },
        "semester_2": {
          courses: [
            {"id": "CSCI-C 212", "name": "Introduction to Software Systems", "description": "Basic concepts of software engineering and system design.", "credits": 3},
            {"id": "CSCI-C 241", "name": "Discrete Structures for Computer Science", "description": "Foundations of discrete mathematics for computer science.", "credits": 3},
            {"id": "MATH-M 212", "name": "Calculus II", "description": "Continuation of Calculus I, including integration and its applications.", "credits": 3}
          ]
        },
        "semester_3": {
          courses: [
            {"id": "CSCI-C 343", "name": "Data Structures", "description": "Study of data structures and their applications.", "credits": 3},
            {"id": "CSCI-B 461", "name": "Database Concepts", "description": "Introduction to database systems and applications.", "credits": 3},
            {"id": "CSCI-B 503", "name": "Algorithms Design and Analysis", "description": "Advanced study of algorithms and their analysis.", "credits": 3}
          ]
        },
        "semester_4": {
          courses: [
            {"id": "CSCI-B 505", "name": "Applied Algorithms", "description": "Design and implementation of algorithms for real-world problems.", "credits": 3},
            {"id": "CSCI-B 561", "name": "Advanced Database Concepts", "description": "Advanced topics in database systems.", "credits": 3},
            {"id": "CSCI-B 565", "name": "Data Mining", "description": "Techniques for data mining and knowledge discovery.", "credits": 3}
          ]
        },
        "semester_5": {
          courses: [
            {"id": "CSCI-B 657", "name": "Computer Vision", "description": "Introduction to computer vision and image processing.", "credits": 3},
            {"id": "ENGR-E 511", "name": "Machine Learning for Signal Processing", "description": "Machine learning applications in signal processing.", "credits": 3},
            {"id": "ENGR-E 533", "name": "Deep Learning Systems", "description": "Building and deploying deep learning systems.", "credits": 3}
          ]
        },
        "semester_6": {
          courses: [
            {"id": "ENGR-E 516", "name": "Engineering Cloud Computing", "description": "Basic concepts on programming models and tools of cloud computing.", "credits": 3},
            {"id": "ENGR-E 522", "name": "HPC and Cloud Computing for Large Scale Image Applications", "description": "Big data techniques for sensors and remote sensing.", "credits": 3},
            {"id": "ENGR-E 534", "name": "Big Data Applications", "description": "Overview of big data applications covering a broad range of problems and solutions.", "credits": 3}
          ]
        },
        "semester_7": {
          courses: [
            {"id": "ENGR-E 583", "name": "Information Visualization", "description": "How to visualize abstract information and hands-on experience in applications.", "credits": 3},
            {"id": "ENGR-E 584", "name": "Scientific Visualization", "description": "Design and critique of scientific visualizations.", "credits": 3},
            {"id": "INFO-I 590", "name": "Data Visualization", "description": "Fundamentals of data visualization and its applications.", "credits": 3}
          ]
        },
        "semester_8": {
          courses: [
            {"id": "INFO-I 606", "name": "Network Science", "description": "Theories and applications of network science.", "credits": 3},
            {"id": "INFO-I 513", "name": "Usable Artificial Intelligence", "description": "AI techniques for data collection, analysis, and visualization.", "credits": 3},
            {"id": "CSCI-P 556", "name": "Applied Machine Learning", "description": "Hands-on application of machine learning techniques.", "credits": 3}
          ]
        }
      }
    }
  },
  {
    degree: "BS Cybersecurity & Global Policy",
    description: "An interdisciplinary program combining cybersecurity technical skills with global policy understanding.",
    totalCredits: 120,
    duration: "4 years",
    specializations: {
      "Security Analysis": {
        "semester_1": {
          courses: [
            {"id": "CSCI-C 200", "name": "Introduction to Computers and Programming", "description": "Introductory course in computer programming and problem-solving techniques.", "credits": 3},
            {"id": "CSCI-C 211", "name": "Introduction to Computer Science", "description": "Fundamentals of computer science and programming.", "credits": 3},
            {"id": "MATH-M 211", "name": "Calculus I", "description": "Introduction to calculus and its applications.", "credits": 3}
          ]
        },
        // ... Add remaining semesters
      }
    }
  },
  {
    degree: "BS Data Science",
    description: "A comprehensive program focusing on data analysis, machine learning, and statistical methods.",
    totalCredits: 120,
    duration: "4 years",
    specializations: {
      "Cloud Engineer": {
        "semester_1": {
          courses: [
            {"id": "CSCI-C 200", "name": "Introduction to Computers and Programming", "description": "Introductory course in computer programming and problem-solving techniques.", "credits": 3},
            {"id": "CSCI-C 211", "name": "Introduction to Computer Science", "description": "Fundamentals of computer science and programming.", "credits": 3},
            {"id": "MATH-M 211", "name": "Calculus I", "description": "Introduction to calculus and its applications.", "credits": 3}
          ]
        },
        "semester_2": {
          courses: [
            {"id": "CSCI-C 212", "name": "Introduction to Software Systems", "description": "Basic concepts of software engineering and system design.", "credits": 3},
            {"id": "CSCI-C 241", "name": "Discrete Structures for Computer Science", "description": "Foundations of discrete mathematics for computer science.", "credits": 3},
            {"id": "MATH-M 212", "name": "Calculus II", "description": "Continuation of Calculus I, including integration and its applications.", "credits": 3}
          ]
        },
        "semester_3": {
          courses: [
            {"id": "CSCI-C 343", "name": "Data Structures", "description": "Study of data structures and their applications.", "credits": 3},
            {"id": "CSCI-B 461", "name": "Database Concepts", "description": "Introduction to database systems and applications.", "credits": 3},
            {"id": "ENGR-E 516", "name": "Engineering Cloud Computing", "description": "Basic concepts on programming models and tools of cloud computing.", "credits": 3}
          ]
        },
        "semester_4": {
          courses: [
            {"id": "ENGR-E 522", "name": "HPC and Cloud Computing for Large Scale Image Applications", "description": "Big data techniques for sensors and remote sensing.", "credits": 3},
            {"id": "ENGR-E 534", "name": "Big Data Applications", "description": "Overview of big data applications covering a broad range of problems and solutions.", "credits": 3},
            {"id": "ENGR-E 583", "name": "Information Visualization", "description": "How to visualize abstract information and hands-on experience in applications.", "credits": 3}
          ]
        },
        "semester_5": {
          courses: [
            {"id": "ENGR-E 584", "name": "Scientific Visualization", "description": "Design and critique of scientific visualizations.", "credits": 3},
            {"id": "INFO-I 590", "name": "Data Visualization", "description": "Fundamentals of data visualization and its applications.", "credits": 3},
            {"id": "INFO-I 606", "name": "Network Science", "description": "Theories and applications of network science.", "credits": 3}
          ]
        },
        "semester_6": {
          courses: [
            {"id": "CSCI-B 561", "name": "Advanced Database Concepts", "description": "Advanced topics in database systems.", "credits": 3},
            {"id": "CSCI-B 565", "name": "Data Mining", "description": "Techniques for data mining and knowledge discovery.", "credits": 3},
            {"id": "CSCI-P 556", "name": "Applied Machine Learning", "description": "Hands-on application of machine learning techniques.", "credits": 3}
          ]
        },
        "semester_7": {
          courses: [
            {"id": "CSCI-B 657", "name": "Computer Vision", "description": "Introduction to computer vision and image processing.", "credits": 3},
            {"id": "ENGR-E 511", "name": "Machine Learning for Signal Processing", "description": "Machine learning applications in signal processing.", "credits": 3},
            {"id": "ENGR-E 533", "name": "Deep Learning Systems", "description": "Building and deploying deep learning systems.", "credits": 3}
          ]
        },
        "semester_8": {
          courses: [
            {"id": "CSCI-B 503", "name": "Algorithms Design and Analysis", "description": "Advanced study of algorithms and their analysis.", "credits": 3},
            {"id": "CSCI-B 505", "name": "Applied Algorithms", "description": "Design and implementation of algorithms for real-world problems.", "credits": 3},
            {"id": "INFO-I 513", "name": "Usable Artificial Intelligence", "description": "AI techniques for data collection, analysis, and visualization.", "credits": 3}
          ]
        }
      }
    }
  },
  {
    degree: "BS Intelligent Systems Engineering",
    description: "A program focusing on the design and implementation of intelligent systems and AI applications.",
    totalCredits: 120,
    duration: "4 years",
    specializations: {
      "AI Systems": {
        // ... Add semesters
      }
    }
  },
  {
    degree: "BS Informatics",
    description: "A program that combines information technology with human-centered design and social aspects of computing.",
    totalCredits: 120,
    duration: "4 years",
    specializations: {
      "Human-Computer Interaction": {
        // ... Add semesters
      }
    }
  },
  {
    degree: "MS Intelligent Systems Engineering",
    description: "Advanced study in intelligent systems, machine learning, and AI applications.",
    totalCredits: 30,
    duration: "2 years",
    specializations: {
      "Advanced AI": {
        "semester_1": {
          courses: [
            {"id": "CSCI-P 556", "name": "Applied Machine Learning", "description": "Hands-on application of machine learning techniques.", "credits": 3},
            {"id": "CSCI-B 503", "name": "Algorithms Design and Analysis", "description": "Advanced study of algorithms and their analysis.", "credits": 3},
            {"id": "CSCI-B 505", "name": "Applied Algorithms", "description": "Design and implementation of algorithms for real-world problems.", "credits": 3}
          ]
        },
        "semester_2": {
          courses: [
            {"id": "CSCI-B 561", "name": "Advanced Database Concepts", "description": "Advanced topics in database systems.", "credits": 3},
            {"id": "CSCI-B 565", "name": "Data Mining", "description": "Techniques for data mining and knowledge discovery.", "credits": 3},
            {"id": "CSCI-B 657", "name": "Computer Vision", "description": "Introduction to computer vision and image processing.", "credits": 3}
          ]
        },
        "semester_3": {
          courses: [
            {"id": "ENGR-E 511", "name": "Machine Learning for Signal Processing", "description": "Machine learning applications in signal processing.", "credits": 3},
            {"id": "ENGR-E 533", "name": "Deep Learning Systems", "description": "Building and deploying deep learning systems.", "credits": 3},
            {"id": "INFO-I 513", "name": "Usable Artificial Intelligence", "description": "AI techniques for data collection, analysis, and visualization.", "credits": 3}
          ]
        },
        "semester_4": {
          courses: [
            {"id": "ENGR-E 516", "name": "Engineering Cloud Computing", "description": "Basic concepts on programming models and tools of cloud computing.", "credits": 3},
            {"id": "ENGR-E 522", "name": "HPC and Cloud Computing for Large Scale Image Applications", "description": "Big data techniques for sensors and remote sensing.", "credits": 3},
            {"id": "ENGR-E 534", "name": "Big Data Applications", "description": "Overview of big data applications covering a broad range of problems and solutions.", "credits": 3}
          ]
        }
      }
    }
  },
  {
    degree: "Ph.D. In Information Science",
    description: "Doctoral program focusing on advanced research in information science and technology.",
    totalCredits: 60,
    duration: "4-6 years",
    specializations: {
      "Research Track": {
        // ... Add semesters
      }
    }
  },
  {
    degree: "Master's in Library & Information Science",
    description: "Advanced study in library science, information management, and digital curation.",
    totalCredits: 36,
    duration: "2 years",
    specializations: {
      "Digital Libraries": {
        // ... Add semesters
      }
    }
  }
]; 