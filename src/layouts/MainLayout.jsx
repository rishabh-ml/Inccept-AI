import React from "react";
import Squares from "../components/Squares";

const MainLayout = ({ children }) => {
  return (
    <div className="relative w-full h-screen bg-black">
  {/* Squares background */}
  <Squares 
    speed={0.3} 
    direction="diagonal" 
    borderColor="rgba(255, 255, 255, 0.1)" 
    hoverFillColor="rgba(255, 255, 255, 0.3)" 
  />

  {/* Black fade overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-10"></div>
  <div className="absolute inset-0 bg-gradient-radial from-white/20 to-black opacity-50 z-10"></div>


  {/* Content over the background */}
  <div className="relative z-20 flex items-center justify-center h-full text-white">
    {children}
  </div>
</div>

  );
};

export default MainLayout;
