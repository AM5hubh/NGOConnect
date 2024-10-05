import React, { useContext, useState } from "react";
// import axios from 'axios';
import CarouselComponent from "../CarouselComponent/CarouselComponent.jsx";
import { UserContext } from "../../../context/userContext.jsx";
import About from "../About/About.jsx";

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className=" bg-[#f3f2f3]">
      {/* <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to My Website</h1>
      </header> */}
      <main className=" px-10">
        <CarouselComponent />
        
      </main>
      <div className="p-4 px-10 mt-8 bg-[#e0dce0]">
          <About />
        </div>
    </div>
  );
};

export default Home;
