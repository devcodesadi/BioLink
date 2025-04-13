import React from "react";
import { useGetPublicBioQuery } from "../slice/userApiSlice";
import Loading from "./Loading";
import { Link, useNavigate, useParams } from "react-router-dom";

function PublicBioLink() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPublicBioQuery(username);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return setTimeout(() => navigate("/"), 1000);
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4">
      <div className="w-full max-w-sm h-[90vh] bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-6 shrink-0">
          <img
            src={
              data?.profilePic ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                data?.name
              )}&background=random&rounded=true`
            }
            alt={data?.name}
            className="w-20 h-20 rounded-full object-cover mb-4"
          />

          <h1 className="text-xl font-semibold text-gray-800">{data.name}</h1>
          <p className="text-sm text-gray-500">{data.about}</p>
        </div>

        {/* Scrollable Social Links Section */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col space-y-4">
            {data.socialLink.map((mySocial) => (
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

export default PublicBioLink;
