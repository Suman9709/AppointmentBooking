# 🩺 MediCare+ — Appointment Booking System

<div align="center">

**A modern MERN healthcare platform for patients, doctors, and administrators.**

Book appointments, manage IST-based schedules, edit role profiles, and understand hospital activity through live analytics.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Live Application](https://appointment-chi-seven.vercel.app/) · [API Server](https://appointmentbooking-mhku.onrender.com) · [Report an Issue](https://github.com/Suman9709/AppointmentBooking/issues)

</div>

---

# 🚀 Live Demo

### 🌐 Frontend

https://appointment-chi-seven.vercel.app/

### ⚙️ Backend

https://appointmentbooking-mhku.onrender.com

---

# ✨ Features

* 🔐 Role-based JWT authentication using HTTP-only cookies
* 🧑‍⚕️ Independent patient, doctor, and admin sessions across browser tabs
* 📅 Atomic appointment booking that prevents double-booking
* 🇮🇳 Accurate `Asia/Kolkata` slot creation and display
* ⏰ Real-time department and doctor availability
* 🚫 Past-slot, overlap, cancellation, and ownership validation
* 📊 Live MongoDB dashboard analytics and status charts
* 👤 Editable patient, doctor, and admin profiles
* 🏥 Doctor and department administration
* 🔄 TanStack Query caching and automatic data refresh
* 💫 Responsive creative UI with loaders and empty/error states
* 🛡️ Password hashes excluded from API responses

## 👥 Role workspaces

| Role | Main capabilities | Login | Dashboard | Profile |
| --- | --- | --- | --- | --- |
| **Patient** | Browse slots, book/cancel visits, view analytics | `/patientlogin` | `/patientdashboard` | `/patientprofile` |
| **Doctor** | Create slots, view today's visits and analytics | `/doctorlogin` | `/doctordashboard` | `/doctorprofile` |
| **Admin** | Create doctors/departments and monitor activity | `/adminlogin` | `/admindashboard` | `/adminprofile` |

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router DOM
* TanStack React Query
* Axios
* Recharts

## Backend

* Node.js
* Express.js 5
* MongoDB
* Mongoose 9
* JWT Authentication
* Cookie Parser
* CORS

---

# 📂 Folder Structure

```bash
appointment-booking/
│
├── frontend/
│   ├── src/             # Pages, components, hooks, services and routes
│   └── public/          # Static assets
│
├── backend/
│   ├── controller/      # Auth, profiles, slots and analytics
│   ├── router/          # Express API routes
│   ├── middleware/      # Role-specific JWT verification
│   ├── model/           # Mongoose schemas
│   ├── utils/           # IST date/time conversion
│   └── config/          # Database connection
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URL
JWT_SECRET=YOUR_SECRET_KEY
CORS_ORIGIN=http://localhost:5173
JWT_EXPIRES_IN=7d
```

## Frontend `.env.local`

```env
VITE_API_URL=http://localhost:5000
```

> [!IMPORTANT]
> Never commit `.env` files, JWT values, MongoDB credentials, real patient information, or production passwords.

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/Suman9709/AppointmentBooking.git
cd AppointmentBooking
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Demo Credentials

Use disposable demo accounts only. Replace these placeholders in a protected demo guide—never publish production credentials.

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin.demo@example.com` | `<demo-password>` |
| Doctor | `doctor.demo@example.com` | `<demo-password>` |
| Patient | `patient.demo@example.com` | `<demo-password>` |

---

# 📸 Screenshots

## 🏠 Home Page

The application now uses a responsive medical design system with glass cards, role-aware navigation, live analytics, and editable profiles.

## 👨‍⚕️ Doctor Dashboard

<img width="2880" height="1620" alt="Screenshot (206)" src="https://github.com/user-attachments/assets/7fb4154e-5be7-430e-9451-e4a1487a08b3" />

## 👤 Patient Dashboard

<img width="2880" height="1620" alt="Screenshot (204)" src="https://github.com/user-attachments/assets/7f7558ef-2434-4d5c-90c2-f3485132a5a5" />


## 🛡️ Admin Dashboard

<img width="2880" height="1620" alt="Screenshot (207)" src="https://github.com/user-attachments/assets/dd291aa5-53e6-47e4-bbdc-5d3a936bc6e0" />


---

# 🔌 API Overview

Protected endpoints require the relevant HTTP-only role cookie and Axios `withCredentials: true`.

### Authentication and profiles

| Method | Endpoint | Access |
| --- | --- | --- |
| `POST` | `/api/patient/patientRegister` | Public |
| `POST` | `/api/patient/patientLogin` | Public |
| `GET` | `/api/patient/getPatientDetails` | Patient |
| `PUT` | `/api/patient/updatePatientProfile` | Patient |
| `POST` | `/api/doctor/login` | Public |
| `GET` | `/api/doctor/getdoctorprofile` | Doctor |
| `PUT` | `/api/doctor/profile` | Doctor |
| `POST` | `/api/auth/login` | Public |
| `GET` | `/api/auth/getAdminProfile` | Admin |
| `PUT` | `/api/auth/profile` | Admin |

### Appointments and slots

| Method | Endpoint | Access |
| --- | --- | --- |
| `POST` | `/api/patient/bookAppointment` | Patient |
| `GET` | `/api/patient/getPatientAppointments` | Patient |
| `DELETE` | `/api/patient/cancelAppointment/:appointmentId` | Patient |
| `POST` | `/api/doctor/slots/create` | Doctor |
| `GET` | `/api/doctor/slots/allslots` | Doctor |
| `PUT` | `/api/doctor/slots/update/:id` | Doctor |
| `DELETE` | `/api/doctor/slots/delete/:id` | Doctor |
| `GET` | `/api/doctor/slots/slotbydepartment/:departmentId` | Public |

### Administration and analytics

| Method | Endpoint | Access |
| --- | --- | --- |
| `GET` | `/api/department/getalldepartments` | Public |
| `POST` | `/api/department/createDepartment` | Admin |
| `POST` | `/api/adminaccess/create/doctor` | Admin |
| `GET` | `/api/adminaccess/getall/doctors` | Admin |
| `GET` | `/api/adminaccess/dashboard-analytics` | Admin |
| `GET` | `/api/doctor/dashboard-analytics` | Doctor |
| `GET` | `/api/patient/dashboard-analytics` | Patient |

See [`frontend/README.md`](frontend/README.md) for request bodies and the complete endpoint catalogue.

---

# 📈 Project Highlights

* Complete REST API for authentication, profiles, slots, bookings and analytics
* Implemented 3 role-based dashboards
* Secure, independent role sessions
* Atomic and conflict-free scheduling
* Promise-style Mongoose middleware compatible with Mongoose 9

## 🧪 Quality Checks

```bash
cd frontend
npm run lint
npm run build

cd ../backend
node --check index.js
```

## 🗺️ Roadmap

* Email and SMS appointment reminders
* Doctor-side visit status updates
* Search, pagination, and date filters
* Administrative audit history
* Automated API and end-to-end tests

---

# 🚀 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

# 👨‍💻 Author

## Suman Kumar

### GitHub

https://github.com/Suman9709

### LinkedIn

[linkedin.com/in/suman9709](https://www.linkedin.com/in/suman9709/)

---

# ⭐ Show Your Support

If you like this project, please ⭐ the repository on GitHub. Issues and pull requests are welcome.
