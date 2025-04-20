
const express = require("express");
const { GitHubUserDetails } = require("../controllers/GithubUserDetails");

const githubDataRoute = express.Router();
// Route GET [ /api/github-data ]
githubDataRoute.get("/", GitHubUserDetails);


module.exports = githubDataRoute;