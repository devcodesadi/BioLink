import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useGetBioLinkQuery } from "../slice/userApiSlice";

function BioLink() {
  const {
    data: selectedPlatforms,
    isLoading: isLoadingSelected,
    isError: isErrorSelected,
  } = useGetBioLinkQuery();


  if (isLoadingSelected) return <Loading />;
  if(isErrorSelected) return <p>Error:Couldn't fetch BioLink! Please Login</p>

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4">
      <div className="w-full max-w-sm h-[90vh] bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-6 shrink-0">
        <img
            src={
              selectedPlatforms?.profilePic ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                selectedPlatforms?.name
              )}&background=random&rounded=true`
            }
            alt={selectedPlatforms?.name}
            className="w-20 h-20 rounded-full object-cover mb-4"
          />
          <h1 className="text-xl font-semibold text-gray-800">{selectedPlatforms.name}</h1>
          <p className="text-sm text-gray-500">{selectedPlatforms.about}</p>
        </div>

        {/* Scrollable Social Links Section */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col space-y-4">
            {selectedPlatforms.userLinks.map((mySocial) => (
              <Link
                key={mySocial._id}
                to={mySocial.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full flex items-center justify-center gap-3 bg-[#f8f9fa] cursor-pointer border border-gray-300 px-4 py-2 rounded-full hover:bg-blue-50 transition-all relative">
                  <img
                    src={mySocial.icon}
                    alt={mySocial.socialName}
                    className="w-6 h-6 object-contain absolute left-4"
                  />
                  <span className="text-gray-700 font-medium text-center w-full">
                    {mySocial.socialName}
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BioLink;
