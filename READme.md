# Kota Shop Management App

## Description

This is a full stack application designed to help chefs manage food items in a Kota shop. It includes features for adding, updating, and deleting items, as well as user authentication and a dashboard to track inventory levels.

## Tech Stack:

- Frontend: Vite, Vue 3, Composition API, Pinia, TailwindCSS, Vue Router
- Backend: Hono.js, Typescript, Drizzle ORM, PostgreSQL
- Deployment: Vercel (Frontend), Railway (Backend)

## To-Do:

### Frontend

- [ ] **Deploy (Vercel)**: Deploy frontend using Vercel.
- [ ] **Scaffold basic UI with mock data**:
  - Use Vue 3 Composition API and TailwindCSS to design a basic interface for managing food items.
  - Set up state management with Pinia.
- [ ] **Tidy up build process**:
  - Optimize Vite build config for production.
  - Ensure clean structure and minimal dependencies.
- [ ] **Set up frontend routing**:
  - Use Vue Router to manage different pages (login, register, dashboard).
- [ ] **Attach frontend to backend API**:
  - Connect frontend to backend API (CRUD operations for food items).
- [ ] **Add image upload for food items** (Optional):
  - Integrate file input and image upload functionality.

### Backend

- [ ] **Set up backend (Hono.js)**:
  - Set up routes for managing food items (CRUD), and authentication (login, register).
- [ ] **Deploy backend**:
  - Deploy backend using Railway/Render.
- [ ] **Set up PostgreSQL database**:
  - Use Drizzle ORM to manage migrations and define schemas for `Users` and `FoodItems`.
- [ ] **Attach backend to database**:
  - Ensure smooth integration between Hono.js API and PostgreSQL.
- [ ] **Add authentication (JWT)**:
  - Set up user registration and login with JWT-based authentication.

### Features & Enhancements

- [ ] **Update styling with TailwindCSS**:
  - Use TailwindCSS to style the frontend.
- [ ] **Add user authentication**:
  - Implement user authentication using JWT.
- [ ] **Add inventory tracking**:
  - Allow users to track inventory levels of their food items.
- [ ] **Add search functionality**:
  - Implement search functionality to filter food items by name, category, or price.

## How to Run Locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/nhlanhlacliq/joes-kotas.git
   ```
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Start the backend:
   ```bash
   npm run dev
   ```
4. Start the frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```
