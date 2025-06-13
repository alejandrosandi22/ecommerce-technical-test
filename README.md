# E-commerce Project

This repository contains the **full-stack e-commerce application**, including both backend and frontend codebases. The backend is built with Node.js, Express, and Sequelize ORM for database management, while the frontend is a modern React application powered by Next.js and TailwindCSS.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Architecture](#architecture)  
- [Backend](#backend)  
  - [Technologies](#backend-technologies)  
  - [Setup & Configuration](#backend-setup--configuration)  
  - [API Documentation](#api-documentation)  
  - [Database](#database)  
  - [Running the Backend](#running-the-backend)  
- [Frontend](#frontend)  
  - [Technologies](#frontend-technologies)  
  - [Setup & Configuration](#frontend-setup--configuration)  
  - [Running the Frontend](#running-the-frontend)  
- [Development Workflow](#development-workflow)  
- [Commit Convention](#commit-convention)  
- [License](#license)  

---

## Project Overview

This e-commerce application provides a seamless shopping experience with features like:

- User authentication and role-based authorization (admin, user)  
- Product catalog browsing and management  
- Shopping cart and checkout process  
- Secure API endpoints protected with JWT  
- Responsive UI with fast server-side rendering  

The backend exposes a RESTful API consumed by the Next.js frontend, which manages UI state and handles client-side interactions.

---

## Architecture

The project follows a clear separation of concerns:

- **Backend** uses an MVC-style architecture with Sequelize ORM models, controllers for business logic, routes for API endpoints, and middleware for authentication/authorization.
- **Frontend** is a React-based SPA with Next.js for SSR/SSG, utilizing TailwindCSS for styling and Zustand for state management.
- Communication is handled over HTTP with RESTful API calls.

---

# Backend

### Technologies

- Node.js, Express.js  
- Sequelize ORM with PostgreSQL (or configured SQL DB)  
- JWT Authentication and role-based middleware  
- dotenv for environment variables  
- Husky & Commitlint for commit message enforcement

### Setup & Configuration

1. Navigate to the backend directory:  
   ```bash
   cd backend
```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with your environment variables, e.g.:

   ```env
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Configure `config/db.config.js` as needed for your database connection.

### API Documentation

The backend exposes the following main endpoints (all prefixed with `/api`):

| Method | Endpoint             | Description          | Auth Required | Roles Allowed |
| ------ | -------------------- | -------------------- | ------------- | ------------- |
| POST   | `/api/auth/login`    | User login           | No            | N/A           |
| POST   | `/api/auth/register` | User registration    | No            | N/A           |
| GET    | `/api/products`      | List all products    | No            | N/A           |
| POST   | `/api/products`      | Create a new product | Yes           | Admin         |
| PUT    | `/api/products/:id`  | Update a product     | Yes           | Admin         |
| DELETE | `/api/products/:id`  | Delete a product     | Yes           | Admin         |
| GET    | `/api/users`         | List all users       | Yes           | Admin         |
| ...    | ...                  | ...                  | ...           | ...           |

JWT tokens are required for protected routes. Middleware verifies tokens and user roles.

### Database

The database schema is managed via Sequelize migrations located in the `migrations/` folder. Running migrations will create necessary tables and relations automatically.

---

### Running the Backend

Start the server locally:

```bash
npm run dev
```

The backend API will be available at: `http://localhost:5000/api`

---

# Frontend

### Technologies

* Next.js (React Framework)
* React 19
* TailwindCSS for styling
* React Hook Form + Zod for forms and validation
* Zustand for state management
* Radix UI components
* Husky & Commitlint for git hooks and commit message standards

### Setup & Configuration

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with API base URL:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Running the Frontend

Start the development server:

```bash
npm run dev
```

The frontend will be available at: `http://localhost:3000`

---

## Development Workflow

* Write code in appropriate folders (`backend/controllers`, `frontend/components`, etc.)
* Use ESLint and Prettier to maintain code style (`npm run lint` / `npm run format`)
* Commit messages must follow the Conventional Commits format (see below)
* Use migrations to update the database schema in backend
* Test API endpoints with tools like Postman or directly via frontend

---

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint and husky. Valid types include:

* `feat:` A new feature
* `fix:` A bug fix
* `docs:` Documentation only changes
* `style:` Code style changes (no logic)
* `refactor:` Code refactoring
* `perf:` Performance improvements
* `test:` Adding or fixing tests
* `chore:` Minor maintenance
* `ci:` CI/CD configuration
* `build:` Build-related changes
* `revert:` Reverting changes

Example:

```
feat: add user authentication with JWT  
fix: resolve bug in product listing endpoint  
docs: update API usage documentation  
```

---

## License

This project is open-source and free to use under the ISC License.
