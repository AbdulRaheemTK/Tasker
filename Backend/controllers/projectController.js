const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

const addProject = asyncHandler(async (req, res, next) => {
  const { projectName, allocatedTo, dueDate } = req.body;

  try {
    const project = await Project.create({
      projectName,
      allocatedTo,
      dueDate,
    });

    if (project) {
      const populatedProject = await Project.findOne({
        _id: project._id,
      }).populate({ path: "allocatedTo", select: "-password" });
      res.status(200);
      res.json(populatedProject);
    }
  } catch (error) {
    next(new Error("Unable to add the project!"));
  }
});

const getProjects = asyncHandler(async (req, res, next) => {
  try {
    const projects = await Project.find({}).populate({
      path: "allocatedTo",
      select: "-password",
    });

    if (projects) {
      res.status(200).json(projects);
    }
  } catch (error) {
    next(new Error("Unable to get the projects!"));
  }
});

module.exports = { addProject, getProjects };
