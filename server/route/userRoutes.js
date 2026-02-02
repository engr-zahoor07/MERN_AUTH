const {
  register,
  login,
  verifyUser,
  resndVerification,
  updateUser,
  forgotPassword,
  verifyPasswordOTP,
  getUser,
} = require("../controller/userController");

const JWT_AUTH = require("../middleware/JWT_AUTH");

const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/verify/:token", verifyUser);
userRouter.get("/resndVerification/:token", resndVerification);
userRouter.put("/updateUser", JWT_AUTH, updateUser);
userRouter.post("/resetPassword", forgotPassword);
userRouter.post("/verifyPasswordOTP", verifyPasswordOTP);
userRouter.get("/", JWT_AUTH, getUser);

module.exports = userRouter;
