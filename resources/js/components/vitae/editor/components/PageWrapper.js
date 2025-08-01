import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

// Constantes para página A4 (96 DPI)
const PAGE_WIDTH = 612; // px (ancho A4 a 96 DPI)
const PAGE_HEIGHT = 792; // px (altura A4 a 96 DPI)
const PAGE_MARGIN = 40; // px (margen)

/**
 * Contenedor estilizado que representa una página A4
 */
const PageContainer = styled(Box)(({ theme, isPreview = false }) => ({
    position: 'relative',
    width: PAGE_WIDTH,
    minHeight: PAGE_HEIGHT,
    maxHeight: PAGE_HEIGHT,
    backgroundColor: '#ffffff',
    boxShadow: isPreview 
        ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto 20px auto',
    padding: `${PAGE_MARGIN}px`,
    boxSizing: 'border-box',
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
    borderRadius: isPreview ? 0 : '4px',
    
    // Estilos para impresión/PDF
    '@media print': {
        width: '210mm',
        minHeight: '297mm',
        maxHeight: '297mm',
        margin: 0,
        padding: '15mm',
        boxShadow: 'none',
        border: 'none',
        borderRadius: 0,
        pageBreakAfter: 'always',
        
        '&:last-child': {
            pageBreakAfter: 'auto'
        }
    },
    
    // Prevenir cortes dentro de elementos
    '& > *': {
        breakInside: 'avoid',
        pageBreakInside: 'avoid'
    }
}));

/**
 * Indicador de número de página
 */
const PageIndicator = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 8,
    right: 12,
    fontSize: '12px',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 8px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    zIndex: 1000,
    
    '@media print': {
        display: 'none'
    }
}));

/**
 * Línea divisoria entre páginas (solo en editor)
 */
const PageDivider = styled(Divider)(({ theme }) => ({
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    borderStyle: 'dashed',
    borderColor: theme.palette.primary.main,
    opacity: 0.5,
    
    '@media print': {
        display: 'none'
    }
}));

/**
 * Indicador de contenido que excede el tamaño de página
 */
const OversizedWarning = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 8,
    left: 12,
    fontSize: '11px',
    color: theme.palette.warning.main,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    padding: '2px 6px',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.warning.main}`,
    zIndex: 1000,
    
    '@media print': {
        display: 'none'
    }
}));

/**
 * Componente PageWrapper - Representa una página A4 del CV
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la página
 * @param {number} props.pageNumber - Número de la página
 * @param {number} props.totalPages - Total de páginas
 * @param {boolean} props.isPreview - Si está en modo preview
 * @param {boolean} props.hasOversizedContent - Si tiene contenido que excede el tamaño
 * @param {boolean} props.showIndicators - Si mostrar indicadores visuales
 * @param {string} props.lang - Idioma ('es' | 'en')
 */
const PageWrapper = ({
    children,
    pageNumber = 1,
    totalPages = 1,
    isPreview = false,
    hasOversizedContent = false,
    showIndicators = true,
    lang = 'es',
    ...props
}) => {
    return (
        <PageContainer 
            isPreview={isPreview}
            data-page-number={pageNumber}
            {...props}
        >
            {/* Contenido de la página */}
            {children}
            
            {/* Indicadores visuales (solo en editor) */}
            {showIndicators && !isPreview && (
                <>
                    {/* Número de página */}
                    <PageIndicator>
                        <Typography variant="caption">
                            {lang === 'es' 
                                ? `Página ${pageNumber} de ${totalPages}`
                                : `Page ${pageNumber} of ${totalPages}`
                            }
                        </Typography>
                    </PageIndicator>
                    
                    {/* Advertencia de contenido oversized */}
                    {hasOversizedContent && (
                        <OversizedWarning>
                            <Typography variant="caption">
                                {lang === 'es' 
                                    ? 'Contenido excede página'
                                    : 'Content exceeds page'
                                }
                            </Typography>
                        </OversizedWarning>
                    )}
                    
                    {/* Línea divisoria (excepto en la última página) */}
                    {pageNumber < totalPages && (
                        <PageDivider />
                    )}
                </>
            )}
        </PageContainer>
    );
};

export default PageWrapper;
