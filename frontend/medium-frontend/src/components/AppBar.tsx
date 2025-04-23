import React, { useState, useRef, useEffect } from "react";
import {Link} from 'react-router-dom'

const AppBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-full flex justify-between items-center px-8 py-3 border-b border-gray-200 shadow-sm bg-white">
      
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800 cursor-pointer">ShareYourThought</div>


      {/* Right Actions */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <Link to={'/writeblog'}>
             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium">
          Write
        </button>
        </Link>
     
         <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium">
          Publish
        </button>
         <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium">
          Update
        </button>

        {/* Avatar */}
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-semibold cursor-pointer"
        >
          A
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-12 mt-2 w-40 bg-white rounded shadow-lg border border-gray-200 z-50">
            <button
              onClick={handleLogout}
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

export default AppBar;
