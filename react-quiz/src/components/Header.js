import React from "react";
import { Link } from 'react-router-dom';
const Header = ({ score, title }) => {
  return (

      <div className="flex justify-around w-screen bg-black text-white mb-10 py-4">
        <h1 className="text-3xl uppercase">{title}</h1>
      <h1 className="text-3xl">Score : {score}</h1>
      <Link to="/form" className="bg-green-600 text-white text-2xl px-4 rounded-md">Add +</Link>
      </div>
  
  );
};

export default Header;
