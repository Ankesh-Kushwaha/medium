import React, { useState, useRef } from "react";

const CreateAppBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-full flex justify-between items-center px-8 py-3 border-b border-gray-200 shadow-sm bg-white">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800 cursor-pointer">
        ShareYourThought
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-semibold cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          A
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-12 mt-2 w-40 bg-white rounded shadow-lg border border-gray-200 z-50">
            <button
              onClick={() => {
                setDropdownOpen(false); // close dropdown on click
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAppBar;
