#!/bin/bash

# stop_laravel.sh

# Colores para los mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛑 Deteniendo servicios...${NC}"

# Detener Apache
echo -e "${BLUE}🔄 Deteniendo Apache...${NC}"
sudo apachectl stop
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Apache detenido exitosamente${NC}"
else
    echo -e "${RED}❌ Error al detener Apache${NC}"
fi

# Buscar y matar el proceso de Laravel
echo -e "${BLUE}🔄 Deteniendo servidor Laravel...${NC}"
pkill -f "php artisan serve"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Servidor Laravel detenido exitosamente${NC}"
else
    echo -e "${RED}❌ No se encontró ningún servidor Laravel en ejecución${NC}"
fi

echo -e "${GREEN}✨ ¡Todos los servicios han sido detenidos!${NC}"
chmod +x stop_laravel.sh
