import "./ItemModal.css";
import whiteCloseBtn from "../../assets/closeButton.svg";
import DeleteModal from "../DeleteModal/DeleteModal";

function ItemModal({ isOpen, closeActiveModal, card, onDeleteClick }) {
  return (
    <div className={`modal ${isOpen ? "modal_is_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close modal__close_whte-btn"
        >
          <img src={whiteCloseBtn} alt="X-Icon" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={onDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
