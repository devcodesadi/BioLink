import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutClear } from "../slice/authSlice";
import { useCheckAuthQuery, useLogoutMutation } from "../slice/userApiSlice";
import Loading from "../pages/Loading";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useCheckAuthQuery();

  useEffect(() => {
    if (!isLoading) {
      if (isError || !data?.success) {
        dispatch(logoutClear());
      } else {
        navigate('/user/dashboard');
      }
    }
  }, [data, dispatch, isError, isLoading]);

  const [logout] = useLogoutMutation();
  const handleOnClick = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutClear());
      window.location.href = "/user/login";
    } catch (error) {
      console.log("Logout Failed ", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <header className="sticky top-0 left-0 right-0 bg-white shadow-md py-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-[#0A0A0A]">
          Bio<span className="text-[#10B981]">Link</span>
        </a>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="px-4 py-2 text-[#0A0A0A] hover:text-[#10B981] transition rounded-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/user/register"
                className="px-4 py-2 text-[#10B981] border border-[#10B981] rounded-md hover:bg-[#059669] hover:text-white transition"
              >
                Sign Up
              </Link>
            </li>
            {data?.success ? (
              <li>
                <button
                  onClick={handleOnClick}
                  className="px-4 py-2 border border-[#0A0A0A] text-[#0A0A0A] rounded-md hover:bg-[#059669] hover:text-white transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/user/login"
                  className="px-4 py-2 bg-[#10B981] text-white rounded-md hover:bg-[#059669] transition"
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
