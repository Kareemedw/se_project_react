import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "./RegistrationModal.css";
import logo from "../../assets/logo.svg";
import "../Header/Header.css";

const RegistrationModal = ({ handleRegistration }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegistration(data);
  };

  return (
    <>
      <header className="header">
        <div className="header__section-registration">
          <img src={logo} alt="Weather Logo" className="header__logo" />
        </div>
      </header>
      <div className="register">
        <p className="register__welcome">Please register</p>
        <form action="" className="register__form" onSubmit={handleSubmit}>
          <label className="modal__label" htmlFor="username">
            Username:
          </label>
          <input
            className="modal__input"
            id="username"
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="email">
            Email:
          </label>
          <input
            className="modal__input"
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="password">
            Password:
          </label>
          <input
            className="modal__input"
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className="modal__input"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="register__submit_btn"
            aria-label="Submit"
          >
            Signup
          </button>
        </form>
        <div className="register__signin">
          <p>Already a member?</p>
          <Link to="/login" className="register__login-link">
            Log in here
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegistrationModal;
