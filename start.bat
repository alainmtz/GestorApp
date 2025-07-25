@echo off
REM Iniciar PostgreSQL
start "" pgsql\bin\pg_ctl.exe start -D "pgsql\data" -l "pgsql\logfile.txt"
REM Iniciar pgAdmin
start "" pgsql\pgAdmin4\bin\pgadmin4.exe
REM Esperar unos segundos para que arranque
timeout /t 5
REM Iniciar Node.js (ajusta el path y el archivo principal si es necesario)
start "iniciando node" node\node.exe backend\index.js
REM Abrir el navegador (opcional)
start "inicializando app web" http://localhost:3001 
REM iniciar frontend
start "iniciando frontend" cmd /k "cd frontend && npm start" 

