import {
  FaCarrot,
  FaDollarSign,
  FaHouseUser,
  FaPlane,
  FaUtensils,
} from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { FaBoltLightning, FaHouse } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { MdHealthAndSafety, MdWork } from "react-icons/md";
import { AiFillBank } from "react-icons/ai";
import { RiStockFill } from "react-icons/ri";
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import "./Icons.css";
const incomeCategories = {
  pension: <GiTakeMyMoney className="pension inc-icon" />,
  investments: <RiStockFill className="investments inc-icon" />,
  freelance: <FaDollarSign className="freelance inc-icon" />,
  salary: <MdWork className="salary inc-icon" />,
  rental: <FaHouseUser className="rental inc-icon" />,
  royalties: <GiReceiveMoney className="royalties inc-icon" />,
};

const expenseCategories = {
  health: <MdHealthAndSafety className="health exp-icon" />,
  food: <FaUtensils className="food exp-icon" />,
  entertainment: <BiMoviePlay className="entertainment exp-icon" />,
  travel: <FaPlane className="travel exp-icon" />,
  debts: <AiFillBank className="debts exp-icon" />,
  groceries: <FaCarrot className="groceries exp-icon" />,
  education: <IoSchool className="education exp-icon" />,
  rent: <FaHouse className="rent exp-icon" />,
  electricity: <FaBoltLightning className="electricity exp-icon" />,
};

export const getExpenseIcon = (category) => {
  switch (category) {
    case "health":
      return expenseCategories.health;
    case "food":
      return expenseCategories.food;
    case "entertainment":
      return expenseCategories.entertainment;
    case "travel":
      return expenseCategories.travel;
    case "debts":
      return expenseCategories.debts;
    case "groceries":
      return expenseCategories.groceries;
    case "education":
      return expenseCategories.education;
    case "rent":
      return expenseCategories.rent;
    case "electricity":
      return expenseCategories.electricity;
    default:
      return null;
  }
};

export const getIncomeIcon = (category) => {
  switch (category) {
    case "pension":
      return incomeCategories.pension;
    case "investments":
      return incomeCategories.investments;
    case "freelance":
      return incomeCategories.freelance;
    case "salary":
      return incomeCategories.salary;
    case "rental":
      return incomeCategories.rental;
    case "royalties":
      return incomeCategories.royalties;
    default:
      return null;
  }
};
