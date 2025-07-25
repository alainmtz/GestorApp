@echo off
REM Detener Node.js
taskkill /IM node.exe /F
REM Detener PostgreSQL
pgsql\bin\pg_ctl.exe stop -D "pgsql\data" 