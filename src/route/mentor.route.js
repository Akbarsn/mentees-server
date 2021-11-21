const router = require("express").Router();
const service = require("../service/mentor.service");

// Get One Recoomended Mentor
router.get("/best", service.GetBestRecommendedMentor);

// Get All Sorted Mentor
router.get("/", service.GetSortedMentor);

// Get Mentor List
router.get("/list-mentor", service.GetMentorList)

// Get Mentee List
router.get("/list-mentee", service.GetMenteeList)

// Get Request Mentee List
router.get("/request/mentee", service.GetPendingMenteeRequest)

// Send Request
router.post("/send", service.SendRequest);

// Answer Request
router.post("/answer", service.AnswerRequest);

module.exports = router
