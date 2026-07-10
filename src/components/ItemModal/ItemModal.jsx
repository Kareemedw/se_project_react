import { useContext } from "react";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";
import "./ItemModal.css";
import whiteCloseBtn from "../../assets/closeButton.svg";
import DeleteModal from "../DeleteModal/DeleteModal";

function ItemModal({ isOpen, closeActiveModal, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) {
    return null;
  }

  const ownerId = typeof card.owner === "object" ? card.owner?._id : card.owner;

  const isOwn = String(ownerId) === String(currentUser?._id);

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
          {isOwn && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={() => onDeleteClick(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
