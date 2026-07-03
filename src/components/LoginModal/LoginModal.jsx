import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "./LoginModal.css";
import logo from "../../assets/logo.svg";
import "../Header/Header.css";

const LoginModal = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
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

    console.log("login:", data);
    handleLogin(data);
  };

  return (
    <>
      <header className="header">
        <div className="header__section-login">
          <img src={logo} alt="Weather Logo" className="header__logo" />
        </div>
      </header>
      <div className="login">
        <p className="login__welcome">Please login</p>
        <form action="" className="login__form" onSubmit={handleSubmit}>
          <label className="modal__label" htmlFor="email">
            Username:
          </label>
          <input
            className="modal__input"
            id="email"
            type="email"
            name="email"
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
          <button
            type="submit"
            className="login__submit_btn"
            aria-label="Submit"
          >
            Login
          </button>
        </form>
        <div className="login__signup">
          <p>Not a member yet?</p>
          <Link to="/register" className="signup__link">
            Sign up here
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
