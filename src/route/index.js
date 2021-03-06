const router = require("express").Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const mentorRoute = require("./mentor.route");
const forumRoute = require("./forum.route");

const { CheckToken } = require("../middleware/jwt");

router.use("/auth", authRoute);

router.use("/user", CheckToken, userRoute);

router.use("/mentor", CheckToken, mentorRoute);

router.use("/forum", CheckToken, forumRoute);

module.exports = router;
