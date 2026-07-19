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
          {clothingItems
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
