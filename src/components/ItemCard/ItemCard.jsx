import { useContext } from "react";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";
import heart from "../../assets/heart.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const handleCardClick = () => {
    if (typeof onCardClick === "function") {
      onCardClick(item);
    }
  };

  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((like) => {
    const likeId = typeof like === "object" ? like?._id : like;

    return String(likeId) === String(currentUser?._id);
  });

  const handleLike = (evt) => {
    evt.stopPropagation();

    onCardLike({
      id: item._id,
      isLiked,
    });
  };

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__name">{item.name}</h2>
        <button
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_active" : ""
          }`}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike item" : "Like item"}
        ></button>
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
