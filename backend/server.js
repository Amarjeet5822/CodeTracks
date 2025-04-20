const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const  passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require("./models/user.model");
const AppError  = require("./utils/AppError");
const indexRoute = require('./routes/indexRoute');
require('dotenv').config();
require('./config/passport');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const whitelist = [process.env.FE_URL, process.env.DEPLOY_FE_URL];
const corsOptionsDelegate = (req, callback) => {
  const origin = req.header("Origin");
  if (whitelist.includes(origin) || !origin) {
    callback(null, {
      origin: true,
      credentials: true,
      methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    });
  } else {
    callback(null, { origin: false });
  }
};
app.use(cors(corsOptionsDelegate));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth Login
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) =>{
    const { username, _id } = req.user;
    const refreshToken = jwt.sign({username:username, userId:_id}, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // `false` in development, `true` in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax", // `Strict` can block requests in some cases, `Lax` is better for authentication
      maxAge: 7 * 24 * 60 * 60 * 1000, // Seven Days
    });
    req.session.user = req.user;
    // Successful authentication, redirect home.
    res.redirect(`${process.env.FE_URL}/callback?token=${refreshToken}`);	
  });

// Auth status check
app.get("/api/auth/status", (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return next(
      new AppError(401, "Authentication token not found", {
        isAuthenticated: false,
      })
    );
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ isAuthenticated: true });
  } catch (err) {
    res.clearCookie("refreshToken");
    next(
      new AppError(401, "Invalid or expired token", { isAuthenticated: false })
    );
  }
});

app.post("/logout", (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(new AppError(500, "Logout failed"));
      }
      req.session.destroy((err) => {
        if (err) {
          return next(new AppError(500, "Session destruction failed"));
        }
        res.clearCookie("connect.sid", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
        });
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
        });
        res
          .status(200)
          .json({ message: "Logout successful", isAuthenticated: false });
      });
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
}); 

// Routes 
app.use(indexRoute);

app.use((req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
    ...err.data, // Merge extra data like isAuthenticated
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
