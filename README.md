-----

`markdown
# Online Lecture Scheduling Module

**Submitted by:** Aryan Jadhav
**For:** Ideamagix Internship - Review Test Assignment

##  Live Demo
* **Frontend (Netlify):** [https://lecture-scheduler.netlify.app]
* **Backend (Railway):** [https://lecture-scheduler-backend-production-5328.up.railway.app/]
* **GitHub Repository:** [https://github.com/Aryanjadhav147]

---

##  Login Credentials
Please use the following credentials to test the application roles:

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `admin123` | Full access to schedule lectures, manage courses & instructors. |
| **Instructor** | `rahul@test.com` | `123` | Read-only access to view their own assigned lectures. |

---

##  Project Overview
This is a comprehensive web-based scheduling system designed to streamline the allocation of lectures to instructors. The core functionality ensures that **no instructor can be assigned two lectures that overlap or occur on the same date** (based on strict conflict rules), preventing scheduling clashes.

### Core Features Implemented
1.  **Admin Dashboard:**
    * **Instructor Management:** Add and view instructors.
    * **Course Management:** Create courses with details (Level, Description, Image).
    * **Lecture Scheduling:** A sophisticated interface to assign lectures.
    * **Conflict Detection:** **(Highlight)** The system automatically checks database records and prevents booking an instructor if they are already occupied on the selected date/time.
2.  **Instructor Panel:**
    * Personalized dashboard showing only lectures assigned to the logged-in instructor.
    * Course details populate automatically.
3.  **Authentication:**
    * Secure JWT (JSON Web Token) implementation.
    * Role-based access control (Admin vs. Instructor).

---

##  Tech Stack
* **Frontend:** React.js, Tailwind CSS, Axios, React Router.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Atlas Cloud).
* **Authentication:** JWT & Bcrypt.js.
* **Deployment:** Netlify (Client) & Railway (Server).

---

##  Local Setup Instructions

### Prerequisites
* Node.js installed.
* MongoDB URI (or local instance).

### 1. Clone the Repository
bash
git clone [https://github.com/Aryanjadhav147/lecture-scheduler-frontend]
cd lecture-scheduler
`

### 2\. Backend Setup

bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_string
# JWT_SECRET=mysecretkey
# PORT=5000

# Seed the Admin User
node seed.js

# Start Server
node server.js


### 3\. Frontend Setup

bash
cd client
npm install
npm start


The app will run on `http://localhost:3000`.

-----

##  API Endpoints

### Authentication

  * `POST /api/auth/login` - Authenticate user and return JWT.

### Admin Routes

  * `GET /api/admin/instructors` - List all instructors.
  * `POST /api/admin/instructors` - Create a new instructor.
  * `GET /api/admin/courses` - List all courses.
  * `POST /api/admin/courses` - Create a new course.
  * `POST /api/admin/lectures` - Schedule a lecture (**triggers conflict check**).

### Instructor Routes

  * `GET /api/instructor/lectures` - Fetch lectures for the logged-in user.

-----

##  Assumptions & Logic

  * **Conflict Logic:** The requirement stated "admin should be unable to assign him any other lecture on that date". The system implements a strict check: if an instructor has *any* lecture on a specific Date, they are marked as busy for that entire day to prevent travel/schedule clashes.
  * **Security:** Passwords are hashed using bcrypt before storage.

<!-- end list -->


```
