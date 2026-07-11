import { useContext } from "react";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems?.filter((item) => {
    const ownerId =
      typeof item?.owner === "object" ? item.owner?._id : item.owner;

    return String(ownerId) === String(currentUser?._id);
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
