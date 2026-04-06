# 💰 Finance Data Processing and Access Control Backend

## 📌 Overview

This project is a backend system designed for managing financial data with secure access control. It demonstrates backend development concepts including authentication, data processing, analytics, and API design.

The system allows users to track income and expenses, analyze financial patterns, set budgets, and generate insights.

---

## 🌐 Live API

👉 **Base URL:**
https://financial-data-processing-and-access.onrender.com

---

## 🚀 Features

### 🔐 Authentication & Access Control

* User Signup & Login
* JWT-based authentication
* Protected routes using middleware
* Role-based access control

---

### 💵 Financial Data Management

* Create, Read, Update, Delete (CRUD) records
* User-specific data isolation
* Filtering by:

  * Type (income / expense)
  * Category
  * Date range

---

### 🔍 Advanced Query Features

* Pagination (`page`, `limit`)
* Search (category & note)
* Sorting (latest records first)

---

### 📊 Dashboard Analytics

* Total income
* Total expenses
* Net balance
* Category-wise breakdown
* Monthly trends
* Recent transactions

---

### 🧠 Smart Insights

* Savings rate analysis
* Highest spending category detection
* Expense vs income warnings

---

### 💰 Budget System

* Set category-wise budget
* Track spending vs limit
* Budget status (Exceeded / Within limit)

---

### 📤 Export Feature

* Download records as CSV file

---

### 🔐 Security

* Rate limiting (prevents abuse)
* JWT authentication
* Environment variable configuration

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* json2csv

---

## 📂 Project Structure

```
controllers/
models/
routes/
middleware/
config/
app.js
server.js
```

---

## ⚙️ Setup Instructions (Local Development)

### 1️⃣ Clone Repository

```
git clone https://github.com/Ayush002619/Financial-Data-Processing-and-Access-control.git
cd finance-backend
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Create `.env` File

Create a `.env` file in the root directory:

```
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_secret_key_here
PORT=5000
```

---

### 4️⃣ Run Server

```
npm run dev
```

---

## 🧪 How to Test the API

You can test APIs using:

* Postman
* Hoppscotch

---

### 🔹 Step 1: Signup

```
POST /signup
```

Body:

```
{
  "name": "Test User",
  "email": "test@gmsil.com",
  "password": "987654",
  "role": "admin"
}
```

---

### 🔹 Step 2: Login

```
POST /login
```

Response:

```
{
  "token": "your_jwt_token"
}
```

---

### 🔹 Step 3: Use Token

Add in headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

### 🔹 Step 4: Test APIs

### Records
#### Creat

```
POST   /records
```
Body:

```
{ 
    "amount": 1000, 
    "type": "income", 
    "category": "salary", 
    "note": "Monthly salary" 
}
```
#### Read
```
GET /records
```
#### Update
```
PUT /records/:id
```
#### Delete
```
DELETE  /records/:id
```

---

#### Filters & Search

```
GET /records?type=expense
GET /records?category=food
GET /records?search=food
GET /records?page=1&limit=5
```

---

#### Dashboard APIs

```
GET /records/summary
GET /records/category
GET /records/recent
GET /records/trends
```

---

#### Smart Insights

```
GET /records/insights
```

---

#### Budget

```
POST /budget

{
  "category": "food",
  "limit": 5000
}

```
```
GET  /budget
```
---

#### Export CSV

```
GET /records/export
```

---

## 🎯 Example Live API Usage

```
POST https://financial-data-processing-and-access.onrender.com/signup
GET  https://financial-data-processing-and-access.onrender.com/records
```

---

## 🌐 Deployment

* Backend deployed on Render
* Database hosted on MongoDB Atlas

---

## 🧠 Key Highlights

* Modular backend architecture
* MongoDB aggregation pipelines for analytics
* Real-world features like budgeting and insights
* Secure and scalable API design

---

## 📌 Future Improvements

* Frontend dashboard (React)
* API documentation (Swagger)
* Advanced analytics (weekly trends)

---