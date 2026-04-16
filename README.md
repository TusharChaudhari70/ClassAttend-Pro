# 🎓 ClassAttend PRO – Smart Attendance Management System

## 📌 Introduction

**ClassAttend X** is a full-stack web application designed to simplify and digitize attendance management in educational institutions.
It allows **Admin and Faculty users** to manage students, subjects, and attendance records efficiently through a secure and user-friendly interface.

The system ensures **role-based access control**, where:

* **Admin** can manage users, subjects, and view all attendance
* **Faculty** can mark and view attendance for their own classes

---

## 🚀 Features

* Role-based Login (Admin / Faculty)
* Faculty Dashboard
* Admin Dashboard
* View Attendance (Filtered & Full Access)
* Filter by Faculty, Subject, Date
* Modal view for student list
* Protected Routes (React Router)
* Persistent Login using LocalStorage

---

## 🧑‍💻 Tech Stack

### 🔹 Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios

### 🔹 Backend

* Spring Boot
* Spring MVC
* REST APIs

### 🔹 Database

* MySQL

---

## 🏗️ Project Structure

```
ClassAttend/
│
├── frontend/   # React Application
├── backend/    # Spring Boot Application
└── README.md
```

---

## ⚙️ How to Run the Project

### 🔹 Frontend(VS Code)

```
cd frontend
npm install
npm run dev
```

### 🔹 Backend(eclipse)

```
set up database configuration (application.properties)
-db_name , -db_username , -db_password

run the appliction (run as java application)
add user in database in user table (role -- admin)

```

---

## 🔐 User Roles & Access

| Role    | Permissions                                 |
| ------- | ------------------------------------------- |
| Admin   | Manage users, subjects, view all attendance |
| Faculty | Mark attendance, view own records           |

---
