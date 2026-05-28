# AI Finance API

Backend API for the AI Finance Dashboard built using Node.js, Express, TypeScript, MongoDB, and Mongoose.

## Features

* Create Transactions
* Fetch Transactions
* Delete Transactions
* Search Transactions
* Filter by Transaction Type
* MongoDB Integration
* REST API Architecture
* TypeScript Support
* Environment Variable Configuration

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* RxJS
* dotenv

## API Endpoints

### Get Transactions

```http
GET /api/transactions
```

### Create Transaction

```http
POST /api/transactions
```

### Delete Transaction

```http
DELETE /api/transactions/:id
```

## Installation

```bash
git clone <repo-url>

cd ai-finance-api

npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string
```

## Run Project

```bash
npm run dev
```

## Project Structure

```bash
src/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── app.ts
```

## Future Improvements

* JWT Authentication
* User Accounts
* Budget Management
* Analytics APIs
* AI Financial Insights
* Recurring Transactions
* Pagination
* Sorting

## Author

Ikshit Mathur
