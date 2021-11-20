const router = require("express").Router()
const service = require("../service/auth.service")

router.post("/register", service.RegisterService)

router.post("/login", service.LoginService)

module.exports = router