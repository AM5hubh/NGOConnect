import React, { useContext, useEffect, useState } from "react";
// import axios from 'axios';
import CarouselComponent from "../CarouselComponent/CarouselComponent.jsx";
import { UserContext } from "../../../context/userContext.jsx";
import About from "../About/About.jsx";
import NGOcards from "../NGOcards/NGOcards.jsx";
import DonationDashboard from "../DonationDashboard/DonationDashboard.jsx";
import VolunteerDashboard from "../VolunteerDashboard/VolunteerDashboard.jsx";
import GoogleTranslate from "../GTranslate/GoogleTranslate.jsx";
import ScrollTop from "../ScrollToTop/ScrollTop.jsx";
import DonationForm from "../Donation/DonationForm/DonationForm.jsx";
import Events from "../Events/Events.jsx";
import EventCard from "../Events/EventCard.jsx";
import CreateEvent from "../Events/CreateEvent.jsx";

const Home = () => {
  // const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="">
      {/* <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to My Website</h1>
      </header> */}
      <CarouselComponent />
      <NGOcards />
      <div className="p-4 px-12 bg-blue-100">
        <About />
      </div>
      <DonationDashboard />
      <VolunteerDashboard />
      <ScrollTop />
      {/* <DonationForm /> */}
      <CreateEvent />
      {/* <EventCard /> */}
      <Events />
      {/* <GoogleTranslate /> */}
    </div>
  );
};

export default Home;
