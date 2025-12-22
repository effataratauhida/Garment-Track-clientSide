# 🧵 Garments Track – Order & Production Management System

Garments Track is a full-stack MERN application designed to manage garments products, orders, and user roles efficiently.  
The system supports **Admin, Manager, and Buyer** roles with secure authentication, role-based access control, and a modern responsive UI.

---

## 🌐 Live Link

- **Frontend:** https://garmenttrack-28056.web.app  
  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS + DaisyUI
- Firebase Authentication
- React Hot Toast
- Axios / Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Cookie-based Auth
- CORS

### Deployment
- Frontend: Firebase Hosting
- Backend: Vercel

---

## 👥 User Roles & Permissions

### 👑 Admin
- View all users
- Approve / suspend buyers
- Manage all products
- Manage all orders (Approve / Reject)
- Control “Show on Home” products

### 🧑‍💼 Manager
- Add products
- Update own products
- Delete own products
- Cannot place orders

### 🛒 Buyer
- Can view products
- Can place orders **only after admin approval**
- View own orders
- Track order status

> ❌ Buyer & Manager **cannot order** until status is `approved`

---

## 🔐 Authentication & Security

- Firebase Authentication (Email/Password + Google)
- JWT generated from backend
- Stored in **HTTP-only cookies**
- Role-based route protection
- Secure CORS configuration for production

---

## 📦 Core Features

- 🔑 Authentication & Authorization
- 🧵 Product Management (CRUD)
- 🛒 Order Management
- 📊 Role-based Dashboards
- 🔍 Search & Filter
- 🖼️ Image Gallery for Products
- 📱 Fully Responsive Design

---

## 🧪 Admin Approval Logic

- New buyers are created with `status: pending`
- Pending buyers:
  - Cannot place orders
  - Dashboard pages show “Nothing here”
- After admin approval:
  - Order Now button becomes active
  - Dashboard content becomes visible

---



