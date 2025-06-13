# Frontend - Next.js E-commerce App

This is the frontend application for the E-commerce project, built with **Next.js** and **React**. It provides a responsive user interface that interacts with the backend API to display products, manage user authentication, and handle shopping cart operations.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Development Workflow](#development-workflow)
- [License](#license)

---

## Project Overview

The frontend is developed using Next.js with React 19. It leverages modern React hooks, form handling with `react-hook-form`, and state management using `zustand`. UI components are enhanced by Radix UI and TailwindCSS for styling and responsiveness. The frontend communicates with a backend REST API for data persistence and user management.

---

## Technologies

- **Next.js** (v15.3.3) — React framework for server-side rendering and static site generation
- **React** (v19.0.0) — UI library
- **TailwindCSS** (v4) — Utility-first CSS framework for styling
- **React Hook Form** — For building performant, accessible forms
- **Zod** — Schema validation for form inputs
- **Zustand** — Lightweight state management
- **Radix UI** — Accessible unstyled components
- **Firebase** — For media storage

---

## Environment Setup

Create a `.env` file in the root of the frontend folder with the following variable:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> Replace `http://localhost:5000/api` with your backend API URL if different.

---

## Project Structure

```
frontend/
├── components/           # Reusable React components
├── hooks/                # Custom React hooks
├── pages/                # Next.js pages and API routes
├── public/               # Static assets like images and fonts
├── styles/               # TailwindCSS configuration and global styles
├── utils/                # Utility functions and helpers
├── .env                  # Environment variables
├── package.json          # Project metadata and scripts
└── tsconfig.json         # TypeScript configuration
```

---

## Available Scripts

Run these commands from the root of the frontend directory:

- `npm run dev`
  Starts the development server at [http://localhost:3000](http://localhost:3000) with hot reloading.

- `npm run build`
  Creates an optimized production build.

- `npm run start`
  Runs the Next.js production server.

- `npm run lint`
  Runs ESLint for code quality checks.

- `npm run format`
  Formats code using Prettier.

- `npm run format:check`
  Checks code formatting without applying changes.

---

## Configuration

- **API Base URL**: Configured via `.env` in `NEXT_PUBLIC_API_URL`, used throughout the app to connect with the backend REST API.

- **Husky & Commitlint**: Pre-commit hooks are set up for consistent commit message styles based on Conventional Commits.

---

## Dependencies

Key dependencies include:

- `next`, `react`, `react-dom` — Core framework and React libraries
- `tailwindcss`, `prettier-plugin-tailwindcss` — Styling and formatting
- `react-hook-form`, `zod` — Form management and validation
- `zustand` — State management
- `@radix-ui/react-*` — Accessible UI primitives
- `firebase` — Optional for media/storage needs

---

## Development Workflow

1. Clone the repository and navigate to the `frontend` folder.
2. Install dependencies: `npm install`
3. Create and configure the `.env` file.
4. Run the development server: `npm run dev`
5. Develop UI components inside `components/` and pages inside `pages/`.
6. Use `npm run lint` and `npm run format` to maintain code quality.

---

## License

This project is open-source and free to use under the ISC License.
