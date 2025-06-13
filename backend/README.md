# Ecommerce Backend

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
  - **Middleware**: JWT authentication and role-based access control
- **Database schema**: Automatically managed with Sequelize migrations
- **Role enforcement**: Applied via middleware on protected routes

---

## Installation

1. Clone the repo and enter backend folder:

```bash
git clone <repo-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

4. Run migrations to create tables:

```bash
npx sequelize-cli db:migrate
```

5. (Optional) Seed the database:

```bash
npx sequelize-cli db:seed:all
```

6. Start the server:

```bash
npm run start
```

Or run with auto-reload during development:

```bash
npm run dev
```

---

## API Documentation

### Authentication

#### POST /api/auth/login

- Authenticate user and get JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**

- `200 OK` with JSON `{ token: "<jwt-token>" }`
- `401 Unauthorized` if credentials are invalid

---

### Users

> Protected routes require JWT token in `Authorization: Bearer <token>` header.

#### GET /api/users

- Get all users (admin only).

#### GET /api/users/\:id

- Get user by ID (admin or the user themself).

#### POST /api/users

- Create a new user (registration).

**Request Body Example:**

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"
}
```

#### PUT /api/users/\:id

- Update user data (admin or the user).

#### DELETE /api/users/\:id

- Delete a user (admin only).

---

### Products

#### GET /api/products

- Get all products.

#### GET /api/products/\:id

- Get product by ID.

#### POST /api/products

- Create new product (admin only).

**Request Body Example:**

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "image": "https://image.url"
}
```

#### PUT /api/products/\:id

- Update product (admin only).

#### DELETE /api/products/\:id

- Delete product (admin only).

---

### Cart

> Protected routes require JWT.

#### GET /api/cart

- Get logged-in user's cart items.

#### POST /api/cart

- Add item to cart.

**Request Body Example:**

```json
{
  "productId": 1,
  "quantity": 2
}
```

#### PUT /api/cart/\:id

- Update quantity of a cart item.

#### DELETE /api/cart/\:id

- Remove item from cart.

---

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation changes
- `style`: formatting/no logic changes
- `refactor`: code restructuring
- `test`: adding or fixing tests
- `chore`: maintenance tasks

---

## License

This project is open-source and free to use under the ISC License.
