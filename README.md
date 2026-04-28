# LeadCRM — Lead Management System

A full-stack Mini CRM to manage sales leads. Built with React, Node.js/Express, and PostgreSQL.

---

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React 18, Axios, CSS    |
| Backend   | Node.js, Express        |
| Database  | PostgreSQL               |
| Dev Tools | nodemon, dotenv          |

---

## Project Structure

```
lead-crm/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddLeadForm.jsx   # Form to add new leads
│   │   │   ├── LeadsTable.jsx    # Table with search/filter
│   │   │   └── Dashboard.jsx     # Stats cards
│   │   ├── hooks/
│   │   │   └── useLeads.js       # All lead state + API calls
│   │   ├── utils/
│   │   │   └── api.js            # Axios instance
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
├── server/                     # Express backend
│   ├── config/
│   │   └── db.js               # PostgreSQL pool
│   ├── controllers/
│   │   └── leadController.js   # Business logic
│   ├── middleware/
│   │   └── errorMiddleware.js  # 404 + global error handler
│   ├── models/
│   │   └── Lead.js             # DB queries
│   ├── routes/
│   │   └── leadRoutes.js       # Route definitions
│   ├── schema.sql              # DB schema + sample data
│   ├── index.js                # App entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- Node.js v18+
- PostgreSQL v14+
- npm or yarn

---

## Setup Instructions

### 1. Clone / unzip the project

```bash
cd lead-crm
```

### 2. Set up PostgreSQL database

Open psql or a GUI like pgAdmin and run:

```sql
-- Create the database
CREATE DATABASE lead_crm;

-- Connect to it, then run the schema
\c lead_crm
\i server/schema.sql
```

Or run it all in one line:

```bash
psql -U postgres -c "CREATE DATABASE lead_crm;"
psql -U postgres -d lead_crm -f server/schema.sql
```

This creates the `leads` table and inserts 10 sample records.

---

### 3. Configure the backend

```bash
cd server
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lead_crm
DB_USER=postgres
DB_PASSWORD=your_actual_password
NODE_ENV=development
```

Install dependencies and start:

```bash
npm install
npm run dev        # development (nodemon)
# or
npm start          # production
```

Server runs at: `http://localhost:5000`

---

### 4. Configure the frontend

```bash
cd ../client
cp .env.example .env
```

The default `.env` is:

```env
REACT_APP_API_URL=http://localhost:5000
```

Install dependencies and start:

```bash
npm install
npm start
```

App runs at: `http://localhost:3000`

---

## Features

### Core
- ✅ Add leads (name, phone, source)
- ✅ View all leads in a table
- ✅ Update lead status inline (dropdown)
- ✅ Delete lead with confirmation
- ✅ Form validation (frontend + backend)
- ✅ Proper error messages

### Bonus
- ✅ Search by name or phone (real-time)
- ✅ Filter by status
- ✅ Dashboard with total / interested / converted / not-interested counts
- ✅ Loading states on all async actions
- ✅ Responsive layout

---

## Deployment

### Frontend → Vercel

```bash
cd client
npm run build
# Deploy the build/ folder to Vercel
```

Or connect your GitHub repo to Vercel and set:
- **Build command**: `npm run build`
- **Output directory**: `build`
- **Environment variable**: `REACT_APP_API_URL=https://your-backend.onrender.com`

### Backend → Render

1. Create a new **Web Service** on Render
2. Point to the `server/` directory
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from `.env`

### Database → Neon / Supabase

1. Create a free PostgreSQL database
2. Copy the connection string
3. Run `schema.sql` via their SQL editor
4. Update `DB_*` env vars on Render

---

## API Documentation

See `API_DOCS.md` for full endpoint reference.

---

## Environment Variables Reference

### Server (`server/.env`)

| Variable     | Default     | Description               |
|--------------|-------------|---------------------------|
| PORT         | 5000        | Server port               |
| DB_HOST      | localhost   | PostgreSQL host           |
| DB_PORT      | 5432        | PostgreSQL port           |
| DB_NAME      | lead_crm    | Database name             |
| DB_USER      | postgres    | Database user             |
| DB_PASSWORD  | —           | Database password         |
| NODE_ENV     | development | Environment               |
| CLIENT_URL   | http://localhost:3000 | CORS origin     |

### Client (`client/.env`)

| Variable            | Default                  | Description    |
|---------------------|--------------------------|----------------|
| REACT_APP_API_URL   | http://localhost:5000    | Backend URL    |

---

## Sample Data

The `schema.sql` file includes 10 sample leads with varied statuses and sources so you can see the dashboard and table working immediately after setup.
