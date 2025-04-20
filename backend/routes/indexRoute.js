
const express = require("express");
const authRoute = require("./authRoute");
const githubDataRoute = require("./githubDataRoute");
const { isUserAuthenticated } = require("../middleware/isUserAuthenticated");

const indexRoute = express.Router();

indexRoute.use("/api/auth", authRoute);
indexRoute.use("/api/github-data",isUserAuthenticated, githubDataRoute)

module.exports = indexRoute;