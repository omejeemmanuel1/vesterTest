import React from "react";
import About from "../../assets/about.png";

const AboutProduct: React.FC = () => {
  return (
    <section className="py-12 mb-6">
      <h2 className="text-2xl font-bold ml-20 mb-10">About The Product</h2>
      <div className="ml-20 flex justify-between">
        <div className="">
          <p>
            Vester.AI is a technology platform that provides Africa focused
            investors and startups <br /> with insights and the rails to get
            connected. Our core product is our investment <br />
            readiness score showcasing the VC backability of African companies
            and key <br />
            considerations when making investment decisions.
          </p>
          <p className="mt-4">
            We help founders get investment readiness insights and tell their
            story to <br />
            investors all in one platform. We help investors reduce the time
            needed for <br /> due diligence and find their next investment
            opportunity.
          </p>
        </div>
        <div className="w-[600px] mr-6 -m-36">
          <img src={About} alt="About Vester" />
        </div>
      </div>
    </section>
  );
};

export default AboutProduct;
