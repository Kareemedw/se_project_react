import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../utils/Context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems?.filter((item) => {
    const ownerId =
      typeof item?.owner === "object" ? item.owner?._id : item.owner;

    return String(ownerId) === String(currentUser?._id);
  });

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {userItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
