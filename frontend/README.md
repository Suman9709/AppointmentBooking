# MediCare+ frontend

Creative React interface for the role-based appointment system, with editable profiles, live analytics and IST scheduling.

## Application setup

```bash
cd frontend
npm install
npm run dev
```

```env
# frontend/.env.local
VITE_API_URL=http://localhost:5000

# backend/.env (never commit this file)
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=<long-random-secret>
JWT_EXPIRES_IN=7d
```

## Role routes and credentials

| Role | Login | Dashboard | Editable profile |
| --- | --- | --- | --- |
| Patient | `/patientlogin` | `/patientdashboard` | `/patientprofile` |
| Doctor | `/doctorlogin` | `/doctordashboard` | `/doctorprofile` |
| Admin | `/adminlogin` | `/admindashboard` | `/adminprofile` |

Use only disposable demo accounts in documentation:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin.demo@example.com` | `<demo-password>` |
| Doctor | `doctor.demo@example.com` | `<demo-password>` |
| Patient | `patient.demo@example.com` | `<demo-password>` |

Authentication uses HTTP-only `admintoken`, `doctortoken`, and `patienttoken` cookies. Axios requests use `withCredentials: true`. Never commit real passwords, JWTs, MongoDB credentials, or patient data.

## API catalogue

| Method | Endpoint | Access / body |
| --- | --- | --- |
| POST | `/api/patient/patientRegister` | Public: `name, email, password, gender, age, contact, address?, parentName?` |
| POST | `/api/patient/patientLogin` | Public: `email, password` |
| POST | `/api/patient/patientlogout` | Patient |
| GET | `/api/patient/getPatientDetails` | Patient |
| PUT | `/api/patient/updatePatientProfile` | Patient: `name?, email?, age?, gender?, contact?, address?, parentName?` |
| POST | `/api/patient/bookAppointment` | Patient: `slotId, doctorId` |
| GET | `/api/patient/getPatientAppointments` | Patient |
| DELETE | `/api/patient/cancelAppointment/:appointmentId` | Patient |
| GET | `/api/patient/dashboard-analytics` | Patient |
| POST | `/api/doctor/login` | Public: `email, password` |
| POST | `/api/doctor/logout` | Doctor |
| GET | `/api/doctor/getdoctorprofile` | Doctor |
| PUT | `/api/doctor/profile` | Doctor: `name?, email?, specialization?, experience?, qualifications?, isAvailable?` |
| GET | `/api/doctor/dashboard-analytics` | Doctor |
| POST | `/api/doctor/slots/create` | Doctor: `date, startTime, endTime` |
| GET | `/api/doctor/slots/allslots` | Doctor |
| GET | `/api/doctor/slots/:id` | Doctor |
| PUT | `/api/doctor/slots/update/:id` | Doctor: `date?, startTime?, endTime?` |
| DELETE | `/api/doctor/slots/delete/:id` | Doctor |
| GET | `/api/doctor/slots/slotbydepartment/:departmentId` | Public |
| POST | `/api/auth/adminRegister` | Initial setup: `name, email, password` |
| POST | `/api/auth/login` | Public: `email, password` |
| POST | `/api/auth/logout` | Admin |
| GET | `/api/auth/getAdminProfile` | Admin |
| PUT | `/api/auth/profile` | Admin: `name?, email?` |
| POST | `/api/adminaccess/create/doctor` | Admin: doctor fields and `departmentId` |
| GET | `/api/adminaccess/getall/doctors` | Admin |
| GET | `/api/adminaccess/getallslots` | Admin |
| GET | `/api/adminaccess/dashboard-analytics` | Admin |
| GET | `/api/department/getalldepartments` | Public |
| POST | `/api/department/createDepartment` | Admin: `name` |

All bodies are JSON. Protected calls require credentials. Appointment timestamps are ISO UTC and display in `Asia/Kolkata`.

## Verify

```bash
npm run lint
npm run build
```
