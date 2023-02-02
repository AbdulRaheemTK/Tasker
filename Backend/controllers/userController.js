const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const generateToken = require("../config/generateToken");

const User = require("../models/userModel");

//@description     Signup
//@route           POST /api/user/signup
//@access          Public
const signup = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, department, imgUrl } = req.body;

  console.log(fullName, email, password, department, imgUrl);
  if (!fullName || !email || !password || !department) {
    res.status(401);
    next(new Error("Please Enter all the required fields"));
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(401);
    next(
      new Error("User with this email address already exists in the database!")
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  if (hashedPassword) {
    const user = await User.create({
      fullName: fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      department: department,
      imgUrl: imgUrl,
    });

    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(401);
      next(new Error("User can not be created!"));
    }
  } else {
    res.status(401);
    next(new Error("Password can not be hashed:User not created"));
  }
});

//@description     Login
//@route           POST /api/user/login
//@access          Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    next(new Error("Please enter Email and Password!"));
  }

  const user = await User.findOne({ email: email });

  if (user) {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      res.status(200);
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        department: user.department,
        imgUrl: user.imgUrl,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      next(new Error("Invalid User Password!"));
    }
  } else {
    res.status(401);
    next(new Error("Invalid User Email"));
  }
});

//@description     Fetch logged In User's Data
//@route           GET /api/user
//@access          Private

const getUserData = asyncHandler(async (req, res, next) => {
  //In auth Middleware, we have save the user using the decoded jwt in req.user
  const user = req.user;
  try {
    if (user) {
      res.status(200);
      res.json(user);
    }
  } catch (error) {
    res.status(401);
    next(new Error("Unable to Fetch User Data"));
  }
});

//@description     Update user's data
//@route           POST /api/user/updateUser/:userId
//@access          Private

const updateUserData = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const { imgUrl, fullName, email, department } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        imgUrl,
        fullName,
        email,
        department,
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(401);
    next(new Error("Unable to update user data"));
  }
});
module.exports = { signup, login, getUserData, updateUserData };
