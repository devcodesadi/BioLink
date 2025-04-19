import { Link } from "react-router-dom";
import selfieDoodle from "../assets/SelfieDoodle.svg";
import BioLink_screenshot from "../assets/project_screenshot.png"

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            The <span className="text-[#10B981]">Link-in-Bio</span> Developers Actually Need
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Showcase your GitHub, Stack Overflow, Hashnode, Medium, and more — all in one simple, fast, and dev-friendly page.
          </p>
          <Link to="/user/register">
            <button className="px-8 py-4 bg-[#10B981] hover:bg-[#059669] hover:text-white text-white rounded-full font-semibold cursor-pointer shadow-lg transition-all duration-300">
              Get Started Free
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-400">No credit card required • Instant signup</p>
        </div>

        {/* Right - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={selfieDoodle}
            alt="Dashboard preview"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* New Features Section */}
      <section className="bg-[#F9F9F9] py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Developers Love BioLink</h2>
          <p className="text-gray-600 mb-12 max-w-xl mx-auto">
            BioLink is built specifically for developers to showcase their content in one place — fast, clean, and fully customizable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-3 text-[#10B981]">Link Everything in One Place</h3>
              <p className="text-gray-600">Link to your GitHub, Stack Overflow, Hashnode, Medium, and more — with easy previews and icons for each.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-3 text-[#10B981]">Custom Themes for Devs</h3>
              <p className="text-gray-600">Light, dark, or terminal-style themes. Even add your own CSS — because you deserve full control.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all relative">
              <div className="absolute top-4 right-4 bg-[#10B981] text-xs px-2 py-1 rounded-full font-bold text-white">Coming Soon</div>
              <h3 className="text-xl font-semibold mb-3 text-[#10B981]">Analytics & Insights</h3>
              <p className="text-gray-600">Track visits, clicks, and performance — learn what your audience loves most. (Coming soon)</p>
            </div>
          </div>
        </div>
      </section>

      {/* See How It Works */}
      <div className="bg-[#F9F9F9] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#10B981] mb-12">
            See How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              "GitHub",
              "Hashnode",
              "Medium",
              "Stack Overflow",
              "Dev.to",
              "Product Hunt",
            ].map((platform, i) => (
              <div
                key={platform}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={`https://api.blog.production.linktr.ee/wp-content/themes/blog-theme/static-assets/Caterpiller/social-${i % 6}.svg`}
                  alt={platform}
                  className="h-16 mb-4"
                />
                <h3 className="text-xl font-semibold text-[#10B981]">{platform}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Easily add your {platform} to your BioLink and drive more traffic.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshot/Demo Preview */}
      <div className="py-20 px-6 bg-[#F9F9F9]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#10B981]">See It in Action</h2>
          <p className="text-gray-600 mb-8">A sneak peek of your future BioLink page.</p>
          
          <div className="relative flex justify-center items-center">
  <img
    src={BioLink_screenshot}
    alt="BioLink Preview"
    className="rounded-xl shadow-2xl rotate-3 w-[50%] mx-auto"
  />
</div>






        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#10B981] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Share Your BioLink?</h2>
          <p className="mb-6 text-lg">It only takes 30 seconds to set up. Create your link and go live instantly.</p>
          <Link to="/user/register">
            <button className="px-8 py-4 bg-white text-[#0A0A0A] rounded-full font-bold shadow-md hover:bg-[#059669] hover:text-white transition-all duration-300">
              Try BioLink Free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
