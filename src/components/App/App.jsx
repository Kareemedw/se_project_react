import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { APIkey, coordinates } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../utils/Context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ClothesSection from "../ClothesSection/ClothesSection";
import { addItem, getItems, removeItem } from "../../utils/api";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import LoginModal from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import { setToken, getToken } from "../../utils/token";
import ProtectedRoute from "./ProtectedRoute";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-item");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = (itemID) => {
    removeItem(itemID)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemID),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .register({ username, email, password })
        .then(() => {
          navigate("/login");
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return api.getCurrentUser(data.token);
      })
      .then((user) => {
        setUserData(user);
        setIsLoggedIn(true);

        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setIsCheckingToken(false);
      return;
    }

    api
      .getCurrentUser(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setUserData(user);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((items) => {
        setClothingItems([...items].reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const onEsc = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider
      value={{
        /* username: userData.username,
        email: userData.email,*/
        ...userData,
        setIsLoggedIn,
      }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Header
                      handleAddClick={handleAddClick}
                      weatherData={weatherData}
                    />
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Header
                      handleAddClick={handleAddClick}
                      weatherData={weatherData}
                    />
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                    <div className="loginContainer">
                      <LoginModal handleLogin={handleLogin} />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                    <div className="registerContainer">
                      <RegistrationModal
                        handleRegistration={handleRegistration}
                      />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </div>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />
          <DeleteModal
            isOpen={activeModal === "delete-item"}
            closeActiveModal={closeActiveModal}
            card={selectedCard}
            onDeleteItem={onDeleteItem}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
