import React from "react";
import { Link } from 'react-router-dom';

const MainHeader: React.FC = () => { 
  return (
    <div className="w-full flex justify-between items-center px-8 py-3 border-b border-slate-900 shadow-sm bg-transparent backdrop-blur-sm">
      
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800 cursor-pointer">
          ShareYourThought
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 relative" >
        <Link to={'/signin'}>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium">
            Let! Share Your Thought
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
