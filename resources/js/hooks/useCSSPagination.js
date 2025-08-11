import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

// Constantes para página A4 (96 DPI)
const PAGE_HEIGHT = 792; // px
const PAGE_MARGIN = 40; // px
const EFFECTIVE_PAGE_HEIGHT = PAGE_HEIGHT - (PAGE_MARGIN * 2);

/**
 * Hook para paginado CSS inteligente
 * Compatible con Craft.js - no renderiza componentes fuera del contexto
 * 
 * @param {Object} options - Opciones de configuración
 * @returns {Object} - Estado y funciones del paginado
 */
export const useCSSPagination = (options = {}) => {
    const {
        enabled = true,
        debounceMs = 150,
        pageHeight = EFFECTIVE_PAGE_HEIGHT,
        enableDebug = false,
        lang = 'es'
    } = options;

    const [isEnabled, setIsEnabled] = useState(enabled);
    const [totalPages, setTotalPages] = useState(1);
    const [isCalculating, setIsCalculating] = useState(false);
    const [containerElement, setContainerElement] = useState(null);

    /**
     * Calcular saltos de página basado en alturas de elementos
     */
    const calculatePageBreaks = useCallback(() => {
        if (!isEnabled || !containerElement) {
            setTotalPages(1);
            return;
        }

        setIsCalculating(true);

        try {
            const sections = containerElement.querySelectorAll('[data-section]');
            
            if (sections.length === 0) {
                setTotalPages(1);
                setIsCalculating(false);
                return;
            }
            
            let currentPageHeight = 0;
            let currentPage = 1;
            
            sections.forEach((section, index) => {
                const sectionHeight = section.offsetHeight || 0;
                
                if (enableDebug) {
                    console.log(`Section ${index}: height=${sectionHeight}px, currentPageHeight=${currentPageHeight}px`);
                }
                
                // Verificar si la sección cabe en la página actual
                if (currentPageHeight + sectionHeight > pageHeight && currentPageHeight > 0) {
                    // Nueva página necesaria
                    section.classList.add('page-break-before');
                    currentPage++;
                    currentPageHeight = sectionHeight;
                } else {
                    section.classList.remove('page-break-before');
                    currentPageHeight += sectionHeight;
                }
                
                // Marcar sección con página actual
                section.setAttribute('data-page', currentPage);
            });
            
            setTotalPages(currentPage);
            
            if (enableDebug) {
                console.log('Total pages:', currentPage);
            }
            
        } catch (error) {
            console.error('Error calculating page breaks:', error);
        } finally {
            setIsCalculating(false);
        }
    }, [isEnabled, pageHeight, enableDebug, containerElement]);

    /**
     * Versión debounced del cálculo
     */
    const debouncedCalculate = useCallback(
        debounce(calculatePageBreaks, debounceMs),
        [calculatePageBreaks, debounceMs]
    );

    /**
     * Crear indicadores visuales de página
     */
    const createPageIndicators = useCallback(() => {
        if (!containerElement || !isEnabled) {
            // Limpiar indicadores existentes
            const existingIndicators = containerElement?.querySelectorAll('.pagination-page-indicator');
            existingIndicators?.forEach(indicator => {
                indicator.remove();
            });
            return;
        }

        // Limpiar indicadores existentes
        const existingIndicators = containerElement.querySelectorAll('.pagination-page-indicator');
        existingIndicators.forEach(indicator => {
            indicator.remove();
        });

        // Crear nuevos indicadores
        for (let page = 1; page <= totalPages; page++) {
            const indicator = document.createElement('div');
            indicator.className = 'pagination-page-indicator';
            indicator.innerHTML = `
                <div class="pagination-page-number">
                    ${lang === 'es' ? 'Página' : 'Page'} ${page} ${lang === 'es' ? 'de' : 'of'} ${totalPages}
                </div>
            `;
            
            // Posicionar el indicador
            const topPosition = (page - 1) * pageHeight;
            indicator.style.top = `${topPosition}px`;
            
            containerElement.appendChild(indicator);
        }
    }, [totalPages, pageHeight, isEnabled, lang, containerElement]);

    /**
     * Efecto principal - configurar paginado cuando se habilita
     */
    useEffect(() => {
        if (isEnabled && containerElement) {
            // Agregar clase de paginado al contenedor
            containerElement.classList.add('pagination-enabled');
            
            // Calcular saltos de página
            setTimeout(() => {
                calculatePageBreaks();
            }, 100);
            
        } else if (containerElement) {
            // Remover clase de paginado
            containerElement.classList.remove('pagination-enabled');
            
            // Limpiar clases de salto de página
            containerElement.querySelectorAll('.page-break-before').forEach(el => {
                el.classList.remove('page-break-before');
            });
            
            // Limpiar indicadores
            createPageIndicators();
        }
    }, [isEnabled, containerElement, calculatePageBreaks, createPageIndicators]);

    /**
     * Efecto para crear indicadores cuando cambien las páginas
     */
    useEffect(() => {
        if (isEnabled && containerElement) {
            createPageIndicators();
        }
    }, [totalPages, isEnabled, createPageIndicators, containerElement]);

    /**
     * Función para establecer el contenedor
     */
    const setContainer = useCallback((element) => {
        setContainerElement(element);
    }, []);

    /**
     * Función para alternar paginado
     */
    const togglePagination = useCallback(() => {
        setIsEnabled(prev => !prev);
    }, []);

    /**
     * Función para forzar recálculo
     */
    const recalculate = useCallback(() => {
        if (isEnabled && containerElement) {
            calculatePageBreaks();
        }
    }, [isEnabled, calculatePageBreaks, containerElement]);

    return {
        // Estado
        isEnabled,
        totalPages,
        isCalculating,
        
        // Funciones
        setContainer,
        togglePagination,
        recalculate,
        setIsEnabled
    };
};

export default useCSSPagination;
