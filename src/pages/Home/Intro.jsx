import React from "react";
import {useSelector} from "react-redux";

function Intro() {
  const {loading , portfolioData} = useSelector((state) => state.root)
  const {intro} = portfolioData;
  const {firstName, lastName, welcomeText, image, description, caption} = intro;
  
  return (
    <div className="h-4/5 bg-primary flex flex-col items-center gap-8 py-10">
      <h1 className="text-white">{welcomeText || ''}</h1>
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-5 sm:gap-3">
          <h1 className="text-7xl sm:text-4xl text-secondary font-semibold">{lastName || ''}</h1>
          <h1 className="text-7xl sm:text-4xl text-tertiary font-semibold">{firstName || ''}</h1>
        </div>
        <div className="flex justify-center w-fit">
          <img src={image} alt="Profile Image" className="w-1/3"/>
        </div>
      </div>
      <p className="text-white text-center w-2/3 sm:w-full">
        {description || ''}
      </p>
    </div>
  );
}

export default Intro;
