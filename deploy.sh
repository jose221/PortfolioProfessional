#!/bin/bash

set -e  # Detener el script si ocurre un error

echo "🚀 Despliegue Laravel producción iniciado..."

# Directorios base
PROJECT_DIR="$HOME/PortfolioProfessional"
PUBLIC_HTML="$HOME/herandro.lat"
ENV_FILE="$PROJECT_DIR/.env"
SCRIPT_NAME="$(basename "$0")"

# 0. Git pull y asegurar permisos del script
echo "📥 Haciendo git pull..."
cd "$PROJECT_DIR"
git reset --hard
git pull

echo "🔐 Asegurando permisos de ejecución para $SCRIPT_NAME..."
chmod +x "$SCRIPT_NAME"

# 1. Composer install
echo "📦 Ejecutando composer install..."
composer install --no-dev --optimize-autoloader

# 2. Modificar .env
echo "🔧 Actualizando APP_URL y API_HOST en .env..."
sed -i.bak "s|^APP_URL=.*|APP_URL=https://www.herandro.lat|g" "$ENV_FILE"
if grep -q "^API_HOST=" "$ENV_FILE"; then
    sed -i.bak "s|^API_HOST=.*|API_HOST=https://api.herandro.lat|g" "$ENV_FILE"
else
    echo "API_HOST=https://api.herandro.lat" >> "$ENV_FILE"
fi

# 3. Cache de configuración
echo "🧠 Cacheando configuración Laravel..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 4. Copiar public/ al HTML público
echo "📂 Copiando public/ a herandro.lat/..."
cp -r "$PROJECT_DIR/public/"* "$PUBLIC_HTML/"

# 4.1 Copiar .htaccess si no existe
if [ ! -f "$PUBLIC_HTML/.htaccess" ]; then
    echo "📄 Copiando .htaccess estándar de Laravel..."
    cat <<EOF > "$PUBLIC_HTML/.htaccess"
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Redirige todas las peticiones al index.php
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.php [L]

    Options -MultiViews
</IfModule>
EOF
fi

# 5. Crear symlink de storage
echo "🔗 Enlazando storage/"
rm -rf "$PUBLIC_HTML/storage"
ln -s ../PortfolioProfessional/storage/app/public "$PUBLIC_HTML/storage"

# 6. Modificar index.php para rutas absolutas correctas
echo "🛠 Corrigiendo rutas en index.php..."
INDEX="$PUBLIC_HTML/index.php"
sed -i.bak "s|__DIR__.'/../vendor|__DIR__.'/../PortfolioProfessional/vendor|g" "$INDEX"
sed -i.bak "s|__DIR__.'/../bootstrap|__DIR__.'/../PortfolioProfessional/bootstrap|g" "$INDEX"

# 7. Permisos finales
echo "🔒 Ajustando permisos..."
chmod -R 755 "$PROJECT_DIR/storage"
chmod -R 755 "$PROJECT_DIR/bootstrap/cache"

echo "✅ ¡Despliegue completado correctamente!"
