# 🚀 LeadCRM — Lead Management System

A full-stack **Mini CRM (Customer Relationship Management)** application to manage and track sales leads efficiently.

Built using **React, Node.js, and PostgreSQL (Supabase supported)** with a clean UI and real-time data updates.

---

## ✨ Features

### 🔹 Core Features

* Add new leads (Name, Phone, Source)
* View all leads in a structured table
* Update lead status (Interested / Not Interested / Converted)
* Delete leads with confirmation
* Form validation (frontend + backend)
* Clean error handling

### 🔹 Advanced Features

* 🔍 Search leads by name or phone (real-time)
* 🎯 Filter leads by status
* 📊 Dashboard with live stats:

  * Total Leads
  * Interested
  * Converted
  * Not Interested
* 📈 Graphical insights:

  * Lead Status Distribution (Pie/Doughnut chart)
  * Lead Source Distribution (Call / WhatsApp / Field)
* ⏳ Loading states for better UX
* 📱 Fully responsive UI

---

## 🛠️ Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Frontend  | React 18, Axios, CSS                   |
| Backend   | Node.js, Express                       |
| Database  | PostgreSQL (Supabase / Neon supported) |
| Charts    | Recharts                               |
| Dev Tools | nodemon, dotenv                        |

---

## 📁 Project Structure

```
lead-crm/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddLeadForm.jsx
│   │   │   ├── LeadsTable.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── LeadsCharts.jsx   # Charts component
│   │   ├── hooks/useLeads.js
│   │   ├── utils/api.js
│   │   └── styles/global.css
│
├── server/                     # Express backend (MVC)
│   ├── config/db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── schema.sql
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/lead-crm.git
cd lead-crm
```

---

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

```bash
psql -U postgres -c "CREATE DATABASE lead_crm;"
psql -U postgres -d lead_crm -f server/schema.sql
```

---

### Option 2: Supabase (Recommended)

Use Supabase:

1. Create a new project
2. Open SQL Editor
3. Run `server/schema.sql`
4. Copy connection string
5. Add to backend `.env`:

```env
DATABASE_URL=your_supabase_connection_string
```

---

## 🔧 Backend Setup

```bash
cd server
npm install
```

Create `.env`:

```env
PORT=5000
DATABASE_URL=your_database_url
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

Server runs at:
👉 http://localhost:5000

---

## 🎨 Frontend Setup

```bash
cd client
npm install
```

Create `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm start
```

App runs at:
👉 http://localhost:3000

---

## 📊 API Endpoints

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| GET    | /api/leads     | Get all leads      |
| POST   | /api/leads     | Add new lead       |
| PUT    | /api/leads/:id | Update lead status |
| DELETE | /api/leads/:id | Delete lead        |

---

## 📸 Screenshots

(Add your UI screenshots here)

---

## 🌍 Deployment

### Frontend (Vercel)

* Build: `npm run build`
* Output: `build`
* Env: `REACT_APP_API_URL=<backend_url>`

### Backend (Render)

* Build: `npm install`
* Start: `npm start`
* Add environment variables

### Database

* Supabase / Neon PostgreSQL

---

## 🔐 Environment Variables

### Server

| Variable     | Description                  |
| ------------ | ---------------------------- |
| PORT         | Server port                  |
| DATABASE_URL | PostgreSQL connection string |
| NODE_ENV     | Environment                  |

### Client

| Variable          | Description     |
| ----------------- | --------------- |
| REACT_APP_API_URL | Backend API URL |

---

## 👨‍💻 Author

**Harsh**

---

## 💡 Key Highlights

* Clean MVC architecture
* Secure DB connection using environment variables
* Real-time UI updates
* Data visualization using charts
* Production-ready structure

---

⭐ If you like this project, give it a star!
