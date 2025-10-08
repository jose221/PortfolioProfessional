import React, { useEffect, useState } from 'react';
import {
    IconButton,
    Tooltip,
    Drawer,
    Box,
    Typography,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Stack,
    TextField,
    Alert
} from '@mui/material';
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [customInstruction, setCustomInstruction] = useState('');
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

    // Función para obtener textos según el idioma
    const getTexts = () => {
        const texts = {
            'es': {
                tooltip: 'Mejorar segmento con IA',
                modalTitle: 'Mejorar con IA',
                language: 'Idioma',
                content: 'Contenido actual',
                advancedLabel: 'Personalizado',
                instructionLabel: '¿Qué te gustaría mejorar?',
                instructionPlaceholder: 'Ej: Mejora la ortografía y gramática, hazlo más profesional y directo...',
                cancel: 'Cancelar',
                generate: 'Generar',
                alertMessage: 'Los cambios generados por IA son temporales y no se guardará en ninguna base de datos.'
            },
            'en': {
                tooltip: 'Improve segment with AI',
                modalTitle: 'Improve with AI',
                language: 'Language',
                content: 'Current content',
                advancedLabel: 'Custom',
                instructionLabel: 'What would you like to improve?',
                instructionPlaceholder: 'Ex: Improve spelling and grammar, make it more professional and direct...',
                cancel: 'Cancel',
                generate: 'Generate',
                alertMessage: 'AI-generated changes are temporary and will not be saved to any database.'
            },
            'fr': {
                tooltip: 'Améliorer le segment avec IA',
                modalTitle: 'Améliorer avec IA',
                language: 'Langue',
                content: 'Contenu actuel',
                advancedLabel: 'Personnalisé',
                instructionLabel: 'Que souhaitez-vous améliorer?',
                instructionPlaceholder: 'Ex: Améliorer l\'orthographe et la grammaire, le rendre plus professionnel...',
                cancel: 'Annuler',
                generate: 'Générer',
                alertMessage: 'Les modifications générées par IA sont temporaires et ne seront pas sauvegardées dans aucune base de données.'
            },
            'de': {
                tooltip: 'Segment mit KI verbessern',
                modalTitle: 'Mit KI verbessern',
                language: 'Sprache',
                content: 'Aktueller Inhalt',
                advancedLabel: 'Benutzerdefiniert',
                instructionLabel: 'Was möchten Sie verbessern?',
                instructionPlaceholder: 'Bsp: Rechtschreibung und Grammatik verbessern, professioneller machen...',
                cancel: 'Abbrechen',
                generate: 'Generieren',
                alertMessage: 'KI-generierte Änderungen sind temporär und werden in keiner Datenbank gespeichert.'
            },
            'it': {
                tooltip: 'Migliorare segmento con IA',
                modalTitle: 'Migliorare con IA',
                language: 'Lingua',
                content: 'Contenuto attuale',
                advancedLabel: 'Personalizzato',
                instructionLabel: 'Cosa vorresti migliorare?',
                instructionPlaceholder: 'Es: Migliora ortografia e grammatica, rendilo più professionale...',
                cancel: 'Annulla',
                generate: 'Genera',
                alertMessage: 'Le modifiche generate dall\'IA sono temporanee e non verranno salvate in nessun database.'
            },
            'pt': {
                tooltip: 'Melhorar segmento com IA',
                modalTitle: 'Melhorar com IA',
                language: 'Idioma',
                content: 'Conteúdo atual',
                advancedLabel: 'Personalizado',
                instructionLabel: 'O que você gostaria de melhorar?',
                instructionPlaceholder: 'Ex: Melhore ortografia e gramática, torne mais profissional...',
                cancel: 'Cancelar',
                generate: 'Gerar',
                alertMessage: 'As alterações geradas por IA são temporárias e não serão salvas em nenhum banco de dados.'
            }
        };

        return texts[lang] || texts['es'];
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsAdvancedMode(false);
        setCustomInstruction('');
    };

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

            // Preparar los datos incluyendo la instrucción personalizada si está disponible
            const requestData = {
                lang: currentProps.lang,
                attribute: currentProps.attribute,
                content: currentProps.content,
                title: currentProps.title,
                segment: currentProps.segment
            };

            // Agregar instrucción personalizada si está en modo avanzado
            if (isAdvancedMode && customInstruction.trim()) {
                requestData.instruction = customInstruction.trim();
            }

            const response = await httpRequest.post(primary_url, requestData);

            // Llamar al callback con la respuesta completa
            if (response.code && onAIResponse) {
                onAIResponse(response);
                handleCloseModal(); // Cerrar modal después de generar
            } else {
                console.error('AIEditButton: Error en la respuesta de la IA', response);
            }

        } catch (error) {
            console.error('AIEditButton: Error al procesar la solicitud de IA:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const texts = getTexts();

    return (
        <>
            <Tooltip title={texts.tooltip} arrow placement="top">
                <IconButton
                    size={size}
                    onClick={handleOpenModal}
                    disabled={disabled || !currentProps.content}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(102, 126, 234, 0.1)'
                        }
                    }}
                >
                    <AutoFixHighIcon fontSize={size} />
                </IconButton>
            </Tooltip>

            <Drawer
                anchor="right"
                open={isModalOpen}
                onClose={handleCloseModal}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: '450px' },
                        maxWidth: '30vw',
                        minWidth: '400px'
                    }
                }}
            >
                <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                            {texts.modalTitle}
                        </Typography>
                        <IconButton onClick={handleCloseModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Alert informativo */}
                    <Alert
                        severity="info"
                        sx={{
                            mb: 3,
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            border: '1px solid rgba(102, 126, 234, 0.2)',
                            '& .MuiAlert-icon': {
                                color: '#667eea'
                            }
                        }}
                    >
                        {texts.alertMessage}
                    </Alert>

                    {/* Content */}
                    <Stack spacing={3} sx={{ flex: 1, overflow: 'hidden' }}>
                        {/* Idioma */}
                        <TextField
                            label={texts.language}
                            value={currentProps.lang.toUpperCase()}
                            disabled
                            size="small"
                            fullWidth
                        />

                        {/* Contenido actual con SunEditor */}
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                {texts.content}
                            </Typography>
                            <Box sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                '& .sun-editor': {
                                    border: 'none !important'
                                },
                                '& .se-toolbar': {
                                    display: 'none !important'
                                }
                            }}>
                                <SunEditor
                                    lang={currentProps.lang}
                                    setContents={currentProps.content}
                                    disable={true}
                                    height="180px"
                                    setOptions={{
                                        buttonList: [],
                                        resizingBar: false,
                                        showPathLabel: false,
                                        charCounter: false
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Switch para modo avanzado */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isAdvancedMode}
                                    onChange={(e) => setIsAdvancedMode(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label={texts.advancedLabel}
                        />

                        {/* Campo de instrucciones personalizadas con SunEditor */}
                        {isAdvancedMode && (
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    {texts.instructionLabel}
                                </Typography>
                                <Box sx={{
                                    flex: 1,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    '& .sun-editor': {
                                        border: 'none !important'
                                    }
                                }}>
                                    <SunEditor
                                        lang={currentProps.lang}
                                        placeholder={texts.instructionPlaceholder}
                                        setContents={customInstruction}
                                        onChange={setCustomInstruction}
                                        height="150px"
                                        setOptions={{
                                            buttonList: [
                                                ['undo', 'redo'],
                                                ['bold', 'underline', 'italic'],
                                                ['removeFormat'],
                                                ['list', 'indent', 'outdent'],
                                                ['paragraphStyle']
                                            ],
                                            resizingBar: false,
                                            showPathLabel: false,
                                            charCounter: false,
                                            defaultParagraphSeparator: 'div',
                                            font: ['Arial', 'tahoma', 'Courier New'],
                                            fontSize: [12, 14, 16, 18],
                                            paragraphStyles: {
                                                'Normal': 'font-size: 14px; line-height: 1.6;',
                                                'Quote': 'font-style: italic; color: #666; border-left: 3px solid #ccc; padding-left: 10px;'
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Stack>

                    {/* Footer */}
                    <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                onClick={handleCloseModal}
                                disabled={isLoading}
                            >
                                {texts.cancel}
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleEditAI}
                                disabled={isLoading}
                                sx={{
                                    backgroundColor: '#667eea',
                                    '&:hover': {
                                        backgroundColor: '#5a6fd8'
                                    }
                                }}
                            >
                                {isLoading ? 'Generando...' : texts.generate}
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default AIEditButton;
