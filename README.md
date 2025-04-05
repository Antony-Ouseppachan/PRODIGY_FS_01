Sure! Here's a refined and professional version of your **User Authentication System** project documentation, formatted in proper **GitHub README.md** style with Markdown:

---

# 🔐 User Authentication System

A simple and secure user authentication system built with **Node.js**, **Express**, and **MySQL**. This application allows users to **register**, **log in**, and **log out**, with secure session handling and password hashing using **bcrypt**. Flash messages provide immediate feedback, and **EJS** templates ensure a responsive and dynamic front-end experience.

---

## 🚀 Features

- **📝 User Registration**  
  Users can sign up with a username, email, and password. Passwords are hashed using `bcryptjs` before being stored.

- **🔐 User Login**  
  Registered users can log in using email and password. Credentials are securely verified against the database.

- **🛡️ Session Management**  
  User sessions are maintained across pages. Protected routes are inaccessible unless the user is authenticated.

- **💬 Flash Messages**  
  Real-time feedback for actions like login errors or successful registration using `connect-flash`.

- **📱 Responsive UI**  
  Designed to be mobile-friendly and intuitive across devices using EJS templating and custom styles.

---

## 🛠️ Technologies Used

| Tech | Description |
|------|-------------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MySQL** | Relational database for user data |
| **bcryptjs** | Secure password hashing |
| **express-session** | Session middleware |
| **connect-flash** | Flash message middleware |
| **EJS** | Template engine for server-side rendering |

---

## ⚙️ Installation

### 📥 Clone the Repository
```bash
git clone https://github.com/Antony-Ouseppachan/PRODIGY_FS_01.git
cd user-authentication
```

### 📦 Install Dependencies
Ensure you have **Node.js** and **npm** installed. Then run:

```bash
npm install
```

### 🧩 Set Up MySQL

1. **Create Database**  
   Log in to your MySQL server and run:
   ```sql
   CREATE DATABASE user_auth;
   ```

2. **Create Users Table**  
   Inside the `user_auth` database, run:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );
   ```

3. **Configure Database Connection**  
   Open `server.js` and update your MySQL credentials:
   ```js
   const db = mysql.createConnection({
       host: 'localhost',
       user: 'your_mysql_user',
       password: 'your_mysql_password',
       database: 'user_auth'
   });
   ```

### ▶️ Run the App

Start the server:

```bash
node server.js
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Usage

- **Register**  
  Go to the homepage and sign up with your details.

- **Login**  
  Use your email and password to log in.

- **Logout**  
  Click the logout button to end your session securely.

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork this project, open issues, or suggest enhancements. To contribute:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more details.

---
