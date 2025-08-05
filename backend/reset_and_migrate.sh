#!/bin/bash

# Reset the database first (be careful, esto borrará todos los datos)
psql -U postgres -d inventario -c "DROP TABLE IF EXISTS _prisma_migrations;"
psql -U postgres -d inventario -c "DROP TABLE IF EXISTS articulo CASCADE;"
psql -U postgres -d inventario -c "DROP TABLE IF EXISTS cliente CASCADE;"

# Aplicar la migración manualmente
psql -U postgres -d inventario -f ./prisma/migrations/20250805_add_cliente_articulo_relation/migration.sql

# Regenerar el cliente de Prisma
npx prisma generate
