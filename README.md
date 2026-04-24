# Training and Placement Portal

A comprehensive, real-time web application designed to streamline the training and placement process for educational institutions. This portal features role-based access for Students and Administrators, automated job lifecycle management, and real-time interview scheduling.

## 🚀 Quick Start

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js**: v18.x or higher
- **PostgreSQL**: v14.x or higher
- **npm**: v9.x or higher

---

### Step 1: Database Setup
1.  Open **pgAdmin 4** or your preferred PostgreSQL client.
2.  Create a new database (e.g., `TP_portal_db`).
3.  Navigate to `Backend/database/schema.sql` and execute the content of this file in your database query tool to initialize the tables and types.

---

### Step 2: Backend Configuration
1.  Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file from the example:
    ```bash
    copy .env.example .env
    ```
4.  Configure your credentials in `.env`:
    - `DB_USER`: Your PostgreSQL username
    - `DB_PASSWORD`: Your PostgreSQL password
    - `DB_NAME`: The name of the database you created
    - `JWT_SECRET`: A long, random string for security

---

### Step 3: Frontend Configuration
1.  Navigate to the `Frontend` directory:
    ```bash
    cd ../Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file:
    ```bash
    copy .env.example .env
    ```
4.  Optionally update `VITE_API_URL` if your backend is running on a different port than 5000.

---

### Step 4: Running the App

To run the project, you need to start both the Backend and Frontend servers.

#### Start Backend
In the `Backend` directory:
```bash
npm run dev
```

#### Start Frontend
In the `Frontend` directory:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🛠 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS v4, Lucide React, Socket.io-client.
- **Backend**: Node.js, Express, PostgreSQL, Socket.io, JWT Authentication.
- **Database**: PostgreSQL with custom PL/pgSQL triggers for automation.
