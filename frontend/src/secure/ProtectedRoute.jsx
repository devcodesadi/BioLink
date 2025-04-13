import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCheckAuthQuery, useLoginMutation } from "../slice/userApiSlice";
import { useDispatch } from "react-redux";
import { logoutClear, setCredentials } from "../slice/authSlice";
import Login from "../pages/Login";
import Loading from "../pages/Loading";

function ProtectedRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useCheckAuthQuery();

  useEffect(() => {
    if (!isLoading) {
      if (isError || !data?.success) {
        dispatch(logoutClear());
        window.location.href = "/user/login";
      } else {
        dispatch(setCredentials(data.userInfo));
        if (!data.userInfo.isOnboard) {
          navigate("/user/onboard");
        }
      }
    }
  }, [isLoading, isError, data, navigate, dispatch]);
  
  return data?.success ? <Outlet /> : <Login />;
}
// if (isLoading) return <Loading/>;

export default ProtectedRoute;
