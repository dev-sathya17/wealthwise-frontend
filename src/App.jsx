import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register/Register";
import LoginPage from "./pages/login/LoginPage";
import ForgotPassword from "./pages/forgot password/ForgotPassword";
import ResetPassword from "./pages/forgot password/ResetPassword";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import userLoader from "./loaders/user.loader";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import "./App.css";
import Categories from "./pages/Categories/Categories";
import adminLoader from "./loaders/admin.loader";
import incomesLoader from "./loaders/incomes.loader";
import expensesLoader from "./loaders/expenses.loader";
import Incomes from "./pages/Incomes/Incomes";
import Expenses from "./pages/Expenses/Expenses";
import Settings from "./pages/Settings/Settings";
import IncomeConfig from "./pages/IncomeConfig/IncomeConfig";
import incomeCategoriesLoader from "./loaders/incomes.categories.loader";
import ExpenseConfig from "./pages/ExpenseConfig/ExpenseConfig";
import expenseCategoriesLoader from "./loaders/expense.categories.loader";

const router = createBrowserRouter([
  {
    path: "/",
    loader: userLoader.checkAuth,
    element: <AuthenticatedRoute />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
      {
        path: "reset",
        element: <ResetPassword />,
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        loader: userLoader.checkAuth,
        children: [
          {
            path: "",
            element: <Profile />,
            loader: userLoader.fetchUser,
          },
        ],
      },
      {
        path: "user",
        element: <ProtectedRoute />,
        loader: userLoader.checkAuth,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
            loader: userLoader.checkAuth,
          },
          {
            path: "incomes",
            element: <Incomes />,
            loader: incomesLoader.fetchIncomes,
          },
          {
            path: "expenses",
            element: <Expenses />,
            loader: expensesLoader.fetchExpenses,
          },
          {
            path: "settings",
            element: <Settings />,
            loader: userLoader.getUserSettings,
          },
          {
            path: "income-config",
            element: <IncomeConfig />,
            loader: incomeCategoriesLoader.fetchAllCategories,
          },
          {
            path: "expense-config",
            element: <ExpenseConfig />,
            loader: expenseCategoriesLoader.fetchAllCategories,
          },
        ],
      },
      {
        path: "admin",
        element: <ProtectedRoute />,
        loader: userLoader.checkAuth,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
            loader: userLoader.checkAuth,
          },
          {
            path: "users",
            element: <Users />,
            loader: adminLoader.fetchAllUsers,
          },
          {
            path: "categories",
            element: <Categories />,
            loader: adminLoader.fetchCategories,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
