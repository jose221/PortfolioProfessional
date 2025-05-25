#!/bin/bash

echo "🚀 Despliegue Laravel producción iniciado..."

# Ajustado para estructura sin subcarpeta laravel/
PROJECT_DIR="$HOME/PortfolioProfessional"
PUBLIC_HTML="$HOME/public_html"
ENV_FILE="$PROJECT_DIR/.env"

# 1. Composer install
echo "📦 Ejecutando composer install..."
cd "$PROJECT_DIR"
composer install --no-dev --optimize-autoloader

# 2. Modificar .env
echo "🔧 Actualizando APP_URL y API_HOST en .env..."
sed -i.bak "s|^APP_URL=.*|APP_URL=http://162.0.215.50|g" "$ENV_FILE"
if grep -q "^API_HOST=" "$ENV_FILE"; then
    sed -i.bak "s|^API_HOST=.*|API_HOST=http://162.0.215.50|g" "$ENV_FILE"
else
    echo "API_HOST=http://162.0.215.50" >> "$ENV_FILE"
fi

# 3. Cache
echo "🧠 Cacheando configuración Laravel..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache


# 4. Copiar public/
echo "📂 Copiando public/ a public_html/..."
cp -r "$PROJECT_DIR/public/"* "$PUBLIC_HTML/"

# 5. Crear symlink
echo "🔗 Enlazando storage/"
rm -rf "$PUBLIC_HTML/storage"
ln -s ../PortfolioProfessional/storage/app/public "$PUBLIC_HTML/storage"

# 6. Modificar index.php
echo "🛠 Corrigiendo rutas en index.php..."
INDEX="$PUBLIC_HTML/index.php"
sed -i.bak "s|__DIR__.'/../vendor|__DIR__.'/../PortfolioProfessional/vendor|g" "$INDEX"
sed -i.bak "s|__DIR__.'/../bootstrap|__DIR__.'/../PortfolioProfessional/bootstrap|g" "$INDEX"

# 7. Permisos
echo "🔒 Ajustando permisos..."
chmod -R 755 "$PROJECT_DIR/storage"
chmod -R 755 "$PROJECT_DIR/bootstrap/cache"

echo "✅ ¡Despliegue completado correctamente!"
