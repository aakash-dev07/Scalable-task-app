 

---

#  Scalable Web App with Auth & Dashboard

This is a Full-Stack Task Management application built with **Next.js 15** and **MongoDB**. It features a robust JWT-based authentication system and a fully functional dashboard for managing tasks.

##  Key Features

* **Authentication**: Secure password hashing using Bcrypt and session management via JWT (Cookies).
* **Protected Routes**: Dashboard access is restricted to authenticated users only using Next.js Middleware.
* **Full CRUD Operations**: Users can Create, Read, Update (inline title editing and status toggling), and Delete tasks.
* **Search & Filter**: Real-time search functionality on the dashboard to filter tasks by title.
* **Responsive UI**: A modern, clean design built with Tailwind CSS that works seamlessly across mobile, tablet, and desktop devices.

##  Tech Stack

* **Frontend**: React.js, Next.js 15 (App Router), Tailwind CSS
* **Backend**: Next.js API Routes (Node.js runtime)
* **Database**: MongoDB (via Mongoose)
* **Security**: JSON Web Tokens (JWT), Bcrypt.js

##  Project Structure

```text
src/
├── app/                  # Routes (Frontend & API)
│   ├── api/              # Backend Endpoints (Auth & CRUD)
│   │   └── tasks/
│   │       └── [id]/     # Dynamic routes for Update/Delete
│   ├── login/            # Login Page
│   ├── signup/           # Signup Page
│   └── dashboard/        # Protected Dashboard UI
├── components/           # Reusable UI Components
├── lib/                  # Database connection & Auth utilities
├── models/               # MongoDB Schemas (Task & User)
└── middleware.ts         # Route Protection Logic

```

##  Getting Started

1. **Clone the Repository:**
git clone https://github.com/aaki619/Scalable-task-app.git
cd Scalable-task-app


2. **Install Dependencies:**
```bash
npm install

```


3. **Set Environment Variables:**
Create a `.env.local` file in the root directory and add your credentials (refer to `.env.example`):
```text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

```


4. **Run the Development Server:**
```bash
npm run dev

```



##  Scalability for Production

To scale this application for production-level traffic and complexity:

* **State Management**: Implement **Zustand** or **Redux Toolkit** for managing complex global states and user data.
* **Data Fetching**: Use **TanStack Query (React Query)** for efficient server-state management, caching, and optimistic UI updates.
* **Backend Optimization**: Integrate **Rate Limiting** to prevent API abuse and implement **Redis Caching** for frequently accessed data.
* **Security**: Ensure JWTs are stored in `HttpOnly` cookies (currently implemented) and set up strict **CORS** policies and **Helmet.js** for header security.
* **Database**: Utilize MongoDB **Indexing** on frequently searched fields (like task titles) to improve query performance.

##  API Documentation

A Postman Collection containing all API endpoints (Auth & CRUD) is available in the docs/ folder for testing and integration reference.

Project Link: https://github.com/aaki619/Scalable-task-app

 