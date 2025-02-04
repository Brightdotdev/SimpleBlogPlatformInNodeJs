const { Router } = require('express')
const {isUserAuthenticated} = require('../utils/AuthenticationMiddleWares')
const { handleDashBoard } = require('../utils/HandleUserPages')

const userPages  = Router();


userPages.get("/dashboard", isUserAuthenticated, handleDashBoard)




module.exports = userPages;