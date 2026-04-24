import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, handleCardClick, handAddClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handAddClick}
      />
    </section>
  );
}

export default Profile;
