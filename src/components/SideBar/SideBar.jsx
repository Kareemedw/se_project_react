import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">{username}</p>
      </div>
    </aside>
  );
}

export default SideBar;
