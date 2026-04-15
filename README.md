# 🎟️ Book My Ticket – Backend Hackathon Project

A simplified movie seat booking system built by extending an existing codebase.
This project demonstrates how to add authentication and protected booking logic on top of a working backend.

---

## 🚀 Features

* 👤 User Registration
* 🔐 User Login with JWT Authentication
* 🛡️ Protected Routes (only logged-in users can access)
* 🎟️ Seat Booking System
* ⚡ Prevent Duplicate Seat Booking (using DB transactions & locking)
* 🔗 Booking associated with logged-in user
* 🧱 Clean and modular backend structure
* 🌐 Optional frontend using EJS

---

## 🧠 Project Approach

This project is built by **extending an existing codebase** instead of creating from scratch.

Key decisions:

* Used **raw SQL with PostgreSQL** for better control over transactions
* Implemented **row-level locking (`FOR UPDATE`)** to prevent race conditions
* Added a **JWT-based authentication layer**
* Followed **modular architecture** for scalability

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL (Supabase)
* **Authentication:** JWT (JSON Web Token)
* **Password Hashing:** bcrypt
* **Frontend (Optional):** EJS

---

## 📁 Folder Structure

```
root/
│
├── index.mjs
├── index.html
│
├── db/
│   └── schema.sql
│
├── views/              # EJS templates (optional)
│   ├── login.ejs
│   └── register.ejs
│
└── src/
    ├── common/
    │   ├── db/
    │   │   └── db.js
    │   ├── middleware/
    │   ├── dto/
    │   └── utils/
    │
    └── module/
        └── auth/
            ├── dto/
            ├── controller
            ├── service
            ├── middleware
            └── routes
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in root:

```
POSTGRES_URI=your_supabase_connection_string
JWT_SECRET=your_secret_key
PORT=8080

**all details are available on env.example**
```

---

### 4️⃣ Setup Database

Run the SQL file in Supabase SQL Editor:

```
db/schema.sql
```

---

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Seats Table

```sql
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);
```

---

### Insert Seats

```sql
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 40);
```

---

## 🔐 Authentication Flow

```
User → Register → Login → Receive JWT Token
→ Token used in Authorization Header
→ Access Protected Routes
```

---

## 🔗 API Endpoints

### 🟢 Auth Routes

#### Register

```
POST /api/auth/register
```

#### Login

```
POST /api/auth/login
```

#### Logout

```
POST /api/auth/logout
```

#### Refresh

```
POST /api/auth/refresh-token
```

---

### 🔵 Seat Routes

#### Home Page

```
GET /
```

#### Get All Seats

```
GET /seats
```

#### Book Seat (Protected)

```
PUT /book/:id
```

Headers:

```
Authorization: Bearer <token>
```

---

## 🛡️ Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes via middleware
* SQL injection prevention using parameterized queries

---

## 🧪 Testing

Use tools like:

* Postman
* Thunder Client

### Test Cases

* Register user ✅
* Login user ✅
* Access protected route without token ❌
* Access with token ✅
* Book same seat twice ❌

---

## 🌐 Frontend (Optional)

A simple frontend is implemented using EJS to:

* Register/Login users
* Display available seats
* Book seats using JWT token

---

## 💡 Key Learnings

* Working with an **existing codebase**
* Implementing **authentication in real systems**
* Handling **database transactions & concurrency**
* Designing **protected APIs**
* Structuring scalable backend code

---

## 🏁 Conclusion

This project simulates a real-world backend system where features are added incrementally on top of an existing architecture.

It demonstrates:

* Clean integration
* Secure authentication
* Safe booking logic
* Production-style backend thinking

---

## 🙌 Author

**Md Intekhab Alam**

Focused on clean architecture and real-world problem solving.

🛠️ Tech Interests:
- Backend Development
- System Design
- Database Design

---

Built as part of a backend hackathon challenge to simulate real-world feature development on an existing codebase.
