import { useState } from "react";
import { FaPencilAlt, FaTrash, FaSave, FaSearch } from "react-icons/fa";
import "./Categories.css";
import Navbar from "../../components/Navbar/Navbar";
import { useLoaderData } from "react-router-dom";
import { getIncomeIcon, getExpenseIcon } from "../../components/Icons/Icons";
import incomeCategoryService from "../../services/income.categories.service";
import expenseCategoryService from "../../services/expense.categories.service";
const Categories = () => {
  const { income, expense } = useLoaderData();
  const mergedCategories = [
    ...income.map((cat) => ({ ...cat, type: "income" })),
    ...expense.map((cat) => ({ ...cat, type: "expense" })),
  ];

  const [categories, setCategories] = useState(mergedCategories);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const handleDelete = (id, type, name) => {
    // setCategories((prevCategories) =>
    //   prevCategories.filter(
    //     (cat) => cat.incomeCategoryId !== id && cat.expenseCategoryId !== id
    //   )
    // );
    const choice = confirm(
      `Are you sure you want to delete '${name}' Category?`
    );
    if (choice) {
      if (type === "income") {
        incomeCategoryService
          .deleteIncomeCategory(id)
          .then((response) => {
            if (response.status === 200) {
              alert(response.data.message);
              setCategories((prevCategories) =>
                prevCategories.filter((cat) => cat.incomeCategoryId !== id)
              );
            }
          })
          .catch((error) => {
            console.error(error);
            alert(error.message);
          });
      } else {
        expenseCategoryService
          .deleteExpenseCategory(id)
          .then((response) => {
            if (response.status === 200) {
              alert(response.data.message);
              setCategories((prevCategories) =>
                prevCategories.filter((cat) => cat.expenseCategoryId !== id)
              );
            }
          })
          .catch((error) => {
            console.error(error);
            alert(error.message);
          });
      }
    }
  };

  const getCategoryIcon = (name, type) => {
    return type === "income"
      ? getIncomeIcon(name.toLowerCase())
      : getExpenseIcon(name.toLowerCase());
  };

  return (
    <>
      <Navbar role={"admin"} active={"cat"} />
      <div className="cat-container">
        <div className="cat-search-bar">
          <input
            type="text"
            placeholder="Search categories..."
            onChange={handleSearch}
            className="cat-search-input"
          />
          <FaSearch className="cat-search-icon" />
        </div>

        <div className="cat-categories">
          {categories
            .filter((cat) => cat.name.toLowerCase().includes(searchTerm))
            .map(({ incomeCategoryId, expenseCategoryId, name, type }) => (
              <div
                key={incomeCategoryId || expenseCategoryId}
                className="cat-category-card"
              >
                <div className="cat-card-content">
                  {getCategoryIcon(name, type)}
                  <p className="cat-card-name">{name}</p>
                </div>
                <div className="cat-card-actions">
                  <FaTrash
                    onClick={() =>
                      handleDelete(
                        incomeCategoryId || expenseCategoryId,
                        type,
                        name
                      )
                    }
                    className="cat-action-icon"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
