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
        log "WARN" "⚠️  composer.lock no encontrado, se generará uno nuevo"
    fi

    composer install --no-dev --optimize-autoloader --no-interaction || error_exit "Error en composer install"

    log "SUCCESS" "✅ Dependencias instaladas"
}

# Función para limpiar y cachear Laravel
optimize_laravel() {
    log "INFO" "🧠 Optimizando configuración Laravel..."

    cd "$PROJECT_DIR" || error_exit "No se pudo acceder al directorio del proyecto"

    # Generar nuevos cachés
    php artisan config:cache || error_exit "Error generando config cache"
    php artisan route:cache || error_exit "Error generando route cache"
    php artisan view:cache || error_exit "Error generando view cache"

    log "SUCCESS" "✅ Laravel optimizado"
}

# Función para desplegar archivos públicos
deploy_public_files() {
    log "INFO" "📂 Desplegando archivos públicos..."

    # Mostrar estadísticas del directorio public antes de copiar
    local public_source="$PROJECT_DIR/public"
    local file_count=$(find "$public_source" -type f | wc -l)
    local dir_size=$(du -sh "$public_source" 2>/dev/null | cut -f1)

    log "INFO" "📊 Copiando desde $public_source: $file_count archivos, $dir_size"

    # Copiar archivos públicos
    cp -r "$PROJECT_DIR/public/"* "$PUBLIC_HTML/" || error_exit "Error copiando archivos públicos"

    # Verificar que los archivos se copiaron correctamente
    local copied_count=$(find "$PUBLIC_HTML" -type f | wc -l)
    log "INFO" "📋 Archivos copiados: $copied_count"

    # Mostrar algunos archivos importantes
    log "INFO" "📁 Archivos principales en $PUBLIC_HTML:"
    for file in index.php .htaccess; do
        if [[ -f "$PUBLIC_HTML/$file" ]]; then
            log "INFO" "   ✅ $file"
        else
            log "WARN" "   ❌ $file (no encontrado)"
        fi
    done

    log "SUCCESS" "✅ Archivos públicos desplegados"
}

# Función para configurar .htaccess
setup_htaccess() {
    log "INFO" "📄 Configurando .htaccess..."

    local htaccess_file="$PUBLIC_HTML/.htaccess"

    if [[ ! -f "$htaccess_file" ]]; then
        log "INFO" "📝 Creando .htaccess personalizado..."
        cat > "$htaccess_file" << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Manejo de HTTPS (opcional, descomenta si tienes SSL)
    # RewriteCond %{HTTPS} off
    # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # Redirige todas las peticiones al index.php
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.php [L]

    # Seguridad adicional
    Options -MultiViews -Indexes

    # Prevenir acceso a archivos sensibles
    <FilesMatch "\.(env|log|sql|md|json|lock)$">
        Order Allow,Deny
        Deny from all
    </FilesMatch>

    # Prevenir acceso a directorios sensibles
    RedirectMatch 403 ^/\.git
    RedirectMatch 403 ^/vendor
    RedirectMatch 403 ^/node_modules
</IfModule>
EOF
        log "SUCCESS" "✅ .htaccess creado"
    else
        log "INFO" "ℹ️  .htaccess ya existe, verificando contenido..."
        if grep -q "RewriteEngine On" "$htaccess_file"; then
            log "SUCCESS" "✅ .htaccess válido encontrado"
        else
            log "WARN" "⚠️  .htaccess existe pero podría no ser válido"
        fi
    fi
}

# Función para configurar storage symlink
setup_storage_link() {
    log "INFO" "🔗 Configurando enlace de storage..."

    local storage_path="$PUBLIC_HTML/storage"
    local target_path="../PortfolioProfessional/storage/app/public"

    # Remover enlace existente si existe
    if [[ -L "$storage_path" ]] || [[ -d "$storage_path" ]]; then
        log "INFO" "🗑️  Removiendo enlace/directorio storage existente..."
        rm -rf "$storage_path"
    fi

    # Verificar que el directorio objetivo existe
    local target_abs="$PROJECT_DIR/storage/app/public"
    if [[ ! -d "$target_abs" ]]; then
        log "INFO" "📁 Creando directorio storage/app/public..."
        mkdir -p "$target_abs" || error_exit "Error creando directorio storage"
    fi

    # Crear nuevo enlace simbólico
    ln -s "$target_path" "$storage_path" || error_exit "Error creando enlace simbólico de storage"

    # Verificar que el enlace funciona
    if [[ -L "$storage_path" ]]; then
        log "SUCCESS" "✅ Enlace de storage configurado correctamente"
    else
        error_exit "El enlace de storage no se creó correctamente"
    fi
}

