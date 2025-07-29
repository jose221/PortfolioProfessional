// Harvard CV Template Data with Lorem Ipsum content
export const harvardTemplateData = {
    templateId: "cv_template_harvard",
    templateName: "CV Harvard Plantilla",
    
    header: {
        fullName: "Dr. John Harvard Smith",
        title: "Senior Software Engineer & Technical Lead",
        subtitle: "Full-Stack Developer specializing in React, Node.js & Cloud Architecture"
    },
    
    contact: {
        email: "john.harvard@example.com",
        phone: "+1 (555) 123-4567",
        location: "Boston, MA, USA",
        linkedin: "linkedin.com/in/johnharvardsmith",
        website: "www.johnharvardsmith.dev",
        github: "github.com/johnharvardsmith"
    },
    
    summary: {
        content: "Experienced software engineer with over 8 years of expertise in full-stack development, team leadership, and scalable system design. Proven track record of delivering high-performance web applications using modern technologies including React, Node.js, and cloud platforms. Passionate about creating elegant solutions to complex problems while mentoring junior developers and driving technical innovation within cross-functional teams."
    },
    
    experience: [
        {
            id: 1,
            position: "Senior Software Engineer",
            company: "TechCorp Solutions",
            location: "Boston, MA",
            startDate: "Jan 2020",
            endDate: "Present",
            description: "Led development of microservices architecture serving 2M+ users. Designed and implemented RESTful APIs using Node.js and Express. Collaborated with product managers to define technical specifications and deliver features ahead of schedule. Mentored team of 5 junior developers and established code review practices that reduced bugs by 40%.",
            achievements: [
                "Increased application performance by 60% through database optimization",
                "Led migration from monolithic to microservices architecture",
                "Implemented CI/CD pipeline reducing deployment time by 75%"
            ]
        },
        {
            id: 2,
            position: "Full-Stack Developer",
            company: "Innovation Labs Inc.",
            location: "Cambridge, MA",
            startDate: "Jun 2018",
            endDate: "Dec 2019",
            description: "Developed responsive web applications using React, Redux, and Material-UI. Built robust backend services with Node.js, Express, and MongoDB. Participated in agile development processes and collaborated closely with UX/UI designers to create intuitive user experiences.",
            achievements: [
                "Built e-commerce platform handling $2M+ in transactions",
                "Reduced page load times by 45% through performance optimization",
                "Implemented automated testing increasing code coverage to 85%"
            ]
        },
        {
            id: 3,
            position: "Junior Software Developer",
            company: "StartupTech Co.",
            location: "Boston, MA",
            startDate: "Aug 2016",
            endDate: "May 2018",
            description: "Contributed to development of SaaS platform using JavaScript, HTML5, and CSS3. Worked with senior developers to implement new features and fix bugs. Gained experience in version control, testing methodologies, and deployment processes.",
            achievements: [
                "Developed user authentication system with JWT tokens",
                "Created responsive dashboard with real-time data visualization",
                "Participated in code reviews and learned best practices"
            ]
        }
    ],
    
    education: [
        {
            id: 1,
            degree: "Master of Science in Computer Science",
            institution: "Harvard University",
            location: "Cambridge, MA",
            graduationDate: "May 2016",
            gpa: "3.8/4.0",
            honors: "Magna Cum Laude",
            coursework: [
                "Advanced Algorithms and Data Structures",
                "Distributed Systems",
                "Machine Learning",
                "Software Engineering Principles"
            ]
        },
        {
            id: 2,
            degree: "Bachelor of Science in Software Engineering",
            institution: "MIT",
            location: "Cambridge, MA",
            graduationDate: "May 2014",
            gpa: "3.7/4.0",
            honors: "Dean's List (4 semesters)",
            coursework: [
                "Computer Science Fundamentals",
                "Web Development",
                "Database Systems",
                "Mobile Application Development"
            ]
        }
    ],
    
    skills: {
        technical: [
            {
                category: "Programming Languages",
                items: ["JavaScript (ES6+)", "Python", "Java", "TypeScript", "SQL"]
            },
            {
                category: "Frontend Technologies",
                items: ["React", "Redux", "Material-UI", "HTML5", "CSS3", "Sass", "Webpack"]
            },
            {
                category: "Backend Technologies",
                items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"]
            },
            {
                category: "Tools & Platforms",
                items: ["Git", "Docker", "AWS", "Jenkins", "Jira", "Figma", "Postman"]
            }
        ],
        soft: [
            "Team Leadership",
            "Project Management",
            "Technical Documentation",
            "Code Review",
            "Mentoring",
            "Agile Methodologies",
            "Problem Solving",
            "Communication"
        ]
    },
    
    additionalSections: [
        {
            id: 1,
            title: "Certifications",
            type: "list",
            data: [
                {
                    name: "AWS Certified Solutions Architect",
                    issuer: "Amazon Web Services",
                    date: "2022",
                    credentialId: "AWS-CSA-2022-001"
                },
                {
                    name: "React Developer Certification",
                    issuer: "Meta (Facebook)",
                    date: "2021",
                    credentialId: "META-REACT-2021-456"
                },
                {
                    name: "Scrum Master Certified",
                    issuer: "Scrum Alliance",
                    date: "2020",
                    credentialId: "SA-CSM-2020-789"
                }
            ]
        },
        {
            id: 2,
            title: "Languages",
            type: "skills",
            data: [
                { name: "English", level: "Native" },
                { name: "Spanish", level: "Fluent" },
                { name: "French", level: "Intermediate" },
                { name: "German", level: "Basic" }
            ]
        },
        {
            id: 3,
            title: "Projects",
            type: "projects",
            data: [
                {
                    name: "E-commerce Platform",
                    description: "Full-stack e-commerce solution with React frontend and Node.js backend",
                    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
                    url: "https://github.com/johnharvardsmith/ecommerce-platform",
                    date: "2023"
                },
                {
                    name: "Task Management App",
                    description: "Collaborative task management application with real-time updates",
                    technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
                    url: "https://github.com/johnharvardsmith/task-manager",
                    date: "2022"
                }
            ]
        }
    ]
};
