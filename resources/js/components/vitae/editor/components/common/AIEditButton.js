import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DefaultHttpRequest from "../../../../request/DefaultHttpRequest";

/**
 * Componente reutilizable para edición con IA
 * @param {string} lang - Idioma actual
 * @param {string} attribute - Atributo a editar
 * @param {string} content - Contenido actual
 * @param {string} title - Título de la sección
 * @param {string} segment - Segmento de información (default: 'myInformation')
 * @param {function} onAIResponse - Callback que recibe la respuesta de la IA
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {string} size - Tamaño del botón (default: 'small')
 */
export const AIEditButton = ({
    lang,
    attribute,
    content,
    title,
    segment = 'myInformation',
    onAIResponse,
    disabled = false,
    size = 'small'
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentProps, setCurrentProps] = useState({
        lang,
        attribute,
        content,
        title,
        segment
    });

    // Watch para detectar cambios en las props (equivalente a watch en Vue)
    useEffect(() => {
        setCurrentProps({
            lang,
            attribute,
            content,
            title,
            segment
        });
    }, [lang, attribute, content, title, segment]);

    const handleEditAI = async () => {
        if (!onAIResponse) {
            console.warn('AIEditButton: onAIResponse callback is required');
            return;
        }

        if (!currentProps.content || currentProps.content.trim() === '') {
            console.warn('AIEditButton: content is required for AI editing');
            return;
        }

        try {
            setIsLoading(true);

            const httpRequest = new DefaultHttpRequest();
            const primary_url = window.url_api + `/admin/all-information/ai/recommendation`;

            const response = await httpRequest.post(primary_url, {
                lang: currentProps.lang,
                attribute: currentProps.attribute,
                content: currentProps.content,
                title: currentProps.title,
                segment: currentProps.segment
            });

            // Llamar al callback con la respuesta completa
            if (response.code && onAIResponse) {
                onAIResponse(response);
            } else {
                console.error('AIEditButton: Error en la respuesta de la IA', response);
            }

        } catch (error) {
            console.error('AIEditButton: Error al procesar la solicitud de IA:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para obtener el texto del tooltip según el idioma
    const getTooltipText = () => {
        const tooltips = {
            'es': 'Mejorar segmento con IA',
            'en': 'Improve segment with AI',
            'fr': 'Améliorer le segment avec IA',
            'de': 'Segment mit KI verbessern',
            'it': 'Migliorare segmento con IA',
            'pt': 'Melhorar segmento com IA'
        };

        return tooltips[lang] || tooltips['es']; // Default a español si no encuentra el idioma
    };

    return (
        <Tooltip title={getTooltipText()} arrow placement="top">
            <IconButton
                size={size}
                onClick={handleEditAI}
                disabled={disabled || isLoading || !currentProps.content}
                sx={{
                    opacity: isLoading ? 0.6 : 1,
                    '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)'
                    }
                }}
            >
                <AutoFixHighIcon fontSize={size} />
            </IconButton>
        </Tooltip>
    );
};

export default AIEditButton;
