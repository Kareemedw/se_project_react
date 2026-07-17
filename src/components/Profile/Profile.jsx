import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleCardClick,
  handAddClick,
  onCardLike,
  isLoggedIn,
  onEditProfile,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} />
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
