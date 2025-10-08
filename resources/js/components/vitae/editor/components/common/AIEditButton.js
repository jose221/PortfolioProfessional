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
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Backdrop
} from '@mui/material';
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
    const [showResults, setShowResults] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);
    const [originalContent, setOriginalContent] = useState('');
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
        setOriginalContent(content); // Guardar contenido original
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
                alertMessage: 'Los cambios generados por IA son temporales y no se guardará en ninguna base de datos.',
                resultsTitle: 'Resultado generado por IA',
                backToOriginal: 'Regresar original',
                modifyResponse: 'Modificar actual',
                keepResponse: 'Conservar',
                generatingNew: 'Generando nueva versión...'
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
                alertMessage: 'AI-generated changes are temporary and will not be saved to any database.',
                resultsTitle: 'AI-generated result',
                backToOriginal: 'Back to original',
                modifyResponse: 'Modify current',
                keepResponse: 'Keep',
                generatingNew: 'Generating new version...'
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
                alertMessage: 'Les modifications générées par IA sont temporaires et ne seront pas sauvegardées dans aucune base de données.',
                resultsTitle: 'Résultat généré par IA',
                backToOriginal: 'Retour à l\'original',
                modifyResponse: 'Modifier actuel',
                keepResponse: 'Conserver',
                generatingNew: 'Génération nouvelle version...'
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
                alertMessage: 'KI-generierte Änderungen sind temporär und werden in keiner Datenbank gespeichert.',
                resultsTitle: 'KI-generiertes Ergebnis',
                backToOriginal: 'Zurück zum Original',
                modifyResponse: 'Aktuell ändern',
                keepResponse: 'Behalten',
                generatingNew: 'Generiere neue Version...'
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
                alertMessage: 'Le modifiche generate dall\'IA sono temporanee e non verranno salvate in nessun database.',
                resultsTitle: 'Risultato generato dall\'IA',
                backToOriginal: 'Torna all\'originale',
                modifyResponse: 'Modifica attuale',
                keepResponse: 'Mantieni',
                generatingNew: 'Generando nuova versione...'
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
                alertMessage: 'As alterações geradas por IA são temporárias e não serão salvas em nenhum banco de dados.',
                resultsTitle: 'Resultado gerado por IA',
                backToOriginal: 'Voltar ao original',
                modifyResponse: 'Modificar atual',
                keepResponse: 'Manter',
                generatingNew: 'Gerando nova versão...'
            }
        };

        return texts[lang] || texts['es'];
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setShowResults(false);
        setAiResponse(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsAdvancedMode(false);
        setCustomInstruction('');
        setShowResults(false);
        setAiResponse(null);
    };

    const handleBackToOriginal = () => {
        setShowResults(false);
        setAiResponse(null);
        setIsAdvancedMode(false);
        setCustomInstruction('');
        // Restaurar contenido original en currentProps
        setCurrentProps(prev => ({
            ...prev,
            content: originalContent
        }));
    };

    const handleModifyResponse = () => {
        setShowResults(false);
        setIsAdvancedMode(true);
        // Mantener la respuesta actual como contenido base para modificar
        if (aiResponse && aiResponse.data && aiResponse.data.current) {
            setCurrentProps(prev => ({
                ...prev,
                content: aiResponse.data.current
            }));
        }
    };

    const handleKeepResponse = () => {
        if (aiResponse && onAIResponse) {
            onAIResponse(aiResponse);
        }
        handleCloseModal();
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

            // Mostrar resultados en lugar de cerrar el modal
            if (response.code) {
                setAiResponse(response);
                setShowResults(true);
                setIsAdvancedMode(false);
                setCustomInstruction('');
            } else {
                console.error('AIEditButton: Error en la respuesta de la IA', response);
            }

        } catch (error) {
            console.error('AIEditButton: Error al procesar la solicitud de IA:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLanguageChange = (event) => {
        const newLang = event.target.value;
        setCurrentProps(prev => ({
            ...prev,
            lang: newLang
        }));
    };

    // Lista de idiomas disponibles
    const availableLanguages = [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' },
    ];

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
                        width: { xs: '100%', sm: '550px' },
                        maxWidth: '35vw',
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
                    <Stack spacing={3} sx={{ flex: 1, overflow: 'auto', paddingRight: 1 }}>
                        {/* Selector de idioma */}
                        <FormControl size="small" fullWidth>
                            <InputLabel id="language-select-label">{texts.language}</InputLabel>
                            <Select
                                labelId="language-select-label"
                                value={currentProps.lang}
                                label={texts.language}
                                onChange={handleLanguageChange}
                                disabled={isLoading}
                            >
                                {availableLanguages.map((language) => (
                                    <MenuItem key={language.code} value={language.code}>
                                        {language.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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

                        {/* Resultados de IA */}
                        {showResults && aiResponse && (
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    {texts.resultsTitle}
                                </Typography>
                                <Box sx={{
                                    flex: 1,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    p: 2,
                                    overflowY: 'auto',
                                    maxHeight: '300px',
                                    '& .sun-editor': {
                                        border: 'none !important'
                                    }
                                }}>
                                    <SunEditor
                                        lang={currentProps.lang}
                                        setContents={aiResponse.data.current}
                                        disable={true}
                                        height="100%"
                                        setOptions={{
                                            buttonList: [],
                                            resizingBar: false,
                                            showPathLabel: false,
                                            charCounter: false
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Stack>

                    {/* Footer */}
                    <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                        {showResults ? (
                            // Footer con iconos cuando se muestran resultados
                            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
                                <Tooltip title={texts.backToOriginal} arrow placement="top">
                                    <IconButton
                                        onClick={handleBackToOriginal}
                                        disabled={isLoading}
                                        size="large"
                                        sx={{
                                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                            border: '2px solid #667eea',
                                            color: '#667eea',
                                            '&:hover': {
                                                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                                                borderColor: '#5a6fd8',
                                                color: '#5a6fd8'
                                            }
                                        }}
                                    >
                                        <RestoreIcon fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={texts.modifyResponse} arrow placement="top">
                                    <IconButton
                                        onClick={handleModifyResponse}
                                        disabled={isLoading}
                                        size="large"
                                        sx={{
                                            backgroundColor: '#667eea',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#5a6fd8'
                                            }
                                        }}
                                    >
                                        <EditIcon fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={texts.keepResponse} arrow placement="top">
                                    <IconButton
                                        onClick={handleKeepResponse}
                                        disabled={isLoading}
                                        size="large"
                                        sx={{
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#218838'
                                            }
                                        }}
                                    >
                                        <CheckCircleIcon fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        ) : (
                            // Footer normal con botones de cancelar/generar
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
                                    {isLoading ? texts.generatingNew : texts.generate}
                                </Button>
                            </Stack>
                        )}
                    </Box>

                    {/* Loading overlay */}
                    {isLoading && (
                        <Backdrop
                            open={isLoading}
                            sx={{
                                position: 'absolute',
                                zIndex: 9999,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(2px)'
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <CircularProgress
                                    size={60}
                                    sx={{ color: '#667eea' }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#667eea',
                                        fontWeight: 600,
                                        textAlign: 'center'
                                    }}
                                >
                                    {texts.generatingNew}
                                </Typography>
                            </Box>
                        </Backdrop>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default AIEditButton;
