import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  name = "add-garment",
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is_opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="X-Icon" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            type="submit"
            className="modal__submit_btn"
            aria-label="Submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
