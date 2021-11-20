const router = require("express").Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

const { CheckToken } = require("../middleware/jwt");

router.use("/auth", authRoute);

router.use("/user", CheckToken, userRoute);

module.exports = router;
