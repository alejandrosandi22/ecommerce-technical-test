# E-commerce Backend API

This is a backend REST API built with **Node.js**, **Express**, **Sequelize**, **PostgreSQL**, and **JWT**, supporting role-based authentication and a full-featured shopping cart. It includes separate roles for **admin** and **users**, a secure JWT-based login system, and complete product and cart management.

---

## Tech Stack

- **Node.js**: v22.16.0
- **npm**: v11.4.1
- **Express**: v5.1.0
- **Sequelize**: v6.37.7
- **PostgreSQL**: v14+ recommended
- **JWT**: for authentication
- **bcryptjs**: for password hashing
- **dotenv**: environment configuration

---

## Features

- User registration and login
- Role-based access control (admin/user)
- JWT token with role claim
- CRUD operations for products (admin only)
- Public product listing with search and pagination
- User cart with add/remove/view functionality
- Middleware-protected routes by role
- Modular code structure following clean architecture

---

## Project Structure

```

backend/
├── config/              # Database configuration
├── controllers/         # Business logic for routes
├── middleware/          # Auth and role check middleware
├── models/              # Sequelize models
├── routes/              # Express route definitions
├── .env                 # Environment variables
├── server.js            # App entry point
└── package.json         # Project metadata and scripts

```

---

## Architecture Overview

- **MVC-style structure**:
  - **Models**: Sequelize ORM models (`User`, `Product`, `Cart`)
  - **Controllers**: Handle request logic and responses
  - **Routes**: Define API endpoints
  - **Middleware**: Auth JWT and role guards
- **Database schema**: automatically synchronized via Sequelize
- **Role enforcement**: enforced via middleware for each protected route

---

## Available Scripts

| Script        | Description                 |
| ------------- | --------------------------- |
| `npm run dev` | Run with nodemon (dev mode) |
| `npm start`   | Run server.js normally      |
| `npm prepare` | Install Husky hooks         |

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/backend-ecommerce.git
cd backend-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
JWT_SECRET=your_jwt_secret
```

### 4. Configure PostgreSQL

Update `config/db.config.js` with your DB credentials:

```js
module.exports = {
  HOST: 'localhost',
  USER: 'your_user',
  PASSWORD: 'your_password',
  DB: 'ecommerce_db',
  dialect: 'postgres',
};
```

### 5. Run the app

```bash
npm run dev
```

---

## Branch Naming Convention

We use a clear and semantic naming convention:

```
<type>/<task>-<short-description>
```

Examples:

- `feat/user-authentication`
- `fix/cart-quantity-update`
- `docs/update-readme`

---

## Commit Message Convention

Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) standard and are enforced by **commitlint** and **husky**.

Valid `type` values:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (no logic)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or fixing tests
- `chore`: Minor maintenance
- `ci`: CI/CD config
- `build`: Build-related changes
- `revert`: Reverting changes

Example:

```
feat(auth): implement JWT login
```

---

## API Base URL

All endpoints (except `/api/products/`) require JWT token authentication in the `Authorization` header.

```
/api
```

## Authentication

---

## User Endpoints

### Get current user information

`GET /api/user/me`

**Description**: Returns basic information of the authenticated user.

**Headers**:

- `Authorization: Bearer <token>`

**Successful Response**:

```json
{
  "username": "string",
  "email": "string"
}
```

**Errors**:

- `401 Unauthorized`: Invalid or missing token

---

## Product Endpoints

### Get all products

`GET /api/products/`

**Description**: Returns all available products.

**Successful Response**:

```json
[
  {
    "id": "number",
    "name": "string",
    "price": "number",
    "description": "string"
  }
]
```

### Create a new product

`POST /api/products/`

**Description**: Creates a new product (requires admin role).

**Headers**:

- `Authorization: Bearer <token>`

**Request Body**:

```json
{
  "name": "string",
  "price": "number",
  "description": "string"
}
```

**Successful Response**: `201 Created` with the created product.

**Errors**:

- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: User is not admin

### Update a product

`PUT /api/products/:id`

**Description**: Updates an existing product (requires admin role).

**Headers**:

- `Authorization: Bearer <token>`

**Request Body**:

```json
{
  "name": "string",
  "price": "number",
  "description": "string"
}
```

**Successful Response**: `200 OK` with the updated product.

**Errors**:

- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: User is not admin
- `404 Not Found`: Product not found

### Delete a product

`DELETE /api/products/:id`

**Description**: Deletes a product (requires admin role).

**Headers**:

- `Authorization: Bearer <token>`

**Successful Response**: `204 No Content`

**Errors**:

- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: User is not admin
- `404 Not Found`: Product not found

---

## Cart Endpoints

### Add product to cart

`POST /api/cart/`

**Description**: Adds a product to the user's cart.

**Headers**:

- `Authorization: Bearer <token>`

**Request Body**:

```json
{
  "productId": "number",
  "quantity": "number"
}
```

**Successful Response**: `201 Created`

**Errors**:

- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Product not found

### Get user's cart

`GET /api/cart/`

**Description**: Returns products in the user's cart.

**Headers**:

- `Authorization: Bearer <token>`

**Successful Response**:

```json
[
  {
    "productId": "number",
    "quantity": "number",
    "name": "string",
    "price": "number"
  }
]
```

### Remove product from cart

`DELETE /api/cart/:productId`

**Description**: Removes a product from the user's cart.

**Headers**:

- `Authorization: Bearer <token>`

**Successful Response**: `204 No Content`

**Errors**:

- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Product not found in cart

## License

This project is open-source and free to use under the ISC License.
