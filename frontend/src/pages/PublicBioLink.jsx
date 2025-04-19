import React from "react";
import { useGetPublicBioQuery } from "../slice/userApiSlice";
import Loading from "./Loading";
import { Link, useNavigate, useParams } from "react-router-dom";

function PublicBioLink() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPublicBioQuery(username);

  if (isLoading) return <Loading />;

  if (isError) {
    setTimeout(() => navigate("/"), 1000);
    return null;
  }

  // Theme colors with default fallback
  const bgColor = data?.theme?.bgColor || "#f4f4f4";
  const buttonColor = data?.theme?.buttonColor || "#f8f9fa";
  const textColor = data?.theme?.textColor || "#1f2937";
  const profileTextColor = data?.theme?.profileTextColor || "#111827";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      
    >
      <div
        className="w-full max-w-sm h-[90vh] rounded-2xl shadow-xl p-6 flex flex-col overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-4">
          <img
            src={
              data?.profilePic ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                data?.name
              )}&background=random&rounded=true`
            }
            alt={data?.name}
            className="w-20 h-20 rounded-full object-cover mb-3"
          />

          <h1 className="text-lg font-semibold" style={{ color: profileTextColor }}>
            {data.name}
          </h1>
          <p className="text-sm px-2" style={{ color: profileTextColor }}>
            {data.about}
          </p>
        </div>

        {/* Scrollable Social Links Section */}
        <div className="flex-1 overflow-y-auto mt-2 pb-4">
          <div className="flex flex-col space-y-3">
            {data.socialLink.map((mySocial) => (
              <Link
                key={mySocial._id}
                to={mySocial.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="w-full flex items-center cursor-pointer justify-center gap-3 border border-gray-300 px-4 py-2 rounded-full transform transition-transform duration-200 hover:scale-105"
                  style={{
                    backgroundColor: buttonColor,
                    color: textColor,
                  }}
                >
                  <img
                    src={mySocial.icon}
                    alt={mySocial.socialName}
                    className="w-5 h-5 object-contain absolute left-4"
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

export default PublicBioLink;
