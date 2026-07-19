import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";
import { removeToken } from "../../utils/token";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { setIsLoggedIn } = currentUser;

  const navigate = useNavigate();

  const signOut = () => {
    removeToken();
    navigate("/login");
    console.log("setIsLoggedIn type:", typeof setIsLoggedIn);
    setIsLoggedIn(false);
  };

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
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>

            <NavLink to="/profile" className="header__nav-link">
              <p className="header__username">{currentUser.name}</p>

              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name?.[0]?.toUpperCase()}
                </div>
              )}
            </NavLink>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__auth-button"
              onClick={onRegisterClick}
            >
              Sign up
            </button>

            <button
              type="button"
              className="header__auth-button"
              onClick={onLoginClick}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
