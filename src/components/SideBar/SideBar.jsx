import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../utils/Context/CurrentUserContext";
import { removeToken } from "../../utils/token";
import "./SideBar.css";

function SideBar() {
  const { username, setIsLoggedIn } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const signOut = () => {
    removeToken();
    navigate("/login");
    console.log("setIsLoggedIn type:", typeof setIsLoggedIn);
    setIsLoggedIn(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">{username}</p>
      </div>
      <ul>
        <li className="sidebar__link">
          <button onClick={signOut} className="sidebar__link sidebar__button">
            Sign Out
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
