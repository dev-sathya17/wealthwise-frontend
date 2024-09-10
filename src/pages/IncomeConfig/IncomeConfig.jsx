import { useLoaderData, useNavigate } from "react-router-dom";
import "./IncomeConfig.css";
import { getIncomeIcon } from "../../components/Icons/Icons";
import { useState } from "react";
import incomeConfigService from "../../services/income.config.service";

const IncomeConfig = () => {
  const { data } = useLoaderData();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (categories.includes(id)) {
      const newCategories = categories.filter(
        (categoryId) => categoryId !== id
      );
      setCategories(newCategories);
    } else {
      setCategories([...categories, id]);
    }
  };

  const handleAddConfig = () => {
    incomeConfigService
      .addIncomeConfig({
        isInitial: true,
        categories,
      })
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          navigate("/user/expense-config");
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
    <div className="income-config-wrapper">
      <h1 className="income-config-title">Configure Your Income</h1>
      <div className="income-config-container">
        {data.categories.map((item, index) => {
          return (
            <div
              key={index}
              className={`config-card ${
                categories.includes(item.incomeCategoryId) ? "selected" : ""
              }`}
              onClick={() => handleClick(item.incomeCategoryId)}
            >
              <div className="icon-wrapper">
                <p>{getIncomeIcon(item.name.toLowerCase())}</p>
              </div>
              <h3 className="config-card-title">{item.name}</h3>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button className="next-btn" onClick={handleAddConfig}>
          Proceed to Next
        </button>
      </div>
    </div>
  );
};

export default IncomeConfig;
