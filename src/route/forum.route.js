const router = require("express").Router()
const service = require("../service/forum.service")

// Create question
router.post("/", service.CreateQuestion)

// Get question & 
router.get("/:id", service.GetByID)

module.exports = router