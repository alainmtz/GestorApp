const { PrismaClient } = require('@prisma/client');

const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        },
    },
    __internal: {
        engine: {
            poolTimeout: 30,
            maxConnections: 10
        }
    }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

module.exports = prisma;
