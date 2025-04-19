import React from "react";
import { useFetchThemeQuery } from "../slice/themeApiSlice";
import Loading from "./Loading";
import { useUpdateSocialThemeMutation } from "../slice/userApiSlice";

function Theme() {
  const { data, isLoading, isError } = useFetchThemeQuery();
  const [updateTheme]=useUpdateSocialThemeMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error("ThemeFetchError", isError);
    return <div className="text-center mt-10 text-red-500">Failed to load themes.</div>;
  }


  const handleOnClick=async(themeId)=>{
    const res=await updateTheme({themeId:themeId})
    console.log(res)
  }











  return (
    <div className="flex flex-wrap justify-center items-start gap-8 p-6">
      {data.map((perTheme) => (
        <div
          key={perTheme._id}
          onClick={()=>handleOnClick(perTheme._id)}
          className="min-h-[90vh] w-full max-w-sm rounded-2xl shadow-xl p-6 flex flex-col transition-transform transform hover:scale-[1.05] hover:shadow-2xl"
          style={{
            backgroundColor: perTheme.bgColor,
            color: perTheme.profileTextColor,
          }}
        >
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-4" />
            <h1 className="text-xl font-semibold">{perTheme.name}</h1>
            <p className="text-sm opacity-80">Software Engineer</p>
          </div>

          {/* Social Links Section */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">
            {["Facebook", "Instagram", "Youtube", "Spotify"].map((social, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-center gap-3 cursor-pointer border px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-opacity-80"
                style={{
                  backgroundColor: perTheme.buttonColor,
                  color: perTheme.textColor,
                  borderColor: perTheme.textColor,
                }}
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Theme;
