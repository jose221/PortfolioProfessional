#!/bin/bash

echo "🚀 Despliegue Laravel producción iniciado..."

# Variables
LARAVEL_DIR="$HOME/PortfolioProfessional/laravel"
PUBLIC_HTML="$HOME/public_html"
ENV_FILE="$LARAVEL_DIR/.env"

# 1. Instalar dependencias sin paquetes de desarrollo
echo "📦 Ejecutando composer install..."
cd "$LARAVEL_DIR"
composer install --no-dev --optimize-autoloader

# 2. Modificar APP_URL y API_HOST en el archivo .env
echo "🔧 Actualizando APP_URL y API_HOST en .env..."
sed -i.bak "s|^APP_URL=.*|APP_URL=http://162.0.215.50|g" "$ENV_FILE"
if grep -q "^API_HOST=" "$ENV_FILE"; then
    sed -i.bak "s|^API_HOST=.*|API_HOST=http://162.0.215.50|g" "$ENV_FILE"
else
    echo "API_HOST=http://162.0.215.50" >> "$ENV_FILE"
fi

# 3. Generar cachés de Laravel
echo "🧠 Ejecutando cache de configuración y rutas..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 4. Copiar archivos públicos
echo "📂 Copiando archivos de public/ a public_html/..."
cp -r "$LARAVEL_DIR/public/"* "$PUBLIC_HTML/"

# 5. Crear symlink para storage
echo "🔗 Creando symlink storage..."
rm -rf "$PUBLIC_HTML/storage"
ln -s ../PortfolioProfessional/laravel/storage/app/public "$PUBLIC_HTML/storage"

# 6. Modificar rutas de index.php
echo "🛠 Modificando index.php en public_html..."
INDEX="$PUBLIC_HTML/index.php"
sed -i.bak "s|__DIR__.'/../vendor|__DIR__.'/../PortfolioProfessional/laravel/vendor|g" "$INDEX"
sed -i.bak "s|__DIR__.'/../bootstrap|__DIR__.'/../PortfolioProfessional/laravel/bootstrap|g" "$INDEX"

# 7. Asignar permisos necesarios
echo "🔒 Ajustando permisos..."
chmod -R 755 "$LARAVEL_DIR/storage"
chmod -R 755 "$LARAVEL_DIR/bootstrap/cache"

echo ""
echo "✅ ¡Despliegue completado exitosamente!"
echo "🌐 Ahora puedes acceder a: http://162.0.215.50"
