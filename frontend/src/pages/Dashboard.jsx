import React, { useState } from "react";
import { useFetchSocialQuery } from "../slice/socialApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { removeSocial, updateSocial } from "../slice/userSocialSlice.js";
import BioLink from "./BioLink.jsx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  useEditBioLinksMutation,
  useGetBioLinkQuery,
  useRemoveSocialMutation,
  useUpdateUserSocialMutation,
} from "../slice/userApiSlice.js";
import Loading from "./Loading.jsx";

function Dashboard() {
  const dispatch = useDispatch();
  const {
    data: selectedPlatforms,
    isLoading: isLoadingSelected,
    isError: isErrorSelected,
  } = useGetBioLinkQuery();

  const {
    data: allSocialPlatforms,
    isLoading: isLoadingPlatforms,
    isError: isErrorPlatforms,
  } = useFetchSocialQuery();

  const [updateUserSocial] = useUpdateUserSocialMutation();
  const [editLinks] = useEditBioLinksMutation();
  const [removeSocial] = useRemoveSocialMutation();

  if (isLoadingPlatforms || isLoadingSelected) {
    return <Loading />;
  }

  if (isErrorPlatforms || isErrorSelected) {
    return (
      <div className="text-center mt-10 text-red-500">
        Couldn't fetch social apps. Please enter links manually or login again.
      </div>
    );
  }

  const handleOnUpdate = async (socialId) => {
    const socialProfile = { socialId: socialId };
    const res = await updateUserSocial(socialProfile);
  };

  const handleToEdit = async (key, newUrl) => {
    const editData = { socialId: key, newUrl: newUrl };
    const res = await editLinks(editData);
  };

  const handleOnRemove = async (key) => {
    const removeSocialKey = { key: key };
    const res = await removeSocial(removeSocialKey);
  };

  return (
    <div className="min-h-screen bg-white p-6 overflow-hidden text-[#0A0A0A]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[calc(100vh-3rem)]">
        {/* Column 1 - Social Platforms */}
        <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-6 text-[#0A0A0A]">
            Select Your Social Media
          </h2>
          <p className="text-gray-600 mb-4">
            Choose the platforms you want to connect to your bio link and update
            the links for each.
          </p>
          <div className="flex flex-col gap-6">
            {allSocialPlatforms?.platform?.map((social, index) => (
              <button
                key={social._id}
                onClick={() => handleOnUpdate(social._id)}
                className="flex items-center gap-4 cursor-pointer bg-white border border-gray-200 p-4 rounded-lg hover:shadow-lg transition ease-in-out duration-200 hover:border-[#10B981]"
              >
                <img
                  src={social.icon}
                  alt={`${social.socialName} Logo`}
                  className="w-12 h-12 object-contain"
                />
                <span className="text-lg font-medium text-[#0A0A0A]">
                  {social.socialName}
                </span>
              </button>
            ))}
          </div>

          {/* Add some padding at the bottom to ensure the last item is visible */}
          <div className="pb-30"></div>
        </div>

        {/* Column 2 - Selected Platform Info */}
        <div className="bg-white p-8 rounded-xl shadow-md overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-[#0A0A0A]">
              Selected Platform Info
            </h2>
            <Link to="/user/appearance">
              <button className="bg-[#10B981] text-white px-4 py-2 rounded-md hover:bg-[#059669] cursor-pointer transition">
                Theme
              </button>
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {selectedPlatforms?.userLinks?.map((addedSocial) => (
              <div
                key={addedSocial._id}
                className="flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {addedSocial.socialName}
                  </label>
                  <input
                    type="text"
                    value={addedSocial.baseUrl}
                    onChange={(e) =>
                      handleToEdit(addedSocial._id, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                  />
                </div>
                <RiDeleteBin5Line
                  className="cursor-pointer text-red-500 hover:text-red-600 text-2xl"
                  onClick={() => handleOnRemove(addedSocial._id)}
                />
              </div>
            ))}
          </div>
          <div className="pb-60"></div>
        </div>

        {/* Column 3 - Preview / Actions (Fixed) */}
        {/* Column 3 - Preview / Actions */}
        <div className="sticky top-6 self-start space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your BioLink URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="userbiolinkurl"
                readOnly
                value={`http://localhost:5173/${selectedPlatforms?.username}`}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 focus:outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `http://localhost:5173/${selectedPlatforms?.username}`
                  );
                }}
                className="bg-[#10B981] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[#059669] transition text-sm"
              >
                Copy
              </button>
            </div>
          </div>

          {/* BioLink Preview */}
          <div className="transform scale-[0.8] origin-top border border-dashed border-gray-300 p-2 rounded-lg">
            <BioLink />
          </div>

          {/* Create Button */}
          <Link
            to="/create-biolink"
            className="block text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-lg shadow hover:from-purple-600 hover:to-blue-600 transition"
          >
            Create New BioLink →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
