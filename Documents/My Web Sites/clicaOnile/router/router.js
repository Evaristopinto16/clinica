const express = require("express")
const promptControllers = require("../controllers/prompt-controllers")
const routes = express.Router()


routes.post('/api/prompt', promptControllers.sendText)


module.exports = routes;