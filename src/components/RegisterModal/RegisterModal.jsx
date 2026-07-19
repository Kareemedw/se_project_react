import { NavLink } from "react-router-dom";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import logo from "../../assets/logo.svg";
import "../Header/Header.css";

const RegisterModal = ({
  showPassword,
  setShowPassword,
  handleRegistration,
  onLoginClick,
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState({
    name: "",
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
    <ModalWithForm
      name="register"
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p className="register__welcome">Please register</p>
      <label className="modal__label-user " htmlFor="username">
        Username:
        <input
          className="modal__input"
          id="username"
          type="text"
          name="username"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label-user" htmlFor="email">
        Email:
        <input
          className="modal__input"
          id="email"
          name="email"
          type="email"
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
      <label className="modal__label-user" htmlFor="confirmPassword">
        Confirm Password:
        <input
          className="modal__input"
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={data.confirmPassword}
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
        className="modal__secondary-button modal__secondary-button_register"
        onClick={onLoginClick}
      >
        or Log in
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
