#!/bin/bash

# start_laravel.sh

# Colores para los mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando servicios para el proyecto Laravel...${NC}"

# Verificar si Apache está corriendo
echo -e "${BLUE}📊 Verificando estado de Apache...${NC}"
if sudo apachectl status > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Apache ya está corriendo${NC}"
else
    echo -e "${BLUE}🔄 Iniciando Apache...${NC}"
    sudo apachectl start
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Apache iniciado exitosamente${NC}"
    else
        echo -e "${RED}❌ Error al iniciar Apache${NC}"
        exit 1
    fi
fi

# Navegar al directorio del proyecto
# Reemplaza /ruta/a/tu/proyecto con la ruta real de tu proyecto
cd /ruta/a/tu/proyecto

# Verificar si estamos en el directorio correcto
if [ ! -f "artisan" ]; then
    echo -e "${RED}❌ No se encuentra el archivo artisan. ¿Estás en el directorio correcto del proyecto?${NC}"
    exit 1
fi

# Limpiar caché
echo -e "${BLUE}🧹 Limpiando caché...${NC}"
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Verificar si hay migraciones pendientes
echo -e "${BLUE}📊 Verificando base de datos...${NC}"
php artisan migrate:status
echo -e "${BLUE}¿Deseas ejecutar las migraciones pendientes? (s/n)${NC}"
read -r respuesta
if [[ "$respuesta" =~ ^[Ss]$ ]]; then
    php artisan migrate
fi

# Iniciar el servidor de Laravel
echo -e "${BLUE}🌐 Iniciando servidor Laravel...${NC}"
php artisan serve

# El script se detendrá aquí mientras el servidor esté corriendo
# Para detener, presionar Ctrl+C

echo -e "${GREEN}✨ ¡Servidor detenido!${NC}"
chmod +x start_laravel.sh
