# Proyecto Portable: Node.js + PostgreSQL

## Estructura de carpetas

- /pgsql/      → PostgreSQL portable (servidor y datos)
- /node/       → Node.js portable y backend (app.js, package.json, node.exe, node_modules)
- /frontend/   → Archivos del frontend web (index.html, etc.)
- start.bat    → Script para iniciar PostgreSQL y Node.js
- stop.bat     → Script para detener ambos servicios

## Cómo usar

1. Ejecuta `start.bat` para iniciar la base de datos y el servidor web.
2. Se abrirá el navegador en http://localhost:3000
3. Para detener todo, ejecuta `stop.bat`.

## Notas
- No necesitas instalar nada, todo es portable y funciona offline.
- Puedes modificar la configuración de PostgreSQL en `pgsql/data/` y el backend en `node/app.js`. 