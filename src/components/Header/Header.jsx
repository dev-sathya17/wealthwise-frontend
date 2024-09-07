import "./Header.css";
import icon from "../../assets/icon.png";

const Header = () => {
  return (
    <header className="header">
      <img src={icon} alt="Wealth Wise Logo" className="logo" />
      <h1 className="title">Wealth Wise</h1>
    </header>
  );
};

export default Header;
