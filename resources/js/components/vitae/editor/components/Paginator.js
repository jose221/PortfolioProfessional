import React, { useEffect, useRef, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import useMeasure from 'react-use-measure';
import { usePaginator } from '../../../../hooks/usePaginator';
import PageWrapper from './PageWrapper';

/**
 * Contenedor principal del paginador
 */
const PaginatorContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px 0',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
}));

/**
 * Contenedor para medición oculta de bloques
 */
const MeasurementContainer = styled(Box)({
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
    width: '612px', // Ancho A4
    visibility: 'hidden',
    pointerEvents: 'none',
    zIndex: -1
});

/**
 * Indicador de carga
 */
const LoadingIndicator = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '40px',
    color: theme.palette.text.secondary
}));

/**
 * Contador de páginas en la parte superior
 */
const PageCounter = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    padding: '12px 24px',
    borderRadius: '24px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
}));

/**
 * Componente Paginator - Maneja la paginación inteligente del CV
 * 
 * @param {Object} props
 * @param {Array} props.vitaeBlocks - Array de bloques/secciones del CV
 * @param {boolean} props.isPreview - Si está en modo preview
 * @param {string} props.lang - Idioma ('es' | 'en')
 * @param {Object} props.options - Opciones de configuración
 */
const Paginator = ({
    vitaeBlocks = [],
    isPreview = false,
    lang = 'es',
    options = {},
    ...props
}) => {
    const {
        enableDebug = false,
        showPageCounter = true,
        showIndicators = true
    } = options;

    // Hook de paginación
    const {
        pages,
        totalPages,
        isCalculating,
        recalculate,
        registerBlockHeight,
        getMeasureRef
    } = usePaginator(vitaeBlocks, { enableDebug });

    // Refs para medición
    const measurementRefs = useRef(new Map());

    /**
     * Componente para medir un bloque individual
     */
    const BlockMeasurer = ({ block, blockId }) => {
        const [measureRef, bounds] = useMeasure();

        // Registrar altura cuando cambie
        useEffect(() => {
            if (bounds.height > 0) {
                registerBlockHeight(blockId, bounds.height);
            }
        }, [bounds.height, blockId, registerBlockHeight]);

        return (
            <div ref={measureRef} style={{ width: '100%' }}>
                {block.component}
            </div>
        );
    };

    /**
     * Renderizar bloque en una página
     */
    const renderBlockInPage = useCallback((block) => {
        const BlockComponent = block.component;
        
        if (!BlockComponent) {
            return null;
        }

        return (
            <Box
                key={block.blockId}
                sx={{
                    width: '100%',
                    breakInside: 'avoid',
                    pageBreakInside: 'avoid',
                    marginBottom: block.oversized ? 0 : '16px'
                }}
                data-block-id={block.blockId}
                data-block-height={block.height}
            >
                {BlockComponent}
            </Box>
        );
    }, []);

    /**
     * Renderizar una página completa
     */
    const renderPage = useCallback((page) => {
        return (
            <PageWrapper
                key={`page-${page.pageNumber}`}
                pageNumber={page.pageNumber}
                totalPages={totalPages}
                isPreview={isPreview}
                hasOversizedContent={page.hasOversizedContent}
                showIndicators={showIndicators}
                lang={lang}
            >
                {page.blocks.map(renderBlockInPage)}
            </PageWrapper>
        );
    }, [totalPages, isPreview, showIndicators, lang, renderBlockInPage]);

    // Debug logging
    useEffect(() => {
        if (enableDebug) {
            console.log('Paginator render:', {
                vitaeBlocks: vitaeBlocks.length,
                pages: pages.length,
                totalPages,
                isCalculating
            });
        }
    }, [vitaeBlocks, pages, totalPages, isCalculating, enableDebug]);

    return (
        <PaginatorContainer {...props}>
            {/* Contador de páginas */}
            {showPageCounter && totalPages > 0 && (
                <PageCounter>
                    <Typography variant="body2" fontWeight="medium">
                        {lang === 'es' 
                            ? `${totalPages} ${totalPages === 1 ? 'página' : 'páginas'}`
                            : `${totalPages} ${totalPages === 1 ? 'page' : 'pages'}`
                        }
                        {isCalculating && (
                            <CircularProgress 
                                size={16} 
                                sx={{ ml: 1 }} 
                            />
                        )}
                    </Typography>
                </PageCounter>
            )}

            {/* Contenedor de medición oculto */}
            <MeasurementContainer>
                {vitaeBlocks.map((block, index) => {
                    const blockId = block.id || `block-${index}`;
                    return (
                        <BlockMeasurer
                            key={`measure-${blockId}`}
                            block={block}
                            blockId={blockId}
                        />
                    );
                })}
            </MeasurementContainer>

            {/* Páginas renderizadas */}
            {isCalculating ? (
                <LoadingIndicator>
                    <CircularProgress />
                    <Typography variant="body2">
                        {lang === 'es' 
                            ? 'Calculando paginación...'
                            : 'Calculating pagination...'
                        }
                    </Typography>
                </LoadingIndicator>
            ) : pages.length > 0 ? (
                pages.map(renderPage)
            ) : (
                <PageWrapper
                    pageNumber={1}
                    totalPages={1}
                    isPreview={isPreview}
                    showIndicators={showIndicators}
                    lang={lang}
                >
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        textAlign="center"
                        sx={{ mt: 4 }}
                    >
                        {lang === 'es' 
                            ? 'No hay contenido para mostrar'
                            : 'No content to display'
                        }
                    </Typography>
                </PageWrapper>
            )}
        </PaginatorContainer>
    );
};

export default Paginator;
