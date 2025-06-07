# 🔐 Authentication & Authorization API

A simple and secure Node.js-based REST API for handling user authentication and role-based authorization using JWTs, bcrypt, and MongoDB.

## 🚀 Features

- User **signup** with hashed password
- User **login** with JWT token issuance
- Secure **role-based access control** (Admin, Student, Visitor)
- **Protected routes** using middleware
- Environment-based config management (`.env`)
- Token handling with **cookies**
- Password security using **bcrypt**

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**

---

## 📁 Project Structure

├── config/
│ └── database.js
├── controller/
│ └── Auth.js
├── middlewares/
│ └── auth.js
├── models/
│ └── User.js
├── routes/
│ └── user.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md


---

## ⚙️ Setup Instructions

 **Clone the repository**  

   git clone https://github.com/your-username/auth-app.git
   cd auth-app
   
Install dependencies

npm install
Create .env file in the root folder:

env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Run the server

npm run dev
🔐 API Routes
Auth Routes
Method	Endpoint	Description
POST	/api/v1/signup	Register a new user
POST	/api/v1/login	Login and receive JWT

Protected Routes
Method	Endpoint	Access Role	Description
GET	/api/v1/test	Any logged-in user	General protected test route
GET	/api/v1/student	Student only	Protected route for Students
GET	/api/v1/admin	Admin only	Protected route for Admins

🧪 Testing
Use tools like Postman or Thunder Client to test routes. Don’t forget to include the JWT token in your request body or as a cookie (SecCookie) for protected routes.

📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute this project with proper attribution.

See the LICENSE file for details.

🙌 **Author**  
Govind Kaushik  
Full-stack Developer | MERN Stack  
[GitHub](https://github.com/kaushikji-23) • [LinkedIn](www.linkedin.com/in/govindkaushik-)
