import React from "react";
import Market from "../../assets/market.png";

const MarketContext: React.FC = () => {
  return (
    <section className="bg-[#C54245] py-12 text-white">
      <h2 className="text-2xl font-bold ml-20 mb-10">Market Context</h2>
      <div className="mr-20 flex justify-between">
        <div className="w-[600px] ml-20">
          <img src={Market} alt="" />
        </div>
        <div className="mr-10">
          <p className="mt-4">
            Despite the economic downturn around the world, African startups
            raised <br /> over $5.4bn in 2022 (a $500m increase from 2021)
            representing the strongest <br /> funding year for the African
            startup landscape ever.
          </p>
          <p className="mt-4">
            However, even with these encouraging signs, Venture Capital (VC)
            funding into <br />
            the African tech ecosystem still accounts for less than 1% of global
            VC funding.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketContext;
