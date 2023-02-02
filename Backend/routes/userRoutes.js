const { protect } = require("../middlewares/authMiddleware");
const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getUserData,
  updateUserData,
} = require("../controllers/userController");

//@description     Signup
//@route           POST /api/user/signup
//@access          Public
router.post("/signup", signup);

//@description     Login
//@route           POST /api/user/login
//@access          Public
router.post("/login", login);

//@description     Fetch User's Data
//@route           GET /api/user/:userId
//@access          Private
router.get("/:userId", getUserData);

//@description     Update user's data
//@route           POST /api/user/updateUser/:userId
//@access          Private
router.post("/updateUser/:userId", updateUserData);

module.exports = router;
