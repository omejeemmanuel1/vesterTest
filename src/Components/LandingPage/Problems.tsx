import React from "react";

const Problems: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold">Problems in the Africa Ecosystem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Ecosystem Data</h3>
            <p className="mt-2">
              Lack of structured data on Africa’s ecosystem makes sizing market
              opportunities very difficult.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">De-risking Insights</h3>
            <p className="mt-2">
              Corporate players and investors do not always have enough
              information to de-risk the funding process in the tech space.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Limited Quality Pipeline</h3>
            <p className="mt-2">
              Investors sometimes struggle to get access to a diverse pipeline
              of quality startups especially in emerging African markets.
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Startup Funding Gap</h3>
            <p className="mt-2">
              Several VC viable African startups are left without much-needed
              funding, representing missed opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
