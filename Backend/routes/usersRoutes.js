const router = require("express").Router();
const { getUsersData } = require("../controllers/usersController");

//@description     Fetch all users data
//@route           GET /api/users
//@access          Private
router.get("/", getUsersData);

module.exports = router;
