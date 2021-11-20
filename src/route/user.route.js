const router = require("express").Router()
const service = require("../service/user.service")

// Get Profile
router.get("/", service.GetProfile)

module.exports = router

