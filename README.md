# NestJS CRUD API

A modular RESTful CRUD API built with **NestJS**, **TypeORM**, and **MySQL**. The project demonstrates clean architecture, reusable services, centralized error handling, validation, pagination, filtering, and consistent API responses.

---

## Features

- NestJS modular architecture
- TypeORM with MySQL
- Environment configuration using `@nestjs/config`
- Joi configuration validation
- Generic `BaseService` for reusable CRUD operations
- Global exception handling
- Global response interceptor
- Request logging middleware
- DTO validation using `class-validator`
- Pagination, filtering, and sorting for products
- Database migrations
- Centralized database error handling
- Consistent API response structure

---

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- MySQL
- class-validator
- class-transformer
- Joi
- dotenv

---

## Project Structure

```text
src
├── common
│   ├── base
│   ├── constants
│   ├── decorators
│   ├── dto
│   ├── filters
│   ├── interceptors
│   ├── interfaces
│   ├── lib
│   └── middleware
│
├── config
│
├── database
│   ├── migrations
│   └── data-source.ts
│
├── modules
│   ├── users
│   ├── categories
│   └── products
│
├── app.module.ts
└── main.ts
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=nestjs_api
```

---

## API Modules

### Users

- Create User
- Get All Users
- Get User By ID
- Update User
- Delete User

---

### Categories

- Create Category
- Get All Categories
- Get Category By ID
- Update Category
- Delete Category

---

### Products

- Create Product
- Get Products
- Get Product By ID
- Update Product
- Delete Product

Additional features:

- Pagination
- Search
- Sorting
- Filter by User
- Filter by Category

---

## Validation

Validation is implemented globally using NestJS `ValidationPipe`.

Features include:

- Automatic DTO validation
- Request transformation
- Property whitelisting
- Unknown property rejection

---

## Response Format

Successful response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {}
}
```

Error response

```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```

---

## Error Handling

A global exception filter provides consistent error responses.

Handled scenarios include:

- Validation errors
- Resource not found
- Duplicate records
- Foreign key constraint violations
- Invalid referenced records

---

## Logging

A global logging middleware logs incoming requests including:

- HTTP method
- Route
- Response status
- Request duration

Example:

```text
LOG [LoggingMiddleware] GET request received for /users - Status: 200 - 12ms
```

---

## Configuration

Configuration is managed using:

- `ConfigModule`
- `ConfigService`
- Joi validation
- Environment variables

---

## Reusable Components

### BaseService

Provides reusable CRUD operations:

- create
- findAll
- findById
- update
- delete

---

### Response Interceptor

Wraps every successful response into a consistent structure.

---

### Exception Filter

Transforms all HTTP exceptions into a unified response format.

---

### Database Error Helper

Converts MySQL database errors into meaningful HTTP exceptions.

---


