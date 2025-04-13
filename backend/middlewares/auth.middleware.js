import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const authToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: `Login expired! Please login again` });
  }

  const isTokenValid = jwt.verify(token, process.env.SECRET_KEY);

  if (isTokenValid) {
    req.userId = isTokenValid.userId;
    next();
  } else {
    res
      .status(401)
      .json({ success: false, message: `Login Expired!Please Login again` });
  }
});

export default authToken;
