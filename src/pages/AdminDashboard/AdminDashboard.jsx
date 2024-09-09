import { useLoaderData } from "react-router-dom";
import "./AdminDashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { FaSearch, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getIncomeIcon, getExpenseIcon } from "../../components/Icons/Icons";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import adminService from "../../services/admin.service";

const AdminDashboard = () => {
  const { role } = useLoaderData();
  const [data, setData] = useState([]);
  const [users, setUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    adminService
      .getTransactionReport()
      .then((response) => {
        setData([...response.incomes, ...response.expenses]);
        setTotalIncome(response.totalIncome);
        setTotalExpenses(response.totalExpense);
      })
      .catch((error) => {
        console.error(error);
      });
    adminService
      .getTotalUsers()
      .then((response) => {
        setUsers(response.totalUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortBy(sortBy === "date-asc" ? "date-desc" : "date-asc");
  };

  const filterData = (items) =>
    items.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortData = (items) =>
    items.sort((a, b) => {
      const dateA = new Date(a.creditDate || a.debitDate);
      const dateB = new Date(b.creditDate || b.debitDate);
      return sortBy === "date-asc" ? dateA - dateB : dateB - dateA;
    });

  const filteredData = filterData(data);
  const sortedData = sortData(filteredData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar role={role} />
      <div className="table-container">
        <div className="table-header">
          <div className="adm-pills">
            <div className="adm-pill">
              <FaUsers className="total-user-icon" />
              <h3>{users}</h3>
            </div>
            <div className="adm-pill">
              <GoArrowDownLeft className="income-icon" />
              <h3>Rs. {totalIncome}</h3>
            </div>
            <div className="adm-pill">
              <GoArrowUpRight className="expense-icon" />
              <h3>Rs. {totalExpenses}</h3>
            </div>
          </div>
          <div className="adm-search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="adm-input"
            />
            <FaSearch className="adm-search-icon" />
          </div>
          <button onClick={handleSort} className="adm-sort-button">
            {sortBy === "date-asc"
              ? "Sort by Date (Descending)"
              : "Sort by Date (Ascending)"}
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>User&apos;s Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Recurring</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const isIncome = !!item.creditDate;
              const date = isIncome ? item.creditDate : item.debitDate;
              const category = isIncome
                ? item.IncomeConfig.IncomeCategory.name
                : item.ExpenseConfig.ExpenseCategory.name;
              const icon = isIncome
                ? getIncomeIcon(
                    item.IncomeConfig.IncomeCategory.name.toLowerCase()
                  )
                : getExpenseIcon(
                    item.ExpenseConfig.ExpenseCategory.name.toLowerCase()
                  );
              const directionIcon = isIncome ? (
                <GoArrowDownLeft className="income-icon" />
              ) : (
                <GoArrowUpRight className="expense-icon" />
              );

              return (
                <tr key={index}>
                  <td>
                    {isIncome
                      ? item.IncomeConfig.User.name
                      : item.ExpenseConfig.User.name}
                  </td>
                  <td>{directionIcon}</td>
                  <td className="table-cell">
                    <span className="category-icon">{icon}</span>
                    {category}
                  </td>
                  <td>Rs. {item.amount}</td>
                  <td>{item.description}</td>
                  <td>{new Date(date).toLocaleDateString()}</td>
                  <td>{item.isRecurring ? <TbRepeat /> : <TbRepeatOff />}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
