import React, { useId, useState } from "react";
import { useFetchSocialQuery } from "../slice/socialApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { onboardLinks } from "../slice/onboardSlice";
import { useOnboardMutation } from "../slice/userApiSlice";

function OnBoardSelectSocial() {
  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = useState("");
  const { data, isLoading, isError } = useFetchSocialQuery();
  const [onboard] = useOnboardMutation();

  const user = useSelector((state) => state.auth.userInfo);
  const bioData = useSelector((state) => state.userOnboard.bio);

  const handleOnAdd = async () => {
    dispatch(onboardLinks(selectedKey));
    await onboard({
      name: bioData.name,
      userName: bioData.username,
      about: bioData.about,
      key: selectedKey,
      userId: user._id,
    });
    window.location.href = "/user/dashboard";
  };

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-8">Loading...</p>;
  }
  if (isError) {
    return (
      <p className="text-center text-red-500 mt-8">
        Failed to load social platforms.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-2xl bg-white border border-gray-200 p-10 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-[#0A0A0A] text-center">
          Select Your Social Media
        </h2>
        <p className="text-center text-gray-500 text-base mb-8">
          (Choose at least one)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.platform.map((social) => (
            <button
              key={social._id}
              onClick={() => setSelectedKey(social._id)}
              className={`flex items-center gap-4 border p-4 rounded-xl transition-all duration-200 cursor-pointer
                ${
                  selectedKey === social._id
                    ? "bg-[#DCFCE7] border-[#10B981] shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow"
                }`}
            >
              <img
                src={social.icon}
                alt={`${social.socialName} Logo`}
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-medium text-[#0A0A0A]">
                {social.socialName}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={handleOnAdd}
          className="mt-8 w-full bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition"
        >
          Create BioLink →
        </button>
      </div>
    </div>
  );
}

export default OnBoardSelectSocial;
