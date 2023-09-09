import React from "react";
import ComNavBar from "./ComNavBar";
import ComSideBar from "./ComSideBar";
import ProfileCard from "./ProfileCard";

const CompanyDashboard: React.FC = () => {
  return (
    <div className="flex">
      <ComSideBar />
      <div className="flex-1">
        <ComNavBar />
        <div>
          <div className="flex h-[175px] space-x-[130px] p-14 bg-[#C0C0F5] bg-opacity-10 ">
            <div>
              <h6>Company Name</h6>
              <span className="bg-[#C0C0F5] text-xs p-[4px] rounded-2xl text-[#000D80]">
                Social tech
              </span>
            </div>
            <div>
              <h6>Stage</h6>
              <p>
                NA{" "}
                <span className="bg-[#DCFFDD] text-xs p-[4px] rounded-md text-[#006804]">
                  open
                </span>
              </p>
            </div>
            <div>
              <h6>Company Valuation</h6>
              <p>NA</p>
            </div>
            <div>
              <h6>Current Target Raised</h6>
              <p>NA</p>
            </div>
            <div>
              <h6>Score</h6>
              <p>NA</p>
            </div>
          </div>
          <div>
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
