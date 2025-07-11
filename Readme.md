# Desirium Backend

This is a NestJS backend application for the Desirium project.

## Migration from Express.js

This project has been migrated from Express.js to NestJS. The migration includes:

### Key Changes:
- **Framework**: Express.js → NestJS
- **Language**: JavaScript → TypeScript
- **Database**: Raw SQL queries → TypeORM with entities
- **Architecture**: MVC pattern → Modular architecture with dependency injection
- **File Upload**: Multer middleware → NestJS interceptors

### New Structure:
```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
├── users/                 # Users module
│   ├── entities/
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── wishlist/              # Wishlist module
│   ├── entities/
│   ├── dto/
│   ├── wishlist.controller.ts
│   ├── wishlist.service.ts
│   └── wishlist.module.ts
└── minio/                 # Minio module
    ├── minio.service.ts
    └── minio.module.ts
```

### API Endpoints:

#### Users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `PATCH /users/:id/image` - Update user image (multipart/form-data)

#### Wishlist
- `POST /wishlist` - Create a new wishlist item
- `GET /wishlist` - Get all wishlist items
- `GET /wishlist/:id` - Get wishlist item by ID
- `GET /wishlist/user/:userId` - Get wishlist items by user ID
- `PATCH /wishlist/:id` - Update wishlist item
- `DELETE /wishlist/:id` - Delete wishlist item

## Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and Minio credentials

# Run migrations (if using Flyway)
# Your existing Flyway setup should work with the new structure

# Start development server
pnpm run start:dev
```

## Environment Variables

Required environment variables:
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `MINIO_HOST`
- `MINIO_PORT`
- `MINIO_ACCESS_KEY`
- `MINIO_SECRET_KEY`

## Development

```bash
# Start development server with hot reload
pnpm run start:dev

# Build for production
pnpm run build

# Start production server
pnpm run start:prod

# Run tests
pnpm run test

# Run e2e tests
pnpm run test:e2e
```

## Database

The application uses PostgreSQL with TypeORM. The existing database schema should work without changes. The entities are mapped to your existing tables:

- `user` table → `User` entity
- `wishlist` table → `Wishlist` entity

## File Storage

Minio integration is maintained for file storage. The service handles:
- File uploads
- Presigned URLs for file access
- Bucket management

## Benefits of NestJS Migration

1. **Type Safety**: Full TypeScript support with compile-time error checking
2. **Modular Architecture**: Better code organization with modules, services, and controllers
3. **Dependency Injection**: Cleaner service management and testing
4. **Built-in Validation**: Request validation with DTOs
5. **Better Error Handling**: Structured error responses
6. **Testing**: Built-in testing utilities and mocking
7. **Documentation**: Auto-generated API documentation capabilities
8. **Scalability**: Better suited for large applications