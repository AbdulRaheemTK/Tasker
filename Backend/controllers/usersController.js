const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@description     Fetch all users data
//@route           GET /api/users
//@access          Private

const getUsersData = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (users) {
      res.status(200);
      res.json(users);
    }
  } catch (error) {
    next(new Error("Unable to fetch Users Data"));
  }
});

module.exports = { getUsersData };
