import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTempratureUnitContext from "../Context/CurrentTempratureUnitContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTempratureUnit } = useContext(
    CurrentTempratureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${currentTempratureUnit === "F" ? "toggle-switch__text_color_white" : ""}`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${currentTempratureUnit === "C" ? "toggle-switch__text_color_white" : ""}`}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
