DO $$ BEGIN
    -- Verificar si el tipo Role ya existe
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
        -- Crear el tipo enum si no existe
        CREATE TYPE "Role" AS ENUM ('ADMIN', 'DEVELOPER', 'USER', 'GUEST');
    ELSE
        -- Si existe, actualizar los valores posibles
        ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'DEVELOPER';
    END IF;
END $$;

-- Actualizar la tabla users si es necesario
ALTER TABLE users 
    ALTER COLUMN role TYPE "Role" USING role::text::"Role",
    ALTER COLUMN role SET DEFAULT 'USER';
