import { useLoaderData } from "react-router-dom";
import "./Incomes.css";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import incomeService from "../../services/income.service";
import incomeConfigService from "../../services/income.config.service";

const Incomes = () => {
  const { data } = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [incomes, setIncomes] = useState(data);
  const [editIncome, setEditIncome] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    creditDate: "",
    isRecurring: false,
    categoryId: "",
  });

  useEffect(() => {
    incomeConfigService
      .getIncomeConfig()
      .then((response) => {
        const data = response.map((item) => item.IncomeCategory);
        setIncomeCategories(data);
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
    setEditIncome({ ...editIncome, [name]: value });
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategory = incomeCategories.find(
      (category) => category.name === selectedCategoryName
    );

    if (selectedCategory) {
      setFormData({
        ...formData,
        categoryId: selectedCategory.incomeCategoryId,
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filteredData = data.filter((item) =>
      item.description.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setIncomes(filteredData);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);

    const filteredData = incomes.filter((item) =>
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
      const dateA = new Date(a.creditDate);
      const dateB = new Date(b.creditDate);
      return sortOrder === "asc" ? dateB - dateA : dateA - dateB;
    });

    setIncomes(sortedData);
  };

  const toggleModal = () => {
    if (editModal) {
      setEditModal(false);
    } else {
      setShowModal(!showModal);
    }
  };

  const addIncome = () => {
    incomeService
      .addIncome(formData)
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);

          setIncomes([...incomes, response.data.income]);
          setFormData({
            description: "",
            amount: "",
            creditDate: "",
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

  const handleEditIncome = () => {
    incomeService
      .updateIncome(editIncome.incomeId, editIncome)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          const updatedIncomes = incomes.map((income) =>
            income.incomeId === editIncome.incomeId ? editIncome : income
          );
          setIncomes(updatedIncomes);
          setEditModal(false);
          setEditIncome(null);
        } else {
          alert(data);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const deleteIncome = (id) => {
    incomeService
      .deleteIncome(id)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          const filteredData = incomes.filter((item) => item.incomeId !== id);
          setIncomes(filteredData);
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
      setEditIncome({ ...editIncome, isRecurring: e.target.checked });
    } else {
      setFormData({ ...formData, isRecurring: e.target.checked });
    }
  };

  const handleEdit = (income) => {
    setEditIncome(income);
    setEditModal(true);
  };

  return (
    <div className="income-wrapper">
      <Navbar active={"income"} role={"user"} />

      <div className="filters-container">
        <input
          type="text"
          placeholder="Search income..."
          className="inc-search-bar"
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

        <button className="add-income-btn" onClick={toggleModal}>
          Add New Income
        </button>
      </div>

      <div className="cards-container">
        {incomes.map((item, index) => (
          <Card
            data={item}
            key={index}
            type={"income"}
            handleDelete={deleteIncome}
            handleEdit={handleEdit}
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Income</h2>
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
              Credit Date:
              <input
                type="date"
                name="creditDate"
                value={formData.creditDate}
                onChange={handleChange}
                className="modal-input"
              />
            </label>
            <label>
              Category:
              <input
                list="income-category-list"
                name="incomeCategory"
                onChange={handleCategoryChange}
                className="modal-input"
              />
            </label>
            <datalist id="income-category-list">
              {incomeCategories.map((category) => (
                <option key={category.categoryId} value={category.name} />
              ))}
            </datalist>
            <label>
              Is it a Recurring income?
              <Switch
                checked={formData.isRecurring}
                onChange={handleSwitchChange}
                className="switch"
              />
            </label>
            <div className="modal-actions">
              <button className="save-btn" onClick={addIncome}>
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
            <h2>Edit Income</h2>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editIncome.description}
                onChange={handleEditChange}
                className="modal-input"
              />
            </label>
            <label>
              Amount:
              <input
                type="text"
                name="amount"
                value={editIncome.amount}
                onChange={handleEditChange}
                className="modal-input"
              />
            </label>
            <label>
              Credit Date:
              <input
                type="date"
                name="creditDate"
                value={editIncome.creditDate}
                onChange={handleEditChange}
                className="modal-input"
              />
            </label>
            <label>
              Is it a Recurring income?
              <Switch
                checked={editIncome.isRecurring}
                onChange={handleSwitchChange}
                className="switch"
              />
            </label>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleEditIncome}>
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

export default Incomes;
