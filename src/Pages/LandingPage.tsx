import React from "react";
import Header from "../Components/LandingPage/Header";
import AboutProduct from "../Components/LandingPage/AboutProduct";
import MarketContext from "../Components/LandingPage/MarketContext";
import Problems from "../Components/LandingPage/Problems";
import Footer from "../Components/LandingPage/Footer";
import Heading from "../Components/LandingPage/Heading";

const LandingPage: React.FC = () => {
  return (
    <div className="font-cabinet">
      <Heading />
      <main>
        <Header />
        <AboutProduct />
        <MarketContext />
        <Problems />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
