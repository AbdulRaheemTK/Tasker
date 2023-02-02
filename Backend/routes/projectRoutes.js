const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");

const { addProject, getProjects } = require("../controllers/projectController");

//@description     Add Project
//@route           POST /api/project/addProject
//@access          Public
router.post("/addProject", addProject);

//@description     Retrive all Projects
//@route           GET /api/project/getProjects
//@access          Public
router.get("/getProjects", getProjects);

module.exports = router;
