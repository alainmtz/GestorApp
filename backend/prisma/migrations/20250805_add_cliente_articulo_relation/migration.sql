-- Add cliente_id column to articulo table
ALTER TABLE "articulo" ADD COLUMN IF NOT EXISTS "cliente_id" INTEGER;

-- Add foreign key constraint
ALTER TABLE "articulo"
ADD CONSTRAINT "articulo_cliente_id_fkey"
FOREIGN KEY ("cliente_id")
REFERENCES "cliente"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
