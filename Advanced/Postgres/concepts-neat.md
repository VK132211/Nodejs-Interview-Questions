# PostgreSQL & Prisma ORM: Production Guide (2025)

This guide covers core concepts, real-world query patterns, and 2025 production best practices for building scalable applications with PostgreSQL and Prisma ORM.

---

## 1. Core Architecture

- **PostgreSQL**: An advanced, ACID-compliant relational database. In 2025, it is the standard for both traditional relational data and AI workloads (via `pgvector`).
- **Prisma ORM**: A type-safe query builder that uses a declarative schema (`schema.prisma`) as the single source of truth.

---

## 2. The Prisma Schema (`schema.prisma`)

The foundation of your database layer.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  // 2025 Feature: The query compiler (v7+) is now the default,
  // drastically reducing cold start times and binary sizes.
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())

  @@index([email]) // Production Tip: Index frequently filtered fields
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}

enum Role {
  USER
  ADMIN
}
```

---

## 3. Essential Production Methods

### A. Efficient Fetching (Read)

In production, never fetch more data than needed.

- `findUnique` / `findFirst`: Optimized for fetching single records.
- `findMany` with `select`: Explicitly define fields to reduce database load.

```typescript
const users = await prisma.user.findMany({
  where: { role: 'USER' },
  select: { id: true, email: true }, // Selective loading
  take: 20, // Limits results
});
```

### B. High-Performance Writes (Create/Update)

- `upsert`: Atomic "update if exists, else create." Prevents race conditions.
- `createMany`: Batched inserts for high-volume data (e.g., importing logs).

```typescript
await prisma.post.createMany({
  data: [
    { title: 'Post 1', authorId: 'uuid-1' },
    { title: 'Post 2', authorId: 'uuid-1' },
  ],
  skipDuplicates: true,
});
```

### C. Relationship Management

- `include`: Eager-load related models.
- `connect`: Connect an existing record to a new one via a foreign key.

```typescript
const post = await prisma.post.create({
  data: {
    title: 'Hello 2025',
    author: { connect: { email: 'user@example.com' } }
  }
});
```

### D. Mission-Critical Transactions

Ensures data integrity across multiple operations.

- Sequential transactions: All-or-nothing batches.
- Interactive transactions: For complex logic requiring checks between queries.

```typescript
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: 'new@test.com' } }),
  prisma.post.create({ data: { title: 'First Post', authorId: '...' } })
]);
```

```typescript
await prisma.$transaction(async (tx) => {
  const sender = await tx.user.update({
    where: { id: '1' },
    data: { balance: { decrement: 100 } }
  });

  if (sender.balance < 0) throw new Error('Insufficient funds');

  await tx.user.update({
    where: { id: '2' },
    data: { balance: { increment: 100 } }
  });
}, { timeout: 10000 }); // Always set timeouts in production
```

---

## 4. Advanced 2025 Features

### Cursor-Based Pagination

For large datasets (millions of rows), use cursor pagination instead of offset to avoid performance degradation.

```typescript
const nextBatch = await prisma.post.findMany({
  take: 10,
  skip: 1, // Skip the cursor itself
  cursor: { id: lastPostId },
});
```

### Prisma Client Extensions

Add custom logic like soft deletes, logging, or computed fields without legacy middleware.

```typescript
const extendedPrisma = prisma.$extends({
  model: {
    user: {
      async signUp(email: string) {
        return prisma.user.create({ data: { email } });
      }
    }
  }
});
```

### TypedSQL (New in 2025)

When you need raw SQL performance for complex reports, Prisma now provides TypedSQL, which generates TypeScript types directly from your `.sql` files.

---

## 5. Deployment Checklist

- **Migration Safety**: Use `npx prisma migrate deploy` in CI/CD. Never use `migrate dev` in production.
- **Connection Pooling**: Use Prisma Accelerate or PgBouncer for high connection counts in serverless environments (AWS Lambda, Vercel).
- **Logging**: Enable query logging in development to debug performance.

```typescript
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
```

- **Environment Variables**: Store `DATABASE_URL` securely. Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`.

---

## 6. Essential Commands

| Command | Purpose |
|---|---|
| `npx prisma init` | Initialize Prisma in a project |
| `npx prisma generate` | Regenerate Prisma Client types (run after schema changes) |
| `npx prisma migrate dev` | Create and apply a migration (development only) |
| `npx prisma migrate deploy` | Apply pending migrations (production only) |
| `npx prisma studio` | Open GUI to view/edit database data |
| `npx prisma db seed` | Execute the seed script defined in `package.json` |

---

*End of guide.*

