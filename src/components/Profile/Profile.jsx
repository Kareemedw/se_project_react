import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleCardClick,
  handAddClick,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handAddClick}
        onCardClick={handleCardClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
}

export default Profile;
