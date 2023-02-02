//Installed Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Imported  Modules
const connectDB = require("./config/db");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const usersRoutes = require("./routes/usersRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/project", projectRoutes);

app.use((error, req, res, next) => {
  res.json({
    errorMessage: error.message,
    statusCode: res.statusCode,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Started Listening on PORT:${PORT}`);
});
