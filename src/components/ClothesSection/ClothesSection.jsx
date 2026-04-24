import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
