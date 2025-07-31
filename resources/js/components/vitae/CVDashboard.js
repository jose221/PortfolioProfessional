import React, { Component } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Avatar,
    LinearProgress,
    IconButton,
    Tooltip,
    Paper,
    Stack,
    Divider,
    Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    PictureAsPdf as PdfIcon,
    Image as ImageIcon,
    Article as DocIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    CloudUpload as UploadIcon,
    Analytics as AnalyticsIcon,
    TrendingUp as TrendingUpIcon,
    Storage as StorageIcon
} from '@mui/icons-material';
import RComponent from '../RComponent';

// Styled components for modern dashboard design
const DashboardContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
}));

const StatsCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
    },
}));

const CVCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        borderColor: theme.palette.primary.main,
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(3),
    textTransform: 'none',
    fontWeight: 600,
    padding: theme.spacing(1, 3),
}));

const FileTypeChip = styled(Chip)(({ theme, fileType }) => {
    const getColors = () => {
        switch (fileType?.toUpperCase()) {
            case 'PDF':
                return { bg: '#ffebee', color: '#d32f2f' };
            case 'DOC':
            case 'DOCX':
                return { bg: '#e3f2fd', color: '#1976d2' };
            case 'PICTURE':
            case 'IMAGE':
                return { bg: '#e8f5e8', color: '#388e3c' };
            default:
                return { bg: '#f5f5f5', color: '#666' };
        }
    };
    
    const colors = getColors();
    return {
        backgroundColor: colors.bg,
        color: colors.color,
        fontWeight: 600,
        '& .MuiChip-icon': {
            color: colors.color,
        },
    };
});

let primary_url = window.url_api + "/admin/history-curriculum-vitae";

class CVDashboard extends RComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            cvList: [],
            stats: {
                total: 0,
                pdf: 0,
                doc: 0,
                image: 0,
                recent: 0
            },
            loading: true
        };
    }

    async componentDidMount() {
        this.subscribeStore();
        await this.loadDashboardData();
    }

    loadDashboardData = async () => {
        try {
            this.setState({ loading: true });
            
            // Load CV list
            const cvList = await this.getItems(`${primary_url}`);
            
            // Calculate statistics
            const stats = this.calculateStats(cvList);
            
            this.setState({
                cvList: cvList || [],
                stats,
                loading: false
            });
            
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.setState({ loading: false });
        }
    };

    calculateStats = (cvList) => {
        if (!Array.isArray(cvList)) return { total: 0, pdf: 0, doc: 0, image: 0, recent: 0 };
        
        const stats = {
            total: cvList.length,
            pdf: cvList.filter(cv => cv.archive_type?.toUpperCase() === 'PDF').length,
            doc: cvList.filter(cv => cv.archive_type?.toUpperCase() === 'DOC').length,
            image: cvList.filter(cv => cv.archive_type?.toUpperCase() === 'PICTURE').length,
            recent: cvList.filter(cv => {
                const updatedDate = new Date(cv.updated_at);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return updatedDate > weekAgo;
            }).length
        };
        
        return stats;
    };

    getFileIcon = (type) => {
        switch (type?.toUpperCase()) {
            case 'PDF':
                return <PdfIcon />;
            case 'DOC':
            case 'DOCX':
                return <DocIcon />;
            case 'PICTURE':
            case 'IMAGE':
                return <ImageIcon />;
            default:
                return <DocIcon />;
        }
    };

    formatDate = (dateString) => {
        if (!dateString) return 'No disponible';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    handleViewCV = (cvId) => {
        // Navigate to CV viewer - you can implement routing here
        window.location.href = `/admin/cv/${cvId}`;
    };

    handleEditCV = (cvId) => {
        // Open edit modal or navigate to edit page
        console.log('Edit CV:', cvId);
    };

    render() {
        const { cvList, stats, loading } = this.state;

        if (loading) {
            return (
                <DashboardContainer>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <LinearProgress sx={{ width: '300px' }} />
                    </Box>
                </DashboardContainer>
            );
        }

        return (
            <DashboardContainer>
                {/* Header */}
                <Box mb={4}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ 
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                    }}>
                        Dashboard de CVs
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Gestiona y visualiza todos tus currículums vitae
                    </Typography>
                </Box>

                {/* Statistics Cards */}
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="h4" component="div" fontWeight="bold">
                                            {stats.total}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            Total CVs
                                        </Typography>
                                    </Box>
                                    <StorageIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </StatsCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="h4" component="div" fontWeight="bold">
                                            {stats.pdf}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            Archivos PDF
                                        </Typography>
                                    </Box>
                                    <PdfIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </StatsCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="h4" component="div" fontWeight="bold">
                                            {stats.doc}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            Documentos
                                        </Typography>
                                    </Box>
                                    <DocIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </StatsCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="h4" component="div" fontWeight="bold">
                                            {stats.recent}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                            Recientes
                                        </Typography>
                                    </Box>
                                    <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                                </Box>
                            </CardContent>
                        </StatsCard>
                    </Grid>
                </Grid>

                {/* CV List */}
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h5" component="h2" fontWeight="bold">
                            Mis CVs
                        </Typography>
                        <ActionButton
                            variant="contained"
                            startIcon={<UploadIcon />}
                            onClick={() => {/* Open upload modal */}}
                        >
                            Subir Nuevo CV
                        </ActionButton>
                    </Box>

                    {cvList.length === 0 ? (
                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                            No tienes CVs cargados aún. ¡Sube tu primer CV para comenzar!
                        </Alert>
                    ) : (
                        <Grid container spacing={3}>
                            {cvList.map((cv) => (
                                <Grid item xs={12} sm={6} md={4} key={cv.id}>
                                    <CVCard>
                                        <CardContent>
                                            <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                                                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                                    {this.getFileIcon(cv.archive_type)}
                                                </Avatar>
                                                <FileTypeChip
                                                    fileType={cv.archive_type}
                                                    label={cv.archive_type}
                                                    size="small"
                                                    icon={this.getFileIcon(cv.archive_type)}
                                                />
                                            </Box>

                                            <Typography variant="h6" component="h3" gutterBottom noWrap>
                                                {cv.archive_name}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Actualizado: {this.formatDate(cv.updated_at)}
                                            </Typography>

                                            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                                                ID: {cv.id}
                                            </Typography>

                                            <Divider sx={{ my: 2 }} />

                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Tooltip title="Ver CV">
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => this.handleViewCV(cv.id)}
                                                    >
                                                        <ViewIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Editar CV">
                                                    <IconButton
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => this.handleEditCV(cv.id)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </CardContent>
                                    </CVCard>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Paper>
            </DashboardContainer>
        );
    }
}

export default CVDashboard;
