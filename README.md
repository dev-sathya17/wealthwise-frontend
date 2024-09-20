# Wealth wise Frontend

## Project Overview

Wealthwise is a personalized finance management application that allows users to manage their income and expenses. Users can configure categories that suit their financial habits, allocate budgets, and track their transactions. The application provides insightful analytics via a dashboard, displaying graphs and charts based on the user's financial data. An admin panel offers a complete paginated report of all transactions with search and sort functionalities. Wealthwise also includes automated notifications to remind users of recurring monthly incomes or expenses through email.

---

## Features

### 1. **User Authentication and Authorization**

- Users can sign in and manage their personal finance data.
- Roles: Admin and User. Admin has privileges to view and manage reports, while users can manage their personal income and expenses.
- JSON Web Tokens (JWT) are used for secure user sessions.

### 2. **Income and Expense Management**

- Users can add incomes and expenses categorized by pre-configured categories.
- Users can configure income and expense categories upon login and modify them later in their settings page.
- Budgets can be set for categories, and users receive notifications when budgets are exceeded.

### 3. **Recurring Notifications**

- Automated emails notify users about recurring monthly incomes or expenses.
- Jobs run via `node-cron` to send reminders based on set schedules.

### 4. **Analytics Dashboard**

- Users can view a personalized dashboard with graphs and charts showcasing income, expense trends, and budget usage.
- Insights into financial health are displayed via visual data.

### 5. **Admin Dashboard**

- The admin can view all user transactions in a paginated table with search and sort filters.
- Detailed financial reports help in decision-making and tracking.

### 6. **Redux State Management**

- The application state, including user data, tickets, and chat, is managed using Redux.
- Redux Persist is used to save the state in localStorage, ensuring the state is preserved across browser sessions.

---

## Dependencies

The project uses the following dependencies:

- `axios`: Promise-based HTTP client for API calls.
- `@reduxjs/toolkit`: Redux toolkit to manage state globally.
- `formik`: Form library for React.
- `react-icons`: Collection of popular icons.
- `react-router-dom`: Declarative routing for React.
- `yup`: Schema validation for forms.
- `recharts`: Library for building charts.
- `react-dotenv`: To declare and access environment variables in the application.
- `redux-persist`: To persist redux state after reloading.
- `@mui/material`: For switch component.

## Components

- **Navbar:** Top navigation bar.
- **Header:** A header which consists of the title and logo.
- **Pie Chart and Bar Graph:** Visualization components for data.
- **Card:** Card component to display the income and expense details.
- **Icons:** Export an icon based on the category

## Features

- **User:** Slice to manage user state using redux across application.

## Loaders

Functions that fetch data from various backend APIs for different routes, ensuring data is available when needed.

## Pages

Contains all the different pages that every route points to, providing a structured navigation flow.

## Routes

- **Protected Routes:** Ensure only authenticated users can access certain parts of the application.
- **Authenticated Routes:** Manage routes based on user authentication status.

## Services

Different services for API calls, split by category of entity. Also includes an `instance.js` file which exports two axios instances:

- **Protected Instance:** For authenticated API calls.
- **Normal Instance:** For unauthenticated API calls.

## Utils

To export all environment variables and provide it globally to the application.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm

### Installation

1. Pull the repository to your local machine.

```
git pull
```

2. To install all the dependencies:

```
npm install
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```

### Sample Admin Credentials for walkthorugh

```
email: vsvs2209@gmail.com
pass: Admin@123
```
