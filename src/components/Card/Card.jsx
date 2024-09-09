import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { getExpenseIcon, getIncomeIcon } from "../Icons/Icons";
import "./Card.css";
import { MdAttachMoney } from "react-icons/md";
import { FaCalendar, FaRegEdit, FaTrash } from "react-icons/fa";
const Card = ({ data, type, handleDelete, handleEdit }) => {
  return (
    <div className="card">
      <div className="card-row">
        <p className="card-icon">
          {type === "income"
            ? getIncomeIcon(data.IncomeConfig.IncomeCategory.name.toLowerCase())
            : getExpenseIcon(
                data.ExpenseConfig.ExpenseCategory.name.toLowerCase()
              )}
        </p>
        <p className="card-text">{data.description}</p>
        <p>
          {data.isRecurring ? (
            <TbRepeat className="card-icon recurring" />
          ) : (
            <TbRepeatOff className="card-icon recurring" />
          )}
        </p>
      </div>
      <div className="card-row">
        <MdAttachMoney className="card-icon amount" />
        <p className="card-text">{data.amount}</p>
      </div>
      <div className="card-row">
        <FaCalendar className="card-icon" />
        <p className="card-text">
          {type === "income" ? data.creditDate : data.debitDate}
        </p>
      </div>
      <div className="card-row">
        <FaTrash
          className="card-delete-icon"
          onClick={
            type === "income"
              ? () => handleDelete(data.incomeId)
              : () => handleDelete(data.expenseId)
          }
        />
        <FaRegEdit
          className="card-edit-icon"
          onClick={() => handleEdit(data)}
        />
      </div>
    </div>
  );
};

export default Card;
