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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
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
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

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
          return auth.authorize({ email, password });
        })
        .then(({ token }) => {
          if (!token) {
            throw new Error("The server did not return a token");
          }

          localStorage.setItem("jwt", token);

          return api.getCurrentUser(token);
        })
        .then((user) => {
          setUserData(user);
          setIsLoggedIn(true);
          closeActiveModal();
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      console.error("Email or password is missing");
      return;
    }

    auth
      .authorize({ email, password })
      .then((data) => {
        if (!data.token) {
          throw new Error("The server did not return a token");
        }

        localStorage.setItem("jwt", data.token);

        return api.getCurrentUser(data.token);
      })
      .then((user) => {
        console.log("Current user response:", user);
        setUserData(user);
        setIsLoggedIn(true);

        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const request = isLiked
      ? api.removeCardLike(id, token)
      : api.addCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) =>
            item._id === updatedCard._id ? updatedCard : item,
          ),
        );
      })
      .catch(console.error);
  };

  const handleUpdateProfile = ({ username, avatar }) => {
    const token = getToken();

    api
      .updateUserProfile(
        {
          username,
          avatar,
        },
        token,
      )
      .then((updatedUser) => {
        setUserData(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
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
        value={{
          currentTemperatureUnit,
          handleToggleSwitchChange,
          ...userData,
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <div className="page">
          <div className="page__content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header
                      handleAddClick={handleAddClick}
                      weatherData={weatherData}
                      isLoggedIn={isLoggedIn}
                      onLoginClick={handleLoginClick}
                      onRegisterClick={handleRegisterClick}
                    />
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                    />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Header
                      handleAddClick={handleAddClick}
                      weatherData={weatherData}
                      isLoggedIn={isLoggedIn}
                    />
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                      onEditProfile={handleEditProfileClick}
                    />
                  </ProtectedRoute>
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
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateProfile={handleUpdateProfile}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            onRegisterClick={handleRegisterClick}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            onLoginClick={handleLoginClick}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
