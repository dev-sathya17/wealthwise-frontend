import { useLoaderData } from "react-router-dom";
import "./Expenses.css";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import expenseConfigService from "../../services/expense.config.service";
import { Switch } from "@mui/material";
import expenseService from "../../services/expense.service";
const Expenses = () => {
  const { data } = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenses, setExpenses] = useState(data);
  const [editExpense, setEditExpense] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    debitDate: "",
    isRecurring: false,
    categoryId: "",
  });

  useEffect(() => {
    expenseConfigService
      .getExpenseConfig()
      .then((response) => {
        const data = response.map((item) => item.ExpenseCategory);
        setExpenseCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditExpense({ ...editExpense, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategory = expenseCategories.find(
      (category) => category.name === selectedCategoryName
    );

    if (selectedCategory) {
      setFormData({
        ...formData,
        categoryId: selectedCategory.expenseCategoryId,
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filteredData = data.filter((item) =>
      item.description.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setExpenses(filteredData);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);

    const filteredData = expenses.filter((item) =>
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
      const dateA = new Date(a.debitDate);
      const dateB = new Date(b.debitDate);
      return sortOrder === "asc" ? dateB - dateA : dateA - dateB;
    });

    setExpenses(sortedData);
  };

  const toggleModal = () => {
    if (editModal) {
      setEditModal(false);
    } else {
      setShowModal(!showModal);
    }
  };

  const addExpense = () => {
    expenseService
      .addExpense(formData)
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          setExpenses([...expenses, response.data.expense]);
          setFormData({
            description: "",
            amount: "",
            debitDate: "",
            isRecurring: false,
            categoryId: "",
          });
          setShowModal(false);
        } else {
          alert(response);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };

  const handleEditExpense = () => {
    expenseService
      .updateExpense(editExpense.expenseId, editExpense)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          const updatedExpenses = expenses.map((expense) =>
            expense.expenseId === editExpense.expenseId ? editExpense : expense
          );
          setExpenses(updatedExpenses);
          setEditModal(false);
          setEditExpense(null);
        } else {
          alert(data);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const deleteExpense = (id) => {
    expenseService
      .deleteExpense(id)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          const filteredData = expenses.filter((item) => item.expenseId !== id);
          setExpenses(filteredData);
        } else {
          alert(response);
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };

  const handleSwitchChange = (e) => {
    if (editModal) {
      setEditExpense({ ...editExpense, isRecurring: e.target.checked });
    } else {
      setFormData({ ...formData, isRecurring: e.target.checked });
    }
  };

  const handleEdit = (expense) => {
    setEditExpense(expense);
    setEditModal(true);
  };

  return (
    <div className="expenses-wrapper">
      <Navbar active={"expense"} role={"user"} />
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search expense..."
          className="exp-search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />

        <select
          className="sort-select"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Sort by Date (Asc)</option>
          <option value="desc">Sort by Date (Desc)</option>
        </select>

        <button className="add-expense-btn" onClick={toggleModal}>
          Add New Expense
        </button>
      </div>
      <div className="cards-container">
        {expenses.map((item, index) => (
          <Card
            data={item}
            key={index}
            type={"expense"}
            handleDelete={deleteExpense}
            handleEdit={handleEdit}
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Expense</h2>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
            <label>
              Amount:
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
            <label>
              Debit Date:
              <input
                type="date"
                name="debitDate"
                value={formData.debitDate}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
            <label>
              Category:
              <input
                list="expense-category-list"
                name="expenseCategory"
                onChange={handleCategoryChange}
                className="modal-input"
              />
            </label>
            <datalist id="expense-category-list">
              {expenseCategories.map((category) => (
                <option key={category.categoryId} value={category.name} />
              ))}
            </datalist>
            <label>
              Is it a Recurring expense?
              <Switch
                checked={formData.isRecurring}
                onChange={handleSwitchChange}
                className="switch"
              />
            </label>
            <div className="modal-actions">
              <button className="save-btn" onClick={addExpense}>
                Save
              </button>
              <button className="close-btn" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {editModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Expense</h2>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editExpense.description}
                onChange={handleEditChange}
                className="modal-input"
              />
            </label>
            <label>
              Amount:
              <input
                type="text"
                name="amount"
                value={editExpense.amount}
                onChange={handleEditChange}
                className="modal-input"
              />
            </label>
            <label>
              Debit Date:
              <input
                type="date"
                name="debitDate"
                value={editExpense.debitDate}
                onChange={handleEditChange}
                className="modal-input"
              />
            </label>
            <label>
              Is it a Recurring expense?
              <Switch
                checked={editExpense.isRecurring}
                onChange={handleSwitchChange}
                className="switch"
              />
            </label>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleEditExpense}>
                Save
              </button>
              <button className="close-btn" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
