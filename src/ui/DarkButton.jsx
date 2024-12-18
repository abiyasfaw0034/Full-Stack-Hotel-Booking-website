import { useState } from "react";
import { useTheme } from "../context/themeContext/themeContext";

const DarkButton = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOn, setIsOn] = useState(isDarkMode);

  const handleToggle = () => {
    setIsOn(!isOn);
    toggleDarkMode();
  };

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={handleToggle}
        className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
          isOn ? "bg-gray-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-8" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="ml-4 text-lg">{isOn ? "ON" : "OFF"}</span>
    </div>
  );
};

export default DarkButton;
