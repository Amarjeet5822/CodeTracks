const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const axios = require("axios");
const GITHUB_API = "https://api.github.com";

const getGitHubUserData = async (accessToken) => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    };
    // 1. Get user profile
    const { data: profile } = await axios.get(`${GITHUB_API}/user`, { headers });

    // 2. Get user repos
    const { data: repos } = await axios.get(`${GITHUB_API}/user/repos?per_page=20`, { headers });

    // 3. Get followers
    const { data: followers } = await axios.get(`${GITHUB_API}/user/followers`, { headers });

    // // 4. Get organizations
    // const { data: orgs } = await axios.get(`${GITHUB_API}/user/orgs`, { headers });

    // // 5. Optional: Get starred repos
    // const { data: starred } = await axios.get(`${GITHUB_API}/user/starred`, { headers });

    // // 6. Optional: Events (for activity)
    // const { data: events } = await axios.get(`${GITHUB_API}/users/${profile.login}/events`, { headers });

    return {
      profile,
      repos,
      followers,
    };
  } catch (error) {
    console.error("GitHub API Error:", error?.response?.data || error.message);
    throw new Error("Failed to fetch GitHub data");
  }
}

const GitHubUserDetails = async (req, res, next) => {
  try {
    // console.log("GitHubUserDetails.js: req.user = ", req.user);	
    const { userId } = req.user;
    const user = await User.findById(userId).select("+githubAccessToken");
    // console.log("GitHubUserDetails.js: user = ", user);
    if (!user && !user.githubAccessToken) {
      return next(new AppError(404, "Github account not Connected"));
    }
    const data = await getGitHubUserData(user.githubAccessToken);
    // console.log("GitHubUserDetails.js: data = ", data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(new AppError(500, error.message));
  }

};

module.exports = { GitHubUserDetails}