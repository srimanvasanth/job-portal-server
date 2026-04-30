const express = require("express");
const router = express.Router();
const profileRouter = require("../controller/profileController");
const resumeUploadController = require("../controller/resumeUploadController");
const interviewController = require("../controller/interviewController");
const { userRouter, loginHandler, saveUser } = require("../controller/userController");

router.post("/userLogin", loginHandler);
router.post("/createUser", saveUser);  

router.use(profileRouter);
router.use(resumeUploadController);
router.use(interviewController);
router.use(userRouter);

module.exports = router;