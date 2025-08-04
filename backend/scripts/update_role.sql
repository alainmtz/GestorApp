-- Primero eliminamos los valores existentes del enum
DROP TYPE IF EXISTS "Role" CASCADE;

-- Creamos el enum con los nuevos valores
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DEVELOPER', 'USER', 'GUEST');

-- Actualizamos el usuario específico
UPDATE users 
SET role = 'DEVELOPER'::\"Role\"
WHERE email = 'admin@fulltime.com';
