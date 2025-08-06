import React, { createContext, useContext, useState, useEffect } from 'react';

const SectionOrderContext = createContext();

export const useSectionOrder = () => {
    const context = useContext(SectionOrderContext);
    if (!context) {
        throw new Error('useSectionOrder must be used within a SectionOrderProvider');
    }
    return context;
};

const defaultSections = [
    { id: 'header', name: 'Encabezado', nameEn: 'Header', enabled: true, required: true },
    { id: 'summary', name: 'Resumen Profesional', nameEn: 'Professional Summary', enabled: true, required: false },
    { id: 'contact', name: 'Información de Contacto', nameEn: 'Contact Information', enabled: true, required: false },
    { id: 'experience', name: 'Experiencia Laboral', nameEn: 'Work Experience', enabled: true, required: false },
    { id: 'education', name: 'Educación', nameEn: 'Education', enabled: true, required: false },
    { id: 'skills', name: 'Habilidades y Competencias', nameEn: 'Skills & Competencies', enabled: true, required: false },
    { id: 'certifications', name: 'Certificaciones', nameEn: 'Certifications', enabled: true, required: false },
    { id: 'knowledges', name: 'Conocimientos', nameEn: 'Knowledge', enabled: true, required: false },
    { id: 'studies', name: 'Estudios', nameEn: 'Studies', enabled: true, required: false },
    { id: 'stacks', name: 'Tecnologías', nameEn: 'Technologies', enabled: true, required: false }
];

export const SectionOrderProvider = ({ children }) => {
    const [sections, setSections] = useState(() => {
        const savedSections = localStorage.getItem('vitae-section-order');
        return savedSections ? JSON.parse(savedSections) : defaultSections;
    });

    const [customSections, setCustomSections] = useState(() => {
        const savedCustomSections = localStorage.getItem('vitae-custom-sections');
        return savedCustomSections ? JSON.parse(savedCustomSections) : [];
    });

    useEffect(() => {
        localStorage.setItem('vitae-section-order', JSON.stringify(sections));
    }, [sections]);

    useEffect(() => {
        localStorage.setItem('vitae-custom-sections', JSON.stringify(customSections));
    }, [customSections]);

    const updateSectionOrder = (newSections) => {
        setSections(newSections);
    };

    const toggleSectionEnabled = (sectionId) => {
        setSections(prev => prev.map(section => 
            section.id === sectionId 
                ? { ...section, enabled: !section.enabled }
                : section
        ));
    };

    const addCustomSection = (customSection) => {
        const newSection = {
            id: `custom-${Date.now()}`,
            name: customSection.title,
            nameEn: customSection.title,
            enabled: true,
            required: false,
            isCustom: true,
            content: customSection.content
        };
        setCustomSections(prev => [...prev, newSection]);
        return newSection;
    };

    const removeCustomSection = (sectionId) => {
        setCustomSections(prev => prev.filter(section => section.id !== sectionId));
    };

    const getAllSections = () => {
        return [...sections, ...customSections];
    };

    const getEnabledSections = () => {
        return getAllSections().filter(section => section.enabled);
    };

    return (
        <SectionOrderContext.Provider value={{
            sections,
            customSections,
            updateSectionOrder,
            toggleSectionEnabled,
            addCustomSection,
            removeCustomSection,
            getAllSections,
            getEnabledSections
        }}>
            {children}
        </SectionOrderContext.Provider>
    );
};
