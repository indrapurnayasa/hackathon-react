import React from "react";
import GlobeMap from "./GlobeMap";

const ExportCo = () => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">
              ExportCo
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a
                className="text-[#111518] text-sm font-medium leading-normal"
                href="#"
              >
                Home
              </a>
              <a
                className="text-[#111518] text-sm font-medium leading-normal"
                href="#"
              >
                About
              </a>
              <a
                className="text-[#111518] text-sm font-medium leading-normal"
                href="#"
              >
                Services
              </a>
              <a
                className="text-[#111518] text-sm font-medium leading-normal"
                href="#"
              >
                Contact
              </a>
            </div>
            <div className="flex gap-2">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Sign up</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2094f3] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log in</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              About ExportCo
            </h2>

            {/* Globe Map Container with specific styling */}
            <div
              className="w-full bg-white rounded-lg shadow-sm mb-6"
              style={{ height: "600px" }}
            >
              <GlobeMap />
            </div>

            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4">
              ExportCo is a leading global trade company specializing in
              connecting businesses worldwide. We facilitate international
              commerce through our comprehensive network of partners and
              advanced logistics solutions.
            </p>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Our mission is to make global trade accessible, efficient, and
              profitable for businesses of all sizes. With over 20 years of
              experience in international markets, we provide expert guidance
              and support throughout your export journey.
            </p>
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
              <div className="bg-[#f0f2f5] rounded-lg p-4">
                <h4 className="font-bold mb-2">Export Documentation</h4>
                <p className="text-sm text-[#637588]">
                  Complete handling of all export documentation and compliance
                  requirements.
                </p>
              </div>
              <div className="bg-[#f0f2f5] rounded-lg p-4">
                <h4 className="font-bold mb-2">Logistics Management</h4>
                <p className="text-sm text-[#637588]">
                  End-to-end logistics solutions for efficient global shipping.
                </p>
              </div>
              <div className="bg-[#f0f2f5] rounded-lg p-4">
                <h4 className="font-bold mb-2">Market Research</h4>
                <p className="text-sm text-[#637588]">
                  In-depth market analysis and opportunity identification.
                </p>
              </div>
              <div className="bg-[#f0f2f5] rounded-lg p-4">
                <h4 className="font-bold mb-2">Trade Finance</h4>
                <p className="text-sm text-[#637588]">
                  Flexible financing solutions for international trade
                  transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportCo;
