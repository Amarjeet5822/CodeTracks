const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user.model");

require("dotenv").config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BE_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            username: profile.username,
            avatarUrl: profile.photos[0].value,
            email: profile.emails?.[0]?.value || "",
            githubAccessToken: accessToken,
          });
          console.log("passport.js: user = ", user);
        }else {
          // Update token if user already exists
          user.githubAccessToken = accessToken;
          await user.save();
        }
        return done(null, user); // Pass user to req.user;
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

  try {
    const user = await User.findById(id);
    done(null, user); // Attach user to request.user
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;