#!/bin/bash

# Script de despliegue Laravel para producción
# Versión mejorada con validación de public_html y limpieza de cache

set -euo pipefail  # Modo estricto

# Configuración
readonly SCRIPT_NAME="$(basename "$0")"
readonly LOG_FILE="/tmp/deploy-$(date +%Y%m%d_%H%M%S).log"
readonly PROJECT_DIR="${HOME}/PortfolioProfessional"
readonly PUBLIC_HTML="public_html"
readonly ENV_FILE="${PROJECT_DIR}/.env"
readonly BACKUP_DIR="/tmp/deploy-backup-$(date +%Y%m%d_%H%M%S)"

# Colores para output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Función para logging
log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    case "$level" in
        "INFO")  echo -e "${BLUE}[INFO]${NC} $message" | tee -a "$LOG_FILE" ;;
        "WARN")  echo -e "${YELLOW}[WARN]${NC} $message" | tee -a "$LOG_FILE" ;;
        "ERROR") echo -e "${RED}[ERROR]${NC} $message" | tee -a "$LOG_FILE" ;;
        "SUCCESS") echo -e "${GREEN}[SUCCESS]${NC} $message" | tee -a "$LOG_FILE" ;;
    esac
}

# Función para manejo de errores
error_exit() {
    log "ERROR" "$1"
    log "ERROR" "Despliegue fallido. Revisa el log en: $LOG_FILE"
    exit 1
}

# Función para verificar comandos requeridos
check_requirements() {
    log "INFO" "🔍 Verificando requisitos del sistema..."

    local required_commands=("git" "composer" "php" "ln" "chmod" "cp" "sed" "find" "du")

    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            error_exit "Comando requerido '$cmd' no encontrado"
        fi
    done

    log "SUCCESS" "✅ Todos los requisitos verificados"
}

# Función para verificar estructura del proyecto
check_project_structure() {
    log "INFO" "🏗 Verificando estructura del proyecto..."

    if [[ ! -d "$PROJECT_DIR" ]]; then
        error_exit "Directorio del proyecto no encontrado: $PROJECT_DIR"
    fi

    if [[ ! -f "$ENV_FILE" ]]; then
        error_exit "Archivo .env no encontrado: $ENV_FILE"
    fi

    if [[ ! -f "$PROJECT_DIR/composer.json" ]]; then
        error_exit "composer.json no encontrado en $PROJECT_DIR"
    fi

    if [[ ! -d "$PROJECT_DIR/public" ]]; then
        error_exit "Directorio public/ no encontrado en $PROJECT_DIR"
    fi

    log "SUCCESS" "✅ Estructura del proyecto verificada"
}