# Función para corregir rutas en index.php
fix_index_paths() {
    log "INFO" "🛠 Corrigiendo rutas en index.php..."

    local index_file="$PUBLIC_HTML/index.php"

    if [[ ! -f "$index_file" ]]; then
        error_exit "index.php no encontrado en $PUBLIC_HTML"
    fi

    # Crear backup del index original
    cp "$index_file" "$index_file.backup"

    # Mostrar rutas antes de modificar
    log "INFO" "📋 Rutas actuales en index.php:"
    grep -E "(vendor|bootstrap)" "$index_file" | head -5 | while read -r line; do
        log "INFO" "   $line"
    done

    # Corregir rutas
    sed -i.tmp "s|__DIR__\.'/../vendor|__DIR__\.'/../PortfolioProfessional/vendor|g" "$index_file"
    sed -i.tmp "s|__DIR__\.'/../bootstrap|__DIR__\.'/../PortfolioProfessional/bootstrap|g" "$index_file"

    # Mostrar rutas después de modificar
    log "INFO" "📋 Rutas corregidas en index.php:"
    grep -E "(vendor|bootstrap)" "$index_file" | head -5 | while read -r line; do
        log "INFO" "   $line"
    done

    # Remover archivos temporales
    rm -f "$index_file.tmp"

    log "SUCCESS" "✅ Rutas corregidas en index.php"
}

# Función para configurar permisos
set_permissions() {
    log "INFO" "🔒 Configurando permisos..."

    # Permisos para directorios de Laravel
    chmod -R 755 "$PROJECT_DIR/storage" || error_exit "Error configurando permisos de storage"
    chmod -R 755 "$PROJECT_DIR/bootstrap/cache" || error_exit "Error configurando permisos de bootstrap/cache"

    # Permisos para archivos públicos
    find "$PUBLIC_HTML" -type f -exec chmod 644 {} \; || error_exit "Error configurando permisos de archivos públicos"
    find "$PUBLIC_HTML" -type d -exec chmod 755 {} \; || error_exit "Error configurando permisos de directorios públicos"

    # Asegurar que el script mantenga permisos de ejecución
    chmod +x "$SCRIPT_NAME" 2>/dev/null || true

    log "SUCCESS" "✅ Permisos configurados"
}

# Función para verificar el despliegue
verify_deployment() {
    log "INFO" "🔍 Verificando despliegue..."

    # Verificar archivos críticos
    local critical_files=("$PUBLIC_HTML/index.php" "$PUBLIC_HTML/.htaccess")

    for file in "${critical_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            error_exit "Archivo crítico no encontrado: $file"
        fi
    done

    # Verificar enlace de storage
    if [[ ! -L "$PUBLIC_HTML/storage" ]]; then
        error_exit "Enlace de storage no encontrado"
    fi

    # Verificar que index.php tiene las rutas correctas
    if ! grep -q "PortfolioProfessional/vendor" "$PUBLIC_HTML/index.php"; then
        error_exit "Las rutas en index.php no se corrigieron correctamente"
    fi

    # Mostrar resumen final
    local final_count=$(find "$PUBLIC_HTML" -type f | wc -l)
    local final_size=$(du -sh "$PUBLIC_HTML" 2>/dev/null | cut -f1)

    log "INFO" "📊 Resumen del despliegue:"
    log "INFO" "   📁 Directorio: $PUBLIC_HTML"
    log "INFO" "   📄 Archivos: $final_count"
    log "INFO" "   💾 Tamaño: $final_size"

    log "SUCCESS" "✅ Despliegue verificado correctamente"
}

# Función para limpiar archivos temporales
cleanup() {
    log "INFO" "🧹 Limpiando archivos temporales..."

    # Remover backups temporales de más de 7 días
    find /tmp -name "deploy-backup-*" -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null || true
    find /tmp -name "deploy-*.log" -type f -mtime +7 -exec rm -f {} \; 2>/dev/null || true

    log "SUCCESS" "✅ Limpieza completada"
}

# Función principal
main() {
    log "INFO" "🚀 Iniciando despliegue Laravel producción..."
    log "INFO" "📝 Log del despliegue: $LOG_FILE"

    check_requirements
    check_project_structure
    validate_public_html
    clear_cache_before_deploy
    create_backup
    update_code
    install_dependencies
    optimize_laravel
    deploy_public_files
    setup_htaccess
    setup_storage_link
    fix_index_paths
    set_permissions
    verify_deployment
    cleanup

    log "SUCCESS" "✅ ¡Despliegue completado exitosamente!"
    log "INFO" "📊 Backup disponible en: $BACKUP_DIR"
    log "INFO" "📋 Log completo en: $LOG_FILE"
}

# Manejo de señales para limpieza
trap 'error_exit "Despliegue interrumpido por señal"' INT TERM

# Ejecutar función principal
main "$@"
