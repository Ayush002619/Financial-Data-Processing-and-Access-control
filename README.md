# 💰 Finance Backend API

A complete backend system for managing financial records with authentication, analytics, budgeting, and smart insights.

---

## 🚀 Live API

👉 https://financial-data-processing-and-access.onrender.com

---

## 📌 Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Protected routes

---

### 💵 Financial Records

* Create, Read, Update, Delete records
* Filter by type, category, and date
* Pagination support
* Search functionality

---

### 📊 Dashboard Analytics

* Total income, expense, net balance
* Category-wise breakdown
* Monthly trends
* Recent transactions

---

### 🧠 Smart Insights

* Savings rate analysis
* Top spending category
* Expense vs income warnings

---

### 💰 Budget System

* Set category-wise budgets
* Track spending vs limit
* Budget status (Exceeded / Within limit)

---

### 📤 Export Feature

* Download records as CSV

---

### 🔐 Security

* Rate limiting
* JWT authentication
* Environment variables

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* json2csv

---

## 📂 Project Structure

```bash
controllers/
models/
routes/
middleware/
config/
app.js
server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```bash
git clone https://github.com/Ayush002619/Financial-Data-Processing-and-Access-control.git
cd finance-backend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Create .env File

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

### 4️⃣ Run Server

```bash
npm run dev
```

---

## 🔗 API Endpoints

### 🔐 Auth

* POST `/signup`
* POST `/login`

---

### 📊 Records

* POST `/records`
* GET `/records`
* PUT `/records/:id`
* DELETE `/records/:id`

---

### 📈 Analytics

* GET `/records/summary`
* GET `/records/category`
* GET `/records/recent`
* GET `/records/monthly-trends`

---

### 🧠 Insights

* GET `/records/insights`

---

### 💰 Budget

* POST `/budget`
* GET `/budget`

---

### 📤 Export

* GET `/records/export`

---

## 🌐 Deployment

Backend deployed on Render
Database hosted on MongoDB Atlas

---

## 🧠 Key Highlights

* Modular backend architecture
* MongoDB aggregation pipelines for analytics
* Real-world financial features (budgeting, insights)
* Secure API design

---

## 📌 Future Improvements

* Frontend dashboard (React)
* API documentation (Swagger)
* Advanced analytics

---

## 👨‍💻 Author

Ayush Kumar

---
