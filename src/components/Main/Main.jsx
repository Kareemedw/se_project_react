import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import CurrentTempratureUnitContext from "../Context/CurrentTempratureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempratureUnit } = useContext(CurrentTempratureUnitContext);
  console.log("Type of clothingItems:", typeof clothingItems, clothingItems);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTempratureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          &deg; {currentTempratureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
