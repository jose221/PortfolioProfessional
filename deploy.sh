
#!/bin/bash

set -e  # Detener el script si ocurre un error

echo "🚀 Despliegue Laravel producción iniciado..."

# Directorios base
PROJECT_DIR="$HOME/PortfolioProfessional"
PUBLIC_HTML="$HOME/public_html"
ENV_FILE="$PROJECT_DIR/.env"
SCRIPT_NAME="$(basename "$0")"

# Verificar que los directorios existen
echo "🔍 Verificando directorios..."
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ ERROR: Directorio del proyecto no encontrado: $PROJECT_DIR"
    exit 1
fi

if [ ! -d "$PROJECT_DIR/public" ]; then
    echo "❌ ERROR: Directorio public/ no encontrado en el proyecto"
    exit 1
fi

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

# 3. Cache de configuración
echo "🧠 Cacheando configuración Laravel..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 4. Copiar contenido de public/ directamente a public_html
echo "📂 Copiando archivos desde $PROJECT_DIR/public/ directamente a $PUBLIC_HTML/"
echo "📂 Archivos en public/ antes de copiar:"
ls -la "$PROJECT_DIR/public/"

# Copiar todo el contenido de public/ a public_html/ (incluyendo archivos ocultos)
cp -r "$PROJECT_DIR/public/"* "$PUBLIC_HTML/"
cp -r "$PROJECT_DIR/public/".* "$PUBLIC_HTML/" 2>/dev/null || true

echo "📂 Archivos en public_html después de copiar:"
ls -la "$PUBLIC_HTML/"

# 4.1 Asegurar que .htaccess esté presente
if [ ! -f "$PUBLIC_HTML/.htaccess" ]; then
    echo "📄 Creando .htaccess estándar de Laravel..."
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
ln -s "$PROJECT_DIR/storage/app/public" "$PUBLIC_HTML/storage"

# 6. Modificar index.php para rutas absolutas correctas
echo "🛠 Corrigiendo rutas en index.php..."
INDEX="$PUBLIC_HTML/index.php"
if [ -f "$INDEX" ]; then
    sed -i.bak "s|__DIR__.'/../vendor|'$PROJECT_DIR/vendor|g" "$INDEX"
    sed -i.bak "s|__DIR__.'/../bootstrap|'$PROJECT_DIR/bootstrap|g" "$INDEX"
    echo "✅ index.php actualizado correctamente"
else
    echo "❌ ERROR: index.php no se copió correctamente"
    exit 1
fi

# 7. Permisos finales
echo "🔒 Ajustando permisos..."
chmod -R 755 "$PROJECT_DIR/storage"
chmod -R 755 "$PROJECT_DIR/bootstrap/cache"
chmod -R 644 "$PUBLIC_HTML"/*.php
chmod -R 755 "$PUBLIC_HTML"

echo "✅ ¡Despliegue completado correctamente!"
echo "📊 Contenido final en $PUBLIC_HTML:"
ls -la "$PUBLIC_HTML/"
