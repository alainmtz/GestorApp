-- Asegurarnos que la columna cliente_id existe en la tabla articulo
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'articulo' 
        AND column_name = 'cliente_id'
    ) THEN
        ALTER TABLE articulo ADD COLUMN cliente_id INTEGER;
    END IF;
END $$;

-- Añadir la foreign key si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'articulo_cliente_id_fkey'
    ) THEN
        ALTER TABLE articulo
        ADD CONSTRAINT articulo_cliente_id_fkey
        FOREIGN KEY (cliente_id)
        REFERENCES cliente(id)
        ON DELETE SET NULL;
    END IF;
END $$;

-- Añadir índices para mejorar el rendimiento de las búsquedas
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_class c 
        JOIN pg_namespace n ON n.oid = c.relnamespace 
        WHERE c.relname = 'idx_articulo_cliente_id'
    ) THEN
        CREATE INDEX idx_articulo_cliente_id ON articulo(cliente_id);
    END IF;
END $$;
