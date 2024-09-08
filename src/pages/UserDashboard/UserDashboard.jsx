import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./UserDashboard.css";
import { useEffect, useState } from "react";
import userServices from "../../services/user.service";
import incomeService from "../../services/income.service";
import expenseService from "../../services/expense.service";
import PieChartComponent from "../../components/pie chart/PieChartComponent";
import BarChartComponent from "../../components/bar chart/BarChart";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

const UserDashboard = () => {
  const { role } = useLoaderData();
  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [incomePerMonth, setIncomePerMonth] = useState([]);
  const [expensePerMonth, setExpensePerMonth] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    userServices
      .getTotalIncomeExpense()
      .then(({ totalIncome, status, totalExpense }) => {
        if (status === 200) {
          setIncome(totalIncome);
          setExpense(totalExpense);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
    userServices
      .getTotalIncomeExpenseByCategory()
      .then(({ incomeData, status, expenseData }) => {
        if (status === 200) {
          console.log(incomeData, expenseData);
          setIncomeByCategory(incomeData);
          setExpenseByCategory(expenseData);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
    incomeService
      .getIncomePerMonth()
      .then(({ data, status }) => {
        if (status === 200) {
          setIncomePerMonth(data);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
    expenseService
      .getExpensePerMonth()
      .then(({ data, status }) => {
        if (status === 200) {
          setExpensePerMonth(data);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  }, []);

  return (
    <>
      <Navbar role={role} />
      <main className="usr-dashboard">
        <section className="usr-dashboard-row">
          <div className="usr-dashboard-cell">
            <p className="usr-dashboard-title">Income By Category</p>
            {incomeByCategory && incomeByCategory.length > 0 ? (
              <PieChartComponent data={incomeByCategory} />
            ) : (
              <h3>There are no income.</h3>
            )}
          </div>

          <div className="usr-dashboard-cell usr-bar-graph">
            <p className="usr-dashboard-title">Income per month</p>
            {incomePerMonth && incomePerMonth.length > 0 ? (
              <BarChartComponent data={incomePerMonth} />
            ) : (
              <h3>No incomes added.</h3>
            )}
          </div>
          <div className="usr-dashboard-cell">
            <p className="usr-dashboard-title">Expenses By Category</p>
            {expenseByCategory && expenseByCategory.length > 0 ? (
              <PieChartComponent data={expenseByCategory} />
            ) : (
              <h3>There are no expenses.</h3>
            )}
          </div>
        </section>
        <section className="usr-dashboard-row">
          <div className="usr-dashboard-cell usr-bar-graph">
            <p className="usr-dashboard-title">Expenses per month</p>
            {expensePerMonth && expensePerMonth.length > 0 ? (
              <BarChartComponent data={expensePerMonth} />
            ) : (
              <h3>No expenses added.</h3>
            )}
          </div>

          <div className="usr-dashboard-cell">
            <div className="usr-cell">
              <p className="usr-dashboard-title">Total Income:</p>
              <GoArrowDownLeft className="income-icon" />
            </div>
            <h1 className="usr-dashboard-value">{income}</h1>
          </div>
          <div className="usr-dashboard-cell">
            <div className="usr-cell">
              <p className="usr-dashboard-title">Total Expense:</p>
              <GoArrowUpRight className="expense-icon" />
            </div>
            <h1 className="usr-dashboard-value">{expense}</h1>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserDashboard;