# Función para validar y preparar public_html
validate_public_html() {
    log "INFO" "🌐 Validando directorio public_html..."

    # Obtener ruta absoluta de public_html
    local public_html_abs
    if [[ "${PUBLIC_HTML}" == /* ]]; then
        public_html_abs="${PUBLIC_HTML}"
    else
        public_html_abs="$(pwd)/${PUBLIC_HTML}"
    fi

    log "INFO" "📁 Directorio público objetivo: $public_html_abs"

    # Crear directorio si no existe
    if [[ ! -d "$PUBLIC_HTML" ]]; then
        log "INFO" "📁 Creando directorio public_html..."
        mkdir -p "$PUBLIC_HTML" || error_exit "No se pudo crear el directorio $PUBLIC_HTML"
    fi

    # Verificar permisos de escritura
    if [[ ! -w "$PUBLIC_HTML" ]]; then
        error_exit "No tienes permisos de escritura en $PUBLIC_HTML"
    fi

    # Mostrar contenido actual si existe
    if [[ -n "$(ls -A "$PUBLIC_HTML" 2>/dev/null)" ]]; then
        log "INFO" "📋 Contenido actual en $PUBLIC_HTML:"
        ls -la "$PUBLIC_HTML" | head -10 | while read -r line; do
            log "INFO" "   $line"
        done

        local file_count=$(find "$PUBLIC_HTML" -type f | wc -l)
        local dir_size=$(du -sh "$PUBLIC_HTML" 2>/dev/null | cut -f1)
        log "INFO" "📊 Estadísticas: $file_count archivos, tamaño total: $dir_size"
    else
        log "INFO" "📁 El directorio $PUBLIC_HTML está vacío"
    fi

    log "SUCCESS" "✅ Directorio public_html validado"
}

# Función para limpiar cache antes del despliegue
clear_cache_before_deploy() {
    log "INFO" "🧹 Limpiando cache antes del despliegue..."

    cd "$PROJECT_DIR" || error_exit "No se pudo acceder al directorio del proyecto"

    # Limpiar todos los caches de Laravel
    php artisan config:clear || log "WARN" "⚠️  No se pudo limpiar config cache"
    php artisan route:clear || log "WARN" "⚠️  No se pudo limpiar route cache"
    php artisan view:clear || log "WARN" "⚠️  No se pudo limpiar view cache"
    php artisan cache:clear || log "WARN" "⚠️  No se pudo limpiar application cache"

    # Limpiar cache de Composer
    if command -v composer &> /dev/null; then
        composer clear-cache || log "WARN" "⚠️  No se pudo limpiar cache de Composer"
    fi

    # Limpiar directorios de cache manualmente
    local cache_dirs=(
        "$PROJECT_DIR/bootstrap/cache"
        "$PROJECT_DIR/storage/framework/cache"
        "$PROJECT_DIR/storage/framework/sessions"
        "$PROJECT_DIR/storage/framework/views"
    )

    for cache_dir in "${cache_dirs[@]}"; do
        if [[ -d "$cache_dir" ]]; then
            log "INFO" "🗑️  Limpiando $cache_dir..."
            find "$cache_dir" -type f -name "*.php" -delete 2>/dev/null || true
            find "$cache_dir" -type f -name "*.tmp" -delete 2>/dev/null || true
        fi
    done

    log "SUCCESS" "✅ Cache limpiado completamente"
}

# Función para crear backup
create_backup() {
    log "INFO" "💾 Creando backup del estado actual..."

    mkdir -p "$BACKUP_DIR"

    if [[ -d "$PUBLIC_HTML" ]] && [[ -n "$(ls -A "$PUBLIC_HTML" 2>/dev/null)" ]]; then
        log "INFO" "📦 Respaldando contenido de $PUBLIC_HTML..."
        cp -r "$PUBLIC_HTML" "$BACKUP_DIR/public_html_backup" || error_exit "Error creando backup"

        local backup_size=$(du -sh "$BACKUP_DIR/public_html_backup" 2>/dev/null | cut -f1)
        log "INFO" "💾 Backup creado: $backup_size"
    else
        log "INFO" "ℹ️  No hay contenido previo que respaldar en $PUBLIC_HTML"
    fi

    log "SUCCESS" "✅ Backup completado en: $BACKUP_DIR"
}

# Función para actualizar código
update_code() {
    log "INFO" "📥 Actualizando código desde repositorio..."

    cd "$PROJECT_DIR" || error_exit "No se pudo acceder al directorio del proyecto"

    # Verificar que estamos en un repositorio git
    if [[ ! -d ".git" ]]; then
        error_exit "No es un repositorio git válido"
    fi

    # Mostrar estado actual
    log "INFO" "🌿 Rama actual: $(git branch --show-current)"
    log "INFO" "📍 Commit actual: $(git rev-parse --short HEAD)"

    # Guardar cambios locales si existen
    if ! git diff --quiet; then
        log "WARN" "⚠️  Hay cambios locales sin confirmar, creando stash..."
        git stash push -m "Deploy backup $(date)"
    fi

    git reset --hard || error_exit "Error en git reset"
    git pull || error_exit "Error en git pull"

    log "INFO" "📍 Nuevo commit: $(git rev-parse --short HEAD)"
    log "SUCCESS" "✅ Código actualizado"
}

# Función para instalar dependencias
install_dependencies() {
    log "INFO" "📦 Instalando dependencias de Composer..."

    cd "$PROJECT_DIR" || error_exit "No se pudo acceder al directorio del proyecto"

    # Verificar que composer.lock existe para reproducibilidad
    if [[ ! -f "composer.lock" ]]; then
        log "WARN" "⚠️  composer.lock no encontrado, se generará uno
