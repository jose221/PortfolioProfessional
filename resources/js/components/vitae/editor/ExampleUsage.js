import React from 'react';
import EditorLoader from './components/EditorLoader';

/**
 * Example usage of the new Initial Configuration Flow for CV Editor
 * 
 * This component demonstrates how to use the EditorLoader which handles:
 * 1. Initial configuration modal (template, sections, colors)
 * 2. Automatic loading of the enhanced CV editor
 * 3. Persistence of user preferences
 */

// Sample CV data structure
const sampleCVData = {
    name: "José Ángel Alvarado González",
    title: "Desarrollador Full Stack",
    title_en: "Full Stack Developer",
    email: "jose@example.com",
    phone: "+1234567890",
    location: "Ciudad de México",
    location_en: "Mexico City",
    linkedin: "https://linkedin.com/in/josealvarado",
    github: "https://github.com/josealvarado",
    website: "https://josealvarado.dev",
    
    summary: "Desarrollador experimentado con más de 5 años de experiencia en tecnologías web modernas.",
    summary_en: "Experienced developer with over 5 years of experience in modern web technologies.",
    
    experience: [
        {
            company: "Tech Company Inc.",
            company_en: "Tech Company Inc.",
            position: "Senior Full Stack Developer",
            position_en: "Senior Full Stack Developer",
            start_date: "2020-01",
            end_date: null,
            current: true,
            description: "Desarrollo de aplicaciones web escalables usando React, Node.js y PostgreSQL.",
            description_en: "Development of scalable web applications using React, Node.js and PostgreSQL.",
            achievements: [
                "Improved application performance by 40%",
                "Led a team of 5 developers",
                "Implemented CI/CD pipelines"
            ]
        }
    ],
    
    education: [
        {
            institution: "Universidad Nacional",
            institution_en: "National University",
            degree: "Ingeniería en Sistemas",
            degree_en: "Systems Engineering",
            field: "Ciencias de la Computación",
            field_en: "Computer Science",
            start_date: "2015-08",
            end_date: "2019-12",
            gpa: "9.2/10",
            description: "Especialización en desarrollo de software y bases de datos."
        }
    ],
    
    skills: [
        {
            name: "JavaScript",
            name_en: "JavaScript",
            category: "Programación",
            category_en: "Programming",
            level: "Experto",
            years_experience: 5,
            description: "Desarrollo frontend y backend con JavaScript moderno."
        },
        {
            name: "React",
            name_en: "React",
            category: "Frontend",
            category_en: "Frontend",
            level: "Avanzado",
            years_experience: 4,
            description: "Desarrollo de interfaces de usuario interactivas."
        }
    ],
    
    certifications: [
        {
            name: "AWS Certified Developer",
            name_en: "AWS Certified Developer",
            issuer: "Amazon Web Services",
            issuer_en: "Amazon Web Services",
            date: "2023-06",
            credential_id: "AWS-123456",
            url: "https://aws.amazon.com/verification"
        }
    ],
    
    knowledges: [
        {
            name: "Arquitectura de Software",
            name_en: "Software Architecture",
            category: "Diseño",
            category_en: "Design",
            level: "Avanzado",
            description: "Patrones de diseño y arquitecturas escalables."
        }
    ],
    
    studies: [
        {
            title: "Curso de Machine Learning",
            title_en: "Machine Learning Course",
            institution: "Coursera",
            institution_en: "Coursera",
            date: "2023-03",
            duration: "40 horas",
            description: "Fundamentos de aprendizaje automático con Python."
        }
    ],
    
    stacks: [
        {
            name: "MERN Stack",
            name_en: "MERN Stack",
            category: "Full Stack",
            category_en: "Full Stack",
            level: "Experto",
            years_experience: 4,
            description: "MongoDB, Express, React, Node.js"
        }
    ]
};

const CVEditorExample = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            {/* 
                EditorLoader handles the complete flow:
                
                1. First time users see the InitialConfigModal with:
                   - Template selection (Harvard for now, more coming)
                   - Section ordering with drag & drop
                   - Color customization (header, titles, text, icons)
                
                2. After configuration, the enhanced editor loads with:
                   - Applied theme colors
                   - Custom section order
                   - Only enabled sections visible
                   - Persistent settings in localStorage
                
                3. Returning users skip the modal and go directly to the editor
                   with their saved preferences
            */}
            <EditorLoader 
                data={sampleCVData} 
                lang="es" // or "en" for English
            />
        </div>
    );
};

export default CVEditorExample;

/**
 * USAGE INSTRUCTIONS:
 * 
 * 1. Import and use EditorLoader instead of VitaeEditorContainer
 * 2. Pass your CV data and language preference
 * 3. First-time users will see the configuration modal
 * 4. The modal guides users through:
 *    - Template selection
 *    - Section organization (drag & drop)
 *    - Color customization
 * 5. After clicking "Guardar y continuar", the editor loads with applied settings
 * 6. Settings persist in localStorage for future sessions
 * 
 * FEATURES:
 * 
 * ✅ Step-by-step configuration wizard
 * ✅ Template selection (Harvard available, more coming)
 * ✅ Drag & drop section ordering
 * ✅ Visual color customization
 * ✅ Persistent user preferences
 * ✅ Bilingual support (Spanish/English)
 * ✅ Enhanced editor with theme application
 * ✅ Dynamic section rendering based on user choices
 * ✅ Custom section support
 * 
 * RESET CONFIGURATION:
 * 
 * To reset the configuration (for testing or user preference):
 * localStorage.removeItem('vitae-configured');
 * localStorage.removeItem('vitae-theme');
 * localStorage.removeItem('vitae-section-order');
 * 
 * Then refresh the page to see the configuration modal again.
 */
