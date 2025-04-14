import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.js";

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    res.status(400);
    throw new Error(`User alreay exists`);
  }

  const user = await User.create({ name, email, password });

  if (user) {
    const emailVerificationToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
    const verificationUrl = `http://localhost:5173/user/verify-email?token=${emailVerificationToken}`;
    sendMail(
      email,
      "Account Verification",
      `<h2>Hello ${name}</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 15 minutes.</p>`
    );
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});




//@desc verify the email
//@access public
//@route /api/user/verify-email
const isEmailVerified = asyncHandler(async (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(404);
    throw new Errror(`Token not exist !Please SignIn again`);
  }
  const isTokenVerified = jwt.verify(token, process.env.SECRET_KEY);
  if (isTokenVerified) {
    generateToken(res, isTokenVerified.userId);
    const user = await User.findById(isTokenVerified.userId);
    user.isVerified = true;
    await user.save();
    res.status(200).json({ success: true, message: "Success" });
  } else {
    res.status(401);
    throw new Error(`Token Expired! Please signIn again`);
  }
});







//@desc user login
//@route /api/user/login
//access public

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist && (await isUserExist.matchPassword(password))) {
    res.clearCookie("jwt");
    generateToken(res, isUserExist._id);

    res.status(200).json({
      _id: isUserExist._id,
      name: isUserExist.name,
      email: isUserExist.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc user logout
//@route api/user/logout
//@access private

const userLogOut = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "lax",
  });
  res.status(200).json({ success: true, message: "LogOut Successfully" });
});

//@desc update user profile
//@routes api/user/profile
//@access private

const profileUpdate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });
  } else {
    req.statusCode(404);
    throw new Error("user not found");
  }
});

//@desc check is request is authenticated or not

const isValid = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized! Please login again.",
    });
  }

  try {
    const validToken = jwt.verify(token, process.env.SECRET_KEY);

    const userInfo = await User.findById(validToken.userId).select("-password");

    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      success: true,
      isOnboard: userInfo.isOnboard,
      userInfo,
      validate: validToken,
      token,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Login expired or token invalid. Please login again.",
    });
  }
};

export { userRegister, userLogin, userLogOut, isValid, isEmailVerified };
