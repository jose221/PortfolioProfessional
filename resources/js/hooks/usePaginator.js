import { useState, useEffect, useCallback, useRef } from 'react';
import useMeasure from 'react-use-measure';
import debounce from 'lodash.debounce';

// Constantes para página A4 (96 DPI)
const PAGE_HEIGHT = 792; // px (altura A4 a 96 DPI)
const PAGE_MARGIN = 40; // px (margen superior/inferior)
const EFFECTIVE_PAGE_HEIGHT = PAGE_HEIGHT - (PAGE_MARGIN * 2);

/**
 * Hook para calcular paginación inteligente de bloques del CV
 * @param {Array} vitaeBlocks - Array de bloques/secciones del CV
 * @param {Object} options - Opciones de configuración
 * @returns {Object} - { pages, totalPages, recalculate }
 */
export const usePaginator = (vitaeBlocks = [], options = {}) => {
    const {
        debounceMs = 150,
        pageHeight = EFFECTIVE_PAGE_HEIGHT,
        enableDebug = false
    } = options;

    const [pages, setPages] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isCalculating, setIsCalculating] = useState(false);
    
    // Refs para medición
    const measurementRefs = useRef(new Map());
    const blockHeights = useRef(new Map());

    /**
     * Algoritmo principal de paginación
     */
    const calculatePagination = useCallback(() => {
        if (!vitaeBlocks.length) {
            setPages([]);
            setTotalPages(1);
            return;
        }

        setIsCalculating(true);
        
        const calculatedPages = [];
        let currentPage = [];
        let currentPageHeight = 0;

        vitaeBlocks.forEach((block, index) => {
            const blockId = block.id || `block-${index}`;
            const blockHeight = blockHeights.current.get(blockId) || 0;

            if (enableDebug) {
                console.log(`Block ${blockId}: height=${blockHeight}px, currentPageHeight=${currentPageHeight}px`);
            }

            // Verificar si el bloque cabe en la página actual
            if (currentPageHeight + blockHeight <= pageHeight) {
                // Cabe en la página actual
                currentPage.push({ ...block, blockId, height: blockHeight });
                currentPageHeight += blockHeight;
            } else {
                // No cabe en la página actual
                
                // Si la página actual no está vacía, cerrarla
                if (currentPage.length > 0) {
                    calculatedPages.push({
                        pageNumber: calculatedPages.length + 1,
                        blocks: [...currentPage],
                        totalHeight: currentPageHeight
                    });
                }

                // Verificar si el bloque es más alto que una página completa
                if (blockHeight > pageHeight) {
                    // Caso límite: bloque más alto que una página
                    // Lo ponemos en su propia página con flag especial
                    calculatedPages.push({
                        pageNumber: calculatedPages.length + 1,
                        blocks: [{ ...block, blockId, height: blockHeight, oversized: true }],
                        totalHeight: blockHeight,
                        hasOversizedContent: true
                    });
                    
                    // Reiniciar para la siguiente página
                    currentPage = [];
                    currentPageHeight = 0;
                } else {
                    // Iniciar nueva página con este bloque
                    currentPage = [{ ...block, blockId, height: blockHeight }];
                    currentPageHeight = blockHeight;
                }
            }
        });

        // Agregar la última página si tiene contenido
        if (currentPage.length > 0) {
            calculatedPages.push({
                pageNumber: calculatedPages.length + 1,
                blocks: [...currentPage],
                totalHeight: currentPageHeight
            });
        }

        // Asegurar al menos una página
        if (calculatedPages.length === 0) {
            calculatedPages.push({
                pageNumber: 1,
                blocks: [],
                totalHeight: 0
            });
        }

        setPages(calculatedPages);
        setTotalPages(calculatedPages.length);
        setIsCalculating(false);

        if (enableDebug) {
            console.log('Pagination calculated:', calculatedPages);
        }
    }, [vitaeBlocks, pageHeight, enableDebug]);

    /**
     * Versión debounced del cálculo
     */
    const debouncedCalculate = useCallback(
        debounce(calculatePagination, debounceMs),
        [calculatePagination, debounceMs]
    );

    /**
     * Función para registrar la altura de un bloque
     */
    const registerBlockHeight = useCallback((blockId, height) => {
        const previousHeight = blockHeights.current.get(blockId);
        
        if (previousHeight !== height) {
            blockHeights.current.set(blockId, height);
            
            if (enableDebug) {
                console.log(`Block height updated: ${blockId} = ${height}px`);
            }
            
            // Recalcular paginación cuando cambie la altura
            debouncedCalculate();
        }
    }, [debouncedCalculate, enableDebug]);

    /**
     * Función para forzar recálculo inmediato
     */
    const recalculate = useCallback(() => {
        calculatePagination();
    }, [calculatePagination]);

    /**
     * Función para obtener ref de medición para un bloque
     */
    const getMeasureRef = useCallback((blockId) => {
        if (!measurementRefs.current.has(blockId)) {
            measurementRefs.current.set(blockId, null);
        }
        return measurementRefs.current.get(blockId);
    }, []);

    // Efecto para recalcular cuando cambien los bloques
    useEffect(() => {
        debouncedCalculate();
    }, [vitaeBlocks, debouncedCalculate]);

    // Limpiar debounce al desmontar
    useEffect(() => {
        return () => {
            debouncedCalculate.cancel();
        };
    }, [debouncedCalculate]);

    return {
        pages,
        totalPages,
        isCalculating,
        recalculate,
        registerBlockHeight,
        getMeasureRef,
        pageHeight: pageHeight,
        effectivePageHeight: pageHeight
    };
};

export default usePaginator;
