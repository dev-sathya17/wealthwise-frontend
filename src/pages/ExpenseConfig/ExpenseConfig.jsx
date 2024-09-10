import { useLoaderData, useNavigate } from "react-router-dom";
import "./ExpenseConfig.css";
import { useState } from "react";
import { getExpenseIcon } from "../../components/Icons/Icons";
import expenseConfigService from "../../services/expense.config.service";
const ExpenseConfig = () => {
  const { data } = useLoaderData();
  const [categories, setCategories] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (categories.includes(id)) {
      const newCategories = categories.filter((categoryId) => {
        return categoryId !== id;
      });
      const index = categories.indexOf(id);
      const newAmounts = amounts.filter((_, i) => i !== index);
      setAmounts(newAmounts);
      setCategories(newCategories);
    } else {
      const amount = prompt("Enter an amount to allocate as budget?");
      if (amount) {
        setAmounts([...amounts, Number(amount)]);
        setCategories([...categories, id]);
      }
    }
  };

  const handleAddConfig = () => {
    expenseConfigService
      .initializeExpenseConfig({
        categories,
        amounts,
      })
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          navigate("/user/dashboard");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  return (
    <div className="expense-config-wrapper">
      <h1 className="expense-config-title">Configure Your Expense</h1>
      <div className="expense-config-container">
        {data.categories.map((item, index) => {
          return (
            <div
              key={index}
              className={`config-card ${
                categories.includes(item.expenseCategoryId) ? "selected" : ""
              }`}
              onClick={() => handleClick(item.expenseCategoryId)}
            >
              <div className="icon-wrapper">
                <p>{getExpenseIcon(item.name.toLowerCase())}</p>
              </div>
              <h3 className="config-card-title">{item.name}</h3>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button className="next-btn" onClick={handleAddConfig}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ExpenseConfig;
