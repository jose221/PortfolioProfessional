import React, { Component } from 'react';
import { Canvas, Image as FabricImage, IText, Rect } from 'fabric';
import {
    Box,
    Paper,
    IconButton,
    Typography,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ColorPicker,
    Fab,
    Tooltip,
    Alert,
    TextField,
    Button,
    Divider
} from '@mui/material';
import {
    Brush as BrushIcon,
    TextFields as TextIcon,
    CropFree as CropIcon,
    Undo as UndoIcon,
    Redo as RedoIcon,
    Delete as DeleteIcon,
    Palette as PaletteIcon,
    FormatColorFill as FillIcon,
    Rectangle as RectangleIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const EditorContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
}));

const ToolPanel = styled(Paper)(({ theme }) => ({
    width: 280,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
}));

const CanvasContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    position: 'relative',
    overflow: 'hidden',
}));

const ToolSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    backgroundColor: 'white',
}));

const ColorInput = styled('input')({
    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    '&::-webkit-color-swatch-wrapper': {
        padding: 0,
    },
    '&::-webkit-color-swatch': {
        border: '2px solid #ccc',
        borderRadius: '50%',
    }
});

class ImageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            loading: true,
            error: null,
            selectedTool: 'select',
            brushWidth: 5,
            brushColor: '#000000',
            textColor: '#000000',
            fontSize: 20,
            fontFamily: 'Arial',
            history: [],
            historyIndex: -1,
            originalImageData: null
        };
        this.canvasRef = React.createRef();
        this.fabricCanvas = null;
    }

    componentDidMount() {
        this.initializeCanvas();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isEditing !== this.props.isEditing) {
            this.toggleEditingMode();
        }
        if (prevProps.zoom !== this.props.zoom) {
            this.updateZoom();
        }
    }

    componentWillUnmount() {
        if (this.fabricCanvas) {
            this.fabricCanvas.dispose();
        }
    }

    initializeCanvas = () => {
        const canvas = new Canvas(this.canvasRef.current, {
            width: 800,
            height: 600,
            backgroundColor: 'white',
            selection: false
        });

        this.fabricCanvas = canvas;
        this.setState({ canvas });

        // Load the image
        this.loadImage();

        // Set up event listeners
        canvas.on('path:created', this.saveState);
        canvas.on('object:added', this.saveState);
        canvas.on('object:removed', this.saveState);
        canvas.on('object:modified', this.saveState);
    };

    loadImage = () => {
        const { fileData } = this.props;
        
        FabricImage.fromURL(fileData.url, (img) => {
            if (!img) {
                this.setState({ 
                    error: 'Error cargando la imagen. Verifique que el archivo sea válido.',
                    loading: false 
                });
                return;
            }

            // Scale image to fit canvas while maintaining aspect ratio
            const canvasWidth = 800;
            const canvasHeight = 600;
            const imgAspectRatio = img.width / img.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;

            let scaleFactor;
            if (imgAspectRatio > canvasAspectRatio) {
                scaleFactor = canvasWidth / img.width;
            } else {
                scaleFactor = canvasHeight / img.height;
            }

            img.scale(scaleFactor);
            img.set({
                left: (canvasWidth - img.width * scaleFactor) / 2,
                top: (canvasHeight - img.height * scaleFactor) / 2,
                selectable: false,
                evented: false
            });

            this.fabricCanvas.add(img);
            this.fabricCanvas.sendToBack(img);
            this.fabricCanvas.renderAll();

            this.setState({ 
                loading: false,
                originalImageData: img
            });
            this.saveState();
        }, { crossOrigin: 'anonymous' });
    };

    toggleEditingMode = () => {
        if (!this.fabricCanvas) return;

        const { isEditing } = this.props;
        this.fabricCanvas.isDrawingMode = false;
        this.fabricCanvas.selection = isEditing;
        
        // Enable/disable object selection
        this.fabricCanvas.forEachObject((obj) => {
            if (obj !== this.state.originalImageData) {
                obj.selectable = isEditing;
                obj.evented = isEditing;
            }
        });

        this.fabricCanvas.renderAll();
    };

    updateZoom = () => {
        if (!this.fabricCanvas) return;
        
        const { zoom } = this.props;
        this.fabricCanvas.setZoom(zoom);
        this.fabricCanvas.renderAll();
    };

    selectTool = (tool) => {
        this.setState({ selectedTool: tool });
        
        if (!this.fabricCanvas) return;

        // Reset drawing mode
        this.fabricCanvas.isDrawingMode = false;
        this.fabricCanvas.selection = true;

        switch (tool) {
            case 'brush':
                this.fabricCanvas.isDrawingMode = true;
                this.fabricCanvas.freeDrawingBrush.width = this.state.brushWidth;
                this.fabricCanvas.freeDrawingBrush.color = this.state.brushColor;
                break;
            case 'select':
                this.fabricCanvas.selection = true;
                break;
            default:
                break;
        }
    };

    addText = () => {
        if (!this.fabricCanvas) return;

        const text = new IText('Texto aquí', {
            left: 100,
            top: 100,
            fontFamily: this.state.fontFamily,
            fontSize: this.state.fontSize,
            fill: this.state.textColor,
            editable: true
        });

        this.fabricCanvas.add(text);
        this.fabricCanvas.setActiveObject(text);
        this.fabricCanvas.renderAll();
    };

    addRectangle = () => {
        if (!this.fabricCanvas) return;

        const rect = new Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: 'transparent',
            stroke: this.state.brushColor,
            strokeWidth: 2
        });

        this.fabricCanvas.add(rect);
        this.fabricCanvas.setActiveObject(rect);
        this.fabricCanvas.renderAll();
    };

    deleteSelected = () => {
        if (!this.fabricCanvas) return;

        const activeObjects = this.fabricCanvas.getActiveObjects();
        activeObjects.forEach((obj) => {
            if (obj !== this.state.originalImageData) {
                this.fabricCanvas.remove(obj);
            }
        });
        this.fabricCanvas.discardActiveObject();
        this.fabricCanvas.renderAll();
    };

    saveState = () => {
        if (!this.fabricCanvas) return;

        const currentState = JSON.stringify(this.fabricCanvas.toJSON());
        this.setState(prevState => {
            const newHistory = prevState.history.slice(0, prevState.historyIndex + 1);
            newHistory.push(currentState);
            
            // Notify parent component of changes
            if (this.props.onDataChange) {
                this.props.onDataChange({
                    canvasData: currentState,
                    type: 'image'
                });
            }

            return {
                history: newHistory,
                historyIndex: newHistory.length - 1
            };
        });
    };

    undo = () => {
        const { history, historyIndex } = this.state;
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1];
            this.fabricCanvas.loadFromJSON(prevState, () => {
                this.fabricCanvas.renderAll();
                this.setState({ historyIndex: historyIndex - 1 });
            });
        }
    };

    redo = () => {
        const { history, historyIndex } = this.state;
        if (historyIndex < history.length - 1) {
            const nextState = history[historyIndex + 1];
            this.fabricCanvas.loadFromJSON(nextState, () => {
                this.fabricCanvas.renderAll();
                this.setState({ historyIndex: historyIndex + 1 });
            });
        }
    };

    handleBrushWidthChange = (event, newValue) => {
        this.setState({ brushWidth: newValue });
        if (this.fabricCanvas && this.fabricCanvas.isDrawingMode) {
            this.fabricCanvas.freeDrawingBrush.width = newValue;
        }
    };

    handleColorChange = (colorType, color) => {
        this.setState({ [colorType]: color });
        
        if (colorType === 'brushColor' && this.fabricCanvas && this.fabricCanvas.isDrawingMode) {
            this.fabricCanvas.freeDrawingBrush.color = color;
        }
    };

    render() {
        const { isEditing } = this.props;
        const { 
            loading, 
            error, 
            selectedTool, 
            brushWidth, 
            brushColor, 
            textColor, 
            fontSize, 
            fontFamily,
            history,
            historyIndex
        } = this.state;

        if (error) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Alert severity="error" sx={{ maxWidth: 400 }}>
                        {error}
                    </Alert>
                </Box>
            );
        }

        if (loading) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography>Cargando imagen...</Typography>
                </Box>
            );
        }

        return (
            <EditorContainer>
                {isEditing && (
                    <ToolPanel elevation={2}>
                        <Typography variant="h6" gutterBottom>
                            Herramientas de Edición
                        </Typography>

                        <ToolSection>
                            <Typography variant="subtitle2" gutterBottom>
                                Herramientas
                            </Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                <Tooltip title="Seleccionar">
                                    <Fab
                                        size="small"
                                        color={selectedTool === 'select' ? 'primary' : 'default'}
                                        onClick={() => this.selectTool('select')}
                                    >
                                        <CropIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Pincel">
                                    <Fab
                                        size="small"
                                        color={selectedTool === 'brush' ? 'primary' : 'default'}
                                        onClick={() => this.selectTool('brush')}
                                    >
                                        <BrushIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Texto">
                                    <Fab
                                        size="small"
                                        onClick={this.addText}
                                    >
                                        <TextIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Rectángulo">
                                    <Fab
                                        size="small"
                                        onClick={this.addRectangle}
                                    >
                                        <RectangleIcon />
                                    </Fab>
                                </Tooltip>
                            </Box>
                        </ToolSection>

                        <ToolSection>
                            <Typography variant="subtitle2" gutterBottom>
                                Colores
                            </Typography>
                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <Typography variant="body2">Pincel:</Typography>
                                <ColorInput
                                    type="color"
                                    value={brushColor}
                                    onChange={(e) => this.handleColorChange('brushColor', e.target.value)}
                                />
                            </Box>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Typography variant="body2">Texto:</Typography>
                                <ColorInput
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => this.handleColorChange('textColor', e.target.value)}
                                />
                            </Box>
                        </ToolSection>

                        <ToolSection>
                            <Typography variant="subtitle2" gutterBottom>
                                Grosor del Pincel
                            </Typography>
                            <Slider
                                value={brushWidth}
                                onChange={this.handleBrushWidthChange}
                                min={1}
                                max={50}
                                valueLabelDisplay="auto"
                            />
                        </ToolSection>

                        <ToolSection>
                            <Typography variant="subtitle2" gutterBottom>
                                Texto
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                label="Tamaño"
                                type="number"
                                value={fontSize}
                                onChange={(e) => this.setState({ fontSize: parseInt(e.target.value) })}
                                sx={{ mb: 1 }}
                            />
                            <FormControl fullWidth size="small">
                                <InputLabel>Fuente</InputLabel>
                                <Select
                                    value={fontFamily}
                                    onChange={(e) => this.setState({ fontFamily: e.target.value })}
                                >
                                    <MenuItem value="Arial">Arial</MenuItem>
                                    <MenuItem value="Helvetica">Helvetica</MenuItem>
                                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                                    <MenuItem value="Courier New">Courier New</MenuItem>
                                </Select>
                            </FormControl>
                        </ToolSection>

                        <Divider />

                        <ToolSection>
                            <Typography variant="subtitle2" gutterBottom>
                                Acciones
                            </Typography>
                            <Box display="flex" gap={1}>
                                <Tooltip title="Deshacer">
                                    <IconButton 
                                        onClick={this.undo}
                                        disabled={historyIndex <= 0}
                                    >
                                        <UndoIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Rehacer">
                                    <IconButton 
                                        onClick={this.redo}
                                        disabled={historyIndex >= history.length - 1}
                                    >
                                        <RedoIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar seleccionado">
                                    <IconButton onClick={this.deleteSelected}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </ToolSection>
                    </ToolPanel>
                )}

                <CanvasContainer>
                    <canvas ref={this.canvasRef} />
                </CanvasContainer>
            </EditorContainer>
        );
    }
}

export default ImageEditor;
