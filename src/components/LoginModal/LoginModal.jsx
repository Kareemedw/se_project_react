import { NavLink } from "react-router-dom";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import logo from "../../assets/logo.svg";
import "../Header/Header.css";

const LoginModal = ({
  isOpen,
  onClose,
  handleLogin,
  showPassword,
  setShowPassword,
  onRegisterClick,
}) => {
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
    console.log("Login form data:", data);

    handleLogin(data);
  };

  return (
    <ModalWithForm
      name="login"
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p className="login__welcome">Please login</p>
      <label className="modal__label-user" htmlFor="email">
        Email:
        <input
          className="modal__input"
          id="email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label-user" htmlFor="password">
        Password:
        <input
          className="modal__input"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <button
        className="show__password-btn modal__submit_btn-password"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide Password" : "Show Password"}
      </button>
      <button
        type="button"
        className="modal__secondary-button"
        onClick={onRegisterClick}
      >
        or Sign up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
