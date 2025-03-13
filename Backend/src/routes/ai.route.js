const express = require("express");
const router = express.Router();
const aiController = require('../controllers/ai.controller')
const app = require("../app");


router.post('/get-response', aiController.getResponse)


  


module.exports = router;