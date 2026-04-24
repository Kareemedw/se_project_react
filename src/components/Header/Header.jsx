import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Tegegne";

  return (
    <header className="header">
      <div className="header__section1">
        <NavLink className="header__nav-link" to="/">
          <img src={logo} alt="Weather Logo" className="header__logo" />
        </NavLink>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__section2">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">{username}</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
