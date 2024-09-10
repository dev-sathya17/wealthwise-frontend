import { useState } from "react";
import { Switch } from "@mui/material";
import "./Settings.css"; // Import the custom CSS file
import Navbar from "../../components/Navbar/Navbar";
import { useLoaderData } from "react-router-dom";
import incomeConfigService from "../../services/income.config.service";
import expenseConfigService from "../../services/expense.config.service";

const Settings = () => {
  const { data } = useLoaderData();
  const [settings, setSettings] = useState(data);

  const handleSwitchChange = (type, categoryId, prevActiveState, configId) => {
    if (!prevActiveState) {
      // Add config
      if (type === "income") {
        incomeConfigService
          .addIncomeConfig({
            categories: [categoryId],
          })
          .then((response) => {
            if (response.status === 201) {
              alert(response.data.message);
              setSettings((prevSettings) => ({
                ...prevSettings,
                [type]: prevSettings[type].map((item) =>
                  item.categoryId === categoryId
                    ? { ...item, isActive: !item.isActive }
                    : item
                ),
              }));
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        const amount = prompt("Enter amount to be allotted for budget:");
        if (amount) {
          expenseConfigService
            .addExpenseConfig({
              categories: [categoryId],
              amount,
            })
            .then((response) => {
              if (response.status === 201) {
                alert(response.data.message);
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  [type]: prevSettings[type].map((item) =>
                    item.categoryId === categoryId
                      ? { ...item, isActive: !item.isActive }
                      : item
                  ),
                }));
              } else {
                alert(response.data.message);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    } else {
      // Delete config
      if (type === "income") {
        incomeConfigService
          .deleteIncomeConfig(configId)
          .then((response) => {
            if (response.status === 200) {
              alert(response.data.message);
              setSettings((prevSettings) => ({
                ...prevSettings,
                [type]: prevSettings[type].map((item) =>
                  item.categoryId === categoryId
                    ? { ...item, isActive: !item.isActive }
                    : item
                ),
              }));
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        expenseConfigService
          .deleteExpenseConfig(configId)
          .then((response) => {
            if (response.status === 200) {
              alert(response.data.message);
              setSettings((prevSettings) => ({
                ...prevSettings,
                [type]: prevSettings[type].map((item) =>
                  item.categoryId === categoryId
                    ? { ...item, isActive: !item.isActive }
                    : item
                ),
              }));
            } else {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return (
    <>
      <Navbar role={"user"} active={"settings"} />
      <div className="settings-container">
        <div className="settings-section">
          <h2>Income Categories</h2>
          <div className="settings-list">
            {settings.income.map((income) => (
              <div className="settings-item" key={income.categoryId}>
                <span>{income.name}</span>
                <Switch
                  checked={income.isActive}
                  onChange={() =>
                    handleSwitchChange(
                      "income",
                      income.categoryId,
                      income.isActive,
                      income.incomeConfigId
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h2>Expense Categories</h2>
          <div className="settings-list">
            {settings.expense.map((expense) => (
              <div className="settings-item" key={expense.categoryId}>
                <span>{expense.name}</span>
                <Switch
                  checked={expense.isActive}
                  onChange={() =>
                    handleSwitchChange(
                      "expense",
                      expense.categoryId,
                      expense.isActive,
                      expense.expenseConfigId
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
