import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useGetBioLinkQuery } from "../slice/userApiSlice";

function BioLink() {
  const {
    data: selectedPlatforms,
    isLoading,
    isError,
  } = useGetBioLinkQuery();

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: Couldn't fetch BioLink! Please Login</p>;

  // Theme variables
  const bgColor = selectedPlatforms?.theme?.bgColor || "#f4f4f4";
  
  const buttonColor = selectedPlatforms?.theme?.buttonColor || "#f8f9fa";
  const textColor = selectedPlatforms?.theme?.textColor || "#1f2937";
  const profileTextColor = selectedPlatforms?.theme?.profileTextColor || "#111827";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="w-full max-w-sm h-[90vh] rounded-2xl shadow-lg p-6 flex flex-col"
        style={{ backgroundColor: bgColor }}
      >
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
          <h1 className="text-xl font-semibold" style={{ color: profileTextColor }}>
            {selectedPlatforms.name}
          </h1>
          <p className="text-sm" style={{ color: textColor }}>
            {selectedPlatforms.about}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col space-y-4">
            {selectedPlatforms.userLinks.map((mySocial) => (
              <Link
                key={mySocial._id}
                to={mySocial.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="w-full  cursor-pointer flex items-center justify-center gap-3 border border-gray-300 px-4 py-2 rounded-full transition-all relative"
                  style={{
                    backgroundColor: buttonColor,
                    color: textColor,
                  }}
                >
                  <img
                    src={mySocial.icon}
                    alt={mySocial.socialName}
                    className="w-6 h-6 object-contain absolute left-4"
                  />
                  <span className="font-medium text-center w-full">
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
