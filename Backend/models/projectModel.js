const mongoose = require("mongoose");

const projectModel = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  allocatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Project = mongoose.model("Project", projectModel);

module.exports = Project;
